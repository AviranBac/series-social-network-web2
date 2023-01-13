import React, { useState } from 'react';
import SeriesFilters from './SeriesFilters';
import seriesService from '../../services/series.service';
import PaginationTable, { seriesColumnDetails } from '../paginationTable/PaginationTable';
import { Col, Container, Row } from 'react-bootstrap';

const SearchSeries = () => {
    const [query, setQuery] = useState({ name: "", genres: [], statuses: [] });

    const setFilters = (filters) => {
        setQuery(filters);
    }

    const fetchData = async (currentPage = 1) => {
        const { data, totalAmount } = await seriesService.getSeriesByFilters(query, currentPage);
        return { content: data, totalElements: totalAmount };
    };

    return (
        <Container fluid>
            <Row>
                <Col xs={4} md={2} className="mt-3">
                    <SeriesFilters setSeriesFilters={setFilters} />
                </Col>
                <Col xs={14} md={10} className="mt-3">
                    <PaginationTable loadRequestFn={fetchData}
                                     columnDetails={seriesColumnDetails}
                                     imageSrcExtractor={(entity => entity.poster_path)}
                                     routerLinkExtractor={(series) => series._id} />
                </Col>
            </Row>
        </Container>
    )
};

export default SearchSeries;