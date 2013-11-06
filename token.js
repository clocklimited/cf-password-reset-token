module.exports = { generate: generate, validate: validate }

var crypto = require('crypto')

function generate(authableEntity, options) {

  if (!options) options = {}

  // Default expiry is one hour
  var expiry = options.expiry || new Date(Date.now() + 3600000)
    , identityProperty = options.identityProperty || 'emailAddress'

  if (!(expiry instanceof Date)) expiry = new Date(parseInt(expiry, 10))

  var packet =
    [ authableEntity.created
    , authableEntity[identityProperty]
    , authableEntity.password
    , expiry
    ].join(':')

  return { token: crypto.createHash('sha1').update(packet).digest('hex'), expiry: expiry.getTime() }

}

function validate(authableEntity, token) {
  if (new Date(token.expiry) < new Date()) return false
  return generate(authableEntity, { expiry: token.expiry }).token === token.token
}