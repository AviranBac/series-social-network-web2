import { useSelector } from "react-redux";

import PaginationTable from '../paginationTable/PaginationTable';
import followsService from "../../services/follows.service";
import { ActionType } from "../../enums/ActionType";
import { selectUserEmail } from "../../features/auth/auth.selectors";

const Followers = ({ email }) => {
    const currentUserEmail = useSelector(selectUserEmail);
    const followingColumnDetails = [
        { field: 'email_to', label: 'Email' },
    ];

    const loadRequestFn = async (currentPage) => {
        const response = await followsService.loadFollowings(email, currentPage);
        return {
            totalElements: response.totalAmount,
            content: response.data
        };
    };

    const removeRequestFn = async (follow) => {
        await followsService.updateFollow(ActionType.REMOVE, follow.email_from, follow.email_to);
    };

    const routerLinkExtractor = (follow) => {
        return `/users/${follow.email_to}`
    };

    return (
        <div>
            <PaginationTable
                columnDetails={followingColumnDetails}
                loadRequestFn={loadRequestFn}
                noDataBody="This user is not following anyone yet"
                routerLinkExtractor={routerLinkExtractor}
                canRemoveEntity={currentUserEmail === email}
                removeRequestFn={removeRequestFn}
            />
        </div>
    );
}

export default Followers;