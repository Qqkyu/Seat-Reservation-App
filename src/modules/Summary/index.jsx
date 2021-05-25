/* React */
import React from "react";

/* Redux */
import { useSelector, useDispatch } from "react-redux";

/* Components */
import BottomNavbar from "library/common/components/BottomNavbar";
import Navbar from "library/common/components/Navbar";

/* CSS */
import "./summaryStyles.css";

/* Misc */
import { setSeatAsReserved } from "library/common/actions/AvailableSeatsActions";

/* Ant Design */
import { Layout, Result } from "antd";

const { Header, Footer, Content } = Layout;

function Index() {
    const dispatch = useDispatch();

    const reservedSeats = useSelector((state) => state.reservedSeats);

    /* Mark chosen seats as reserved */
    reservedSeats.forEach((seat) => {
        dispatch(setSeatAsReserved(seat));
    });

    return (
        <Layout className="layout">
            <Header className="navbar">
                <Navbar />
            </Header>
            <Content>
                <div className="site-content">
                    <Result
                        status="success"
                        title="Twoja rezerwacja przebiegła pomyślnie!"
                        subTitle="Wybrałeś miejsca: "
                        extra={[
                            ...reservedSeats.map((seat) => {
                                const cords = seat["cords"];
                                return (
                                    <p>{`- rząd ${cords["x"]}, miejsce ${cords["y"]} (${seat["id"]})`}</p>
                                );
                            }),
                            ...[
                                <p>
                                    Dziękujemy! W razie problemów prosimy o
                                    kontakt z działem administracji.
                                </p>,
                            ],
                        ]}
                    />
                </div>
            </Content>
            <Footer>
                <BottomNavbar />
            </Footer>
        </Layout>
    );
}

export default Index;
