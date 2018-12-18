const pg = require("pg");
const settings = require("./settings"); // settings.json

const userSearchInput = process.argv[2];

const client = new pg.Client({
  user     : settings.user,
  password : settings.password,
  database : settings.database,
  host     : settings.hostname,
  port     : settings.port,
  ssl      : settings.ssl
});

client.connect((err) => {
  if (err) {
    return console.error("Connection Error", err);
  }

  client.query("SELECT * FROM famous_people", (err, result) => {
    if (err) {
      return console.error("error running query", err);
    }
    const dbResults = result.rows;
    let foundCount = 0;
    
    const nameMatch = dbResults.filter( (k) => {
        return k.first_name == userSearchInput;
    } );
    foundCount = nameMatch.length;
    

    function logMessage(foundCount, userSearchInput, nameMatchObj){
        console.log('Searching ...')
        console.log(`Found ${foundCount} person(s) by the name '${userSearchInput}'`);
        nameMatchObj.forEach( (el,i) => {
            console.log(`- ${i}: ${el.first_name} ${el.last_name}, born '${el.birthdate}'`)// ${FILL ME OUT} birthdate
        })
    }

    logMessage(foundCount, userSearchInput, nameMatch)

    client.end();
  });
});





    // console.log(result.rows[0].number); //output: 1
//   client.query("SELECT $1::int AS number", ["3"], (err, result) => {
//     if (err) {
//       return console.error("error running query", err);
//     }