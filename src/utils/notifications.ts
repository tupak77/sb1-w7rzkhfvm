import { toast } from 'sonner';
import { getRandomSarcasticResponse } from './sarcasm';
import { getMotivationalMessage } from './messages';

export const showSuccessToast = (message: string, description?: string) => {
  toast.success(message, { description });
};

export const showErrorToast = (message: string, description?: string) => {
  toast.error(message, { description });
};

export const showSarcasticToast = () => {
  const response = getRandomSarcasticResponse();
  toast(response.message, {
    icon: response.emoji,
    duration: 4000,
  });
};

export const showMotivationalToast = () => {
  toast.success(getMotivationalMessage(), {
    duration: 5000,
  });
};