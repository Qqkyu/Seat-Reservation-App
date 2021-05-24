/* Ant Design */
import { Space, Divider, Card } from "antd";

function Index() {
    return (
        <Space direction="horizontal" size="large">
            <Card
                style={{
                    backgroundColor: "#FFFFFF",
                }}
            />
            Miejsca dostępne
            <Divider type="vertical" />
            <Card
                style={{
                    backgroundColor: "#141414",
                }}
            />
            Miejsca zarezerwowane
            <Divider type="vertical" />
            <Card
                style={{
                    backgroundColor: "#FFA500",
                }}
            />
            Twój wybór
        </Space>
    );
}

export default Index;
