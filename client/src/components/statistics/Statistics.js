import SeriesChart from "./SeriesChart";
import Pagination from "../pagination/Pagination";
import seriesService from "../../services/series.service";
import { useEffect, useState } from 'react';

const Statistics = () => {
  const [mostPopularSeries, setMostPopularSeries] = useState([]);
  const [topRatedSeries, setTopRatedSeries] = useState([]);
  const [page, setPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [pageSize] = useState(10);

  useEffect(() => {
    const fetchData = async() => {
      const mostPopularSeries = await seriesService.getMostPopularSeries(page);
      const topRatedSeries = await seriesService.getTopRatedSeries(page);
      setMostPopularSeries(mostPopularSeries.data);
      setTopRatedSeries(topRatedSeries.data);
      setTotalCount(mostPopularSeries.totalAmount)
    }
    fetchData();
  }, [page]);

  return (
    <div className="d-flex flex-column align-items-center">
      <h3>Series Statistics</h3>
      <SeriesChart series={mostPopularSeries} dataKey="popularity" />
      <SeriesChart series={topRatedSeries} dataKey="vote_average" />
      <div style={{margin: "5px 0px", position: "relative", top: "-100px"}}>
        <Pagination
          onPageChange={setPage}
          totalCount={totalCount}
          currentPage={page}
          pageSize={pageSize}
        />
      </div>
    </div>
  );
};

export default Statistics;