/* Redux */
import { combineReducers } from "redux";

/* Reducers */
import availableSeatsLoaded from "library/common/reducers/AvailableSeatsLoadedReducer";
import availableSeats from "library/common/reducers/AvailableSeatsReducer";
import reservedSeats from "library/common/reducers/ReservedSeatsReducer";
import seatsTogether from "library/common/reducers/SeatsTogetherReducer";
import seatAmount from "library/common/reducers/SeatAmountReducer";

const rootReducer = combineReducers({
    availableSeatsLoaded,
    availableSeats,
    reservedSeats,
    seatsTogether,
    seatAmount,
});

export default rootReducer;
