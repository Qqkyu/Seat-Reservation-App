/* React */
import { Link } from "react-router-dom";

/* CSS */
import "./styles.css";

/* Images */
import { ReactComponent as Logo } from "resources/images/logo.svg";

function Index() {
    return (
        <Link to="/">
            <div className="navbar">
                <Logo className="logo" />
            </div>
        </Link>
    );
}

export default Index;
