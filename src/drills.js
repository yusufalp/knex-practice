require('dotenv').config();
const knex = require('knex');
const ShoppingListService = require('./shopping-list-service');

const knexInstance = knex({
  client: 'pg',
  connection: process.env.DB_URL,
})

//This is to connect ShoppingListService to the drills 
//First instance console.logs the shopping list from the shopping_list table
ShoppingListService.getShoppingList(knexInstance)
  .then(shoppingList => console.log(shoppingList))
  .then(() =>
    ShoppingListService.insertList(knexInstance, {
      name: 'New list item',
      price: 2.50,
      date_added: new Date(),
      checked: true,
      category: 'main'
    })
  )
  .then(newList => {
    console.log(newList)
    return ShoppingListService.updateList(knexInstance, newList.id,
      {
        name: "Updated name",
        price: 3.0,
        date_added: new Date(),
        checked: true,
        category: 'main'
      }
    ).then(() => ShoppingListService.getById(knexInstance, newList.id))
  })
  .then(list => {
    console.log(list)
    return ShoppingListService.deleteList(knexInstance, list.id)
  })








/*
This could be used if shoppingListService is not being used.

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
}
// totalCostForEach();
// itemsAddedWhen(5);
// paginateResults(6);
// itemsContain('bur');

// console.log('knex and driver installed correctly');

*/