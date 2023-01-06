const { query } = require('express-validator/check')

const validate = () => {
    return [
        query('pageNumber').custom((value) => {
            if (value < 1) {
                throw new Error('Page number must be grather than 1');
            }
            return true;
        })
       ];
};

module.exports = validate;