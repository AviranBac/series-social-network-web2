import PaginationTable from '../paginationTable/PaginationTable';
import followsService from "../../services/follows.service";
import { useSelector } from "react-redux";
import { selectUser } from "../../features/auth/auth.selectors";

const Followers = () => {

    const currentUser = useSelector(selectUser);

    const followerColumnDetails = [
        { field: 'email_from', label: 'Email' },
    ];

    const loadRequestFn = async (currentPage) => {
        const response = await followsService.loadFollowers(currentUser.email, currentPage);
        console.log(response.data)
        return {
            totalElements: response.totalAmount,
            content: response.data
          };
    };

    const removeRequestFn = async(user) => {
       await followsService.updateFollower("REMOVE", user.email_from, user.email_to);
    };


    const routerLinkExtractor = (user) => {
        return `/user/${user.email_from}`
    };

    return (
        <div>
            <PaginationTable
                columnDetails={followerColumnDetails}
                loadRequestFn={loadRequestFn}
                noDataBody="Couldn't load any followers"
                routerLinkExtractor={routerLinkExtractor}
                canRemoveEntity={true}
                removeRequestFn={removeRequestFn}
            />
        </div>
    );
}

export default Followers;