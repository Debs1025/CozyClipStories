import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';

export default function StudentComparison({ filters, comparisonData, topPerformers }) {
  // Fallback mock data if props are not provided
  const mockTopPerformers = topPerformers || [
    { rank: 1, name: 'Alice', score: 95, stories: 10, time: 12 },
    { rank: 2, name: 'Bob', score: 88, stories: 8, time: 9 },
    { rank: 3, name: 'Charlie', score: 82, stories: 7, time: 8 },
  ];

  const mockComparisonData = comparisonData || [
    { name: 'Alice', reading: 12, quiz: 95, stories: 10 },
    { name: 'Bob', reading: 9, quiz: 88, stories: 8 },
    { name: 'Charlie', reading: 8, quiz: 82, stories: 7 },
  ];

  const getRankBadgeColor = (rank) => {
    if (rank === 1) return 'bg-[#f4d58d] text-[#8B1538] border-[#f4d58d]';
    if (rank === 2) return 'bg-[#e8dcc8] text-[#5a4a3a] border-[#e8dcc8]';
    if (rank === 3) return 'bg-[#d4c5b0] text-[#5a4a3a] border-[#d4c5b0]';
    return 'bg-white text-[#5a4a3a] border-[#d4c5b0]';
  };

  return (
    <div className="space-y-6">
      {/* Top Performers Table */}
      <div className="bg-white rounded-2xl shadow-sm p-6">
        <h3 className="text-[#2c1810] mb-6">Top Performers Ranking</h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b-2 border-[#8B1538]">
                <th className="text-left py-4 px-4 text-[#2c1810]">Rank</th>
                <th className="text-left py-4 px-4 text-[#2c1810]">Student Name</th>
                <th className="text-left py-4 px-4 text-[#2c1810]">Avg Score</th>
                <th className="text-left py-4 px-4 text-[#2c1810]">Stories Completed</th>
                <th className="text-left py-4 px-4 text-[#2c1810]">Reading Time</th>
              </tr>
            </thead>
            <tbody>
              {mockTopPerformers.map((student) => (
                <tr
                  key={student.rank}
                  className="border-b border-[#8B1538] hover:bg-[#fffbf0] transition-colors"
                >
                  <td className="py-4 px-4">
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center border-2 ${getRankBadgeColor(student.rank)}`}
                    >
                      <span className="text-lg">{student.rank}</span>
                    </div>
                  </td>
                  <td className="py-4 px-4 text-[#2c1810]">{student.name}</td>
                  <td className="py-4 px-4 text-[#2c1810]">{student.score}</td>
                  <td className="py-4 px-4 text-[#2c1810]">{student.stories}</td>
                  <td className="py-4 px-4 text-[#2c1810]">{student.time}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Student Performance Comparison Chart */}
      <div className="bg-white rounded-2xl shadow-sm p-6">
        <h3 className="text-[#2c1810] mb-6">Student Performance Comparison</h3>
        <ResponsiveContainer width="100%" height={350}>
          <BarChart data={mockComparisonData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e8dcc8" />
            <XAxis
              dataKey="name"
              stroke="#5a4a3a"
              tick={{ fill: '#5a4a3a', fontSize: 12 }}
              axisLine={{ stroke: '#d4c5b0' }}
            />
            <YAxis
              stroke="#5a4a3a"
              tick={{ fill: '#5a4a3a', fontSize: 12 }}
              axisLine={{ stroke: '#d4c5b0' }}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: 'white',
                border: '1px solid #d4c5b0',
                borderRadius: '8px',
                color: '#2c1810',
                fontSize: '14px',
              }}
              labelStyle={{ color: '#2c1810' }}
            />
            <Legend wrapperStyle={{ color: '#5a4a3a', fontSize: '14px' }} iconType="circle" />
            <Bar dataKey="reading" fill="#8B1538" name="Reading Time (hrs)" radius={[8, 8, 0, 0]} barSize={40} />
            <Bar dataKey="quiz" fill="#c97b8e" name="Quiz Score" radius={[8, 8, 0, 0]} barSize={40} />
            <Bar dataKey="stories" fill="#f4d58d" name="Stories Completed" radius={[8, 8, 0, 0]} barSize={40} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
