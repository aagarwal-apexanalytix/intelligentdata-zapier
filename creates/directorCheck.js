'use strict';

module.exports = {
  key: 'directorCheck',
  noun: 'Director',
  display: {
    label: 'Director Check',
    description: 'Check if a person is a disqualified director.',
  },
  operation: {
    inputFields: [
      { key: 'name', label: 'Name', type: 'string', required: true, helpText: 'Full name of the person to check' },
      {
        key: 'country',
        label: 'Country',
        type: 'string',
        required: true,
        choices: { GB: 'United Kingdom', AU: 'Australia', NZ: 'New Zealand' },
        default: 'GB',
        helpText: 'Country to check (currently UK, AU, NZ supported)',
      },
      { key: 'sourceUniqueId', label: 'Reference ID', type: 'string', helpText: 'Your internal reference ID (optional)' },
    ],
    perform: async (z, bundle) => {
      const response = await z.request({
        url: `${bundle.authData.baseUrl}/api/disqualifieddirectors/validate`,
        method: 'POST',
        body: {
          name: bundle.inputData.name,
          country: bundle.inputData.country,
          requestedByClient: 'zapier',
          sourceUniqueId: bundle.inputData.sourceUniqueId || '',
        },
      });
      return response.data;
    },
    sample: {
      name: 'John Smith',
      country: 'GB',
      status: 'Clear',
    },
  },
};
