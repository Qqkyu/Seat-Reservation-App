/* React */
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

/* Modules */
import Home from "modules/Home";
import Seats from "modules/Seats";

function App() {
    return (
        <Router>
            <Switch>
                <Route path="/seats">
                    <Seats />
                </Route>
                <Route path="/">
                    <Home />
                </Route>
            </Switch>
        </Router>
    );
}

export default App;
