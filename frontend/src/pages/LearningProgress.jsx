import { Trophy, BookOpen, Target, Award } from 'lucide-react';

export default function LearningProgress() {
  const stats = {
    rank: "Advanced Reader",
    level: 12,
    totalPoints: 3450,
    booksRead: 28,
    quizzesTaken: 145,
    accuracy: 87
  };

  const recentActivity = [
    { id: 1, type: 'book', title: 'The Great Gatsby', date: 'Nov 18, 2025', points: 150 },
    { id: 2, type: 'quiz', title: 'Chapter 5 Quiz - To Kill a Mockingbird', date: 'Nov 17, 2025', score: 95 },
    { id: 3, type: 'book', title: '1984', date: 'Nov 15, 2025', points: 200 },
    { id: 4, type: 'quiz', title: 'Chapter 3 Quiz - Pride and Prejudice', date: 'Nov 14, 2025', score: 88 },
    { id: 5, type: 'book', title: 'The Catcher in the Rye', date: 'Nov 12, 2025', points: 180 },
  ];

  const weeklyProgress = [
    { day: 'Mon', books: 2, quizzes: 5 },
    { day: 'Tue', books: 1, quizzes: 3 },
    { day: 'Wed', books: 3, quizzes: 7 },
    { day: 'Thu', books: 1, quizzes: 4 },
    { day: 'Fri', books: 2, quizzes: 6 },
    { day: 'Sat', books: 4, quizzes: 8 },
    { day: 'Sun', books: 1, quizzes: 2 },
  ];

  return (
    <div>
      <h1 className="font-kameron-semibold text-[45px] text-black mb-8">Learning Progress</h1>
      
      {/* Stats Cards */}
      <div className="grid grid-cols-4 gap-4 mb-6">
        <div className="bg-white border border-black rounded-[20px] p-6 text-center shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)]">
          <Trophy className="w-10 h-10 mx-auto mb-3 text-[#870022]" />
          <p className="text-[14px] text-black/60 mb-2">Current Rank</p>
          <p className="font-kameron-semibold text-[20px] text-black">{stats.rank}</p>
        </div>
        
        <div className="bg-white border border-black rounded-[20px] p-6 text-center shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)]">
          <Target className="w-10 h-10 mx-auto mb-3 text-[#870022]" />
          <p className="text-[14px] text-black/60 mb-2">Level</p>
          <p className="font-kameron-semibold text-[20px] text-black">{stats.level}</p>
        </div>
        
        <div className="bg-white border border-black rounded-[20px] p-6 text-center shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)]">
          <Award className="w-10 h-10 mx-auto mb-3 text-[#870022]" />
          <p className="text-[14px] text-black/60 mb-2">Total Points</p>
          <p className="font-kameron-semibold text-[20px] text-black">{stats.totalPoints.toLocaleString()}</p>
        </div>
        
        <div className="bg-white border border-black rounded-[20px] p-6 text-center shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)]">
          <BookOpen className="w-10 h-10 mx-auto mb-3 text-[#870022]" />
          <p className="text-[14px] text-black/60 mb-2">Books Read</p>
          <p className="font-kameron-semibold text-[20px] text-black">{stats.booksRead}</p>
        </div>
      </div>

      {/* Progress Section */}
      <div className="bg-white border border-black rounded-[20px] p-6 shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)] mb-6">
        <h2 className="font-kameron-semibold text-[24px] text-black mb-4">Reading Progress</h2>
        
        <div className="mb-6">
          <div className="flex justify-between items-center mb-2">
            <p className="font-kameron-regular text-[16px] text-black">Level Progress</p>
            <p className="text-[14px] text-black/60">Level {stats.level} → {stats.level + 1}</p>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-4">
            <div className="bg-[#870022] h-4 rounded-full" style={{ width: '68%' }}></div>
          </div>
          <p className="text-[12px] text-black/60 mt-1">680 / 1000 XP</p>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="bg-[#f3ebe2] p-4 rounded-lg">
            <p className="text-[14px] text-black/60 mb-1">Quizzes Completed</p>
            <p className="font-kameron-semibold text-[28px] text-black">{stats.quizzesTaken}</p>
          </div>
          
          <div className="bg-[#f3ebe2] p-4 rounded-lg">
            <p className="text-[14px] text-black/60 mb-1">Average Accuracy</p>
            <p className="font-kameron-semibold text-[28px] text-black">{stats.accuracy}%</p>
          </div>
        </div>
      </div>

      {/* Weekly Activity Chart */}
      <div className="bg-white border border-black rounded-[20px] p-6 shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)] mb-6">
        <h2 className="font-kameron-semibold text-[24px] text-black mb-4">Weekly Activity</h2>
        
        <div className="flex items-end justify-between gap-3 h-48">
          {weeklyProgress.map((day) => {
            const maxValue = Math.max(...weeklyProgress.map(d => d.books + d.quizzes));
            const totalHeight = ((day.books + day.quizzes) / maxValue) * 100;
            const booksHeight = (day.books / (day.books + day.quizzes)) * totalHeight;
            const quizzesHeight = (day.quizzes / (day.books + day.quizzes)) * totalHeight;
            
            return (
              <div key={day.day} className="flex-1 flex flex-col items-center">
                <div className="w-full flex flex-col-reverse gap-1 mb-2" style={{ height: '160px' }}>
                  <div 
                    className="w-full bg-[#870022] rounded-t transition-all"
                    style={{ height: `${booksHeight}%` }}
                  ></div>
                  <div 
                    className="w-full bg-[#5CDCFF] rounded-t transition-all"
                    style={{ height: `${quizzesHeight}%` }}
                  ></div>
                </div>
                <p className="text-[12px] text-black/70">{day.day}</p>
              </div>
            );
          })}
        </div>
        
        <div className="flex justify-center gap-6 mt-6">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-[#870022] rounded"></div>
            <span className="text-[12px] text-black/70">Books</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-[#5CDCFF] rounded"></div>
            <span className="text-[12px] text-black/70">Quizzes</span>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white border border-black rounded-[20px] p-6 shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)]">
        <h2 className="font-kameron-semibold text-[24px] text-black mb-4">Recent Activity</h2>
        
        <div className="space-y-3">
          {recentActivity.map((activity) => (
            <div key={activity.id} className="flex items-center justify-between p-4 bg-[#f3ebe2] rounded-lg">
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  activity.type === 'book' ? 'bg-[#870022]' : 'bg-[#5CDCFF]'
                }`}>
                  {activity.type === 'book' ? (
                    <BookOpen className="w-5 h-5 text-white" />
                  ) : (
                    <Target className="w-5 h-5 text-white" />
                  )}
                </div>
                <div>
                  <p className="font-kameron-semibold text-[16px] text-black">{activity.title}</p>
                  <p className="text-[12px] text-black/60">{activity.date}</p>
                </div>
              </div>
              <div className="text-right">
                {activity.type === 'book' ? (
                  <p className="font-kameron-semibold text-[16px] text-[#870022]">+{activity.points} pts</p>
                ) : (
                  <p className="font-kameron-semibold text-[16px] text-[#5CDCFF]">{activity.score}%</p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
