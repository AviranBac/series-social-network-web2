import { useSelector } from "react-redux";
import { selectUser } from "../../features/auth/auth.selectors";
import PaginationTable from "../paginationTable/PaginationTable";

const Home = () => {
    const user = useSelector(selectUser);

    return (
        <>
            {/*<div className="text-center">*/}
            {/*    Hello { user.displayName }, this is the Home page placeholder*/}
            {/*</div>*/}

            <PaginationTable />
        </>
    );
};

export default Home;