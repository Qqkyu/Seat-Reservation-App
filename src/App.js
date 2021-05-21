import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Home from "modules/Home";

function App() {
    return (
        <Router>
            <Switch>
                <Route path="/">
                    <Home />
                </Route>
            </Switch>
        </Router>
    );
}

export default App;
