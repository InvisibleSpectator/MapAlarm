export default class Alarm {
  constructor() {
    this.id = 0;
    this.name = 'New Alarm';
    this.time = new Date();
    this.options = [
      {
        name: 'Monday',
        value: true,
      },
      {
        name: 'Tuesday',
        value: true,
      },
      {
        name: 'Wednesday',
        value: true,
      },
      {
        name: 'Thursday',
        value: true,
      },
      {
        name: 'Friday',
        value: true,
      },
      {
        name: 'Saturday',
        value: true,
      },
      {
        name: 'Sunday',
        value: true,
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
