'use strict';

module.exports = {
  key: 'sanctionsScreening',
  noun: 'Sanctions Result',
  display: {
    label: 'Sanctions Screening',
    description: 'Screen against 90+ global prohibited/watch lists (OFAC, FBI, Interpol).',
  },
  operation: {
    inputFields: [
      { key: 'companyName', label: 'Company Name', type: 'string', required: true, helpText: 'Company or entity name to screen' },
      { key: 'firstName', label: 'First Name', type: 'string', helpText: 'Individual first name (for person screening)' },
      { key: 'lastName', label: 'Last Name', type: 'string', helpText: 'Individual last name (for person screening)' },
      { key: 'threshold', label: 'Match Threshold', type: 'number', default: '0.8', helpText: 'Fuzzy match threshold (0.0 = loose, 1.0 = exact)' },
      {
        key: 'requestType',
        label: 'Request Type',
        type: 'string',
        choices: { Initial: 'Initial', 'Re-check': 'Re-check' },
        default: 'Initial',
      },
      { key: 'sourceUniqueId', label: 'Reference ID', type: 'string', helpText: 'Your internal reference ID (optional)' },
    ],
    perform: async (z, bundle) => {
      const response = await z.request({
        url: `${bundle.authData.baseUrl}/api/prohibited/lookup`,
        method: 'POST',
        body: {
          companyName: bundle.inputData.companyName,
          firstName: bundle.inputData.firstName || '',
          lastName: bundle.inputData.lastName || '',
          threshold: parseFloat(bundle.inputData.threshold) || 0.8,
          requestType: bundle.inputData.requestType || 'Initial',
          requestedByClient: 'zapier',
          sourceUniqueId: bundle.inputData.sourceUniqueId || '',
        },
      });
      return response.data;
    },
    sample: {
      companyName: 'Acme Corp',
      threshold: 0.8,
      requestType: 'Initial',
      status: 'Clear',
    },
  },
};
