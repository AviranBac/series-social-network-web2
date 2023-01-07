import SeriesChart from "./SeriesChart";
import Pagination from "../pagination/Pagination";
import seriesService from "../../services/series.service";
import { useEffect, useState } from 'react';

const Statistics = () => {
  const [series, setSeries] = useState([]);
  const [page, setPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [pageSize] = useState(10);

  useEffect(() => {
    const fetchData = async() => {
      const response = await seriesService.getMostPopularSeries(page);
      setSeries(Array.from(response.data));
      setTotalCount(response.totalAmount)
    }
    fetchData();
  }, [page]);

  const onPageChange = (newPage) => {
    setPage(newPage);
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: 'center' }}>
      <h3>Series Statistics</h3>
      <SeriesChart series={series} dataKey="popularity" />
      <SeriesChart series={series} dataKey="vote_average" />
      <Pagination
        onPageChange={page => onPageChange(page)}
        totalCount={totalCount}
        currentPage={page}
        pageSize={pageSize}
      />
    </div>
  );
};

export default Statistics;