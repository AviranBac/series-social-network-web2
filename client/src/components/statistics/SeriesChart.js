import React from 'react';
import { useNavigate } from 'react-router-dom';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Label } from 'recharts';

const SeriesChart = ({ series, dataKey }) => {
  const navigate = useNavigate();
  const data = series.map((s) => ({ _id: s._id, name: s.name, [dataKey]: s[dataKey]}));

  const barClickHandler = (event) => {
    if (+event?.activePayload?.length > 0) {
      const { _id } = event.activePayload[0].payload;
      navigate(`/series/${_id}`);
    }
  };

  return (
    <BarChart 
      width={800}
      height={350}
      data={data}
      margin={{ top: 20, right: 10, left: 10, bottom: 5 }}
      onClick={barClickHandler}
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
