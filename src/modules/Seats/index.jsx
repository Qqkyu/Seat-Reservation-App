/* React */
import React, { useEffect } from "react";
import { Link } from "react-router-dom";

/* Redux */
import { useSelector, useDispatch } from "react-redux";

/* Utilities */
import mapSeatsObject from "library/utilities/mapSeatsObject";
import findSeats from "library/utilities/findSeats";
import { countAvailableSeats, includes } from "library/utilities/seatsMisc";

/* Components */
import BottomNavbar from "library/common/components/BottomNavbar";
import Navbar from "library/common/components/Navbar";

import SeatsInfo from "library/common/components/SeatsInfo";
import Seat from "library/common/components/Seat";

/* CSS */
import "./seatsStyles.css";

/* Ant Design */
import {
    Layout,
    Spin,
    Space,
    Row,
    Col,
    Divider,
    Button,
    notification,
} from "antd";

/* Misc */
import axios from "axios";
import {
    setAvailableSeats,
    availableSeatsLoaded,
} from "library/common/actions/AvailableSeatsActions";

const { Header, Footer, Content } = Layout;

function Index() {
    const dispatch = useDispatch();

    const seatsLoaded = useSelector((state) => state.availableSeatsLoaded);
    const seats = useSelector((state) => state.availableSeats);

    const reservedSeats = useSelector((state) => state.reservedSeats);

    const requestedSeatAmount = useSelector((state) => state.seatAmount);
    const seatsTogether = useSelector((state) => state.seatsTogether);

    /* Helper variable to keep count of currently requested seats */
    let seatAmount = requestedSeatAmount;

    useEffect(() => {
        axios.get(`http://localhost:3000/seats`).then((res) => {
            const seats = res.data;

            /* Map and dispatch fetched data */
            const mappedSeats = mapSeatsObject(seats);
            dispatch(setAvailableSeats(mappedSeats));
            dispatch(availableSeatsLoaded(true));

            /* Check if amount of seats requested by user is available */
            const availableSeatsAmount = countAvailableSeats(seats);
            if (countAvailableSeats(seats) < requestedSeatAmount) {
                openNotification(
                    "error",
                    "Za mało dostępnych miejsc!",
                    `Nie znaleźliśmy wybranej ilości miejsc. Liczba dostępnych miejsc to ${availableSeatsAmount}.`
                );
            }
        });
    }, [dispatch, requestedSeatAmount]);

    const openNotification = (type, message, description) => {
        notification[type]({
            message,
            description,
        });
    };

    return (
        <>
            <Layout className="layout">
                <Header className="navbar">
                    <Navbar />
                </Header>
                <Content>
                    {seatsLoaded ? (
                        <div className="site-content">
                            <div className="seat-grid">
                                {seats.map((row, seatRow) => {
                                    /* Keep count of current column */
                                    let curCol = 0;

                                    /* Find example seats at current row if needed */
                                    if (seatAmount > 0) {
                                        var chosenSeats = findSeats(
                                            seats[seatRow],
                                            seatAmount,
                                            seatsTogether
                                        );
                                        /* Update needed seats amount */
                                        seatAmount -= chosenSeats.length;
                                    }

                                    return (
                                        <Row wrap={false}>
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
                                                                exampleSeat={
                                                                    chosenSeats
                                                                        ? includes(
                                                                              chosenSeats,
                                                                              seatRow,
                                                                              seatCol
                                                                          )
                                                                        : false
                                                                }
                                                                reserved={
                                                                    seat[
                                                                        "reserved"
                                                                    ]
                                                                }
                                                                seatId={
                                                                    seat["id"]
                                                                }
                                                            />
                                                        </Col>
                                                    </>
                                                );
                                            })}
                                        </Row>
                                    );
                                })}
                                <Divider direction="vertical">
                                    <SeatsInfo />
                                    <Divider style={{ marginTop: 30 }}>
                                        {reservedSeats.length === 0 ? (
                                            <Button
                                                type="primary"
                                                className="reserve-button"
                                                onClick={(e) =>
                                                    openNotification(
                                                        "error",
                                                        "Za mało wybranych miejsc!",
                                                        "Proszę wybrać przynajmniej jedno miejsce do rezerwacji."
                                                    )
                                                }
                                            >
                                                Rezerwuj
                                            </Button>
                                        ) : (
                                            <Link to="/summary">
                                                <Button
                                                    type="primary"
                                                    className="reserve-button"
                                                >
                                                    Rezerwuj
                                                </Button>
                                            </Link>
                                        )}
                                    </Divider>
                                </Divider>
                            </div>
                        </div>
                    ) : (
                        <div className="site-content seat-grid-loading">
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

export default Index;
