/* Redux */
import { combineReducers } from "redux";

/* Reducers */
import seatsTogether from "library/common/reducers/SeatsTogetherReducer";
import seatAmount from "library/common/reducers/SeatAmountReducer";

const rootReducer = combineReducers({
    seatsTogether,
    seatAmount,
});

export default rootReducer;
