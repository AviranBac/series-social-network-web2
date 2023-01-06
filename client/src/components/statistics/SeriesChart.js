import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Label } from 'recharts';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons';

class SeriesChart extends React.Component {
  state = {
    page: 0,
    pageSize: 5,
  }

  handlePrevPage = () => {
    this.setState((prevState) => ({ page: prevState.page - 1 }));
  }

  handleNextPage = () => {
    this.setState((prevState) => ({ page: prevState.page + 1 }));
  }

  render() {
    const { series, dataKey } = this.props;
    const { page, pageSize } = this.state;
    const data = series.slice(page * pageSize, (page + 1) * pageSize).map((s) => ({ name: s.name, [dataKey]: s[dataKey] }));

    return (
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <BarChart
          width={600}
          height={400}
          data={data}
          margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#ffffff00"/>
          <XAxis
            dataKey="name"
            interval={0}
            height={150}
            width={100}
            wrap={true}
            tickFormatter={(name) => {
              if (name.length > 10) {
                return `${name.slice(0, 10)}...`;
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
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <button
            type="button"
            onClick={this.handlePrevPage}
            disabled={page === 0}
            style={{ margin: 10 }}
          >
            <FontAwesomeIcon icon={faArrowLeft} />
          </button>
          <button
            type="button"
            onClick={this.handleNextPage}
            disabled={page === Math.ceil(series.length / pageSize) - 1}
            style={{ margin: 10 }}
          >
            <FontAwesomeIcon icon={faArrowRight} />
          </button>
        </div>
      </div>
    );
  }
}

export default SeriesChart;
