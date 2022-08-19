import _ from 'lodash';
import Message from './message';
import { NextEvent, Record } from './types';

export default class Team {
  abbreviation: string;
  displayName: string;
  hasNextEvent: boolean;
  record: string;
  primaryColor: string;
  secondaryColor: string;
  standing: number;

  constructor(
    abbreviation: string,
    displayName: string,
    nextEvent: Array<NextEvent>,
    primaryColor: string,
    secondaryColor: string,
    record?: Array<Record>
  ) {
    this.abbreviation = abbreviation;
    this.displayName = displayName;
    this.hasNextEvent = !!nextEvent;
    this.primaryColor = primaryColor;
    this.secondaryColor = secondaryColor;

    const overallRecord = _.filter(record, (item) => {
      return item.type === 'total';
    });
    this.record = overallRecord.length === 1 ? overallRecord[0].summary : '';

    const statisitcs = overallRecord.length === 1 ? overallRecord[0].stats : [];
    const overallStatisitcs = _.filter(statisitcs, (statistic) => {
      return statistic.name === 'playoffSeed';
    });
    this.standing =
      overallStatisitcs.length === 1 ? overallStatisitcs[0].value : 0;
  }

  formatJSONMessage(): string {
    const JSONMessage = new Message('#fff', null, this.getJSONMessage());

    return JSONMessage.get();
  }

  formatName(): string {
    const displayNameMessage = new Message('#fff', 'bold', this.displayName);
    const abbreviationMessage = new Message(
      '#fff',
      null,
      '(' + this.abbreviation + ')'
    );

    return displayNameMessage.get() + ' ' + abbreviationMessage.get();
  }

  formatRecord(): string {
    let recordContext = this.record + ' record';

    if (!this.record) recordContext = 'No record yet';

    const recordMessage = new Message('#fff', null, recordContext);

    return recordMessage.get();
  }

  formatStanding(): string {
    let standingContext = '#' + this.standing + ' in conference';

    if (!this.standing) standingContext = '** Preseason **';

    const standingMessage = new Message('#fff', null, standingContext);

    return standingMessage.get();
  }

  getPrimaryColor(): string {
    return this.primaryColor;
  }

  getSecondaryColor(): string {
    return this.secondaryColor;
  }

  getFormattedMessage(): string {
    return (
      this.formatName() +
      '\n' +
      this.formatStanding() +
      '\n' +
      this.formatRecord()
    );
  }

  getHasNextEvent(): boolean {
    return this.hasNextEvent;
  }

  getJSONMessage(): string {
    return JSON.stringify({
      abbreviation: this.abbreviation,
      displayName: this.displayName,
      hasNextEvent: this.hasNextEvent,
      record: this.record,
      standing: this.standing
    });
  }

  printJSONMessage(): void {
    console.log(this.formatJSONMessage() + '\n');
  }
}
