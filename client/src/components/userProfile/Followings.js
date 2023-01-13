import PaginationTable from '../paginationTable/PaginationTable';
import followsService from "../../services/follows.service";
import { useSelector } from "react-redux";
import { selectUser } from "../../features/auth/auth.selectors";
import { ActionType } from "../../enums/ActionType";

const Followers = () => {

    const currentUser = useSelector(selectUser);

    const followingColumnDetails = [
        { field: 'email_to', label: 'Email' },
    ];

    const loadRequestFn = async (currentPage) => {
        const response = await followsService.loadFollowings(currentUser.email, currentPage);
        return {
            totalElements: response.totalAmount,
            content: response.data
          };
    };

    const removeRequestFn = async(follow) => {
       await followsService.updateFollow(ActionType.REMOVE, follow.email_from, follow.email_to);
    };


    const routerLinkExtractor = (follow) => {
        return `/user/${follow.email_from}`
    };

    return (
        <div>
            <PaginationTable
                columnDetails={followingColumnDetails}
                loadRequestFn={loadRequestFn}
                noDataBody="Couldn't load any followings"
                routerLinkExtractor={routerLinkExtractor}
                canRemoveEntity={true}
                removeRequestFn={removeRequestFn}
            />
        </div>
    );
}

export default Followers;