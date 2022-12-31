const { body } = require('express-validator/check')

const Series = require('../db/mongo/models/series');
const Seasons = require('../db/mongo/models/season');
const Episodes = require('../db/mongo/models/episode');

const entityTypeToModel = {
    'SERIES': Series, 
    'SEASON': Seasons, 
    'EPISODE': Episodes
}

const validate = () => {
    return [
        body('email', 'Invalid email').exists().isEmail(),
        body('action').isIn(['ADD', 'REMOVE']),
        body('entityType').isIn(['SERIES', 'SEASON', 'EPISODE']),
        body('entityId').custom(async (entityId, { req }) => {
            let entityExistsError;
            try {
                const entityExists = !!(await entityTypeToModel[req.body.entityType].findById(entityId));
        
                if (!entityExists) {
                    entityExistsError = `EntityId ${entityId} does not exist for entityType ${entityType}`
                }
            } catch (e) {
                entityExistsError = `Failed to find ${entityId} for entityType ${req.body.entityType}, Error: ${e}`;
            }

            if (entityExistsError) {
                throw new Error(entityExistsError);
            }
            
            return true;
        }),
       ];
};

module.exports = validate;