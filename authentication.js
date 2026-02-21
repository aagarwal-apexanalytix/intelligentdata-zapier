'use strict';

/**
 * API key authentication for the Intelligent Data API.
 * Users provide their API key (starts with "svm") and optionally a custom base URL.
 */
const authentication = {
  type: 'custom',
  fields: [
    {
      key: 'apiKey',
      label: 'API Key',
      type: 'password',
      required: true,
      helpText: 'Your Intelligent Data API key (starts with "svm"). Find it in your [portal dashboard](https://portal.smartvmapi.com/dashboard/api-keys).',
    },
    {
      key: 'baseUrl',
      label: 'Base URL',
      type: 'string',
      default: 'https://api.smartvmapi.com',
      required: true,
      helpText: 'API base URL. Change only if using a private instance.',
    },
  ],
  test: {
    url: '{{bundle.authData.baseUrl}}/healthz',
    method: 'GET',
    headers: {
      apikey: '{{bundle.authData.apiKey}}',
    },
  },
  connectionLabel: 'Intelligent Data API ({{bundle.authData.baseUrl}})',
};

/**
 * beforeRequest middleware — injects the apikey header on every request.
 */
const addApiKeyHeader = (request, z, bundle) => {
  request.headers.apikey = bundle.authData.apiKey;
  request.headers['Content-Type'] = 'application/json';
  return request;
};

module.exports = { authentication, addApiKeyHeader };
