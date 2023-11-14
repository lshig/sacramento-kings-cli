import chalk from 'chalk';
import { get } from 'node-emoji';
import Game from '../src/game';

describe('Game', () => {
  describe('in the future', () => {
    const testGame = new Game(
      {
        boxscoreAvailable: false,
        competitors: [
          {
            homeAway: 'home',
            team: {
              abbreviation: 'BAR'
            }
          },
          {
            homeAway: 'away',
            team: {
              abbreviation: 'FOO'
            }
          }
        ],
        status: {
          type: {
            completed: false,
            detail: ''
          }
        }
      },
      '2021-02-13T00:00Z',
      '12345',
      'Footown Bars at Barville Foos'
    );

    it('formatDate', () => {
      const result = testGame.formatDate();

      expect(result).toEqual(chalk.hex('fff')('2/12/2021, 4:00:00 PM PT'));
    });

    it('formatJSONMessage', () => {
      const result = testGame.formatJSONMessage();

      expect(result).toEqual(
        chalk.hex('fff')(
          '{"date":"2021-02-13T00:00Z","hasScore":false,"id":"12345","name":"Footown Bars at Barville Foos","competitors":[{"isHome":true,"primaryColor":"000","secondaryColor":"fff","score":"0","team":"BAR"},{"isHome":false,"primaryColor":"000","secondaryColor":"fff","score":"0","team":"FOO"}],"status":""}'
        )
      );
    });

    it('formatName', () => {
      const result = testGame.formatName();

      expect(result).toEqual(
        chalk.bold.hex('fff')('Footown Bars at Barville Foos')
      );
    });

    it('formatScores', () => {
      const result = testGame.formatScores();

      expect(result).toEqual('No scores available');
    });

    it('formatStatus', () => {
      const result = testGame.formatStatus();

      expect(result).toEqual('No status available');
    });

    it('getCompetitors', () => {
      const result = testGame.getCompetitors();

      expect(result).toEqual([
        {
          isHome: true,
          primaryColor: '000',
          score: '0',
          secondaryColor: 'fff',
          team: 'BAR'
        },
        {
          isHome: false,
          primaryColor: '000',
          score: '0',
          secondaryColor: 'fff',
          team: 'FOO'
        }
      ]);
    });

    it('getFormattedMessage', () => {
      const result = testGame.getFormattedMessage();

      expect(result).toEqual(
        chalk.bold.hex('fff')('Footown Bars at Barville Foos') +
          '\n' +
          chalk.hex('fff')('2/12/2021, 4:00:00 PM PT')
      );
    });

    it('getHasScore', () => {
      const result = testGame.getHasScore();

      expect(result).toEqual(false);
    });

    it('getId', () => {
      const result = testGame.getId();

      expect(result).toEqual('12345');
    });

    it('getJSONMessage', () => {
      const result = testGame.getJSONMessage();

      expect(result).toEqual(
        '{"date":"2021-02-13T00:00Z","hasScore":false,"id":"12345","name":"Footown Bars at Barville Foos","competitors":[{"isHome":true,"primaryColor":"000","secondaryColor":"fff","score":"0","team":"BAR"},{"isHome":false,"primaryColor":"000","secondaryColor":"fff","score":"0","team":"FOO"}],"status":""}'
      );
    });

    it('getLeadingCompetitor', () => {
      const result = testGame.getLeadingCompetitor();

      expect(result).toEqual(null);
    });

    it('getPrimaryColor', () => {
      const result = testGame.getPrimaryColor();

      expect(result).toEqual('000');
    });

    it('getSecondaryColor', () => {
      const result = testGame.getSecondaryColor();

      expect(result).toEqual('fff');
    });

    it('getStatus', () => {
      const result = testGame.getStatus();

      expect(result).toEqual('');
    });

    it('isCompleted', () => {
      const result = testGame.isCompleted();

      expect(result).toEqual(false);
    });

    it('printJSONMessage', () => {
      console.log = jest.fn();
      testGame.printJSONMessage();
      expect(console.log).toHaveBeenCalledTimes(1);
    });
  });

  describe('currently', () => {
    const testGame = new Game(
      {
        competitors: [
          {
            homeAway: 'home',
            score: '100',
            team: {
              abbreviation: 'BAR',
              color: 'f00000',
              alternateColor: 'f00001'
            }
          },
          {
            homeAway: 'away',
            score: '10',
            team: {
              abbreviation: 'FOO',
              color: 'f00003',
              alternateColor: 'f00004'
            }
          }
        ],
        status: {
          type: {
            completed: false,
            detail: '00:45 - Q4'
          }
        }
      },
      '2021-02-14T00:00Z',
      '12345',
      'Footown Bars at Barville Foos'
    );

    it('formatDate', () => {
      const result = testGame.formatDate();

      expect(result).toEqual(chalk.hex('fff')('2/13/2021, 4:00:00 PM PT'));
    });

    it('formatJSONMessage', () => {
      const result = testGame.formatJSONMessage();

      expect(result).toEqual(
        chalk.hex('fff')(
          '{"date":"2021-02-14T00:00Z","hasScore":true,"id":"12345","name":"Footown Bars at Barville Foos","competitors":[{"isHome":true,"primaryColor":"f00000","secondaryColor":"f00001","score":"100","team":"BAR"},{"isHome":false,"primaryColor":"f00003","secondaryColor":"f00004","score":"10","team":"FOO"}],"status":"00:45 - Q4"}'
        )
      );
    });

    it('formatName', () => {
      const result = testGame.formatName();

      expect(result).toEqual(
        chalk.bold.hex('fff')('Footown Bars at Barville Foos')
      );
    });

    it('formatScores', () => {
      const result = testGame.formatScores();

      expect(result).toEqual(chalk.hex('fff')('\nBAR: 100\nFOO: 10'));
    });

    it('formatStatus', () => {
      const result = testGame.formatStatus();

      expect(result).toEqual(
        chalk.bold.hex('fff')('00:45 - Q4 ' + get('hourglass_flowing_sand'))
      );
    });

    it('getCompetitors', () => {
      const result = testGame.getCompetitors();

      expect(result).toEqual([
        {
          isHome: true,
          primaryColor: 'f00000',
          secondaryColor: 'f00001',
          score: '100',
          team: 'BAR'
        },
        {
          isHome: false,
          primaryColor: 'f00003',
          secondaryColor: 'f00004',
          score: '10',
          team: 'FOO'
        }
      ]);
    });

    it('getFormattedMessage', () => {
      const result = testGame.getFormattedMessage();

      expect(result).toEqual(
        chalk.bold.hex('fff')('Footown Bars at Barville Foos') +
          '\n' +
          chalk.hex('fff')('2/13/2021, 4:00:00 PM PT') +
          '\n\n' +
          chalk.bold.hex('fff')('00:45 - Q4 ' + get('hourglass_flowing_sand')) +
          '\n' +
          chalk.hex('fff')('\nBAR: 100\nFOO: 10')
      );
    });

    it('getHasScore', () => {
      const result = testGame.getHasScore();

      expect(result).toEqual(true);
    });

    it('getId', () => {
      const result = testGame.getId();

      expect(result).toEqual('12345');
    });

    it('getJSONMessage', () => {
      const result = testGame.getJSONMessage();

      expect(result).toEqual(
        '{"date":"2021-02-14T00:00Z","hasScore":true,"id":"12345","name":"Footown Bars at Barville Foos","competitors":[{"isHome":true,"primaryColor":"f00000","secondaryColor":"f00001","score":"100","team":"BAR"},{"isHome":false,"primaryColor":"f00003","secondaryColor":"f00004","score":"10","team":"FOO"}],"status":"00:45 - Q4"}'
      );
    });

    it('getLeadingCompetitor', () => {
      const result = testGame.getLeadingCompetitor();

      expect(result).toEqual({
        isHome: true,
        primaryColor: 'f00000',
        score: '100',
        secondaryColor: 'f00001',
        team: 'BAR'
      });
    });

    it('getPrimaryColor', () => {
      const result = testGame.getPrimaryColor();

      expect(result).toEqual('f00000');
    });

    it('getSecondaryColor', () => {
      const result = testGame.getSecondaryColor();

      expect(result).toEqual('f00001');
    });

    it('getStatus', () => {
      const result = testGame.getStatus();

      expect(result).toEqual('00:45 - Q4');
    });

    it('isCompleted', () => {
      const result = testGame.isCompleted();

      expect(result).toEqual(false);
    });

    it('printJSONMessage', () => {
      console.log = jest.fn();
      testGame.printJSONMessage();
      expect(console.log).toHaveBeenCalledTimes(1);
    });
  });

  describe('completed recently', () => {
    const testGame = new Game(
      {
        competitors: [
          {
            homeAway: 'home',
            score: '150',
            team: {
              abbreviation: 'BAR',
              color: 'f00000',
              alternateColor: 'f00001'
            }
          },
          {
            homeAway: 'away',
            score: '50',
            team: {
              abbreviation: 'FOO',
              color: 'f00003',
              alternateColor: 'f00004'
            }
          }
        ],
        status: {
          type: {
            completed: true,
            detail: 'Final'
          }
        }
      },
      '2021-02-14T00:00Z',
      '12345',
      'Footown Bars at Barville Foos'
    );

    it('formatDate', () => {
      const result = testGame.formatDate();

      expect(result).toEqual(chalk.hex('fff')('2/13/2021, 4:00:00 PM PT'));
    });

    it('formatJSONMessage', () => {
      const result = testGame.formatJSONMessage();

      expect(result).toEqual(
        chalk.hex('fff')(
          '{"date":"2021-02-14T00:00Z","hasScore":true,"id":"12345","name":"Footown Bars at Barville Foos","competitors":[{"isHome":true,"primaryColor":"f00000","secondaryColor":"f00001","score":"150","team":"BAR"},{"isHome":false,"primaryColor":"f00003","secondaryColor":"f00004","score":"50","team":"FOO"}],"status":"Final"}'
        )
      );
    });

    it('formatName', () => {
      const result = testGame.formatName();

      expect(result).toEqual(
        chalk.bold.hex('fff')('Footown Bars at Barville Foos')
      );
    });

    it('formatScores', () => {
      const result = testGame.formatScores();

      expect(result).toEqual(chalk.hex('fff')('\nBAR: 150\nFOO: 50'));
    });

    it('formatStatus', () => {
      const result = testGame.formatStatus();

      expect(result).toEqual(
        chalk.bold.hex('fff')('Final ' + get('basketball'))
      );
    });

    it('getCompetitors', () => {
      const result = testGame.getCompetitors();

      expect(result).toEqual([
        {
          isHome: true,
          primaryColor: 'f00000',
          secondaryColor: 'f00001',
          score: '150',
          team: 'BAR'
        },
        {
          isHome: false,
          primaryColor: 'f00003',
          secondaryColor: 'f00004',
          score: '50',
          team: 'FOO'
        }
      ]);
    });

    it('getFormattedMessage', () => {
      const result = testGame.getFormattedMessage();

      expect(result).toEqual(
        chalk.bold.hex('fff')('Footown Bars at Barville Foos') +
          '\n' +
          chalk.hex('fff')('2/13/2021, 4:00:00 PM PT') +
          '\n\n' +
          chalk.bold.hex('fff')('Final ' + get('basketball')) +
          '\n' +
          chalk.hex('fff')('\nBAR: 150\nFOO: 50')
      );
    });

    it('getHasScore', () => {
      const result = testGame.getHasScore();

      expect(result).toEqual(true);
    });

    it('getId', () => {
      const result = testGame.getId();

      expect(result).toEqual('12345');
    });

    it('getJSONMessage', () => {
      const result = testGame.getJSONMessage();

      expect(result).toEqual(
        '{"date":"2021-02-14T00:00Z","hasScore":true,"id":"12345","name":"Footown Bars at Barville Foos","competitors":[{"isHome":true,"primaryColor":"f00000","secondaryColor":"f00001","score":"150","team":"BAR"},{"isHome":false,"primaryColor":"f00003","secondaryColor":"f00004","score":"50","team":"FOO"}],"status":"Final"}'
      );
    });

    it('getLeadingCompetitor', () => {
      const result = testGame.getLeadingCompetitor();

      expect(result).toEqual({
        isHome: true,
        primaryColor: 'f00000',
        score: '150',
        secondaryColor: 'f00001',
        team: 'BAR'
      });
    });

    it('getPrimaryColor', () => {
      const result = testGame.getPrimaryColor();

      expect(result).toEqual('f00000');
    });

    it('getSecondaryColor', () => {
      const result = testGame.getSecondaryColor();

      expect(result).toEqual('f00001');
    });

    it('getStatus', () => {
      const result = testGame.getStatus();

      expect(result).toEqual('Final');
    });

    it('isCompleted', () => {
      const result = testGame.isCompleted();

      expect(result).toEqual(true);
    });

    it('printJSONMessage', () => {
      console.log = jest.fn();
      testGame.printJSONMessage();
      expect(console.log).toHaveBeenCalledTimes(1);
    });
  });
});
