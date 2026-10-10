import * as D from './data'
// Single source of truth for contact details: edit src/data.js
export const CONTACT = D.CONTACT
export const WA = CONTACT.phones[0].wa
export const PHONE_TEXT = '+' + WA.replace(/^(\d{2})(\d{5})(\d+)$/, '$1 $2 $3')
export const HAS_EMAIL = !!CONTACT.email
