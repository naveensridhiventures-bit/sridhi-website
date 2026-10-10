import * as D from './data'
// Reads CONTACT from your existing src/data.js; falls back to placeholders if missing.
export const CONTACT = D.CONTACT || { phones: [{ wa: '910000000000' }], email: 'hello@example.com' }
export const WA = CONTACT.phones?.[0]?.wa || '910000000000'
export const PHONE_TEXT = '+' + WA.replace(/^(\d{2})(\d{5})(\d+)$/, '$1 $2 $3')
