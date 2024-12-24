import { SarcasticResponse } from '../types';

const SARCASTIC_RESPONSES: SarcasticResponse[] = [
  {
    message: "Putting it off again? Sure, because tomorrow you'll be a superhero.",
    emoji: "🦸‍♂️"
  },
  {
    message: "If procrastination was an Olympic sport, you'd be a gold medalist... but it's time to act!",
    emoji: "🏅"
  },
  {
    message: "Your relationship with deadlines is... complicated, isn't it?",
    emoji: "💔"
  },
  {
    message: "Ah, following the 'today's urgency is tomorrow's leisure' philosophy",
    emoji: "🧘‍♂️"
  },
  {
    message: "Your 'do tomorrow' list needs its own zip code",
    emoji: "📫"
  },
  {
    message: "You know tasks don't complete themselves... I know, surprised me too",
    emoji: "😱"
  },
  {
    message: "Postponing is your specialty, but getting things done can be too",
    emoji: "✨"
  },
  {
    message: "Your future self is looking at you with a mix of disappointment and resignation",
    emoji: "🔮"
  }
];

export const getRandomSarcasticResponse = (): SarcasticResponse => {
  return SARCASTIC_RESPONSES[Math.floor(Math.random() * SARCASTIC_RESPONSES.length)];
};