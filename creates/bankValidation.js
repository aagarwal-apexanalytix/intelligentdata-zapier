'use strict';

module.exports = {
  key: 'bankValidation',
  noun: 'Bank Account',
  display: {
    label: 'Bank Validation',
    description: 'Validate a bank account, routing number, or IBAN.',
  },
  operation: {
    inputFields: [
      {
        key: 'bankNumberType',
        label: 'Bank Number Type',
        type: 'string',
        required: true,
        choices: { Routing: 'Routing Number', IBAN: 'IBAN', SWIFT: 'SWIFT/BIC', CLABE: 'CLABE', GIRO: 'Bank Giro' },
        default: 'Routing',
      },
      { key: 'bankCode', label: 'Bank Code / Routing Number', type: 'string', helpText: 'Routing number, sort code, or bank code' },
      { key: 'accountNumber', label: 'Account Number', type: 'string' },
      { key: 'iBAN', label: 'IBAN', type: 'string' },
      { key: 'swift', label: 'SWIFT/BIC', type: 'string' },
      { key: 'bankAccountHolder', label: 'Account Holder Name', type: 'string' },
      { key: 'country', label: 'Country', type: 'string', helpText: 'Country code (ISO2)' },
      { key: 'sourceUniqueId', label: 'Reference ID', type: 'string', helpText: 'Your internal reference ID (optional)' },
    ],
    perform: async (z, bundle) => {
      const response = await z.request({
        url: `${bundle.authData.baseUrl}/api/bank/validate`,
        method: 'POST',
        body: {
          bankNumberType: bundle.inputData.bankNumberType,
          bankCode: bundle.inputData.bankCode || '',
          accountNumber: bundle.inputData.accountNumber || '',
          iBAN: bundle.inputData.iBAN || '',
          swift: bundle.inputData.swift || '',
          bankAccountHolder: bundle.inputData.bankAccountHolder || '',
          country: bundle.inputData.country || '',
          requestedByClient: 'zapier',
          sourceUniqueId: bundle.inputData.sourceUniqueId || '',
        },
      });
      return response.data;
    },
    sample: {
      bankNumberType: 'Routing',
      bankCode: '021000021',
      accountNumber: '123456789',
      country: 'US',
      status: 'Valid',
    },
  },
};
