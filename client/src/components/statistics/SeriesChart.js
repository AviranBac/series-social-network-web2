import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Label } from 'recharts';

const SeriesChart = ({ series, dataKey }) => {
  const data = series.map((s) => ({ name: s.name, [dataKey]: s[dataKey]}));
  return (
    <BarChart 
      width={800}
      height={500}
      data={data}
      margin={{ top: 20, right: 10, left: 10, bottom: 5 }}
    >
      <CartesianGrid strokeDasharray="3 3" stroke="#ffffff00"/>
      <XAxis
        dataKey="name"
        interval={0}
        height={150}
        width={200}
        wrap={true}
        tickFormatter={(name) => {
          if (name.length > 8) {
            return `${name.slice(0, 8)}...`;
          }
          return name;
        }}
      />
      <YAxis>
        <Label angle={270} position="left" style={{ textAnchor: 'middle' }}>
          {dataKey}
        </Label>
      </YAxis>
      <Tooltip />
      <Bar dataKey={dataKey} fill="#8884d8" />
    </BarChart>
  );
};

export default SeriesChart;
