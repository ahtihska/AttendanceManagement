import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { Button } from '@mui/material';
import { CalendarToday, ArrowDropDown } from '@mui/icons-material';

const DateRangePicker = () => {
  const [startDate, setStartDate] = useState(new Date('2023-01-01'));
  const [endDate, setEndDate] = useState(new Date());

  const handleStartDateChange = (date) => {
    setStartDate(date);
  };

  const handleEndDateChange = (date) => {
    setEndDate(date);
  };

  const buttonStyle = {
      color: 'black', // Change the text color to black
      backgroundColor: '#fff',
      fontSize: 13,

      height: '27px',

    };

  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <span style={{ marginRight: '10px', marginLeft:'10px', fontSize: 18,  color: '#4150B7' }}>DATE : </span>
        <DatePicker
          selected={startDate}
          onChange={handleStartDateChange}
          dateFormat="MMM dd"
          customInput={
            <Button variant="outlined" size="small" style={buttonStyle} startIcon={<CalendarToday />}>
              {startDate.toLocaleDateString('en-US', {
                month: 'short',
                day: 'numeric',
              })}
              <ArrowDropDown style={{ marginLeft: '5px' }} />
            </Button>
          }
        />
        <span style={{ marginRight: '10px', marginLeft:'10px' }}> - </span>
        <DatePicker
          selected={endDate}
          onChange={handleEndDateChange}
          dateFormat="MMM dd"
          customInput={
            <Button variant="outlined" size="small" style={buttonStyle} startIcon={<CalendarToday />}>
              {endDate.toLocaleDateString('en-US', {
                month: 'short',
                day: 'numeric',
              })}
              <ArrowDropDown style={{ marginLeft: '5px' }} />
            </Button>
          }
        />
      </div>
    </div>
  );
};

export default DateRangePicker;
