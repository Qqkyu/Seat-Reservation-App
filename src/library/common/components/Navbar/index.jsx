/* CSS */
import "./styles.scss";

/* Images */
import { ReactComponent as Logo } from "resources/images/logo.svg";

function Index() {
    return (
        <div className="navbar">
            <Logo className="logo" />
        </div>
    );
}

export default Index;
