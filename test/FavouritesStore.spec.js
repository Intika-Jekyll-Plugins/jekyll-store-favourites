var assert = require('chai').assert;
var sinon = require('sinon');
var I = require('seamless-immutable');
var s = require('../src/FavouritesStore');

describe('FavouritesStore', function() {
  before(function() {
    s.update = sinon.spy();
    s.favourites = I({ 'wallet': { name: 'wallet' }, 'coat': { name: 'coat' } });
    s.products = s.favourites.merge({
      'glove': { name: 'glove' },
      'tie': { name: 'tie' }
    });
  });

  it('adds to favourites', function() {
    var expected = s.products.without('glove');
    s.onFavourite({ name: 'tie' });
    assert(s.update.called);
    assert.deepEqual(s.favourites, expected)
  });

  it('leaves alone if already in favourites', function() {
    s.update.reset();
    s.onFavourite({ name: 'wallet' });
    assert(s.update.notCalled);
  });

  it('removes from favourites', function() {
    var expected = s.products.without('glove').without('coat');
    s.onRemoveFromFavourites({ name: 'coat' });
    assert(s.update.called);
    assert.deepEqual(s.favourites, expected)
  });
});
