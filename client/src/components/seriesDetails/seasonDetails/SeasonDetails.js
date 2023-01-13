import EntityCard from "./entityCard/EntityCard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendar, faStar } from "@fortawesome/free-solid-svg-icons";
import classes from "./SeasonDetails.module.css";
import { EntityType } from "../../../enums/EntityType";

const SeasonCardDescription = (props) => {
    const { season } = props;
    const airDate = season?.air_date && new Date(season.air_date).toLocaleDateString();

    return (
        <div className="d-flex flex-column">
            <div className="d-flex w-100">
                <FontAwesomeIcon icon={faCalendar} className={classes.calendarIcon}/>
                <span style={{ flex: 1 }}>Air date: {airDate}</span>
            </div>
        </div>
    )
};

const SeasonCardFooter = (props) => {
    const { season } = props;

    const getEpisodeDisplayName = (episode) => {
        return `Episode ${episode.episode_number}: ${episode.name}`;
    };

    const EpisodeCardDescription = (props) => {
        const { episode } = props;
        const airDate = episode?.air_date && new Date(episode.air_date).toLocaleDateString();

        return (
            <div className="d-flex flex-column">
                <div className="d-flex w-100">
                    <FontAwesomeIcon icon={faCalendar} className={classes.calendarIcon}/>
                    <span style={{ flex: 1 }}>Air date: {airDate}</span>
                </div>
                <div className="d-flex w-100">
                    <FontAwesomeIcon icon={faStar} className={classes.starIcon}/>
                    <span style={{ flex: 1 }}>Rating: {episode.vote_average} ({episode.vote_count} votes)</span>
                </div>
            </div>
        );
    };

    return (
        <div className="mt-1">
            {season && season.episodes.map(episode => (
                <div className="mb-1" key={episode._id}>
                    <EntityCard entity={episode}
                                entityType={EntityType.EPISODE}
                                imageSrc={episode.still_path}
                                name={getEpisodeDisplayName(episode)}
                                description={<EpisodeCardDescription episode={episode}/>}
                                className="my-2"/>
                </div>
            ))}
        </div>
    );
};

const SeasonDetails = (props) => {
    const { season } = props;

    return (
        <>
            <EntityCard entity={season}
                        entityType={EntityType.SEASON}
                        imageSrc={season.poster_path}
                        name={season.name}
                        description={<SeasonCardDescription season={season}/>}
                        footer={<SeasonCardFooter season={season}/>} />
        </>
    )
};

export default SeasonDetails;