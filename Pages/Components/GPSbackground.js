import React from 'react';

import BackgroundGeolocation from '@mauron85/react-native-background-geolocation';

export default class GPSbackground extends React.PureComponent {
  startBackgroundService = config => {
    BackgroundGeolocation.configure({
      desiredAccuracy: BackgroundGeolocation.HIGH_ACCURACY,
      stationaryRadius: 50,
      distanceFilter: config.distance,
      debug: false,
      startOnBoot: false,
      stopOnTerminate: true,
      locationProvider: BackgroundGeolocation.ACTIVITY_PROVIDER,
      interval: 1000,
      fastestInterval: 1000,
      activitiesInterval: 30000,
      stopOnStillActivity: false,
    });

    BackgroundGeolocation.on('authorization', status => {
      if (status !== BackgroundGeolocation.AUTHORIZED) {
        // Пользователь отклонил разрешение
      } else if (status.hasPermissions) {
        // hasPermission - незадокументированое свойство, работает на обеих платформах
      }
    });

    BackgroundGeolocation.on('location', location => {
      BackgroundGeolocation.startTask(async taskKey => {
        const updateDelta = location.time - this.lastUpdateAt;
        if (updateDelta / 1000 > config.sendInterval) {
          this.syncDataWithInterval();
          this.lastUpdateAt = location.time;
        }
        this.props.getCoords({
          latitude: location.latitude,
          longitude: location.longitude,
          rotation: location.bearing,
        });
        BackgroundGeolocation.endTask(taskKey);
      });
    });

    BackgroundGeolocation.start();
  };

  componentDidMount() {
    this.startBackgroundService(this.props.config);
  }

  componentWillUnmount() {
    BackgroundGeolocation.stop();
    BackgroundGeolocation.removeAllListeners();
  }

  render() {
    return null;
  }
}
