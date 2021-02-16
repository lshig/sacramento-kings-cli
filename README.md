# sacramento-kings-cli

CLI for Sacramento Kings updates :basketball:

## Development

- Develop locally with [TypeScript](https://www.typescriptlang.org/) in Node

```node
npm run dev -- --help
npm run dev
npm run dev -- -d
npm run dev -- -g
npm run dev -- -o gs
npm run dev -- -d -g -o gs
```

- Run `npm run format` to format and write `*.js`, `*.ts`, and `*.md` files with [Prettier](https://prettier.io/)
- Run `npm run lint` to determine if there are simple errors according to [ESLint](https://eslint.org/) and [Remark](https://github.com/remarkjs/remark-lint)
- Compile and build to `dist/` with `npm run build`
- Install or update CLI globally with `npm i -g .` and check installation `npm ls -g --depth=0`
- `sac` CLI will be available to pass options like so:

```
sac --help
sac
sac -d
sac -g
sac -o gs
sac -d -g -o gs
```

## Examples

- Show CLI options

```node
> sac --help

Usage: sac [options]

Options:
      --help      Show help                                            [boolean]
      --version   Show version number                                  [boolean]
  -d, --data      Show JSON data                                       [boolean]
  -g, --game      Show current, most recent, or upcoming game          [boolean]
  -o, --opponent  Show opponent's standing and record
      [string] [choices: "atl", "bkn", "bos", "cha", "chi", "cle", "dal", "den",
      "det", "gs", "hou", "ind", "lac", "lal", "mem", "mia", "mil", "min", "no",
           "nyk", "okc", "orl", "phi", "phx", "por", "sa", "tor", "utah", "wsh"]
```

- Show team (by default)

```node
> sac

 ┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
 ┃                            ┃
 ┃   Sacramento Kings (SAC)   ┃
 ┃     #1 in conference       ┃
 ┃        72-0 record         ┃
 ┃                            ┃
 ┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛

```

- Show stringified JSON data for team

```
> sac -d

 ┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
 ┃                            ┃
 ┃   Sacramento Kings (SAC)   ┃
 ┃     #1 in conference       ┃
 ┃        72-0 record         ┃
 ┃                            ┃
 ┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛

Print team data:
{"abbreviation":"SAC","displayName":"Sacramento Kings","hasNextEvent":true,"record":"72-0","standing":1}
```

- Show current, most recent, or upcoming game

```
> sac -g

 ┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
 ┃                            ┃
 ┃   Sacramento Kings (SAC)   ┃
 ┃     #1 in conference       ┃
 ┃        72-0 record         ┃
 ┃                            ┃
 ┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛

Last recent game:
 ┌──────────────────────────────────────────────┐
 │                                              │
 │    Los Angeles Lakers at Sacramento Kings    │
 │            5/30/2002, 6:00:00 PM             │
 │                                              │
 │                   Final 🏀                   │
 │                                              │
 │                   SAC: 102                   │
 │                   LAL: 96                    │
 │                                              │
 └──────────────────────────────────────────────┘

```

## FYI

This project is intended for personal use only. Go Kings! :purple_heart: :crown: :lion:
