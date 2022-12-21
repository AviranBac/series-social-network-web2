const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

const cors = require('cors');
app.use(cors({
    origin: '*',
    credentials: true,
    optionSuccessStatus: 200
}));

app.listen(8080, () => {
    console.log("Server listening on port 8080!");
});