export default class Alarm {
  constructor() {
    this.id = 0;
    this.name = 'New Alarm';
    this.time = new Date();
    this.options = [
      {
        name: 'Monday',
        value: false,
      },
      {
        name: 'Tuesday',
        value: false,
      },
      {
        name: 'Wednesday',
        value: false,
      },
      {
        name: 'Thursday',
        value: false,
      },
      {
        name: 'Friday',
        value: false,
      },
      {
        name: 'Saturday',
        value: false,
      },
      {
        name: 'Sunday',
        value: false,
      },
    ];
    this.isActive = true;
    this.isLocationBound = false;
    this.location = {
      latitude: 0,
      longitude: 0,
    };
    this.description = '';
  }
}
