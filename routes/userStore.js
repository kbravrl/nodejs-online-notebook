let user = {
    username: "", // your username
    password: "", // your password
};

module.exports = {
    getUser: () => user,
    setUser: (newUser) => { user = newUser; },
};