/**
 * Keep track of whether user wants seats together
 */
const seatsTogether = (state = false, action) => {
    switch (action.type) {
        case "SET_TOGETHER":
            return action.payload;
        default:
            return state;
    }
};

export default seatsTogether;
