import _ from 'lodash';
import axios, { AxiosError } from 'axios';
import ora from 'ora';
import Banner from '../banner';
import Game from '../game';
import Message from '../message';
import Team from '../team';

export function loadTeam(
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

export function loadGameScore(
  gameId: string,
  showData: boolean
): Promise<void> {
  const currentGamesUrl =
    'http://site.api.espn.com/apis/site/v2/sports/basketball/nba/scoreboard';

  return axios
    .get(currentGamesUrl, { headers: { Accept: 'application/json' } })
    .then((res) => {
      const scoreEvents = _.filter(res.data.events, (event) => {
        return event.id === gameId;
      });

      if (scoreEvents.length === 1) {
        const scoreGame = new Game(
          scoreEvents[0].competitions[0],
          scoreEvents[0].date,
          scoreEvents[0].id,
          scoreEvents[0].name
        );

        if (scoreGame.isCompleted()) {
          console.log('Last recent game:\n');
        } else {
          console.log('Current game:\n');
        }

        const currentGameBanner = new Banner(
          scoreGame.getFormattedMessage(),
          scoreGame.getPrimaryColor(),
          scoreGame.getSecondaryColor()
        );
        currentGameBanner.print();

        if (showData) {
          console.log('Print game data:\n');
          scoreGame.printJSONMessage();
        }
      }

      return;
    });
}

export function handleError(error: AxiosError) {
  if (error.response) {
    const errorDataMessage = new Message('ff0000', null, error.response.data);
    const errorStatusMessage = new Message(
      'ff0000',
      null,
      error.response.status.toString()
    );
    const errorHeadersMessage = new Message(
      'ff0000',
      null,
      JSON.stringify(error.response.headers)
    );

    errorDataMessage.print();
    errorStatusMessage.print();
    errorHeadersMessage.print();
  } else if (error.request) {
    const errorRequestMessage = new Message('ff0000', null, error.request);

    errorRequestMessage.print();
    console.log(error.request);
  } else {
    const errorMessage = new Message('ff0000', null, 'Error:' + error.request);

    errorMessage.print();
  }
}
