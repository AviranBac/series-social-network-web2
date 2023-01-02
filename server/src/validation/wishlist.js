const { body } = require('express-validator/check')

const Series = require('../db/mongo/models/series');

const validate = () => {
    return [
        body('action').isIn(['ADD', 'REMOVE']),
        body('email', 'Invalid email').exists().isEmail(),
        body('seriesId').custom(async (seriesId) => {
            let entityExistsError;
            try {
                const entityExists = !!(await Series.findById(seriesId));

                if (!entityExists) {
                    entityExistsError = `seriesId ${seriesId} does not exist`;
                }
            } catch (e) {
                entityExistsError = `Failed to find series id ${seriesId}. Error: ${e}`;
            }

            if (entityExistsError) {
                throw new Error(entityExistsError);
            }

            return true;
        }),
    ];
};

module.exports = validate;
