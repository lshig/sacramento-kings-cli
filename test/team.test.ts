import chalk from 'chalk';
import Team from '../src/team';

describe('Team', () => {
  describe('with next event', () => {
    const testTeam = new Team(
      'FOO',
      'Footown Bars',
      [
        {
          date: '2021-02-13T03:00Z',
          id: '12345',
          name: 'Footown Bars at Barville Foos',
          competitions: [
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
              date: '2021-02-13T03:00Z',
              id: '12345',
              status: {
                type: {
                  completed: false,
                  detail: 'Coming soon'
                }
              }
            }
          ]
        }
      ],
      'f00001',
      'f00002',
      [
        {
          summary: '70-2',
          stats: [{ name: 'playoffSeed', value: 2.0 }],
          type: 'total'
        }
      ]
    );

    it('formatJSONMessage', () => {
      const result = testTeam.formatJSONMessage();
      expect(result).toEqual(
        chalk.hex('fff')(
          '{"abbreviation":"FOO","displayName":"Footown Bars","hasNextEvent":true,"record":"70-2","standing":2}'
        )
      );
    });

    it('formatName', () => {
      const result = testTeam.formatName();
      expect(result).toEqual(
        chalk.bold.hex('fff')('Footown Bars') + ' ' + chalk.hex('fff')('(FOO)')
      );
    });

    it('formatRecord', () => {
      const result = testTeam.formatRecord();
      expect(result).toEqual(chalk.hex('fff')('70-2 record'));
    });

    it('formatStanding', () => {
      const result = testTeam.formatStanding();
      expect(result).toEqual(chalk.hex('fff')('#2 in conference'));
    });

    it('getPrimaryColor', () => {
      const result = testTeam.getPrimaryColor();
      expect(result).toEqual('f00001');
    });

    it('getSecondaryColor', () => {
      const result = testTeam.getSecondaryColor();
      expect(result).toEqual('f00002');
    });

    it('getHasNextEvent', () => {
      const result = testTeam.getHasNextEvent();
      expect(result).toEqual(true);
    });

    it('getJSONMessage', () => {
      const result = testTeam.getJSONMessage();
      expect(result).toEqual(
        '{"abbreviation":"FOO","displayName":"Footown Bars","hasNextEvent":true,"record":"70-2","standing":2}'
      );
    });

    it('printJSONMessage', () => {
      console.log = jest.fn();
      testTeam.printJSONMessage();
      expect(console.log).toHaveBeenCalledTimes(1);
    });
  });
});
