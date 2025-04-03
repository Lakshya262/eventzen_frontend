import { useCallback, useState } from "react";
import PropTypes from "prop-types";
import FilterBox from "../../components/FilterBox/FilterBox";
import SearchEventList from "../../components/SearchEventList/SearchEventList";
import Navigation from "../../components/Navigation/Navigation";
import './FilterEvents.css';

const FilterEvents = () => {
  const [monthYear, setMonthYear] = useState({
    selectedMonth: null,
    selectedYear: null
  });

  const handleMonthYearChange = useCallback((selectedMonth, selectedYear) => {
    setMonthYear({
      selectedMonth: selectedMonth || null,
      selectedYear: selectedYear || null
    });
  }, []);

  return (
    <div className="filter-events-page">
      <Navigation />
      <main className="filter-events-container">
        <div className="filter-section">
          <FilterBox onMonthYearChange={handleMonthYearChange} />
        </div>
        <div className="results-section">
          <SearchEventList 
            monthFilter={monthYear.selectedMonth} 
            yearFilter={monthYear.selectedYear} 
          />
        </div>
      </main>
    </div>
  );
};

// Prop type validation
FilterBox.propTypes = {
  onMonthYearChange: PropTypes.func.isRequired
};

SearchEventList.propTypes = {
  monthFilter: PropTypes.number,
  yearFilter: PropTypes.number
};

export default FilterEvents;