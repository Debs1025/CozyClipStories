import React from "react";

export default function StatisticsCards({ stats = [] }) {
  return (
    <div className="bg-white rounded-2xl shadow-sm p-6">
      <h3 className="text-[#2c1810] mb-6 text-xl font-semibold">Performance Summary</h3>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map(stat => (
          <div key={stat.id} className="space-y-3">
            <div className="flex items-start gap-3">
              <div 
                className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl flex-shrink-0"
                style={{ backgroundColor: stat.bgColor }}
              >
                {stat.icon}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-[#2c1810] text-xl font-bold">{stat.value}</p>
                <p className="text-[#2c1810] text-sm">{stat.title}</p>
              </div>
            </div>
            
            {/* Progress Bar */}
            <div className="space-y-1">
              <div className="w-full bg-[#e8dcc8] rounded-full h-2.5">
                <div
                  className="bg-[#8B1538] h-2.5 rounded-full transition-all duration-500"
                  style={{ width: `${stat.progress}%` }}
                />
              </div>
              <p className="text-xs text-[#5a4a3a]">{stat.subtitle}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
