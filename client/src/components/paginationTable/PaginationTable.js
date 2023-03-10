import { useCallback, useEffect, useState } from "react";
import Pagination from "../pagination/Pagination";
import classes from "./PaginationTable.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faClose } from "@fortawesome/free-solid-svg-icons";
import classnames from "classnames";
import { Link, useNavigate } from "react-router-dom";
import { Spinner } from "react-bootstrap";

export const userColumnDetails = [
    { field: 'email', label: 'Email' },
    { field: 'displayName', label: 'Display Name' },
    { field: 'creationTime', label: 'Join Date', displayFn: (field) => new Date(field).toLocaleString() }
];

export const seriesColumnDetails = [
    { field: 'name', label: 'Name' },
    { field: 'number_of_episodes', label: 'Number of Episodes' },
    { field: 'number_of_seasons', label: 'Number of Seasons' },
    { field: 'status', label: 'Status' },
    { field: 'genres', label: 'Genres', displayFn: (field) => field.join(', ') }
];

library.add(faClose);

const PaginationTable = (props) => {
    const {
        pageSize = 10,
        columnDetails,
        canRemoveEntity = false,
        loadRequestFn,
        removeRequestFn,
        imageSrcExtractor,
        routerLinkExtractor,
        noDataBody = "There are 0 items",
        tableOverrideStyle = {}
    } = props;

    const navigate = useNavigate();
    const [currentPage, setCurrentPage] = useState(1);
    const [totalCount, setTotalCount] = useState(0);
    const [currentData, setCurrentData] = useState([]);
    const [loading, setLoading] = useState(true);
    const columnsAmount = columnDetails.length + 1 + (imageSrcExtractor ? 1 : 0) + (canRemoveEntity ? 1 : 0);

    const loadRequest = useCallback(() => {
        setLoading(true);
        loadRequestFn(currentPage)
            .then(response => {
                const totalCount = response.totalElements;
                const lastPage = Math.ceil(totalCount / pageSize);

                if (totalCount > 0 && currentPage > lastPage) {
                    setCurrentPage(1);
                } else {
                    setTotalCount(totalCount);
                    setCurrentData(response.content);
                    setLoading(false);
                }
            });
    }, [loadRequestFn, currentPage]);

    useEffect(() => {
        loadRequest();
    }, [currentPage, loadRequestFn]);

    const onRemoveEntity = (event, entity) => {
        event.stopPropagation();
        event.preventDefault();

        removeRequestFn(entity)
            .then(() => loadRequest());
    }

    const calculatePosition = (currentIndex) => (
        currentIndex + 1 + (currentPage - 1) * Number(pageSize)
    );

    const getDisplayedFieldsHTML = (entity, index) => {
        const displayedFieldsHTML = [{ cellHTML: calculatePosition(index) }];

        if (imageSrcExtractor) {
            displayedFieldsHTML.push({ cellHTML: <img src={imageSrcExtractor(entity)} alt="entity"/> });
        }

        displayedFieldsHTML.push(...columnDetails.map(details => {
            const displayValue = details.displayFn ? details.displayFn(entity[details.field]) : entity[details.field];
            return { cellHTML: displayValue }
        }));

        if (canRemoveEntity) {
            displayedFieldsHTML.push({
                cellHTML: <FontAwesomeIcon icon="close"
                                           onClick={($event) => onRemoveEntity($event, entity)}/>,
                cellClassName: classes.removeColumn
            });
        }

        return displayedFieldsHTML;
    };

    const navigateToRouterLink = (entity) => {
        if (routerLinkExtractor) {
            navigate(routerLinkExtractor(entity));
        }
    };

    return (
        <>
            <table className="m-auto position-relative" style={tableOverrideStyle}>
                <thead>
                {currentData.length > 0 && !loading &&
                    <tr>
                        <th>No.</th>
                        {imageSrcExtractor && <th></th>}
                        {columnDetails.map((details, index) => (
                            <th key={details.label}>{details.label}</th>
                        ))}
                        {canRemoveEntity && <th></th>}
                    </tr>
                }
                </thead>
                <tbody>
                {currentData.length > 0 && !loading && currentData.map((entity, index) => (
                    <tr onClick={() => navigateToRouterLink(entity)}
                        className={classnames({
                            [classes.clickable]: !!routerLinkExtractor
                        })}
                        key={index}
                    >
                        {getDisplayedFieldsHTML(entity, index).map(({ cellHTML, cellClassName }, index) => (
                            <td key={index} className={cellClassName}>
                                {routerLinkExtractor ?
                                    <Link to={routerLinkExtractor(entity)}
                                          className="w-100 d-block text-black">{cellHTML}</Link> :
                                    { cellHTML }
                                }
                            </td>
                        ))}
                    </tr>
                ))}

                {currentData.length === 0 && !loading &&
                    <tr>
                        <td colSpan={columnsAmount} className="text-center border-white">{noDataBody}</td>
                    </tr>
                }

                {loading &&
                    <tr>
                        <td colSpan={columnsAmount} className="text-center border-bottom-0">
                            <Spinner animation="border" variant="primary"/>
                        </td>
                    </tr>
                }
                </tbody>
            </table>

            <Pagination
                currentPage={currentPage}
                totalCount={totalCount}
                pageSize={pageSize}
                onPageChange={page => setCurrentPage(page)}
            />
        </>
    );
};

export default PaginationTable;