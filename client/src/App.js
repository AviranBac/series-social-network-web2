import Routing from "./Routing";
import { Provider } from "react-redux";
import store from "./features/store";

const App = () => {
    return (
        <Provider store={store}>
            <Routing />
        </Provider>
    );
}

export default App;
