'use strict';

module.exports = {
  key: 'taxValidation',
  noun: 'Tax ID',
  display: {
    label: 'Tax Validation',
    description: 'Validate a tax ID (VAT, TIN, GST, etc.).',
  },
  operation: {
    inputFields: [
      { key: 'entityName', label: 'Entity Name', type: 'string', required: true, helpText: 'Company or individual name' },
      { key: 'identityNumber', label: 'Tax ID Number', type: 'string', required: true, helpText: 'Tax identification number (e.g., VAT number, EIN, TIN)' },
      {
        key: 'identityNumberType',
        label: 'Tax ID Type',
        type: 'string',
        required: true,
        choices: { VAT: 'VAT', TIN: 'TIN', GST: 'GST', EIN: 'EIN', Other: 'Other' },
        default: 'VAT',
      },
      { key: 'country', label: 'Country', type: 'string', required: true, helpText: 'Country code (ISO2, e.g., DE, US, GB)' },
      { key: 'sourceUniqueId', label: 'Reference ID', type: 'string', helpText: 'Your internal reference ID (optional)' },
    ],
    perform: async (z, bundle) => {
      const response = await z.request({
        url: `${bundle.authData.baseUrl}/api/tax/validate`,
        method: 'POST',
        body: {
          entityName: bundle.inputData.entityName,
          identityNumber: bundle.inputData.identityNumber,
          identityNumberType: bundle.inputData.identityNumberType,
          country: bundle.inputData.country,
          requestedByClient: 'zapier',
          sourceUniqueId: bundle.inputData.sourceUniqueId || '',
        },
      });
      return response.data;
    },
    sample: {
      entityName: 'Acme GmbH',
      identityNumber: 'DE123456789',
      identityNumberType: 'VAT',
      country: 'DE',
      status: 'Valid',
    },
  },
};
