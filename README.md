# cf-password-reset

Generate and validate password reset tokens

## Installation

    npm install --save cf-password-reset

## Usage

```js
var passwordResetToken = require('cf-password-reset-token')

// Generate a token for an authable entity (i.e one that can authorize
// themself with the system – e.g. administrator, user, customer)
passwordResetToken.generate(authableEntity)
//-> { token: '...', expiry: '...'}

// Check that a password reset token is valid for a given authable entity
passwordResetToken.validate(authableEntity, token)
//-> true or false
```

## API

### var t = require('cf-password-reset-token')

### t.generate(Object: authableEntity, Object: options)

`authableEntity` must have the following properties: `created` and `password`, along
with an identity property that be configured with `options.identityProperty`. This
defaults to `'emailAddress'`. `options.expiry` can be used to configure how long the
token is valid for. The default is 1 hour.

### t.validate(Object: authableEntity, Object: token)

`authableEntity` is the entity that token should be validated against. This function
will return `true` if **both** of the following conditions are met:

- `token.token` is a valid token
- `token.expiry` is not in the past
- Certain properties of `authableEntity` are the same as when the token was created:
`created`, `password` and its `identityProperty`

## Credits
Built by developers at [Clock](http://clock.co.uk).

## Licence
Licensed under the [New BSD License](http://opensource.org/licenses/bsd-license.php)
