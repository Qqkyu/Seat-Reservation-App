/* React */
import React, { useState, useEffect } from "react";

/* Redux */
import { useSelector } from "react-redux";

/* Components */
import BottomNavbar from "library/common/components/BottomNavbar";
import Navbar from "library/common/components/Navbar";

/* CSS */
import "./seatsStyles.css";

/* Misc */
import axios from "axios";

/* Ant Design */
import { Layout } from "antd";

const { Header, Footer, Content } = Layout;

function Index() {
    const [seats, setSeats] = useState({});

    useEffect(() => {
        axios.get(`http://localhost:3000/seats`).then((res) => {
            const seats = res.data;
            setSeats(seats);
        });
    }, []);

    const seatAmount = useSelector((state) => state.seatAmount);
    const seatsTogether = useSelector((state) => state.seatsTogether);

    return (
        <Layout className="layout">
            <Header className="navbar">
                <Navbar />
            </Header>
            <Content>
                <div className="site-content">
                    <h1>Seats grid...</h1>
                    <h2>{`seatAmount: ${seatAmount}`}</h2>
                    <h2>{`seatsTogether: ${seatsTogether}`}</h2>
                </div>
            </Content>
            <Footer>
                <BottomNavbar />
            </Footer>
        </Layout>
    );
}

export default Index;
