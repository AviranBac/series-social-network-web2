import PaginationTable from '../paginationTable/PaginationTable';
import followsService from "../../services/follows.service";
import { useSelector } from "react-redux";
import { selectUser } from "../../features/auth/auth.selectors";

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

    const removeRequestFn = async(user) => {
       await followsService.updateFollowing("REMOVE", user.email_from, user.email_to);
    };


    const routerLinkExtractor = (user) => {
        return `/user/${user.email_from}`
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