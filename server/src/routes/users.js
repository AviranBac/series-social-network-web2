const { firebaseAdminConnection } = require("../db/firebase/firebase-connection");
const express = require("express");

const router = express.Router();
const PAGE_SIZE = 10;

router.get('', async (req, res) => {
    const usersResponse = await firebaseAdminConnection.auth().listUsers();
    
    const users = usersResponse.users.map(user => ({
        email: user.email,
        displayName: user.displayName,
        creationTime: new Date(user.metadata.creationTime),
        lastSignInTime: new Date(user.metadata.lastSignInTime)
    }));

    const currentPage = req.query.page;
    
    const response = {
        users: users.slice((currentPage - 1) * PAGE_SIZE, (currentPage - 1) * PAGE_SIZE + PAGE_SIZE),
        totalAmount: users.length
    }    
    res.send(response);
});

module.exports = {
    userRouter: router
};
