/* React */
import { Link } from "react-router-dom";

/* Redux */
import { setSeatsTogether } from "library/common/actions/SeatsTogetherActions";
import { setSeatAmount } from "library/common/actions/SeatAmountActions";
import { useDispatch } from "react-redux";

/* CSS */
import "./styles.css";

/* Images */
import { ReactComponent as Logo } from "resources/images/logo.svg";

/* Misc */
import { clearChosenSeatsCache } from "library/common/actions/ReserveSeatAction";

function Index() {
    const dispatch = useDispatch();

    return (
        <Link
            to="/"
            onClick={(e) => {
                dispatch(setSeatAmount(1));
                dispatch(setSeatsTogether(false));
                dispatch(clearChosenSeatsCache());
            }}
        >
            <div className="navbar">
                <Logo className="logo" />
            </div>
        </Link>
    );
}

export default Index;
