import { useState, useEffect } from 'react';
import { getRandomQuote } from '../utils/quotes';

export const useQuote = () => {
  const [quote, setQuote] = useState(() => getRandomQuote());

  useEffect(() => {
    const interval = setInterval(() => {
      setQuote(getRandomQuote());
    }, 60000); // Change quote every minute

    return () => clearInterval(interval);
  }, []);

  return quote;
};