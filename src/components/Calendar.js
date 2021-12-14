import { memo } from 'react';

const Calendar = ({ data: { calendar, month, year } }) => {
  return (
    <div className='calendar'>
      <header className='calendar__header'>
        <h2>{month}</h2>
        <h1>{year}</h1>
      </header>
      <div className='calendar__grid'>
        {calendar.map((cell) => (
          <div
            className={`calendar__cell ${cell.month !== month && 'calendar__cell--faded'}`}
            key={cell.day + cell.month}
          >
            <div>
              <h4>{cell.day}</h4>
              <h6>{cell.month}</h6>
            </div>
            <h5>{cell.weekday}</h5>
          </div>
        ))}
      </div>
    </div>
  );
};

export default memo(Calendar);
