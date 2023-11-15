#!/usr/bin/env node

import yargs from 'yargs';
import { getGameScore } from './util/get-game-score';
import { getTeam } from './util/get-team';
import { handleError } from './util/handle-error';
import { opponents } from './util/opponents';

const options = yargs
  .usage('Usage: sac [options]')
  .options({
    data: {
      alias: 'd',
      describe: 'Show JSON data',
      type: 'boolean'
    },
    game: {
      alias: 'g',
      describe: 'Show current, most recent, or upcoming game',
      type: 'boolean'
    },
    opponent: {
      alias: 'o',
      choices: opponents,
      describe: "Show opponent's standing and record",
      type: 'string'
    }
  })
  .parseSync();

getTeam('sac', false, true && !!options.game, !!options.data)
  .then((gameId?: string) => {
    if (gameId && options.game) {
      return getGameScore(gameId, !!options.data);
    }

    return;
  })
  .catch((error) => handleError(error))
  .then(() => {
    if (options.opponent) {
      const opponentName = options.opponent;
      getTeam(opponentName, true, false, !!options.data);
    }

    return;
  })
  .catch((error) => handleError(error));
