/* React */
import { useState } from "react";

/* CSS */
import "./styles.css";

/* Ant Design */
import { Card } from "antd";

function Index({ exampleSeat, reserved }) {
    const [chosen, setChosen] = useState(exampleSeat);

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
                onClick={() => setChosen(!chosen)}
                hoverable
            />
        );
    }
}

export default Index;
