/*
 * Write a function WITH NO CALLBACKS that,
 * (1) reads a GitHub username from a `readFilePath`
 *     (the username will be the first line of the file)
 * (2) then, sends a request to the GitHub API for the user's profile
 * (3) then, writes the JSON response of the API to `writeFilePath`
 *
 * HINT: We exported some similar promise-returning functions in previous exercises
 */

var Promise = require('bluebird');
var fs = Promise.promisifyAll(require('fs'));
var getGithub = require('./promisification.js');


var fetchProfileAndWriteToFile = function(readFilePath, writeFilePath) {
  // TODO

  return fs.readFileAsync(readFilePath, 'utf-8')
    .then((data) => {
      return data.split('\n').shift();
    })
    .then( (oneLine) => {
      return getGithub.getGitHubProfileAsync(oneLine)
    })
    .then( (user) => {
      console.log('STRING ME FAM', JSON.stringify(user))
      return fs.writeFileAsync(writeFilePath, JSON.stringify(user))
    })
    .catch( (err) => {
      console.log('THIS DID NOT WORK!')
    })
};

// Export these functions so we can test them
module.exports = {
  fetchProfileAndWriteToFile: fetchProfileAndWriteToFile
};


//  return new Promise(function(resolve, reject) {
//     fs.readFile(filePath, 'utf-8', (err, data) => {
//       if (data) {
//         resolve(data.split('\n')[0]);
//       } else {
//         reject(err);
//       }
//     });
//   });
