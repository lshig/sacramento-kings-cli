import _ from 'lodash';
import emoji from 'node-emoji';
import Message from './message';

interface Competition {
  boxscoreAvailable: boolean;
  competitors: Array<Competitor>;
  status: object;
}

interface Competitor {
  homeAway: string;
  team: {
    abbreviation: string;
    color: string;
    alternateColor: string;
  };
  score: string;
  winner: boolean;
}

interface FilteredCompetitor {
  isHome: boolean;
  primaryColor: string;
  secondaryColor: string;
  score: string;
  team: string;
}

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
      new Date(this.date).toLocaleString()
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
    const emojiStatus =
      this.getStatus() === 'Final'
        ? this.getStatus() + ' ' + emoji.get('basketball')
        : this.getStatus() + ' ' + emoji.get('hourglass_flowing_sand');
    const statusMessage = new Message('#fff', 'bold', emojiStatus);

    return statusMessage.get();
  }

  getCompetitors(): Array<FilteredCompetitor> {
    if (this.hasScore) {
      const competitors = _.map(this.competition.competitors, (competitor) => {
        return {
          isHome: competitor.homeAway === 'home',
          primaryColor: competitor.team.color,
          secondaryColor: competitor.team.alternateColor,
          score: competitor.score,
          team: competitor.team.abbreviation
        };
      });

      return competitors;
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
    return _.maxBy(competitors, (competitor: { score: string }) => {
      return parseInt(competitor.score);
    });
  }

  getPrimaryColor(): string {
    const leadingCompetitor = this.getLeadingCompetitor();

    if (this.hasScore && leadingCompetitor) {
      return leadingCompetitor.primaryColor;
    }

    return '000';
  }

  getSecondaryColor(): string {
    const competitors = this.getCompetitors();
    const leadingCompetitor = _.maxBy(
      competitors,
      (competitor: { score: string }) => {
        return parseInt(competitor.score);
      }
    );

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
