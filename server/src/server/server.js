const app = require('./app');
const { initConnection } = require('../db/db-connection');

(async ()=> {
    await initConnection();

    app.listen(8080, () => {
        console.log("Server listening on port 8080!");
    });
})();
