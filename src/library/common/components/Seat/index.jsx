/* CSS */
import "./styles.css";

/* Ant Design */
import { Card } from "antd";

function Index({ reserved }) {
    return (
        <Card
            style={
                reserved
                    ? { backgroundColor: "#141414" }
                    : { backgroundColor: "#FFFFFF" }
            }
        ></Card>
    );
}

export default Index;
