export default class Alarm {
  constructor() {
    this.id = 0;
    this.name = 'New Alarm';
    this.time = new Date();
    this.options = {
      Monday: false,
      Tuesday: false,
      Wednesday: false,
      Thursday: false,
      Friday: false,
      Saturday: false,
      Sunday: false,
    };
    this.isActive= true;
    this.isLocationBound=false;
    this.location={
      latitude:0,
      longitude:0,
    }
    this.description='';
  }
}