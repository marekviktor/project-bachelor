export default class Reminder {
  constructor({
    oid = '',
    id = '',
    active = false,
    timeList = [],
    dayList = [],
    medList = [],
  }) {
    this.oid = oid;
    this.id = id;
    this.active = active;
    this.time = timeList;
    this.days = dayList;
    this.medList = medList;
  }
}
