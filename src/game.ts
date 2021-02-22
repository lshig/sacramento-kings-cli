import _ from 'lodash';
import emoji from 'node-emoji';
import Message from './message';
import { Competition, FilteredCompetitor } from './types';

export default class Game {
  competition: Competition;
  date: string;
  hasScore: boolean;
  id: string;
  name: string;

  constructor(
    competition: Competition,
    date: string,
    id: string,
    name: string
  ) {
    this.competition = competition;
    this.date = date;
    this.id = id;
    this.name = name;
    this.hasScore =
      competition.boxscoreAvailable === undefined ||
      competition.boxscoreAvailable === true;
  }

  formatDate(): string {
    const dateMessage = new Message(
      '#fff',
      null,
      new Date(this.date).toLocaleString('en-US', {
        timeZone: 'America/Los_Angeles'
      }) + ' PT'
    );

    return dateMessage.get();
  }

  formatJSONMessage(): string {
    const JSONMessage = new Message('#fff', null, this.getJSONMessage());

    return JSONMessage.get();
  }

  formatName(): string {
    const nameMessage = new Message('#fff', 'bold', this.name);

    return nameMessage.get();
  }

  formatScores(): string {
    if (this.hasScore) {
      const competitors = this.getCompetitors();
      const scoresFormattedText = _.map(
        competitors,
        (competitor: { team: string; score: string }) => {
          return '\n' + competitor.team + ': ' + competitor.score;
        }
      ).join('');
      const scoresMessage = new Message('#fff', null, scoresFormattedText);

      return scoresMessage.get();
    }

    return 'No scores available';
  }

  formatStatus(): string {
    if (this.hasScore) {
      const emojiStatus =
        this.getStatus() === 'Final'
          ? this.getStatus() + ' ' + emoji.get('basketball')
          : this.getStatus() + ' ' + emoji.get('hourglass_flowing_sand');
      const statusMessage = new Message('#fff', 'bold', emojiStatus);

      return statusMessage.get();
    }

    return 'No status available';
  }

  getCompetitors(): Array<FilteredCompetitor> {
    const competitors = _.get(this.competition, 'competitors', []);

    if (competitors.length === 2) {
      return _.map(competitors, (competitor) => {
        return {
          isHome: competitor.homeAway === 'home',
          primaryColor: _.get(competitor, 'team.color', '000'),
          secondaryColor: _.get(competitor, 'team.alternateColor', 'fff'),
          score: competitor.score || '0',
          team: competitor.team.abbreviation
        };
      });
    }

    return [];
  }

  getFormattedMessage(): string {
    if (!this.hasScore) {
      return this.formatName() + '\n' + this.formatDate();
    }

    return (
      this.formatName() +
      '\n' +
      this.formatDate() +
      '\n\n' +
      this.formatStatus() +
      '\n' +
      this.formatScores()
    );
  }

  getHasScore(): boolean {
    return this.hasScore;
  }

  getId(): string {
    return this.id;
  }

  getJSONMessage(): string {
    return JSON.stringify({
      date: this.date,
      hasScore: this.hasScore,
      id: this.id,
      name: this.name,
      competitors: this.getCompetitors(),
      status: this.getStatus()
    });
  }

  getLeadingCompetitor() {
    const competitors = this.getCompetitors();

    if (this.hasScore && competitors.length === 2) {
      return _.maxBy(competitors, (competitor: FilteredCompetitor) => {
        if (!competitor.score) return;
        return parseInt(competitor.score);
      });
    }

    return null;
  }

  getPrimaryColor(): string {
    const leadingCompetitor = this.getLeadingCompetitor();

    if (this.hasScore && leadingCompetitor) {
      return leadingCompetitor.primaryColor;
    }

    return '000';
  }

  getSecondaryColor(): string {
    const leadingCompetitor = this.getLeadingCompetitor();

    if (this.hasScore && leadingCompetitor) {
      return leadingCompetitor.secondaryColor;
    }

    return 'fff';
  }

  getStatus(): string {
    return _.get(this.competition, 'status.type.detail', '');
  }

  isCompleted(): boolean {
    return _.get(this.competition, 'status.type.completed', false);
  }

  printJSONMessage(): void {
    console.log(this.formatJSONMessage() + '\n');
  }
}
