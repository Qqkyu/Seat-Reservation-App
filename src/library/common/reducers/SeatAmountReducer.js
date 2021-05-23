const seatAmount = (state = 1, action) => {
    switch (action.type) {
        case "SET_AMOUNT":
            return action.payload;
        default:
            return state;
    }
};

export default seatAmount;
