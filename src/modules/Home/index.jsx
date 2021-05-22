import React, { useState } from "react";

/* Components */
import BottomNavbar from "library/common/components/BottomNavbar";
import Navbar from "library/common/components/Navbar";

/* CSS */
import "./homeStyles.css";

/* Ant Design */
import { Form, InputNumber, Button, Layout, Checkbox } from "antd";

const { Header, Footer, Content } = Layout;

function Index() {
    const [form] = Form.useForm();
    const [seatAmount, setSeatAmount] = useState();
    const [seatsSideBySide, setSeatsSideBySide] = useState(false);

    return (
        <Layout className="layout">
            <Header>
                <Navbar />
            </Header>
            <Content>
                <div className="site-content">
                    <Form
                        form={form}
                        initialValues={{
                            layout: "inline",
                        }}
                        className="seats-form"
                    >
                        <Form.Item
                            label="Liczba miejsc:"
                            style={{ width: 240 }}
                        >
                            <InputNumber
                                min={1}
                                max={10}
                                onChange={setSeatAmount}
                                className="seats-input"
                            />
                        </Form.Item>
                        <Form.Item>
                            <Checkbox onChange={setSeatsSideBySide}>
                                Czy miejsca mają być obok siebie?
                            </Checkbox>
                        </Form.Item>
                        <Form.Item>
                            <Button
                                type="primary"
                                className="choose-seats-button"
                            >
                                Wybierz miejsca
                            </Button>
                        </Form.Item>
                    </Form>
                </div>
            </Content>
            <Footer>
                <BottomNavbar />
            </Footer>
        </Layout>
    );
}

export default Index;
