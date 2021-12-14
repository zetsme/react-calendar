import { useCallback, useEffect, useState, useRef } from 'react';
import { getYearsArr, monthsArr, Calendar as CalendarClass } from './calendar';
import Select from './components/Select';
import Calendar from './components/Calendar';

const yearsArr = getYearsArr();

const date = new Date();
const currentYear = date.getFullYear();
const currentMonth = date.getMonth();

const App = () => {
  const [year, setYear] = useState(currentYear);
  const [month, setMonth] = useState(monthsArr[currentMonth]);

  const [data, setData] = useState(new CalendarClass(year, monthsArr.indexOf(month)));

  const handleYearSelect = useCallback((val) => setYear(Number(val)), []);

  const handleMonthSelect = useCallback((val) => setMonth(val), []);

  const initial = useRef(true);

  useEffect(() => {
    if (initial.current) {
      initial.current = false;
      return;
    }
    setData(new CalendarClass(year, monthsArr.indexOf(month)));
  }, [year, month]);

  return (
    <div className='container'>
      <div className='selects'>
        <Select
          data={yearsArr}
          defaultValue={year}
          title='Select Year'
          handleSelect={handleYearSelect}
        />
        <Select
          data={monthsArr}
          defaultValue={month}
          title='Select Month'
          handleSelect={handleMonthSelect}
        />
      </div>
      <Calendar data={data} />
    </div>
  );
};

export default App;
