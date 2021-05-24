/* React */
import React, { useEffect } from "react";

/* Redux */
import { useSelector, useDispatch } from "react-redux";

/* Components */
import BottomNavbar from "library/common/components/BottomNavbar";
import Navbar from "library/common/components/Navbar";
import Seat from "library/common/components/Seat";

/* CSS */
import "./seatsStyles.css";

/* Ant Design */
import { Layout, Spin, Space, Row, Col } from "antd";

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
            const mappedSeats = mapSeatsObject(seats);
            dispatch(setAvailableSeats(mappedSeats));
            dispatch(availableSeatsLoaded(true));
        });
    }, [dispatch]);

    const seatsLoaded = useSelector((state) => state.availableSeatsLoaded);
    const seats = useSelector((state) => state.availableSeats);

    const seatAmount = useSelector((state) => state.seatAmount);
    const seatsTogether = useSelector((state) => state.seatsTogether);

    return (
        <>
            <Layout className="layout">
                <Header className="navbar">
                    <Navbar />
                </Header>
                <Content>
                    {seatsLoaded ? (
                        <div className="site-content">
                            <div>
                                {seats.map((row, seatRow) => {
                                    let curCol = 0;
                                    return (
                                        <Row>
                                            {row.map((seat) => {
                                                /* Insert empty columns if there are no seats */
                                                const seatCol =
                                                    seat["cords"]["y"];
                                                /* Store empty columns (if any) in "emptySeats" array */
                                                const emptySeats = [];
                                                while (curCol < seatCol) {
                                                    /* Push empty column */
                                                    emptySeats.push(
                                                        <Col
                                                            style={{
                                                                width: 50,
                                                            }}
                                                        ></Col>
                                                    );
                                                    ++curCol;
                                                }
                                                /* Always increment current seat column */
                                                ++curCol;
                                                return (
                                                    <>
                                                        {emptySeats}
                                                        <Col
                                                            style={{
                                                                width: 50,
                                                            }}
                                                        >
                                                            <Seat
                                                                reserved={
                                                                    seat[
                                                                        "reserved"
                                                                    ]
                                                                }
                                                            />
                                                        </Col>
                                                    </>
                                                );
                                            })}
                                        </Row>
                                    );
                                })}
                            </div>
                        </div>
                    ) : (
                        <div className="site-loading-content">
                            <Space size="middle">
                                <Spin size="large" />
                            </Space>
                        </div>
                    )}
                </Content>
                <Footer>
                    <BottomNavbar />
                </Footer>
                )
            </Layout>
        </>
    );
}

/**
 * Map seats array into seats array of arrays where x cords are indices.
 * @param {object} seats - The available seats fetched from the API.
 * @returns {array}
 */
function mapSeatsObject(seats) {
    const seatsArray = [];

    for (const seat of seats) {
        const row = seat["cords"]["x"];
        // Check whether there are any seats at current row
        if (typeof seatsArray[row] != "undefined") {
            seatsArray[row].push(seat);
        } else {
            seatsArray[row] = [seat];
        }
    }

    return seatsArray;
}

export default Index;
