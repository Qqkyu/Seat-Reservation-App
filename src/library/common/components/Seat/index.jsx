/* React */
import { useState, useEffect } from "react";

/* Redux */
import { useDispatch } from "react-redux";

/* CSS */
import "./styles.css";

/* Ant Design */
import { Card } from "antd";

/* Misc */
import {
    reserveSeat,
    setSeatAvailable,
} from "library/common/actions/ReserveSeatAction";

/**
 *
 * @param {boolean} exampleSeat - Is seat currently displayed as example seat
 * @param {boolean} reserved    - Is seat currently reserved as reserved seat
 * @param {object} seat         - Seat object as specified in the API
 */
function Index({ exampleSeat, reserved, seat }) {
    const [chosen, setChosen] = useState(exampleSeat);

    const dispatch = useDispatch();

    useEffect(() => {
        /* Reserved seats are "untouchable" */
        if (!reserved) {
            chosen
                ? dispatch(reserveSeat(seat))
                : dispatch(setSeatAvailable(seat));
        }
    }, [dispatch, seat, chosen, reserved]);

    if (reserved) {
        return <Card style={{ backgroundColor: "#141414" }} />;
    } else {
        return (
            <Card
                style={
                    chosen
                        ? { backgroundColor: "#FFA500" }
                        : { backgroundColor: "#FFFFFF" }
                }
                onClick={() => {
                    setChosen(!chosen);
                }}
                hoverable
            />
        );
    }
}

export default Index;
