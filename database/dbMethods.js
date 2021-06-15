// const db = require('./index.js');

// module.exports = {
//   getMovieFromDB: (req, res) => {
//     const queryString = `SELECT * FROM movieTable`;
//     db.query(queryString, (err, data) => {
//       if (err) {
//         console.log('Could not query from database!');
//       }

//       res.send(data);
//     });
//   },

//   postMovieToDB: (req, res) => {
//     const queryString = `INSERT INTO movieTable(title) VALUES ('${req.body.title}')`;
//     db.query(queryString, (err, data) => {
//       if (err) {
//         console.log('Server could not post to database!');
//       } else {
//         res.sendStatus(200);
//       }
//     });
//   },
//   removeMovieFromDB: (req, res) => {
//     console.log(`Removing ${req.body.title}`);
//     // const queryString = `DELETE FROM movieTable WHERE title = VALUES(?)`;
//     // const queryArgs = [req.body.title];
//     const queryString = `DELETE FROM movieTable WHERE title = "${req.body.title}"`;
//     db.query(queryString, (err, data) => {
//       if (err) {
//         console.log('Could not remove from database!');
//       } else {
//         console.log('Removed movie from db!');
//       }
//     });
//   },

//   updateMovieFromDB: (req, res) => {
//     console.log();
//   }
// };
