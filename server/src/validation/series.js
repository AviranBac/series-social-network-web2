const { query } = require('express-validator/check')

const validate = () => {
    return [
        query('pageNumber').custom((value) => {
            if (value < 1) {
                throw new Error('Page number must be grather than 1');
            }
            return true;
        }),
        query('genres').custom(value => {
            if (value && !Array.isArray(value)) {
                throw new Error('genres must be an array');
            }
            return true;
        }),
        query('statuses').custom(value => {
            if (value && !Array.isArray(value)) {
                throw new Error('statuses must be an array');
            }
            return true;
        })
       ];
};

module.exports = validate;