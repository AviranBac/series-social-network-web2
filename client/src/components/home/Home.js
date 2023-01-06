import { useSelector } from "react-redux";
import { selectUser } from "../../features/auth/auth.selectors";
import Statistics from "../statistics/Statistics";

const Home = () => {
    const user = useSelector(selectUser);
   
    return (
        <div className="text-center">
            <Statistics/>
        </div>
  
    );
};

export default Home;