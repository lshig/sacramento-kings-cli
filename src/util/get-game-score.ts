import _ from 'lodash';
import axios from 'axios';
import Banner from '../banner';
import Game from '../game';

export function getGameScore(gameId: string, showData: boolean): Promise<void> {
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
