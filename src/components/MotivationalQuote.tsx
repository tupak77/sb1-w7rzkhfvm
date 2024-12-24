import React from 'react';
import { useQuote } from '../hooks/useQuote';
import { Quote } from 'lucide-react';

export const MotivationalQuote: React.FC = () => {
  const { quote, author } = useQuote();

  return (
    <div className="mb-12 p-8 bg-white/80 backdrop-blur-sm rounded-xl shadow-md border border-indigo-100/50
                    hover:shadow-lg transition-all duration-200">
      <div className="flex gap-4">
        <Quote className="w-10 h-10 text-indigo-400 flex-shrink-0" />
        <div>
          <p className="text-xl text-indigo-900 italic mb-3 leading-relaxed">{quote}</p>
          <p className="text-sm text-indigo-500 font-medium">— {author}</p>
        </div>
      </div>
    </div>
  );
};