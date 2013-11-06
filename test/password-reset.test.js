var assert = require('assert')
  , t = require('../')
  , authableEntity =
    { created: (new Date()).toISOString()
    , emailAddress: 'test@test.com'
    , password: 'my secure p4ssw0rd'
    }

describe('generate()', function () {

  it('should generate a token, consisting of a key and an expiry date', function () {

    var token = t.generate(authableEntity)
    assert(token)
    assert(token.token && /[a-f0-9]{40}/.test(token.token))
    assert(token.expiry)

  })

  it('should accept a custom expiry date', function () {

    var date = new Date(Date.now() + 7200000)
      , token = t.generate(authableEntity, { expiry: date })
    assert(token.expiry)
    assert.equal((new Date(token.expiry)).toISOString(), date.toISOString())

  })

})

describe('validate()', function () {

  it('should return false for an invalid token', function () {

    var valid = t.validate(authableEntity,
      { token: 'a426bb9be271d8aa9fa940ec857513b2f0a17f77c'
      , expiry: (new Date(Date.now() + 3600000)).getTime()
      })
    assert(!valid)

  })

  it('should return true for a valid token', function () {

    var valid = t.validate(authableEntity, t.generate(authableEntity))
    assert(valid)

  })

  it('should return false for a valid token with an expiry date in the past', function () {

    var token = t.generate(authableEntity, { expiry: new Date(Date.now() - 1) })
      , valid = t.validate(authableEntity, token)

    assert(!valid)

  })


  it('should return false if the entity\'s properties have changed ', function () {

    var changedEntity =
        { created: (new Date()).toISOString()
        , emailAddress: 'test@test.com'
        , password: 'changed password'
        }
      , token = t.generate(changedEntity, { expiry: new Date(Date.now() - 1) })
      , valid = t.validate(authableEntity, token)

    assert(!valid)

  })

})