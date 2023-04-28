
const localStorageMiddleware = (store) => (next) => (action) => {
    if (action.type == "auth/login") {
        const { token, userId, email, username, joinedDate } = action.payload;
        const userData = { token, userId, email, username, joinedDate };
        localStorage.setItem("userData", JSON.stringify(userData));
        localStorage.setItem("existingUser", 'true')
    }
    else if (action.type == "auth/logout") {
        localStorage.removeItem("userData");
    }

    next(action);
};

export default localStorageMiddleware;
