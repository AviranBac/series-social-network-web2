const pageLimit = 10;

const paginationQuery = (pageNumber) => ([
    { $skip: pageLimit * (parseInt(pageNumber) - 1) },
    { $limit: pageLimit },
]);

module.exports = { paginationQuery };