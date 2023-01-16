import { useSelector } from "react-redux";

import PaginationTable from '../paginationTable/PaginationTable';
import followsService from "../../services/follows.service";
import { ActionType } from "../../enums/ActionType";
import { useSelector } from "react-redux";
import { selectUserEmail } from "../../features/auth/auth.selectors";

const Followers = ({ email }) => {
    const loggedInUserEmail = useSelector(selectUserEmail);

    const followerColumnDetails = [
        { field: 'email_from', label: 'Email' },
    ];

    const loadRequestFn = async (currentPage) => {
        const response = await followsService.loadFollowers(email, currentPage);
        return {
            totalElements: response.totalAmount,
            content: response.data
        };
    };

    const removeRequestFn = async (follow) => {
        await followsService.updateFollow(ActionType.REMOVE, follow.email_from, follow.email_to);
    };

    const routerLinkExtractor = (follow) => {
        return `/users/${follow.email_from}`
    };

    return (
        <div>
            <PaginationTable
                columnDetails={followerColumnDetails}
                loadRequestFn={loadRequestFn}
                noDataBody="This user has no followers yet"
                routerLinkExtractor={routerLinkExtractor}
                canRemoveEntity={loggedInUserEmail === email}
                removeRequestFn={removeRequestFn}
            />
        </div>
    );
}

export default Followers;