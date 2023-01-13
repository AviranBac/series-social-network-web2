const Follows = require("../db/mongo/models/follow");

const searchFollowings = async (email, pageNumber, pageLimit) => {
    // const totalAmount = (await Follows.find({ email_from: email}).exec()).length;
    // const data = await Follows.aggregate([
    //     { $match: { email_from: email }},
    //     ...paginationQuery(pageNumber, pageLimit)
    // ]).exec();
    // return { data, totalAmount };
    const aggregationQuery = [  
        { $match: { email_from: email }} 
    ];
    const data = await Follows.aggregate([...aggregationQuery, ...paginationQuery(pageNumber, pageLimit)]);
    const dataTotalAmount = await Follows.aggregate([...aggregationQuery, { $count: "count" }]);
    const totalAmount = dataTotalAmount[0] ? dataTotalAmount[0].count : 0;
    
    return { data, totalAmount };
};

const searchFollowers = async (email, pageNumber, pageLimit) => {
    // const totalAmount = (await Follows.find({ email_to: email }).exec()).length;
    // const data = await Follows.aggregate([
    //     { $match: { email_to: email }},
    //     ...paginationQuery(pageNumber, pageLimit)
    // ]).exec();
    // return { data, totalAmount };
    const aggregationQuery = [  
        { $match: { email_to: email }} 
    ];
    const data = await Follows.aggregate([...aggregationQuery, ...paginationQuery(pageNumber, pageLimit)]);
    const dataTotalAmount = await Follows.aggregate([...aggregationQuery, { $count: "count" }]);
    const totalAmount = dataTotalAmount[0] ? dataTotalAmount[0].count : 0;
    
    return { data, totalAmount };
};
    
const isFollowingExist = async (emailFrom, emailTo) => {
    return Follows.exists({ email_to: emailTo, email_from: emailFrom}).exec();
};

const addFollow = async (emailFrom, emailTo) => {
    return Follows.findOneAndUpdate(
        { email_from: emailFrom, email_to: emailTo },
        { email_from: emailFrom, email_to: emailTo },
        { upsert: true, new: true }
    );
};

const removeFollow = async (emailFrom, emailTo) => {
    return Follows.findOneAndRemove({ email_from: emailFrom, email_to: emailTo });
};

const paginationQuery = (pageNumber, pageLimit) => ([
    { $skip: pageLimit * (parseInt(pageNumber) - 1) },
    { $limit: pageLimit },
]);

module.exports = {
    searchFollowers,
    searchFollowings,
    isFollowingExist,
    addFollow,
    removeFollow
}