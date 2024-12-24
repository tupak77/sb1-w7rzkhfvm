import { useState, useEffect } from 'react';

const activities = [
  {
    text: "Time to stretch! Stand up and reach for the sky 🧘‍♂️",
    type: "physical"
  },
  {
    text: "Drink a glass of water. Hydration is key! 💧",
    type: "health"
  },
  {
    text: "Take 3 deep breaths... Feel the calm! 🌬️",
    type: "mindfulness"
  },
  {
    text: "Look away from the screen for 20 seconds 👀",
    type: "health"
  },
  {
    text: "Mini challenge! Do 10 jumping jacks 🏃‍♂️",
    type: "physical"
  },
  {
    text: "Organize something small on your desk 📚",
    type: "productivity"
  },
  {
    text: "Write a random idea in a note 💭",
    type: "creativity"
  },
  {
    text: "Close your eyes and count to 30 😌",
    type: "mindfulness"
  },
  {
    text: "Dance like nobody's watching! 💃",
    type: "fun"
  },
  {
    text: "Draw a doodle on paper 🎨",
    type: "creativity"
  }
];

export const useRandomActivity = () => {
  const [activity, setActivity] = useState(() => 
    activities[Math.floor(Math.random() * activities.length)]
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setActivity(activities[Math.floor(Math.random() * activities.length)]);
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  return activity;
};