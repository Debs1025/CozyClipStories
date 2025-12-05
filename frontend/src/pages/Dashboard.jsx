import { useState } from 'react';
import StatisticsCards from "../components/StatisticsCard"; // remove the extra 's'
import PerformanceCharts from "../components/PerformanceCharts";
import FilterPanel from "../components/FilterPanel";
import StudentComparison from "../components/StudentComparison";

export default function Dashboard() {
  const [filters, setFilters] = useState({
    dateRange: { start: '2024-11-01', end: '2024-12-01' },
    student: 'all',
    subject: 'all'
  });
  const [activeTab, setActiveTab] = useState('performance');

  const handleFilterChange = (newFilters) => {
    setFilters({ ...filters, ...newFilters });
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-[#2c1810]">Student Performance Monitoring</h1>
          <p className="text-[#5a4a3a] text-sm mt-1">Track and analyze student progress</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-3">
        <button
          onClick={() => setActiveTab('performance')}
          className={`px-8 py-3 rounded-full transition-all ${
            activeTab === 'performance'
              ? 'bg-[#8B1538] text-white shadow-md'
              : 'bg-[#d4c5b0] text-[#5a4a3a] hover:bg-[#c4b5a0]'
          }`}
        >
          Performance Overview
        </button>
        <button
          onClick={() => setActiveTab('comparison')}
          className={`px-8 py-3 rounded-full transition-all ${
            activeTab === 'comparison'
              ? 'bg-[#8B1538] text-white shadow-md'
              : 'bg-[#d4c5b0] text-[#5a4a3a] hover:bg-[#c4b5a0]'
          }`}
        >
          Student Comparison
        </button>
      </div>

      {/* Filters */}
      <FilterPanel filters={filters} onFilterChange={handleFilterChange} />

      {activeTab === 'performance' && (
        <>
          {/* Summary Statistics */}
          <StatisticsCards filters={filters} />

          {/* Performance Charts */}
          <PerformanceCharts filters={filters} />
        </>
      )}

      {activeTab === 'comparison' && (
        <>
          {/* Student Comparison */}
          <StudentComparison filters={filters} />
        </>
      )}
    </div>
  );
}
