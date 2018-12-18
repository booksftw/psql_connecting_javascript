const settings = require("./settings"); // settings.json

var knex = require('knex')({
    client: 'pg',
    connection: {
      host : settings.hostname,
      user : settings.user,
      password : settings.password,
      database : settings.database
    }
  });

const userFirstNameInput = process.argv[2];
const userLastNameInput  = process.argv[3];
const userFamousBday     = '1992-11-26';

function createNewPerson(firstName, lastName, birthdate) {
    console.log(firstName, lastName, birthdate, '<<<')
    knex
    .insert(
    [
        { first_name: firstName, last_name: lastName, birthdate: birthdate },
    ])
    .into('famous_people')
    .asCallback(function(err, rows){
        if (err) return console.error(err);
    })
    .finally(function() {
        knex.destroy();
    });
}

createNewPerson(userFirstNameInput, userLastNameInput, userFamousBday);

