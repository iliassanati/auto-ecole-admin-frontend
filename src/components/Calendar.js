import React from 'react';
import DatePicker from 'react-date-picker';

const Calendar = ({ value, onChange, name, date }) => {
  return (
    <>
      <DatePicker
        onChange={onChange}
        value={value}
        name={name}
        locale='fr-FR'
        yearPlaceholder={date}
        showLeadingZeros={true}
        format='dd/MM/yyyy'
      />
    </>
  );
};

export default Calendar;
