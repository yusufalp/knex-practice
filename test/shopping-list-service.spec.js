const ShoppingListService = require('../src/shopping-list-service');
const knex = require('knex');

describe('Shopping List service', () => {
  let db
  let testLists = [
    {
      id: 1,
      name: 'Fish tricks',
      price: '13.10',
      date_added: new Date('2020-08-02T22:59:48.635Z'),
      checked: false,
      category: 'Main'
    },
    {
      id: 3,
      name: 'Bluffalo Wings',
      price: '5.50',
      date_added: new Date('2020-08-02T22:59:48.635Z'),
      checked: false,
      category: 'Snack'
    },
    {
      id: 4,
      name: 'SubstiTuna Salad',
      price: '1.24',
      date_added: new Date('2020-08-02T22:59:48.635Z'),
      checked: false,
      category: 'Lunch'
    },
    {
      id: 5,
      name: 'Tofurkey',
      price: '2.50',
      date_added: new Date('2020-08-02T22:59:48.635Z'),
      checked: false,
      category: 'Breakfast'
    },
    {
      id: 6,
      name: 'Pretenderloins',
      price: '9.99',
      date_added: new Date('2020-08-14T22:59:48.635Z'),
      checked: false,
      category: 'Main'
    },
    {
      id: 7,
      name: 'Steak-believe',
      price: '6.00',
      date_added: new Date('2020-08-14T22:59:48.635Z'),
      checked: false,
      category: 'Main'
    },
    {
      id: 8,
      name: 'Kale Seitan',
      price: '6.67',
      date_added: new Date('2020-08-14T22:59:48.635Z'),
      checked: false,
      category: 'Breakfast'
    },
    {
      id: 9,
      name: 'NoBull Burger',
      price: '2.00',
      date_added: new Date('2020-08-14T22:59:48.635Z'),
      checked: false,
      category: 'Snack'
    },
    {
      id: 10,
      name: 'Turnip the Beet',
      price: '0.20',
      date_added: new Date('2020-08-14T22:59:48.635Z'),
      checked: true,
      category: 'Lunch'
    },
    {
      id: 11,
      name: 'Mascarphony',
      price: '1.80',
      date_added: new Date('2020-08-16T22:59:48.635Z'),
      checked: true,
      category: 'Lunch'
    },
    {
      id: 12,
      name: 'Burgatory',
      price: '1.50',
      date_added: new Date('2020-08-16T22:59:48.635Z'),
      checked: false,
      category: 'Main'
    },
    {
      id: 13,
      name: 'Sleight of Ham',
      price: '3.10',
      date_added: new Date('2020-08-18T22:59:48.635Z'),
      checked: false,
      category: 'Lunch'
    },
    {
      id: 14,
      name: 'Antichovies',
      price: '1.00',
      date_added: new Date('2020-08-18T22:59:48.635Z'),
      checked: false,
      category: 'Breakfast'
    },
    {
      id: 15,
      name: 'Lettuce B. Frank',
      price: '0.86',
      date_added: new Date('2020-08-18T22:59:48.635Z'),
      checked: true,
      category: 'Lunch'
    },
    {
      id: 16,
      name: 'Pepperphony',
      price: '1.40',
      date_added: new Date('2020-08-18T22:59:48.635Z'),
      checked: false,
      category: 'Breakfast'
    },
    {
      id: 17,
      name: 'Shamburger',
      price: '3.50',
      date_added: new Date('2020-08-19T22:59:48.635Z'),
      checked: false,
      category: 'Main'
    },
    {
      id: 18,
      name: 'Facon',
      price: '1.90',
      date_added: new Date('2020-08-19T22:59:48.635Z'),
      checked: false,
      category: 'Breakfast'
    },
    {
      id: 19,
      name: 'Salami-get-this-straight',
      price: '3.00',
      date_added: new Date('2020-08-19T22:59:48.635Z'),
      checked: false,
      category: 'Snack'
    },
    {
      id: 20,
      name: 'Mi-steak',
      price: '7.67',
      date_added: new Date('2020-08-20T22:59:48.635Z'),
      checked: false,
      category: 'Main'
    },
    {
      id: 21,
      name: 'Ghost Beef',
      price: '4.33',
      date_added: new Date('2020-08-20T22:59:48.635Z'),
      checked: false,
      category: 'Main'
    },
    {
      id: 22,
      name: 'Cheatloaf',
      price: '5.00',
      date_added: new Date('2020-08-20T22:59:48.635Z'),
      checked: false,
      category: 'Main'
    },
    {
      id: 23,
      name: 'Fried Trickin',
      price: '6.40',
      date_added: new Date('2020-08-20T22:59:48.635Z'),
      checked: false,
      category: 'Snack'
    },
    {
      id: 24,
      name: 'Salmock',
      price: '7.16',
      date_added: new Date('2020-08-20T22:59:48.635Z'),
      checked: false,
      category: 'Breakfast'
    },
    {
      id: 25,
      name: 'Leaf Stroganoff',
      price: '6.80',
      date_added: new Date('2020-08-21T22:59:48.635Z'),
      checked: false,
      category: 'Main'
    },
    {
      id: 26,
      name: 'Chicken Noodle Spoof',
      price: '2.50',
      date_added: new Date('2020-08-21T22:59:48.635Z'),
      checked: false,
      category: 'Lunch'
    },
    {
      id: 27,
      name: 'Pep-parody Pizza',
      price: '4.00',
      date_added: new Date('2020-08-21T22:59:48.635Z'),
      checked: false,
      category: 'Lunch'
    },
    {
      id: 28,
      name: 'Arti-fish-al pie',
      price: '8.40',
      date_added: new Date('2020-08-22T22:59:48.635Z'),
      checked: false,
      category: 'Main'
    },
    {
      id: 29,
      name: 'Bolphony sandwiches',
      price: '2.10',
      date_added: new Date('2020-08-23T22:59:48.635Z'),
      checked: false,
      category: 'Lunch'
    },
    {
      id: 30,
      name: 'Chili non-carne',
      price: '5.88',
      date_added: new Date('2020-08-23T22:59:48.635Z'),
      checked: true,
      category: 'Main'
    },
    {
      id: 31,
      name: "Don't go bacon my heart",
      price: '4.20',
      date_added: new Date('2020-08-23T22:59:48.635Z'),
      checked: false,
      category: 'Main'
    }
  ]

  before(() => {
    db = knex({
      client: 'pg',
      connection: process.env.TEST_DB_URL
    })
  })

  before(() => db('shopping_list').truncate())

  afterEach(() => db('shopping_list').truncate())

  after(() => db.destroy())

  context(`Given 'shopping_list' has data`, () => {
    beforeEach(() => {
      return db
        .into('shopping_list')
        .insert(testLists)
    })
    it(`getShoppingList() resolves all lists from 'shopping_list' table`, () => {
      return ShoppingListService.getShoppingList(db)
        .then(actual => {
          expect(actual).to.eql(testLists)
        })
    })
    it(`getById() resolve a list by id from 'shopping_list' table`, () => {
      const secondId = 4
      const secondTestList = testLists[secondId - 2]
      return ShoppingListService.getById(db, secondId)
        .then(actual => {
          expect(actual).to.eql({
            id: secondId,
            name: secondTestList.name,
            price: secondTestList.price,
            date_added: secondTestList.date_added,
            checked: secondTestList.checked,
            category: secondTestList.category
          })
        })
    })
    it(`deleteList() removes a list by id from 'shopping_list' table`, () => {
      const listId = 4
      return ShoppingListService.deleteList(db, listId)
        .then(() => ShoppingListService.getShoppingList(db))
        .then(allList => {
          const expected = testLists.filter(list => list.id !== listId)
          expect(allList).to.eql(expected)
        })
    })
    it(`updateList() updates a list by id from 'shopping_list' table`, () => {
      const idOfListToUpdate = 4
      const newList = {
        name: "Updated name",
        price: 3.0,
        date_added: new Date(),
        checked: true,
        category: 'main'
      }
      return ShoppingListService.updateList(db, idOfListToUpdate, newList)
        .then(() => ShoppingListService.getById(db, idOfListToUpdate))
        .then(list => {
          expect(list).to.eql({
            id: idOfListToUpdate,
            ...newList
          })
        })
    })
  })

  context(`Given 'shopping_list' has no data`, () => {
    it(`getShoppingList() resolves an empty array`, () => {
      return ShoppingListService.getShoppingList(db)
        .then(actual => {
          expect(actual).to.eql([])
        })
    })
    it(`insertList() inserts a new list and resolves the list with an id`, () => {
      const newList = {
        name: 'Test new name',
        price: 3.0,
        date_added: new Date(),
        checked: true,
        category: 'main'
      }
      return ShoppingListService.insertList(db, newList)
        .then(actual => {
          expect(actual).to.eql({
            name: 'Test new name',
            price: 3.0,
            date_added: newList.date_added,
            checked: true,
            category: 'main'
          })
        })
    })
  })
})