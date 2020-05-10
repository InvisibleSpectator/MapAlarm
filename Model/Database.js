import SQLite from 'react-native-sqlite-2';

export default class Database {
  static db = SQLite.openDatabase('Alarm.db');

  static initDB = () => {
    this.db.transaction(function(txn) {
      txn.executeSql(
        "SELECT name FROM sqlite_master WHERE type='table' AND name='alarms'",
        [],
        function(tx, res) {
          console.log('item:', res.rows.length);
          if (res.rows.length == 0) {
            txn.executeSql('DROP TABLE IF EXISTS alarms', []);
            txn.executeSql(
              `CREATE TABLE IF NOT EXISTS alarms (
                id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
                name TEXT NOT NULL,
                time INTEGER NOT NULL,
                options TEXT NOT NULL,
                isActive INTEGER NOT NULL,
                isLocationBound INTEGER NOT NULL,
                location TEXT NOT NULL,
                description TEXT NOT NULL
                )`,
              [],
            );
          }
        },
      );
    });
  };

  // ExecuteQuery = (sql, params = []) => new Promise((resolve, reject) => {
  //   db.transaction((trans) => {
  //     trans.executeSql(sql, params, (trans, results) => {
  //       resolve(results);
  //     },
  //       (error) => {
  //         reject(error);
  //       });
  //   });
  // });

  static addAlarm(alarm, callback) {
    let temp = [
      alarm.name,
      alarm.time,
      JSON.stringify(alarm.options),
      alarm.isActive,
      alarm.isLocationBound,
      JSON.stringify(alarm.location),
      alarm.description,
    ];
    this.db.transaction(function(txn) {
      txn.executeSql(
        `INSERT INTO alarms (
          name,
          time,
          options,
          isActive,
          isLocationBound,
          location,
          description
          )
          VALUES (?,?,?,?,?,?,?)`,
        temp,
        (tx, results) => {
          console.log('Results', results.rowsAffected);
          callback(results.insertId);
        },
        (tx, error) => {
          console.log('Error', error);
        },
      );
    });
  }

  static updateAlarm(alarm, callback = () => {}) {
    let temp = [
      alarm.name,
      alarm.time,
      JSON.stringify(alarm.options),
      alarm.isActive,
      alarm.isLocationBound,
      JSON.stringify(alarm.location),
      alarm.description,
      alarm.id,
    ];
    this.db.transaction(function(txn) {
      txn.executeSql(
        `UPDATE alarms set
          name=?,
          time=?,
          options=?,
          isActive=?,
          isLocationBound=?,
          location=?,
          description=?
          WHERE id=?
         `,
        temp,
        (tx, results) => {
          console.log('Results', results.rowsAffected);
          callback();
        },
        (tx, error) => {
          console.log('Error', error);
        },
      );
    });
  }

  static deleteAlarm(id, callback) {
    this.db.transaction(txn => {
      txn.executeSql('DELETE FROM alarms where id=?', [id], (tx, results) => {
        callback();
      });
    });
  }

  static getById(id, callback){
    this.db.transaction(txn => {
      txn.executeSql('SELECT * FROM alarms where id=?', [id], (tx, results) => {
        if (results.rows.length > 0){
          let alarm = results.rows.item(0);
          alarm.options = JSON.parse(alarm.options);
          alarm.location = JSON.parse(alarm.location);
          callback(alarm);
        } else {
          console.log("no object with id = " + id);
        }
      });
    });
  }

  static selectAll(resFunction, resFunction2 = () => {}) {
    this.db.transaction(txn => {
      txn.executeSql('SELECT * FROM alarms', [], (tx, results) => {
        var temp = [];
        for (let i = 0; i < results.rows.length; ++i) {
          let alarm = results.rows.item(i);
          alarm.options = JSON.parse(alarm.options);
          alarm.location = JSON.parse(alarm.location);
          temp.push(alarm);
        }
        resFunction(temp);
        resFunction2();
      });
    });
  }
}
