/* React */
import React from "react";
import { Link } from "react-router-dom";

/* Redux */
import { setSeatsTogether } from "library/common/actions/SeatsTogetherActions";
import { setSeatAmount } from "library/common/actions/SeatAmountActions";
import { useDispatch } from "react-redux";

/* Components */
import BottomNavbar from "library/common/components/BottomNavbar";
import Navbar from "library/common/components/Navbar";

/* CSS */
import "./homeStyles.css";

/* Ant Design */
import { Form, InputNumber, Button, Layout, Checkbox } from "antd";

const { Header, Footer, Content } = Layout;

function Index() {
    /* Page specific attributes */
    document
        .getElementById("viewport")
        .setAttribute("content", "width=device-width, initial-scale=1");
    document.body.style.minWidth = "unset";

    const [form] = Form.useForm();

    const dispatch = useDispatch();

    return (
        <Layout className="layout">
            <Header className="navbar">
                <Navbar />
            </Header>
            <Content className="home-site-content">
                <Form
                    form={form}
                    initialValues={{
                        layout: "inline",
                    }}
                    className="seats-form"
                >
                    <Form.Item label="Liczba miejsc:" style={{ width: 240 }}>
                        <InputNumber
                            min={1}
                            max={150}
                            defaultValue={1}
                            onBlur={(e) => {
                                dispatch(setSeatAmount(e.target.value));
                            }}
                            className="seats-input"
                        />
                    </Form.Item>
                    <Form.Item>
                        <Checkbox
                            onChange={(e) => {
                                dispatch(setSeatsTogether(e.target.checked));
                            }}
                        >
                            Czy miejsca mają być obok siebie?
                        </Checkbox>
                    </Form.Item>
                    <Form.Item>
                        <Link to={`/seats`}>
                            <Button
                                type="primary"
                                className="choose-seats-button"
                            >
                                Wybierz miejsca
                            </Button>
                        </Link>
                    </Form.Item>
                </Form>
            </Content>
            <Footer>
                <BottomNavbar />
            </Footer>
        </Layout>
    );
}

export default Index;
