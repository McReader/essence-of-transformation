import R from 'ramda';


export default class LogInfo {
  constructor(logParts) {
    this.httpVerb = R.nth(1, logParts);
    this.ip = R.nth(3, logParts);
    this.path = R.nth(2, logParts);
    this.origin = R.last(logParts);
  }

  toString() {
    return `${this.ip} visited ${this.origin}${this.path}`;
  }
}
