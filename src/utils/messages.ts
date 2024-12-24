const messages = [
  "Task added successfully! 🎯",
  "Great choice for later! 🚀",
  "Added to your task list! ⏰",
  "Ready when you are! ✨",
  "Task saved successfully! 🎭",
  "Added to your queue! 🎯",
  "Good planning ahead! 🌟",
  "Task registered! 🧠",
  "Added to your list! 📝",
  "Task saved for later! 🎨"
];

export const getMotivationalMessage = () => {
  return messages[Math.floor(Math.random() * messages.length)];
};