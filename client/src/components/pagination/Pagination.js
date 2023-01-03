import classnames from "classnames";
import { DOTS, usePagination } from "../../hooks/usePagination";
import classes from "./Pagination.module.css";

const Pagination = (props) => {
    const {
        onPageChange,
        totalCount,
        siblingCount = 1,
        currentPage,
        pageSize
    } = props;

    const paginationRange = usePagination({
        currentPage,
        totalCount,
        siblingCount,
        pageSize
    });

    if (currentPage === 0 || paginationRange.length < 2) {
        return null;
    }

    const onNext = () => onPageChange(currentPage + 1);
    const onPrevious = () => onPageChange(currentPage - 1);

    const lastPage = paginationRange[paginationRange.length - 1];
    return (
        <ul className={classes.paginationContainer}>
            <li onClick={onPrevious}
                className={classnames(classes.paginationItem, {
                    [classes.disabled]: currentPage === 1
                })}
            >
                <div className={`${classes.arrow} ${classes.left}`}/>
            </li>
            {paginationRange.map((pageNumber, index) => {
                if (pageNumber === DOTS) {
                    return <li className={`${classes.paginationItem} dots`} key={index}>&#8230;</li>;
                }

                return (
                    <li onClick={() => onPageChange(pageNumber)}
                        className={classnames(classes.paginationItem, {
                            [classes.selected]: pageNumber === currentPage,
                            [classes.disabled]: pageNumber === currentPage
                        })}
                        key={index}
                    >
                        {pageNumber}
                    </li>
                );
            })}
            <li onClick={onNext}
                className={classnames(classes.paginationItem, {
                    [classes.disabled]: currentPage === lastPage
                })}
            >
                <div className={`${classes.arrow} ${classes.right}`}/>
            </li>
        </ul>
    );
};

export default Pagination;