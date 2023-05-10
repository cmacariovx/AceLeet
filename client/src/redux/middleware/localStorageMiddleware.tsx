import { Middleware } from "redux";

const localStorageMiddleware: Middleware = (store) => (next) => (action) => {
    if (action.type == "auth/login") {
        const { token, userId, email, username, joinedDate } = action.payload;
        const userDatax = { token, userId, email, username, joinedDate };
        localStorage.setItem("userDatax", JSON.stringify(userDatax));
        localStorage.setItem("existingUser", 'true')
    }
    else if (action.type == "auth/logout") {
        localStorage.removeItem("userDatax");
    }

    next(action);
};

export default localStorageMiddleware;
