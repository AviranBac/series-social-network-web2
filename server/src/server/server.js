const app = require('./app');
const { initConnection } = require('../db/db-connection');
const { initDB } = require('../init/init-database');

(async ()=> {
    await initConnection();
    initDB();

    app.listen(8080, () => {
        console.log("Server listening on port 8080!");
    });
})();
