require('dotenv').config();
const knex = require('knex');

const knexInstance = knex({
  client: 'pg',
  connection: process.env.DB_URL,
})

function itemsContain(searchTerm) {
  knexInstance
    .select('name')
    .from('shopping_list')
    .where('name', 'ILIKE', `%${searchTerm}%`)
    .then(result => {
      console.log(result)
    })
}

function paginateResults(pageNumber) {
  knexInstance
    .select('*')
    .from('shopping_list')
    .limit(pageNumber)
    .then(result => {
      console.log(result)
    })
}

function itemsAddedWhen(daysAgo) {
  knexInstance
    .select('*')
    .from('shopping_list')
    .where(
      'date_added', '>', knexInstance.raw(`now() -'?? days'::INTERVAL`, daysAgo)
    )
    .then(result => {
      console.log(result)
    })
}

function totalCostForEach() {
  knexInstance
    .select('category')
    .sum('price as total')
    .from('shopping_list')
    .groupBy('category')
    .then(result => {
      console.log(result)
    })

    // console.log(q1)
}
totalCostForEach();
// itemsAddedWhen(5);
// paginateResults(6);
// itemsContain('bur');

console.log('knex and driver installed correctly');