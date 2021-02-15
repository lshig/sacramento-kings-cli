#!/usr/bin/env node

import _ from 'lodash';
import axios from 'axios';
import ora from 'ora';
import yargs from 'yargs';
import Banner from './banner';
import Game from './game';
import Team from './team';
import { validOpponentIds } from './data/opponentIds';

const options = yargs.usage('Usage: kings [options]').options({
  data: {
    alias: 'd',
    describe: 'Show raw JSON data',
    type: 'boolean'
  },
  game: {
    alias: 'g',
    describe: 'Show most recent game or next upcoming game',
    type: 'boolean'
  },
  opponent: {
    alias: 'o',
    choices: validOpponentIds,
    describe: "Show opponent's standing and record",
    type: 'string'
  }
}).argv;
const teamSpinner = ora('Loading...').start();
const standingUrl =
  'http://site.api.espn.com/apis/site/v2/sports/basketball/nba/teams/sac';

axios
  .get(standingUrl, { headers: { Accept: 'application/json' } })
  .then((res) => {
    if (res.data.length === 0) {
      console.log("No team information found :'(");
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
        teamBanner.print();

        if (options.data) {
          console.log('Print team data:');
          nbaTeam.printJSONMessage();
        }

        if (options.game) {
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

              console.log('Next game: ');
              nextGameBanner.print();

              if (options.data) {
                console.log('Print next game data:');
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
  })
  .then((gameId?: string) => {
    if (gameId && options.game) {
      const currentGamesUrl =
        'http://site.api.espn.com/apis/site/v2/sports/basketball/nba/scoreboard';
      axios
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
              console.log('Last recent game:');
            } else {
              console.log('Current game:');
            }

            const currentGameBanner = new Banner(
              scoreGame.getFormattedMessage(),
              scoreGame.getPrimaryColor(),
              scoreGame.getSecondaryColor()
            );
            currentGameBanner.print();

            if (options.data) {
              console.log('Print game data:');
              scoreGame.printJSONMessage();
            }
          }

          return;
        });
    }

    return;
  })
  .then(() => {
    if (options.opponent) {
      const opponentName = options.opponent;
      const opponentSpinner = ora('Loading opponent...').start();
      const opponentUrl = `http://site.api.espn.com/apis/site/v2/sports/basketball/nba/teams/${opponentName}`;

      axios
        .get(opponentUrl, { headers: { Accept: 'application/json' } })
        .then((res) => {
          const nbaOpponent = new Team(
            res.data.team.abbreviation,
            res.data.team.displayName,
            res.data.team.nextEvent,
            res.data.team.color,
            res.data.team.alternateColor,
            res.data.team.record.items
          );
          const teamBanner = new Banner(
            nbaOpponent.getFormattedMessage(),
            nbaOpponent.getPrimaryColor(),
            nbaOpponent.getSecondaryColor()
          );

          opponentSpinner.stop();

          console.log('Opponent:');
          teamBanner.print();

          if (options.data) {
            console.log('Print opponent data:');
            nbaOpponent.printJSONMessage();
          }

          return;
        });
    }

    return;
  });
