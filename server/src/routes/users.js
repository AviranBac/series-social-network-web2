const { firebaseAdminConnection } = require("../db/firebase/firebase-connection");
const express = require("express");

const router = express.Router();
const PAGE_SIZE = 10;

router.get('', async (req, res) => {
    const usersResponse = await firebaseAdminConnection.auth().listUsers();
    const currentPage = req.query.page;
    const emailSearchValue  = req.query.emailSearchValue;
    const displayNameSearchValue = req.query.displayNameSearchValue;
    const creationTimeSearchValue = req.query.creationTimeSearchValue;

    let users = usersResponse.users.map(user => ({
        email: user.email,
        displayName: user.displayName,
        creationTime: new Date(user.metadata.creationTime),
        lastSignInTime: new Date(user.metadata.lastSignInTime)
    }));
    
    if (emailSearchValue || displayNameSearchValue || creationTimeSearchValue) {  
            users = users.filter((user) => {
                let isEmailMatched = user.email && user.email.toLowerCase().includes(emailSearchValue.toLowerCase());
                let isDisplayNameMatched = user.displayName && user.displayName.toLowerCase().includes(displayNameSearchValue.toLowerCase());
                let isCreationTimeMatched = user.creationTime && (user.creationTime).getTime() <  new Date(creationTimeSearchValue).getTime();
                return isEmailMatched && isDisplayNameMatched && isCreationTimeMatched;
            });
    }

    const response = {
        users: users.slice((currentPage - 1) * PAGE_SIZE, (currentPage - 1) * PAGE_SIZE + PAGE_SIZE),
        totalElements: users.length
    }    

    res.send(response);
});

module.exports = {
    userRouter: router
};
