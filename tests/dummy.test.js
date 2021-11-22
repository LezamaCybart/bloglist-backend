const list_helpers = require('../utils/list_helpers')

test('dummy return one', () => {
  const blogs = []

  const result = list_helpers.dummy(blogs)
  expect(result).toBe(1)
})

