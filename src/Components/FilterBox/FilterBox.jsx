import React, { useState } from 'react';

const FilterBox = ({ onFilterChange }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [dateRange, setDateRange] = useState({ startDate: '', endDate: '' });

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    onFilterChange({ searchQuery: e.target.value, dateRange });
  };

  const handleDateChange = (e) => {
    const { name, value } = e.target;
    const newDateRange = { ...dateRange, [name]: value };
    setDateRange(newDateRange);
    onFilterChange({ searchQuery, dateRange: newDateRange });
  };

  return (
    <div className="filter-box">
      <input
        type="text"
        placeholder="Search by name or venue"
        value={searchQuery}
        onChange={handleSearchChange}
      />
      <input
        type="date"
        name="startDate"
        value={dateRange.startDate}
        onChange={handleDateChange}
      />
      <input
        type="date"
        name="endDate"
        value={dateRange.endDate}
        onChange={handleDateChange}
      />
    </div>
  );
};

export default FilterBox;
