const { firebaseAdminConnection } = require("../db/firebase/firebase-connection");
const express = require("express");

const router = express.Router();

router.get('', async (req, res) => {
    const usersResponse = await firebaseAdminConnection.auth().listUsers();

    const users = usersResponse.users.map(user => ({
        email: user.email,
        displayName: user.displayName,
        creationTime: new Date(user.metadata.creationTime),
        lastSignInTime: new Date(user.metadata.lastSignInTime)
    }));

    res.send(users);
});

module.exports = {
    userRouter: router
};