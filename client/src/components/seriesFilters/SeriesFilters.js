import React, { useState, useEffect } from 'react';
import { MDBInputGroup, MDBInput, MDBCheckbox } from 'mdb-react-ui-kit';
import seriesService from '../../services/series.service';
import { Container } from 'react-bootstrap';

const filtersType = Object.freeze({ GENRES: "genres", STATUSES: "statuses" });

const SeriesFilters = ({ setSeriesFilters }) => {
    const [seriesFilterTypes, setSeriesFilterTypes] = useState([]);
    const [userFilters, setUserFilters] = useState({ name: "", genres: [], statuses: [] });

    useEffect(() => {
        async function fetchData() {
            const seriesFilterTypes = await seriesService.getSeriesFilterTypes();
            setSeriesFilterTypes(seriesFilterTypes);
        }
        fetchData();
    }, []);

    useEffect(() => {
        setSeriesFilters(userFilters);
    }, [userFilters]);

    const setFilters = (e, type) => {
        const { value, checked } = e.target;
        const updatedType = checked ?
            ({ [type]: [...(userFilters[type]), value] }) : ({ [type]: userFilters[type].filter((filterVal) => filterVal !== value) });
        setUserFilters({
            ...userFilters,
            ...updatedType
        });
    };

    return (
        <Container>
            <MDBInputGroup>
                <MDBInput label='Search by name' onChange={(e) => { setUserFilters({ ...userFilters, name: e.target.value }) }} />
            </MDBInputGroup>
            <h6 className="mt-4 text-primary fw-bold text-decoration-underline">Filter by genres</h6>
            {
                (seriesFilterTypes?.genres || []).map((genre) =>
                    <MDBCheckbox key={genre._id} value={genre.name} label={genre.name} onChange={(e) => setFilters(e, filtersType.GENRES)} />
                )
            }
            <h6 className="mt-4 text-primary fw-bold text-decoration-underline">Filter by statuses</h6>
            {
                (seriesFilterTypes?.statuses || []).map((status) =>
                    <MDBCheckbox key={status} value={status} label={status} onChange={(e) => setFilters(e, filtersType.STATUSES)} />
                )
            }
        </Container>
    )
};

export default SeriesFilters;