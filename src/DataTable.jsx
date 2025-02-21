// src/DataTable.js

import React from 'react';
import { formatAsUSCurrency } from './helper';

const DataTable = ({ data }) => {

  const excludeKeys = ['id'];

  const formatValue = (key, value) => {
    switch (key) {
      case 'amount':
        return formatAsUSCurrency(value);
      case 'email':
        return <a href={`mailto:${value}`}>{value}</a>;
      default:
        return value;
    }
  };

  
  return (
    <table border="1" cellPadding="5" style={{ width: '100%', marginTop: '20px' }}>
      <thead>
        <tr>
          {Object.keys(data[0] || {}).filter(key => !excludeKeys.includes(key)).map((key) => (
            <th key={key}>{key}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((item, index) => (
          <tr key={index}>
            {Object.entries(item).filter(([key, value]) => !excludeKeys.includes(key)).map(([key, value]) => (
              <td key={key}>{formatValue(key, value)}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default DataTable;
