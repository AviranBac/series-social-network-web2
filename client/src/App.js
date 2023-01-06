import Routing from "./Routing";
import { Provider } from "react-redux";
import store from "./features/store";
import { BrowserRouter } from "react-router-dom";
import Navbar from "./components/navbar/Navbar";
import Sidebar from "./components/sidebar/Sidebar";

const App = () => {
    return (
        <Provider store={store}>
            <BrowserRouter>
                <Navbar />
                <Sidebar />
                <Routing />
            </BrowserRouter>
        </Provider>
    );
}

export default App;
