import React, { useState } from 'react';
import { Target, Timer, Share2 } from 'lucide-react';
import { useDailyChallenge } from '../../hooks/useDailyChallenge';
import { toast } from 'sonner';

export const DailyChallenge: React.FC = () => {
  const { challenge, acceptChallenge, completeChallenge } = useDailyChallenge();
  const [isActive, setIsActive] = useState(false);

  const handleShare = async () => {
    try {
      await navigator.share({
        title: 'My DoItLater Challenge!',
        text: `Just completed the "${challenge.title}" challenge! 🎯\n#DoItLater #Productivity`,
      });
    } catch (error) {
      toast.error('Could not share the challenge');
    }
  };

  if (!challenge) return null;

  return (
    <div className="p-6 neumorphic rounded-2xl bg-[#f0f3ff]">
      <div className="space-y-6">
        <div className="flex items-center gap-3">
          <Target className="w-6 h-6 text-emerald-500" />
          <h3 className="text-xl font-bold text-indigo-900">Daily Challenge</h3>
        </div>

        <div className="p-6 bg-white/50 rounded-xl backdrop-blur-sm space-y-4">
          <h4 className="text-lg font-semibold text-indigo-900">
            {challenge.title}
          </h4>
          <p className="text-indigo-600">
            {challenge.description}
          </p>
          
          <div className="flex items-center gap-2 text-sm text-indigo-600">
            <Timer className="w-4 h-4" />
            <span>{challenge.timeLimit} minutes</span>
          </div>

          {challenge.completed ? (
            <div className="space-y-4">
              <div className="text-center py-3 bg-emerald-100 text-emerald-700 rounded-lg font-medium">
                Challenge Completed! 🎉
              </div>
              <button
                onClick={handleShare}
                className="w-full btn-primary bg-emerald-500 hover:bg-emerald-600"
              >
                <Share2 className="w-5 h-5" />
                Share Achievement
              </button>
            </div>
          ) : (
            <button
              onClick={() => {
                if (!isActive) {
                  acceptChallenge();
                  setIsActive(true);
                } else {
                  completeChallenge();
                  setIsActive(false);
                }
              }}
              className="w-full btn-primary"
            >
              {isActive ? 'Complete Challenge' : 'Accept Challenge'}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};