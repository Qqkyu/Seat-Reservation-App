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
import { Layout, Spin, Space, Row, Col, Divider } from "antd";

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

    let seatAmount = useSelector((state) => state.seatAmount);
    let seatsTogether = useSelector((state) => state.seatsTogether);

    useEffect(() => {
        axios.get(`http://localhost:3000/seats`).then((res) => {
            const seats = res.data;
            const mappedSeats = mapSeatsObject(seats);
            dispatch(setAvailableSeats(mappedSeats));
            dispatch(availableSeatsLoaded(true));
        });
    }, [dispatch]);

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
                                        var exampleSeats = findSeats(
                                            seats[seatRow],
                                            seatAmount,
                                            seatsTogether
                                        );
                                        /* Update needed seats amount */
                                        seatAmount -= exampleSeats.length;
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
                                                                    exampleSeats
                                                                        ? includes(
                                                                              exampleSeats,
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
                                                            />
                                                        </Col>
                                                    </>
                                                );
                                            })}
                                        </Row>
                                    );
                                })}
                                <Divider>
                                    <Space direction="horizontal">
                                        <Seat reserved={false} /> Miejsca
                                        dostępne
                                        <Divider type="vertical" />
                                        <Seat reserved={true} /> Miejsca
                                        zarezerwowane
                                        <Divider type="vertical" />
                                        <Seat exampleSeat={true} /> Twój wybór
                                    </Space>
                                </Divider>
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

/**
 * Find given amount of seats.
 * @param {array} row - Array of seats in single row.
 * @returns {array} Array of example seats.
 */
function findSeats(row, amount, together = false) {
    let exampleSeats = [];
    if (together && amount > 1) {
        const seatsRowAmount = row.length;
        /* Iterate over possible "first" seats */
        for (let curSeat = 0; curSeat <= seatsRowAmount - amount; ++curSeat) {
            /* Push first seat in current iteration to result array */
            exampleSeats.push(row[curSeat]);
            /*
             * Save first seat column in current iteration
             * Start iterating only if first seat is not reserved - set separated flag to true if first seat is
             */
            let [prevSeatCol, separated] = [
                row[curSeat]["cords"]["y"],
                row[curSeat]["reserved"],
            ];
            for (let i = 1; i < amount && !separated; ++i) {
                /* Check if current seat is not reserved */
                if (row[curSeat + i]["reserved"]) {
                    separated = true;
                } else {
                    /* Save current seat's column and compare with previous seat's column */
                    const curSeatCol = row[curSeat + i]["cords"]["y"];
                    if (prevSeatCol + 1 !== curSeatCol) {
                        /* Seats are separated, break the loop */
                        separated = true;
                    } else {
                        /* Seats are next to each other, add seats to result and update prevSeatCol */
                        exampleSeats.push(row[curSeat + i]);
                        prevSeatCol = curSeatCol;
                    }
                }
            }
            /* Check loop result */
            if (separated) {
                /* Reset result array */
                exampleSeats = [];
            } else {
                /* Found given amount of seats next to each other - return result */
                return exampleSeats;
            }
        }
        /* Unable to find amount of given seats next to each other - return empty array */
        return [];
    } else {
        const seatsRowAmount = row.length;
        /* Iterate over all seats in given row */
        for (
            let curSeat = 0;
            curSeat < seatsRowAmount && exampleSeats.length < amount;
            ++curSeat
        ) {
            const seat = row[curSeat];
            /* Add seat only if it is not already reserved */
            if (!seat["reserved"]) {
                exampleSeats.push(seat);
            }
        }
        /* Return example seats even if it has less seats than given amount */
        return exampleSeats;
    }
}

/**
 * Check if given array of seats has seat with given cords.
 * @param {array} seats - Array of seats.
 * @param {x}
 * @param {y}
 * @returns {boolean}
 */
function includes(seats, x, y) {
    return (
        typeof seats.find((seat) => {
            return seat["cords"]["x"] === x && seat["cords"]["y"] === y;
        }) != "undefined"
    );
}

export default Index;
