/* React */
import { Link } from "react-router-dom";

/* CSS */
import "./styles.css";

/* Ant Design */
import { Divider, Button } from "antd";

/**
 *
 * @param {function} openNotification - Display notification message
 * @param {array} chosenSeatsAmount   - Amount of currently chosen seats on the grid
 * @returns
 */
function Index({ openNotification, chosenSeatsAmount }) {
    return (
        <Divider style={{ marginTop: 30 }}>
            {chosenSeatsAmount === 0 ? (
                <Button
                    type="primary"
                    className="reserve-button"
                    onClick={() =>
                        openNotification(
                            "error",
                            "Za mało wybranych miejsc!",
                            "Proszę wybrać przynajmniej jedno miejsce do rezerwacji."
                        )
                    }
                >
                    Rezerwuj
                </Button>
            ) : (
                <Link to="/summary">
                    <Button type="primary" className="reserve-button">
                        Rezerwuj
                    </Button>
                </Link>
            )}
        </Divider>
    );
}

export default Index;
