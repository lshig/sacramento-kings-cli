#!/usr/bin/env node

import yargs from 'yargs';
import { loadTeam, loadGameScore } from './util/requests';
import { validOpponentIds } from './data/opponentIds';

const options = yargs.usage('Usage: sac [options]').options({
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
    choices: validOpponentIds,
    describe: "Show opponent's standing and record",
    type: 'string'
  }
}).argv;

loadTeam('sac', false, true && !!options.game, !!options.data)
  .then((gameId?: string) => {
    if (gameId && options.game) {
      return loadGameScore(gameId, !!options.game);
    }

    return;
  })
  .then(() => {
    if (options.opponent) {
      const opponentName = options.opponent;
      loadTeam(opponentName, true, false, !!options.data);
    }

    return;
  });
