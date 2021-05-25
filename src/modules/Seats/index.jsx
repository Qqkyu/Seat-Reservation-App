/* React */
import React, { useEffect } from "react";

/* Redux */
import { useSelector, useDispatch } from "react-redux";

/* Utilities */
import mapSeatsObject from "library/utilities/mapSeatsObject";
import findSeats from "library/utilities/findSeats";
import {
    countLoadedAvailableSeats,
    countAvailableSeats,
} from "library/utilities/seatsMisc";

/* Components */
import ReserveButton from "library/common/components/ReserveButton";
import BottomNavbar from "library/common/components/BottomNavbar";
import Navbar from "library/common/components/Navbar";

import SeatsInfo from "library/common/components/SeatsInfo";
import SeatsRow from "library/common/components/Row";

/* CSS */
import "./seatsStyles.css";

/* Ant Design */
import { Layout, Spin, Space, Divider, notification } from "antd";

/* Misc */
import axios from "axios";
import {
    setAvailableSeats,
    availableSeatsLoaded,
} from "library/common/actions/AvailableSeatsActions";

const { Header, Footer, Content } = Layout;

function Index() {
    /* Page specific attributes */
    document
        .getElementById("viewport")
        .setAttribute(
            "content",
            "width=820px, initial-scale=1, user-scalable=yes"
        );

    const dispatch = useDispatch();

    const seatsLoaded = useSelector((state) => state.availableSeatsLoaded);
    const seats = useSelector((state) => state.availableSeats);

    const reservedSeats = useSelector((state) => state.reservedSeats);

    const requestedSeatAmount = useSelector((state) => state.seatAmount);
    const seatsTogether = useSelector((state) => state.seatsTogether);

    /* Helper variable to keep count of currently requested seats */
    let seatAmount = requestedSeatAmount;

    useEffect(() => {
        if (seatsLoaded) {
            /* Check if amount of seats requested by user is available */
            const availableSeatsAmount = countLoadedAvailableSeats(seats);
            if (availableSeatsAmount < requestedSeatAmount) {
                /* Not enough available seats - notify user */
                openNotification(
                    "error",
                    "Za mało dostępnych miejsc!",
                    `Nie znaleźliśmy wybranej ilości miejsc. Liczba dostępnych miejsc to ${availableSeatsAmount}.`
                );
            }
        } else {
            /* First time - fetch available seats from the API */
            axios.get(`http://localhost:3000/seats`).then((res) => {
                const seats = res.data;

                /* Map and dispatch fetched data */
                const mappedSeats = mapSeatsObject(seats);
                dispatch(setAvailableSeats(mappedSeats));
                dispatch(availableSeatsLoaded(true));

                /* Check if amount of seats requested by user is available */
                const availableSeatsAmount = countAvailableSeats(seats);
                if (availableSeatsAmount < requestedSeatAmount) {
                    /* Not enough available seats - notify user */
                    openNotification(
                        "error",
                        "Za mało dostępnych miejsc!",
                        `Nie znaleźliśmy wybranej ilości miejsc. Liczba dostępnych miejsc to ${availableSeatsAmount}.`
                    );
                }
            });
        }
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
                        <div className="seats-site-content">
                            <div className="seat-grid">
                                {
                                    /* Map every row into seats */
                                    seats.map((row, seatRow) => {
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
                                            <SeatsRow
                                                row={row}
                                                curCol={curCol}
                                                chosenSeats={chosenSeats}
                                                seatRow={seatRow}
                                            />
                                        );
                                    })
                                }
                                <Divider direction="vertical">
                                    <SeatsInfo />
                                    <ReserveButton
                                        openNotification={openNotification}
                                        chosenSeatsAmount={reservedSeats.length}
                                    />
                                </Divider>
                            </div>
                        </div>
                    ) : (
                        <div className="seats-site-content">
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
