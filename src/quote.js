import { createContext, useContext } from 'react'
export const QuoteCtx = createContext({ isOpen: false, open: () => {}, close: () => {} })
export const useQuote = () => useContext(QuoteCtx)
