import React from 'react';

export default function FilterPanel({ filters, onFilterChange, students = [], subjects = [] }) {
  return (
    <div className="bg-white rounded-2xl shadow-sm p-6">
      <h3 className="text-[#2c1810] mb-4">Filters</h3>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Start Date */}
        <div>
          <label className="text-[#5a4a3a] text-sm mb-2 block">Start Date</label>
          <input
            type="date"
            value={filters.dateRange.start}
            onChange={(e) => onFilterChange({
              dateRange: { ...filters.dateRange, start: e.target.value }
            })}
            className="w-full px-4 py-2.5 border-2 border-[#8B1538] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8B1538] bg-white text-[#2c1810]"
          />
        </div>

        {/* End Date */}
        <div>
          <label className="text-[#5a4a3a] text-sm mb-2 block">End Date</label>
          <input
            type="date"
            value={filters.dateRange.end}
            onChange={(e) => onFilterChange({
              dateRange: { ...filters.dateRange, end: e.target.value }
            })}
            className="w-full px-4 py-2.5 border-2 border-[#8B1538] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8B1538] bg-white text-[#2c1810]"
          />
        </div>

        {/* Student Filter */}
        <div>
          <label className="text-[#5a4a3a] text-sm mb-2 block">Student</label>
          <select
            value={filters.student}
            onChange={(e) => onFilterChange({ student: e.target.value })}
            className="w-full px-4 py-2.5 border-2 border-[#8B1538] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8B1538] bg-white text-[#2c1810] appearance-none"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='12' height='8' viewBox='0 0 12 8' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1 1.5L6 6.5L11 1.5' stroke='%235a4a3a' stroke-width='2' stroke-linecap='round'/%3E%3C/svg%3E")`,
              backgroundRepeat: 'no-repeat',
              backgroundPosition: 'right 1rem center'
            }}
          >
            {students.map(student => (
              <option key={student.id} value={student.id}>
                {student.name}
              </option>
            ))}
          </select>
        </div>

        {/* Subject Filter */}
        <div>
          <label className="text-[#5a4a3a] text-sm mb-2 block">Subject</label>
          <select
            value={filters.subject}
            onChange={(e) => onFilterChange({ subject: e.target.value })}
            className="w-full px-4 py-2.5 border-2 border-[#8B1538] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8B1538] bg-white text-[#2c1810] appearance-none"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='12' height='8' viewBox='0 0 12 8' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1 1.5L6 6.5L11 1.5' stroke='%235a4a3a' stroke-width='2' stroke-linecap='round'/%3E%3C/svg%3E")`,
              backgroundRepeat: 'no-repeat',
              backgroundPosition: 'right 1rem center'
            }}
          >
            {subjects.map(subject => (
              <option key={subject.id} value={subject.id}>
                {subject.name}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
}
