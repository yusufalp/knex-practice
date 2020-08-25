const ShoppingListService = {
  getShoppingList(knex) {
    return knex.select('*').from('shopping_list');
  },
  insertList(knex, newList) {
    return knex
      .insert(newList)
      .into('shopping_list')
      .returning('*')
      .then(rows => {
        return rows[0]
      })
  },
  getById(knex, id) {
    return knex
      .from('shopping_list')
      .select('*')
      .where('id', id)
      .first()
  },
  deleteList(knex, id) {
    return knex('shopping_list')
      .where({ id })
      .delete()
  },
  updateList(knex, id, newList) {
    return knex('shopping_list')
      .where({ id })
      .update(newList)
  }
}

module.exports = ShoppingListService;