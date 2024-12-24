export const ANIMATIONS = {
  slideUp: 'animate-slide-up',
  float: 'animate-float',
  pulse: 'animate-pulse',
  bounce: 'animate-bounce',
} as const;

export const TRANSITIONS = {
  default: 'transition-all duration-200',
  fast: 'transition-all duration-100',
  slow: 'transition-all duration-300',
} as const;