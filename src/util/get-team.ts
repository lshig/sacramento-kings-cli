import axios from 'axios';
import ora from 'ora';
import Banner from '../banner';
import Game from '../game';
import Team from '../team';

export function getTeam(
  name: string,
  isOpponent: boolean,
  showNextGame: boolean,
  showData: boolean
): Promise<string | undefined> {
  const loadingMessage = isOpponent ? 'Loading opponent...' : 'Loading team...';
  const teamSpinner = ora(loadingMessage).start();
  const teamUrl = `http://site.api.espn.com/apis/site/v2/sports/basketball/nba/teams/${name}`;

  return axios
    .get(teamUrl, { headers: { Accept: 'application/json' } })
    .then((res) => {
      if (res.data.length === 0) {
        console.log("No team information found :'(");
        return;
      } else {
        if (res.data.team) {
          const nbaTeam = new Team(
            res.data.team.abbreviation,
            res.data.team.displayName,
            res.data.team.nextEvent,
            res.data.team.color,
            res.data.team.alternateColor,
            res.data.team.record.items
          );
          const teamBanner = new Banner(
            nbaTeam.getFormattedMessage(),
            nbaTeam.getPrimaryColor(),
            nbaTeam.getSecondaryColor(),
            true
          );

          teamSpinner.stop();

          if (isOpponent) {
            console.log('Opponent team:');
          }

          teamBanner.print();

          if (showData) {
            console.log('Print team data:\n');
            nbaTeam.printJSONMessage();
          }

          if (showNextGame) {
            const nextEvents = res.data.team.nextEvent;
            if (nbaTeam.getHasNextEvent() && nextEvents.length === 1) {
              const nextGame = new Game(
                nextEvents[0].competitions[0],
                nextEvents[0].date,
                nextEvents[0].id,
                nextEvents[0].name
              );

              if (!nextGame.getHasScore()) {
                const nextGameBanner = new Banner(
                  nextGame.getFormattedMessage(),
                  nextGame.getPrimaryColor(),
                  nextGame.getSecondaryColor()
                );

                console.log('Next game:\n');
                nextGameBanner.print();

                if (showData) {
                  console.log('Print next game data:\n');
                  nextGame.printJSONMessage();
                }

                return;
              }

              return nextGame.getId();
            }

            return;
          }
        }
      }
    });
}
