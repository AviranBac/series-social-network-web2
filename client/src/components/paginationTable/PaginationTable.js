import { useCallback, useEffect, useState } from "react";
import Pagination from "../pagination/Pagination";
import { mockResponse } from "../../services/mock.service";
import classes from "./PaginationTable.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faClose } from "@fortawesome/free-solid-svg-icons";
import classnames from "classnames";
import { Link, useNavigate } from "react-router-dom";

const PAGE_SIZE = 10;

export const userColumnDetails = [
    { field: 'email', label: 'Email' },
    { field: 'displayName', label: 'Display Name' }
];

export const seriesColumnDetails = [
    { field: 'name', label: 'Name' },
    { field: 'numberOfEpisodes', label: 'Number of Episodes' },
    { field: 'numberOfSeasons', label: 'Number of Seasons' },
    // { field: 'status', label: 'Series Status', displayFn: rawValue => getStatusValue(rawValue) }, // TODO: getStatusValue not yet implemented
    { field: 'genres', label: 'Genres' }
];

library.add(faClose);

const PaginationTable = (props) => {
    const {
        itemsPerPage = 10,
        columnDetails = [
            { field: "a", label: "Field a" },
            { field: "b", label: "Field b" },
            { field: "c", label: "Field c" },
            { field: "d", label: "Field d" },
            { field: "e", label: "Field e" },
        ],
        canRemoveEntity = true,
        loadRequestFn = async (currentPage) => {
            console.log("loadRequestFn", currentPage);
            return {
                totalElements: mockResponse.totalElements,
                content: mockResponse.content.slice((currentPage - 1) * PAGE_SIZE, (currentPage - 1) * PAGE_SIZE + PAGE_SIZE)
            }
        },
        removeRequestFn = async () => Promise.resolve(),
        imageSrcExtractor,
        routerLinkExtractor = (entity) => `/${entity.b}`,
        noDataBody = "There are 0 items"
    } = props;

    const navigate = useNavigate();
    const [currentPage, setCurrentPage] = useState(1);
    const [totalCount, setTotalCount] = useState(0);
    const [currentData, setCurrentData] = useState([]);
    const columnsAmount = columnDetails.length + 1 + (imageSrcExtractor ? 1 : 0) + (canRemoveEntity ? 1 : 0);

    const loadRequest = useCallback(() => {
        loadRequestFn(currentPage)
            .then(response => {
                // setTotalCount(response.totalElements);
                // setCurrentData(response.content);
            });
    }, [loadRequestFn, currentPage]);

    useEffect(() => {
        loadRequest();
    }, [currentPage]);

    const onRemoveEntity = ($event, entity) => {
        $event.stopPropagation();
        $event.preventDefault();

        removeRequestFn(entity)
            .then(() => loadRequest());
    }

    const calculatePosition = (currentIndex) => (
        currentIndex + 1 + (currentPage - 1) * Number(itemsPerPage)
    );

    const getDisplayedFieldsHTML = (entity, index) => {
        const displayedFieldsHTML = [ { cellHTML: calculatePosition(index) } ];

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
            <table>
                <thead>
                {currentData.length > 0 &&
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
                {currentData.map((entity, index) => (
                    <tr onClick={() => navigateToRouterLink(entity)}
                        className={classnames({
                            [classes.clickable]: !!routerLinkExtractor
                        })}
                        key={index}
                    >
                        { getDisplayedFieldsHTML(entity, index).map(({ cellHTML, cellClassName }, index) => (
                            <td key={index} className={cellClassName}>
                                { routerLinkExtractor ?
                                    <Link to={routerLinkExtractor(entity)} className={classes.link}>{cellHTML}</Link> :
                                    {cellHTML}
                                }
                            </td>
                        )) }
                    </tr>
                ))}

                {currentData.length === 0 &&
                    <tr>
                        <td colSpan={columnsAmount} className={classes.noDataCell}>{noDataBody}</td>
                    </tr>
                }
                </tbody>
            </table>

            <Pagination
                currentPage={currentPage}
                totalCount={totalCount}
                pageSize={PAGE_SIZE}
                onPageChange={page => setCurrentPage(page)}
            />
        </>
    );
};

export default PaginationTable;