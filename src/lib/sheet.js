import config from '../config';

export default {
  auth: (immediate, callback) => {
    window.gapi.auth.authorize({
      'client_id': config.clientId,
      'scope': config.scope,
      'immediate': immediate
    }, callback);
  },

  mapToIssues: (rows) => {
    return rows.map((row, i) => {
      let rowId = i + 3,
          index = i + 1,
          repeatable = row[0],
          title = row[1],
          raffle = parseInt(row[2], 10) || 0,
          complexity = parseInt(row[3], 10) || 0,
          requestor = row[4],
          approver = row[5],
          owner = row[6],
          comments = (row[7] && row[7].split('\n')) || [],
          links = (row[8] && row[8].split('\n')) || [],
          peopleWithInterest = (row[9] && row[9].split('\n')) || [],
          wips = row.slice(10, 12).filter(e => e.length),
          likes = parseInt(row[14], 10) || 1;

        return {
          rowId,
          index,
          repeatable,
          title,
          raffle,
          complexity,
          requestor,
          approver,
          owner,
          comments,
          links,
          peopleWithInterest,
          wips,
          likes
        }
    })
  },

  loadSheet: (callback) => {
    window.gapi.client.load('sheets', 'v4', () => {
      window.gapi.client.sheets.spreadsheets.values.get({
        spreadsheetId: config.spreadsheetId,
        range: 'Ideas!A3:Z'
      }).then((response) => {
        const rows = response.result.values || [];

        // console.log("this", this.a)
        // TODO: check if this `this.a` is officially supported
        const issues = this.a.mapToIssues(rows).filter(e => e.title && e.title.length)
        callback({issues})
      }, (response) => {callback(false, response.result.error)});
    })
  },

  // write an array of values to a range
  updateSheet: (range, values, success, error) => {
    window.gapi.client.sheets.spreadsheets.values.update({
      spreadsheetId: config.spreadsheetId,
      range: range,
      valueInputOption: 'USER_ENTERED',
      values: values
      }
    ).then(success, error);
  }
}
