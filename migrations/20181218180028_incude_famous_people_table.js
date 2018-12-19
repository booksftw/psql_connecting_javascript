
exports.up = function(knex, Promise) {
    //return table.foreign('famous_person_id').references('milestones.id')
    return knex.schema.table('milestones', (table) => {
        table.integer('famous_person_id')
        table.foreign('famous_person_id').references('famous_people.id')
    })
};

exports.down = function(knex, Promise) {
    // return table.dropColumn('famous_person_id');
};