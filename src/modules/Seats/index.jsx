/* React */
import React, { useState, useEffect } from "react";
import { useParams } from "react-router";

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
    const { seatsAmount, SBS } = useParams();
    const [seats, setSeats] = useState({});

    useEffect(() => {
        axios.get(`http://localhost:3000/seats`).then((res) => {
            const seats = res.data;
            setSeats(seats);
        });
    }, []);

    return (
        <Layout className="layout">
            <Header className="navbar">
                <Navbar />
            </Header>
            <Content>
                <div className="site-content">
                    <h1>Seats grid...</h1>
                </div>
            </Content>
            <Footer>
                <BottomNavbar />
            </Footer>
        </Layout>
    );
}

export default Index;
