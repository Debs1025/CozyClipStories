import { BookOpen, Award, Target } from 'lucide-react';

// Bronze 1-10
import bronze1 from "../assets/bronze 1.png";
import bronze2 from "../assets/bronze 2.png";
import bronze3 from "../assets/bronze 3.png";
import bronze4 from "../assets/bronze 4.png";
import bronze5 from "../assets/bronze 5.png";
import bronze6 from "../assets/bronze 6.png";
import bronze7 from "../assets/bronze 7.png";
import bronze8 from "../assets/bronze 8.png";
import bronze9 from "../assets/bronze 9.png";
import bronze10 from "../assets/bronze 10.png";

// Silver 1-10
import silver1 from "../assets/silver 1.png";
import silver2 from "../assets/silver 2.png";
import silver3 from "../assets/silver 3.png";
import silver4 from "../assets/silver 4.png";
import silver5 from "../assets/silver 5.png";
import silver6 from "../assets/silver 6.png";
import silver7 from "../assets/silver 7.png";
import silver8 from "../assets/silver 8.png";
import silver9 from "../assets/silver 9.png";
import silver10 from "../assets/silver 10.png";

// Gold 1-10
import gold1 from "../assets/gold 1.png";
import gold2 from "../assets/gold 2.png";
import gold3 from "../assets/gold 3.png";
import gold4 from "../assets/gold 4.png";
import gold5 from "../assets/gold 5.png";
import gold6 from "../assets/gold 6.png";
import gold7 from "../assets/gold 7.png";
import gold8 from "../assets/gold 8.png";
import gold9 from "../assets/gold 9.png";
import gold10 from "../assets/gold 10.png";

// Amethyst 1-10
import amethyst1 from "../assets/amethyst 1.png";
import amethyst2 from "../assets/amethyst 2.png";
import amethyst3 from "../assets/amethyst 3.png";
import amethyst4 from "../assets/amethyst 4.png";
import amethyst5 from "../assets/amethyst 5.png";
import amethyst6 from "../assets/amethyst 6.png";
import amethyst7 from "../assets/amethyst 7.png";
import amethyst8 from "../assets/amethyst 8.png";
import amethyst9 from "../assets/amethyst 9.png";
import amethyst10 from "../assets/amethyst 10.png";

// Diamond 1-6
import diamond1 from "../assets/diamond 1.png";
import diamond2 from "../assets/diamond 2.png";
import diamond3 from "../assets/diamond 3.png";
import diamond4 from "../assets/diamond 4.png";
import diamond5 from "../assets/diamond 5.png";
import diamond6 from "../assets/diamond 6.png";

// Challenger 1-5
import challenger1 from "../assets/challenger 1.png";
import challenger2 from "../assets/challenger 2.png";
import challenger3 from "../assets/challenger 3.png";
import challenger4 from "../assets/challenger 4.png";
import challenger5 from "../assets/challenger 5.png";


const rankImages = {
  Bronze: [bronze1, bronze2, bronze3, bronze4, bronze5, bronze6, bronze7, bronze8, bronze9, bronze10],
  Silver: [silver1, silver2, silver3, silver4, silver5, silver6, silver7, silver8, silver9, silver10],
  Gold: [gold1, gold2, gold3, gold4, gold5, gold6, gold7, gold8, gold9, gold10],
  Amethyst: [amethyst1, amethyst2, amethyst3, amethyst4, amethyst5, amethyst6, amethyst7, amethyst8, amethyst9, amethyst10],
  Diamond: [diamond1, diamond2, diamond3, diamond4, diamond5, diamond6],
  Challenger: [challenger1, challenger2, challenger3, challenger4, challenger5],
};

const subRankLimits = {
  Bronze: 10,
  Silver: 10,
  Gold: 10,
  Amethyst: 10,
  Diamond: 6,
  Challenger: 5,
};

export default function LearningProgress() {
  const stats = {
    booksRead: 37, 
    totalPoints: 3450,
    quizzesTaken: 145,
    accuracy: 87,
  };

  const recentActivity = [
    { id: 1, type: 'book', title: 'The Great Gatsby', date: 'Nov 18, 2025', points: 150 },
    { id: 2, type: 'quiz', title: 'Chapter 5 Quiz - To Kill a Mockingbird', date: 'Nov 17, 2025', score: 95 },
    { id: 3, type: 'book', title: '1984', date: 'Nov 15, 2025', points: 200 },
  ];


  const rankTiers = ["Bronze", "Silver", "Gold", "Amethyst", "Diamond", "Challenger"];

  let remainingBooks = stats.booksRead;
  let currentRank = "Bronze";
  let subRank = 1;

  for (let i = 0; i < rankTiers.length; i++) {
    const tier = rankTiers[i];
    const limit = subRankLimits[tier];
    if (remainingBooks < limit) {
      currentRank = tier;
      subRank = remainingBooks + 1;
      break;
    } else {
      remainingBooks -= limit;
    }
  }

  const rankIcon = rankImages[currentRank][subRank - 1];
  const progressToNext = ((subRank - 1) / subRankLimits[currentRank]) * 100;

  return (
    <div>
      <h1 className="font-kameron-semibold text-[45px] text-black mb-8">Learning Progress</h1>

      {/* ========================== */}
      {/* Stats Cards */}
      {/* ========================== */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        {/* Rank */}
        <div className="bg-white border border-black rounded-[20px] p-6 text-center shadow-[0px_4px_4px_rgba(0,0,0,0.25)]">
          <img src={rankIcon} alt="Rank icon" className="w-12 h-12 mx-auto mb-3 object-contain" />
          <p className="text-[14px] text-black/60 mb-2">Current Rank</p>
          <p className="font-kameron-semibold text-[20px] text-black">{currentRank} {subRank}</p>
        </div>

        {/* Total Points */}
        <div className="bg-white border border-black rounded-[20px] p-6 text-center shadow-[0px_4px_4px_rgba(0,0,0,0.25)]">
          <Award className="w-10 h-10 mx-auto mb-3 text-[#870022]" />
          <p className="text-[14px] text-black/60 mb-2">Total Points</p>
          <p className="font-kameron-semibold text-[20px] text-black">{stats.totalPoints.toLocaleString()}</p>
        </div>

        {/* Books Read */}
        <div className="bg-white border border-black rounded-[20px] p-6 text-center shadow-[0px_4px_4px_rgba(0,0,0,0.25)]">
          <BookOpen className="w-10 h-10 mx-auto mb-3 text-[#870022]" />
          <p className="text-[14px] text-black/60 mb-2">Books Read</p>
          <p className="font-kameron-semibold text-[20px] text-black">{stats.booksRead}</p>
        </div>
      </div>

      {/* ========================== */}
      {/* Rank Progress */}
      {/* ========================== */}
      <div className="bg-white border border-black rounded-[20px] p-6 shadow-[0px_4px_4px_rgba(0,0,0,0.25)] mb-6">
        <h2 className="font-kameron-semibold text-[24px] text-black mb-4">Rank Progress</h2>
        <p className="text-[16px] text-black/70 mb-3">
          Every <b>1 book</b> increases your sub-rank. Progress through tiers as you finish more books.
        </p>
        <p className="font-kameron-semibold text-[18px] text-black mb-2">{currentRank} {subRank}</p>
        <div className="w-full bg-gray-200 rounded-full h-4 mb-2">
          <div
            className="bg-[#870022] h-4 rounded-full transition-all"
            style={{ width: `${progressToNext}%` }}
          ></div>
        </div>
        <p className="text-[12px] text-black/60">
          {subRank - 1} / {subRankLimits[currentRank]} books to reach next sub-rank
        </p>
      </div>

      {/* ========================== */}
      {/* Recent Activity */}
      {/* ========================== */}
      <div className="bg-white border border-black rounded-[20px] p-6 shadow-[0px_4px_4px_rgba(0,0,0,0.25)]">
        <h2 className="font-kameron-semibold text-[24px] text-black mb-4">Recent Activity</h2>
        <div className="space-y-3">
          {recentActivity.map(activity => (
            <div
              key={activity.id}
              className="flex items-center justify-between p-4 bg-[#f3ebe2] rounded-lg"
            >
              <div className="flex items-center gap-3">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    activity.type === "book" ? "bg-[#870022]" : "bg-[#5CDCFF]"
                  }`}
                >
                  {activity.type === "book" ? (
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
                {activity.type === "book" ? (
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
