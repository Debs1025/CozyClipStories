import { Trophy, Book, Zap, Star, Award, Target, Flame, Crown } from 'lucide-react';

export default function Achievements() {
  const achievements = [
    {
      id: 'first-book',
      name: 'First Steps',
      description: 'Complete your first book',
      icon: <Book className="w-6 h-6" />,
      unlocked: true,
      unlockedDate: 'Jan 15, 2025',
      category: 'reading'
    },
    {
      id: 'quiz-master',
      name: 'Quiz Master',
      description: 'Score 100% on 10 quizzes',
      icon: <Trophy className="w-6 h-6" />,
      unlocked: true,
      unlockedDate: 'Feb 3, 2025',
      category: 'quiz'
    },
    {
      id: 'speed-reader',
      name: 'Speed Reader',
      description: 'Read 5 books in one week',
      icon: <Zap className="w-6 h-6" />,
      unlocked: true,
      unlockedDate: 'Mar 12, 2025',
      category: 'special'
    },
    {
      id: 'perfect-streak',
      name: 'Perfect Streak',
      description: 'Maintain a 7-day reading streak',
      icon: <Flame className="w-6 h-6" />,
      unlocked: false,
      progress: 4,
      maxProgress: 7,
      category: 'special'
    },
    {
      id: 'word-wizard',
      name: 'Word Wizard',
      description: 'Look up 100 words in Word Helper',
      icon: <Star className="w-6 h-6" />,
      unlocked: false,
      progress: 67,
      maxProgress: 100,
      category: 'reading'
    },
    {
      id: 'book-collector',
      name: 'Book Collector',
      description: 'Read 50 different books',
      icon: <Award className="w-6 h-6" />,
      unlocked: false,
      progress: 28,
      maxProgress: 50,
      category: 'reading'
    },
    {
      id: 'accuracy-ace',
      name: 'Accuracy Ace',
      description: 'Achieve 95% average quiz accuracy',
      icon: <Target className="w-6 h-6" />,
      unlocked: false,
      progress: 87,
      maxProgress: 95,
      category: 'quiz'
    },
    {
      id: 'reading-champion',
      name: 'Reading Champion',
      description: 'Reach Level 20',
      icon: <Crown className="w-6 h-6" />,
      unlocked: false,
      progress: 12,
      maxProgress: 20,
      category: 'special'
    },
    {
      id: 'early-bird',
      name: 'Early Bird',
      description: 'Complete 10 reading sessions before 9 AM',
      icon: <Book className="w-6 h-6" />,
      unlocked: true,
      unlockedDate: 'Oct 28, 2025',
      category: 'special'
    },
    {
      id: 'quiz-veteran',
      name: 'Quiz Veteran',
      description: 'Complete 100 quizzes',
      icon: <Trophy className="w-6 h-6" />,
      unlocked: true,
      unlockedDate: 'Nov 5, 2025',
      category: 'quiz'
    },
    {
      id: 'genre-explorer',
      name: 'Genre Explorer',
      description: 'Read books from 10 different genres',
      icon: <Star className="w-6 h-6" />,
      unlocked: false,
      progress: 6,
      maxProgress: 10,
      category: 'reading'
    },
    {
      id: 'perfect-month',
      name: 'Perfect Month',
      description: 'Read every day for 30 days',
      icon: <Flame className="w-6 h-6" />,
      unlocked: false,
      progress: 18,
      maxProgress: 30,
      category: 'special'
    }
  ];

  const milestones = [
    {
      id: 'books-30',
      title: 'Read 30 Books',
      current: 28,
      target: 30,
      reward: '100 coins'
    },
    {
      id: 'quizzes-150',
      title: 'Complete 150 Quizzes',
      current: 145,
      target: 150,
      reward: '50 coins + 5 gems'
    },
    {
      id: 'points-5000',
      title: 'Earn 5,000 Points',
      current: 3450,
      target: 5000,
      reward: 'Legendary Frame'
    },
    {
      id: 'accuracy-90',
      title: 'Reach 90% Average Accuracy',
      current: 87,
      target: 90,
      reward: 'Diamond Avatar'
    }
  ];

  const unlockedCount = achievements.filter(a => a.unlocked).length;
  const completionPercentage = Math.round((unlockedCount / achievements.length) * 100);

  return (
    <div>
      <h1 className="font-kameron-semibold text-[45px] text-black mb-8">Achievements & Badges</h1>

      {/* Summary Stats */}
      <div className="bg-white border border-black rounded-[20px] p-6 shadow-[0px_4px_4px_rgba(0,0,0,0.25)] mb-6">
        <div className="grid grid-cols-3 gap-6 text-center">
          <div>
            <p className="font-kameron-semibold text-[36px] text-[#870022]">
              {unlockedCount}
            </p>
            <p className="text-[14px] text-black/60">Badges Earned</p>
          </div>
          <div>
            <p className="font-kameron-semibold text-[36px] text-[#870022]">
              {achievements.length}
            </p>
            <p className="text-[14px] text-black/60">Total Badges</p>
          </div>
          <div>
            <p className="font-kameron-semibold text-[36px] text-[#870022]">
              {completionPercentage}%
            </p>
            <p className="text-[14px] text-black/60">Completion</p>
          </div>
        </div>

        <div className="mt-4">
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div
              className="bg-[#870022] h-3 rounded-full transition-all"
              style={{ width: `${completionPercentage}%` }}
            ></div>
          </div>
        </div>
      </div>

      {/* Achievements Grid (No progress bars) */}
      <div className="bg-white border border-black rounded-[20px] p-6 shadow-[0px_4px_4px_rgba(0,0,0,0.25)] mb-6">
        <h2 className="font-kameron-semibold text-[24px] text-black mb-6">All Badges</h2>

        <div className="grid grid-cols-4 gap-4">
          {achievements.map((achievement) => (
            <div
              key={achievement.id}
              className={`relative p-4 rounded-lg border-2 transition-all ${
                achievement.unlocked
                  ? 'bg-yellow-100 border-yellow-400'
                  : 'bg-gray-50 border-gray-200'
              }`}
            >
              <div
                className={`w-14 h-14 rounded-full flex items-center justify-center mb-3 mx-auto ${
                  achievement.unlocked
                    ? 'bg-[#870022] text-white'
                    : 'bg-gray-300 text-gray-500'
                }`}
              >
                {achievement.icon}
              </div>

              <h4 className={`font-kameron-semibold text-[14px] text-center mb-1 ${
                achievement.unlocked ? 'text-black' : 'text-gray-500'
              }`}>
                {achievement.name}
              </h4>

              <p className={`text-[11px] text-center mb-2 ${
                achievement.unlocked ? 'text-black/70' : 'text-gray-400'
              }`}>
                {achievement.description}
              </p>

              {achievement.unlocked && (
                <div className="absolute top-2 right-2 bg-yellow-400 rounded-full p-1">
                  <Trophy className="w-3 h-3 text-yellow-800" />
                </div>
              )}

              {/* Category Badge */}
              <div className={`absolute top-2 left-2 px-2 py-0.5 rounded text-[9px] ${
                achievement.category === 'reading' ? 'bg-blue-100 text-blue-800' :
                achievement.category === 'quiz' ? 'bg-green-100 text-green-800' :
                'bg-purple-100 text-purple-800'
              }`}>
                {achievement.category}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Milestones */}
      <div className="bg-white border border-black rounded-[20px] p-6 shadow-[0px_4px_4px_rgba(0,0,0,0.25)]">
        <h2 className="font-kameron-semibold text-[24px] text-black mb-6">Current Milestones</h2>

        <div className="grid grid-cols-2 gap-4">
          {milestones.map((milestone) => {
            const progress = Math.min((milestone.current / milestone.target) * 100, 100);

            return (
              <div key={milestone.id} className="bg-[#f3ebe2] p-5 rounded-lg">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h4 className="font-kameron-semibold text-[18px] text-black">
                      {milestone.title}
                    </h4>
                    <p className="text-[13px] text-black/60 mt-1">
                      Reward: {milestone.reward}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-kameron-semibold text-[18px] text-black">
                      {milestone.current} / {milestone.target}
                    </p>
                    <p className="text-[12px] text-black/60">
                      {Math.round(progress)}%
                    </p>
                  </div>
                </div>

                {/* Red progress bar */}
                <div className="w-full bg-gray-300 rounded-full h-3 overflow-hidden">
                  <div
                    className="bg-[#870022] h-3 rounded-full transition-all duration-500"
                    style={{ width: `${progress}%` }}
                  ></div>
                </div>

                <p className="text-[12px] text-black/50 mt-2">
                  {milestone.target - milestone.current} more to go!
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
