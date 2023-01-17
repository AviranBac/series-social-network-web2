import EntityChart from "./entityChart/EntityChart";
import seriesService from "../../services/series.service";
import classes from "./Statistics.module.css";
import { Tab, Tabs } from "react-bootstrap";
import { useSelector } from "react-redux";
import { selectUserEmail } from "../../features/auth/auth.selectors";
import followsService from "../../services/follows.service";

const Statistics = () => {
    const email = useSelector(selectUserEmail);
    const seriesExtractors = {
        xAxisDataKey: "name",
        routerLinkExtractor: (series) => `/series/${series._id}`
    };
    const userExtractors = {
        xAxisDataKey: "email",
        routerLinkExtractor: (user) => `/users/${user.email}`
    };

    const chartsMetadata = [
        {
            loadRequestFn: async (currentPage) => seriesService.getMostRecommendedSeries(email, currentPage),
            yAxisDataKey: "usersWatchedCount",
            yAxisDataKeyDisplayName: "Followed users who watched",
            tabTitle: "Series You Might Like",
            ...seriesExtractors
        },
        {
            loadRequestFn: async (currentPage) => seriesService.getMostWatchedSeries(currentPage),
            yAxisDataKey: "usersWatchedCount",
            yAxisDataKeyDisplayName: "Users who watched",
            tabTitle: "Most Watched Series",
            ...seriesExtractors
        },
        {
            loadRequestFn: async (currentPage) => seriesService.getMostPopularSeries(currentPage),
            yAxisDataKey: "popularity",
            yAxisDataKeyDisplayName: "Popularity score",
            tabTitle: "Most Popular Series",
            ...seriesExtractors
        },
        {
            loadRequestFn: async (currentPage) => seriesService.getTopRatedSeries(currentPage),
            yAxisDataKey: "vote_average",
            yAxisDataKeyDisplayName: "Average rating",
            tabTitle: "Top Rated Series",
            ...seriesExtractors
        },
        {
            loadRequestFn: async (currentPage) => followsService.getMostFollowedUsers(currentPage),
            yAxisDataKey: "followersCount",
            yAxisDataKeyDisplayName: "Users following",
            tabTitle: "Most Followed Users",
            ...userExtractors
        },
    ];

    return (
        <div className="d-flex flex-column align-items-center">
            <h2 className={`text-center text-primary fw-bold text-decoration-underline mt-3 mb-5 ${classes.title}`}>Statistics</h2>

            <Tabs justify unmountOnExit className={classes.tabs}>
                {chartsMetadata.map(chartMetadata =>
                    <Tab eventKey={chartMetadata.tabTitle} title={chartMetadata.tabTitle} key={chartMetadata.tabTitle}>
                        <EntityChart chartMetadata={chartMetadata} />
                    </Tab>
                )}
            </Tabs>
        </div>
    );
};

export default Statistics;