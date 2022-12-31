const { body } = require('express-validator/check')

const validate = () => {
    return [
        body('emailFrom', 'Invalid email').exists().isEmail(),
        body('emailTo', 'Invalid email').exists().isEmail(),
        body('emailTo').custom((value, { req }) => {
            if (value === req.body.emailFrom) {
                throw new Error(`Email ${req.body.emailFrom} cannot follow itself!`);
            }
            return true;
        }),
        body('action').isIn(['ADD', 'REMOVE'])
       ];
};

module.exports = validate;