const { getOrderBy } = require('../controllers/product');

describe('Product sorting', () => {
  it('returns desc by default', () => {
    const req = { headers: {}, query: {} }; // Mock with empty objects
    const orderBy = getOrderBy(req);
    expect(orderBy).toEqual({ price: 'desc' });
  });

  it('returns asc if header set with field', () => {
    const req = { headers: { 'x-evaluator-sort': 'price_asc' }, query: {} };
    const orderBy = getOrderBy(req);
    expect(orderBy).toEqual({ price: 'asc' });
  });
});