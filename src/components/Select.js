import { memo } from 'react';

const Select = ({ data, title, defaultValue, handleSelect }) => {
  return (
    <div className='select'>
      <h3>{title}</h3>
      <select onChange={(e) => handleSelect(e.target.value)} defaultValue={defaultValue}>
        {data.map((item) => (
          <option key={item} value={item}>
            {item}
          </option>
        ))}
      </select>
    </div>
  );
};

export default memo(Select);
