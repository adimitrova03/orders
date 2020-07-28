import React from 'react';

const ExampleCustomTimeInput = ({ value, onChange }) => (
    <input
      value={value}
      onChange={e => onChange(e.target.value)}
      style={{ border: "solid 1px pink" }}
    />
  );

export default (ExampleCustomTimeInput)