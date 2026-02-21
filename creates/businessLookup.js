'use strict';

module.exports = {
  key: 'businessLookup',
  noun: 'Business',
  display: {
    label: 'Business Lookup',
    description: 'Look up business registration details.',
  },
  operation: {
    inputFields: [
      { key: 'entityName', label: 'Entity Name', type: 'string', required: true, helpText: 'Company or business name to look up' },
      { key: 'country', label: 'Country', type: 'string', required: true, helpText: 'Country code (ISO2)' },
      { key: 'state', label: 'State', type: 'string', helpText: 'State or province (optional)' },
      { key: 'city', label: 'City', type: 'string', helpText: 'City (optional)' },
      { key: 'sourceUniqueId', label: 'Reference ID', type: 'string', helpText: 'Your internal reference ID (optional)' },
    ],
    perform: async (z, bundle) => {
      const response = await z.request({
        url: `${bundle.authData.baseUrl}/api/businessregistration/lookup`,
        method: 'POST',
        body: {
          entityName: bundle.inputData.entityName,
          country: bundle.inputData.country,
          state: bundle.inputData.state || '',
          city: bundle.inputData.city || '',
          requestedByClient: 'zapier',
          sourceUniqueId: bundle.inputData.sourceUniqueId || '',
        },
      });
      return response.data;
    },
    sample: {
      entityName: 'Acme Corp',
      country: 'US',
      state: 'NC',
      status: 'Found',
    },
  },
};
