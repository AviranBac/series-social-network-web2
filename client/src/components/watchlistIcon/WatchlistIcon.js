import { EntityType } from "../../enums/EntityType";
import { WatchlistStatus } from "../../enums/WatchlistStatus";
import { ActionType } from "../../enums/ActionType";
import { faStar as faRegularStar } from "@fortawesome/free-regular-svg-icons";
import { faStar as faSolidStar, faStarHalfStroke } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { OverlayTrigger, Spinner, Tooltip } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {
    selectEpisodeWatchlistStatus,
    selectSeasonWatchlistStatus,
    selectSeriesWatchlistStatus
} from "../../features/watchlist/watchlist.selectors";
import watchlistService from "../../services/watchlist.service";
import { updateWatchlist } from "../../features/watchlist/watchlist.slice";
import { useState } from "react";

const WatchlistIcon = (props) => {
    const { relatedEmail, entity, entityType, disableClick = false, className, size = "md", explicitWatchlistStatus, onWatchlistChange = (watchlist) => {} } = props;
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);

    let watchlistStatusSelectorFn;
    switch (entityType) {
        case EntityType.SERIES: watchlistStatusSelectorFn = selectSeriesWatchlistStatus; break;
        case EntityType.SEASON: watchlistStatusSelectorFn = selectSeasonWatchlistStatus; break;
        case EntityType.EPISODE: watchlistStatusSelectorFn = selectEpisodeWatchlistStatus; break;
    }

    const loggedInUserWatchlistStatus = useSelector((state) => watchlistStatusSelectorFn(state, entity._id));
    const watchlistStatus = explicitWatchlistStatus || loggedInUserWatchlistStatus;

    const upcomingActionType = watchlistStatus === WatchlistStatus.COMPLETE ? ActionType.REMOVE : ActionType.ADD;

    const getStarIcon = () => {
        switch (watchlistStatus) {
            case WatchlistStatus.NONE: return faRegularStar;
            case WatchlistStatus.PARTIAL: return faStarHalfStroke;
            case WatchlistStatus.COMPLETE: return faSolidStar;
            default: return null;
        }
    };

    const updateUserWatchlist = (event) => {
        event.stopPropagation();
        event.preventDefault();

        if (!disableClick) {
            setLoading(true);
            watchlistService.updateUserWatchlist(upcomingActionType, relatedEmail,  entity._id, entityType)
                .then(updatedWatchlist => {
                    dispatch(updateWatchlist(updatedWatchlist));
                    onWatchlistChange(updatedWatchlist);
                })
                .catch(console.error)
                .finally(() => setLoading(false));
        }
    }

    return (
        <>
            { watchlistStatus &&
                <>
                    { loading && <Spinner size={size} className={className} animation="border" variant="primary"/> }
                    { !loading &&
                        <OverlayTrigger placement="bottom"
                                        overlay={<Tooltip id="tooltip"><b>{upcomingActionType === ActionType.ADD ? "Add to watchlist" : "Remove from watchlist"}</b></Tooltip>}>
                            <FontAwesomeIcon className={`${className} ${disableClick ? " pe-none" : ""}`}
                                             icon={getStarIcon()}
                                             color={ disableClick ? 'gray' : 'gold' }
                                             cursor="pointer"
                                             onClick={updateUserWatchlist}/>
                        </OverlayTrigger>
                    }
                </>
            }
        </>
    );
};

export default WatchlistIcon;