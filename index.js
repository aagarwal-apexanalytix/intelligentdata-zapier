'use strict';

const { authentication, addApiKeyHeader } = require('./authentication');

const addressValidation = require('./creates/addressValidation');
const taxValidation = require('./creates/taxValidation');
const bankValidation = require('./creates/bankValidation');
const businessLookup = require('./creates/businessLookup');
const sanctionsScreening = require('./creates/sanctionsScreening');
const directorCheck = require('./creates/directorCheck');

module.exports = {
  version: require('./package.json').version,
  platformVersion: require('zapier-platform-core').version,
  authentication,
  beforeRequest: [addApiKeyHeader],
  creates: {
    [addressValidation.key]: addressValidation,
    [taxValidation.key]: taxValidation,
    [bankValidation.key]: bankValidation,
    [businessLookup.key]: businessLookup,
    [sanctionsScreening.key]: sanctionsScreening,
    [directorCheck.key]: directorCheck,
  },
};
