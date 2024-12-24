interface Quote {
  quote: string;
  author: string;
}

const quotes: Quote[] = [
  {
    quote: "The best way to get something done is to begin.",
    author: "Unknown"
  },
  {
    quote: "Tomorrow is often the busiest day of the week.",
    author: "Spanish Proverb"
  },
  {
    quote: "Procrastination is the art of keeping up with yesterday.",
    author: "Don Marquis"
  },
  {
    quote: "The only way to do great work is to love what you do.",
    author: "Steve Jobs"
  },
  {
    quote: "Start where you are. Use what you have. Do what you can.",
    author: "Arthur Ashe"
  },
  {
    quote: "The secret of getting ahead is getting started.",
    author: "Mark Twain"
  },
  {
    quote: "Don't wait. The time will never be just right.",
    author: "Napoleon Hill"
  },
  {
    quote: "You don't have to be great to start, but you have to start to be great.",
    author: "Zig Ziglar"
  }
];

export const getRandomQuote = (): Quote => {
  return quotes[Math.floor(Math.random() * quotes.length)];
};