# Engineering Santa Raffle

To make the Raffle contest a little more fun, we build an app that randomly suggests an issue for folks to work on. In addition, you can 👍 as many issues as you like to provide a little encouragement.

After this contest ends, not only will the lucky winners be happy, but we all will be satisfied with a useful backlog.

![](https://cl.ly/3O1h2b2X263f/download/Screen%20Shot%202017-12-27%20at%201.28.47%20PM.png)

## Getting Started

First you need the data source which is a spreadsheet with the columns in the same order (until we refactor into `src/sheet.js` to be more generic). Our spreadsheet looks like this

![](https://cl.ly/0a183z2D010o/download/Screen%20Shot%202017-12-27%20at%208.57.49%20PM.png)

Next, we'll set up the code to read and present that data.

### Prerequisites

This is a pretty basic react app bootstrapped from `create-react-app`. You just need npm or yarn (or parcel if you fancy).

```
git clone harley/santa-raffle
cd santa-raffle
yarn install
```

### Setup

#### Most Likely
Just ask me for the `src/config.js` file if we're working on the same sheet (we're likely are!)

#### Roll your own

We use Google Spreadsheet API, so you need to set up a project on Google APIs and fill in the `clientId` as well as `spreadsheetId`.

```
cp src/config.{,example.}js
```

ClientId is taken from https://console.developers.google.com/apis/credentials. Set up a project there and make sure to whitelist http://localhost:3000 (and other deployed domains later).

![](https://cl.ly/0b1V2K450D24/download/Screen%20Shot%202017-12-27%20at%201.25.24%20PM.png)

### Running

```
yarn start
```

and it should automatically launch http://localhost:3000

## Deploying

NOTE: don't think you need to deploy. Just make pull requests and I'll deploy for you. This project is deployed to raffle.tinyserver.info (surge knows that based on the gitignored CNAME file).

But if you want suggestions to roll your own, you can deploy the build folder to github page or surge or `serve` it yourself.

```
yarn build
surge
# then make sure you point the santa-raffle/build path, not /santa-raffle path
```

## Contributing

Ideas? Look at the TODO section.

No special requirements. Either ask me to add as contributors or fork and make PRs.

## TODO

- [x] Add Sorting: by likes count, by complexity. Default ordering should probably be by Likes.
- [ ] Display if an issue has been solved or being solved
- [ ] Display link to solutions (WIP columns)
- [ ] Display Complexity better
- [ ] Display Interested names. Even better: allow adding oneself to interested? Note: we don't have user id in the current OAuth scope.
- [ ] Add TODO to this TODO

## License

This project is licensed under the MIT License - see the LICENSE.md file for details