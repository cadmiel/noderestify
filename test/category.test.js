
const test = require('ava');
//require('dotenv').config();

const db  = require('./../service/mysql')

test('Lista de categorias', async t => {
	await create()
	const list = await categories.all()
	t.is(list.categories.length, 1)
	t.is(list.categories[0].name, 'category-test')
  })
  
  test('Criação de categoria', async t => {
	const result = await create()
	t.is(result.category.name, 'category-test')
  })