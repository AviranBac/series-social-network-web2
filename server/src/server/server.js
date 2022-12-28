const app = require('./app');
const { initMongoConnection } = require("../db/mongo/mongo-connection");

(async () => {
    await initMongoConnection();

    app.listen(8080, () => {
        console.log("Server listening on port 8080!");
    });
})();
