/* React */
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

/* Modules */
import Home from "modules/Home";
import Seats from "modules/Seats";
import Summary from "modules/Summary";

function App() {
    return (
        <Router>
            <Switch>
                <Route path="/summary">
                    <Summary />
                </Route>
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
