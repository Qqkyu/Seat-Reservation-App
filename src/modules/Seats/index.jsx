/* React */
import React, { useEffect } from "react";

/* Redux */
import { useSelector, useDispatch } from "react-redux";

/* Components */
import BottomNavbar from "library/common/components/BottomNavbar";
import Navbar from "library/common/components/Navbar";

/* CSS */
import "./seatsStyles.css";

/* Ant Design */
import { Layout, Spin, Space } from "antd";

/* Misc */
import axios from "axios";
import {
    setAvailableSeats,
    availableSeatsLoaded,
} from "library/common/actions/AvailableSeatsActions";

const { Header, Footer, Content } = Layout;

function Index() {
    const dispatch = useDispatch();

    useEffect(() => {
        axios.get(`http://localhost:3000/seats`).then((res) => {
            const seats = res.data;
            dispatch(setAvailableSeats(seats));
            dispatch(availableSeatsLoaded(true));
        });
    }, [dispatch]);

    const seatsLoaded = useSelector((state) => state.availableSeatsLoaded);
    const seatAmount = useSelector((state) => state.seatAmount);
    const seatsTogether = useSelector((state) => state.seatsTogether);

    return (
        <>
            <Layout className="layout">
                <Header className="navbar">
                    <Navbar />
                </Header>
                <Content>
                    <div className="site-content">
                        {seatsLoaded ? (
                            <>
                                <h1>Seats grid...</h1>
                                <h2>{`seatAmount: ${seatAmount}`}</h2>
                                <h2>{`seatsTogether: ${seatsTogether}`}</h2>
                            </>
                        ) : (
                            <Space size="middle">
                                <Spin size="large" />
                            </Space>
                        )}
                    </div>
                </Content>
                <Footer>
                    <BottomNavbar />
                </Footer>
                )
            </Layout>
        </>
    );
}

export default Index;
