export default class Reminder {
  constructor({
    oid = '',
    id = '',
    name = '',
    active = false,
    timeList = [],
    dayList = [],
  }) 
  {
    this.oid = oid;
    this.id = id;
    this.name = name;
    this.active = active;
    this.time = timeList;
    this.days = dayList;
  }
}
