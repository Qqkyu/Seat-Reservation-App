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

function Index({ exampleSeat, reserved, seatId }) {
    const [chosen, setChosen] = useState(exampleSeat);

    const dispatch = useDispatch();

    useEffect(() => {
        chosen
            ? dispatch(reserveSeat(seatId))
            : dispatch(setSeatAvailable(seatId));
    }, [dispatch, seatId, chosen]);

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
