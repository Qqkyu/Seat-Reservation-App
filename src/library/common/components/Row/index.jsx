/* Utilities */
import { includes } from "library/utilities/seatsMisc";

/* Components */
import Seat from "library/common/components/Seat";

/* CSS */
import "./styles.css";

/* Ant Design */
import { Row, Col } from "antd";

/**
 *
 * @param {array} row           - Current row of seats
 * @param {array} chosenSeats   - Example seats determined automatically from function
 * @param {number} curCol       - Current column (not seat)
 * @param {number} seatRow      - Current row
 */
function Index({ row, curCol, chosenSeats, seatRow }) {
    return (
        <Row wrap={false}>
            {row.map((seat) => {
                /* Insert empty columns if there are no seats */
                const seatCol = seat["cords"]["y"];
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
                                reserved={seat["reserved"]}
                                seat={seat}
                            />
                        </Col>
                    </>
                );
            })}
        </Row>
    );
}

export default Index;
