import seatsTogether from "library/common/reducers/SeatsTogetherReducer";
import seatAmount from "library/common/reducers/SeatAmountReducer";

import { combineReducers } from "redux";

const rootReducer = combineReducers({
    seatsTogether,
    seatAmount,
});

export default rootReducer;
