/* CSS */
import "./styles.css";

/* Ant Design */
import { Card } from "antd";

function Index({ exampleSeat, reserved }) {
    var backgroundColor = exampleSeat
        ? "#FFA500"
        : reserved
        ? "#141414"
        : "#FFFFFF";

    return <Card style={{ backgroundColor: backgroundColor }}></Card>;
}

export default Index;
