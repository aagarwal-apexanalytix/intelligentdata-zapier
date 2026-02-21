'use strict';

module.exports = {
  key: 'addressValidation',
  noun: 'Address',
  display: {
    label: 'Address Validation',
    description: 'Validate and standardize a postal address.',
  },
  operation: {
    inputFields: [
      { key: 'addressLine1', label: 'Address Line 1', type: 'string', helpText: 'Street address line 1' },
      { key: 'addressLine2', label: 'Address Line 2', type: 'string', helpText: 'Street address line 2 (optional)' },
      { key: 'city', label: 'City', type: 'string' },
      { key: 'state', label: 'State', type: 'string' },
      { key: 'postalCode', label: 'Postal Code', type: 'string' },
      { key: 'country', label: 'Country', type: 'string', required: true, helpText: 'Country code (ISO2, ISO3, or full name)' },
      { key: 'companyName', label: 'Company Name', type: 'string', helpText: 'Company name (optional)' },
      { key: 'sourceUniqueId', label: 'Reference ID', type: 'string', helpText: 'Your internal reference ID (optional, returned in response)' },
    ],
    perform: async (z, bundle) => {
      const response = await z.request({
        url: `${bundle.authData.baseUrl}/api/address/validate`,
        method: 'POST',
        body: {
          addressLine1: bundle.inputData.addressLine1 || '',
          addressLine2: bundle.inputData.addressLine2 || '',
          city: bundle.inputData.city || '',
          state: bundle.inputData.state || '',
          postalCode: bundle.inputData.postalCode || '',
          country: bundle.inputData.country,
          companyName: bundle.inputData.companyName || '',
          requestedByClient: 'zapier',
          sourceUniqueId: bundle.inputData.sourceUniqueId || '',
        },
      });
      return response.data;
    },
    sample: {
      addressLine1: '123 Main St',
      city: 'Greensboro',
      state: 'NC',
      postalCode: '27401',
      country: 'US',
      status: 'Validated',
    },
  },
};
