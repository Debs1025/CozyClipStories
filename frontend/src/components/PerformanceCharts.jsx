import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts';

export default function PerformanceCharts({ filters, readingTimeData = [], quizScoresData = [] }) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Reading Time Chart */}
      <div className="bg-white rounded-2xl shadow-sm p-6">
        <h3 className="text-[#2c1810] mb-6">Reading Time Trend</h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={readingTimeData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e8dcc8" />
            <XAxis 
              dataKey="date" 
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
                fontSize: '14px'
              }}
              labelStyle={{ color: '#2c1810' }}
            />
            <Line
              type="monotone"
              dataKey="hours"
              stroke="#8B1538"
              strokeWidth={3}
              dot={{ fill: '#8B1538', r: 5, strokeWidth: 2, stroke: 'white' }}
              activeDot={{ r: 7 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Quiz Scores Chart */}
      <div className="bg-white rounded-2xl shadow-sm p-6">
        <h3 className="text-[#2c1810] mb-6">Quiz Scores by Subject</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={quizScoresData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e8dcc8" />
            <XAxis 
              dataKey="subject" 
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
                fontSize: '14px'
              }}
              labelStyle={{ color: '#2c1810' }}
            />
            <Bar 
              dataKey="score" 
              fill="#8B1538" 
              radius={[8, 8, 0, 0]}
              barSize={50}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
