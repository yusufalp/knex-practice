require('dotenv').config();
const knex = require('knex');

const knexInstance = knex({
  client: 'pg',
  connection: process.env.DB_URL,
})

function searchByProductName(searchTerm) {
  knexInstance.from('amazong_products')
    .select('product_id', 'name', 'price', 'category')
    .where('name', 'ILIKE', `%${searchTerm}%`)
    .then(result => {
      console.log(result)
    })
}

function paginateProducts(page) {
  const productPerPage = 10;
  const offset = productPerPage * (page - 1);
  knexInstance
    .select('*')
    .from('amazong_products')
    .limit(productPerPage)
    .offset(offset)
    .then(result => {
      console.log(result)
    })
}

function getProductWithImages() {
  knexInstance
    .select('*')
    .from('amazong_products')
    .whereNotNull('image')
    .then(result => {
      console.log(result)
    })
}

function mostPopularVideosForDays(days) {
  knexInstance
    .select('video_name', ' reginon')
    .count('date_viewed AS views')
    .where(
      'date_viewed', '>', knexInstance.raw(`now() -'?? days'::INTERVAL`, days)
    )
    .from('whopipe_video_views')
    .groupBy('video_name', 'reginon')
    .orderBy([
      { column: 'reginon', order: 'ASC' },
      { column: 'views', order: 'DESC' }
    ])
    .then(result=>{
      console.log(result)
    })

}

mostPopularVideosForDays(30);
// getProductWithImages();
// paginateProducts(4);
// searchByProductName('holo');

console.log('knex and driver installed correctly');