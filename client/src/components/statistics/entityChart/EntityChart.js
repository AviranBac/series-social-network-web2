import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Bar, BarChart, CartesianGrid, Label, ResponsiveContainer, Text, Tooltip, XAxis, YAxis } from 'recharts';
import Pagination from "../../pagination/Pagination";
import "./EntityChart.module.css";
import { Spinner } from "react-bootstrap";

const EntityChart = ({ chartMetadata }) => {
    const { loadRequestFn, xAxisDataKey, yAxisDataKey, yAxisDataKeyDisplayName, routerLinkExtractor } = chartMetadata;
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState([]);
    const [totalCount, setTotalCount] = useState(0);
    const [page, setPage] = useState(1);

    const barClickHandler = (event) => {
        if (+event?.activePayload?.length > 0) {
            const route = routerLinkExtractor(event.activePayload[0].payload);
            navigate(route);
        }
    };

    const CustomXAxisTick = ({ x, y, payload }) => {
        if (payload?.value) {
            return (
                <Text fontSize={20} width={1000 / data.length} breakAll={true}
                      x={x} y={y} textAnchor="middle" verticalAnchor="start">
                    {payload.value}
                </Text>
            );
        }
        return null;
    };

    useEffect(() => {
        setLoading(true);
        loadRequestFn(page).then(entities => {
            setData(entities.data);
            setTotalCount(entities.totalAmount)
            setLoading(false);
        });
    }, [loadRequestFn, page]);

    return (
        <>
            {loading && <div className="text-center"><Spinner animation="border" variant="primary"/></div> }
            {data.length === 0 && !loading &&
                <div className="text-center">There are 0 entities matching this criteria.</div>
            }
            {data.length > 0 && !loading &&
                <>
                    <ResponsiveContainer width="80%" height={400}>
                        <BarChart
                            data={data}
                            margin={{ top: 20, right: 30, left: 10, bottom: 5 }}
                            onClick={barClickHandler}
                            cursor="pointer"
                        >
                            <CartesianGrid strokeDasharray="3 3" stroke="#ffffff00"/>
                            <XAxis
                                dataKey={xAxisDataKey}
                                interval={0}
                                height={150}
                                tick={<CustomXAxisTick/>}
                            />
                            <YAxis>
                                <Label angle={270} position="left" style={{ textAnchor: 'middle' }}>
                                    {yAxisDataKeyDisplayName}
                                </Label>
                            </YAxis>
                            <Tooltip/>
                            <Bar dataKey={yAxisDataKey} name={yAxisDataKeyDisplayName} fill="#3b71ca"/>
                        </BarChart>
                    </ResponsiveContainer>
                    <div className="position-relative" style={{ "top": "-50px" }}>
                        <Pagination onPageChange={setPage}
                                    totalCount={totalCount}
                                    currentPage={page}
                                    pageSize={10}/>
                    </div>
                </>
            }
        </>
    );
};

export default EntityChart;
