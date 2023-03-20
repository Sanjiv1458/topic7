const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://sanjiv123:sanjiv123@cluster0.uhu6z5q.mongodb.net/mydb', { useNewUrlParser: true, useUnifiedTopology: true });
const express = require('express');
const Device = require('./models/device');
const app = express();
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
const port = 5000;

app.get('/api/test', (req, res) => {
    res.send('The API is working!');
});

app.listen(port, () => {
    console.log(`listening on port ${port}`);
});

app.get('/api/devices', async (req, res) => {
    try {
        const err = await Device.find({});
        res.send(err)
    } catch (e) {
        console.log(e);
    }
});
app.post('/api/devices', async (req, res) => {
    const { name, user, sensorData } = req.body;
    const newDevice = new Device({
        name,
        user,
        sensorData
    });
    try {
        const err = await newDevice.save({})
        res.send(err)
    } catch (e) {
        console.log(e);
    }
});
app.delete('/api/devices', async (req, res) => {
    const Uname = req.body.Uname;
    const query = { name: Uname };
    try {
        const err = await Device.findOneAndDelete(query)
        res.send(err)
    } catch (e) {
        console.log(e);
    }
});


/**
* @api {get} /api/devices AllDevices An array of all devices
* @apiGroup Device
* @apiSuccessExample {json} Success-Response:
*  [
*    {
*      "_id": "dsohsdohsdofhsofhosfhsofh",
*      "name": "Mary's iPhone",
*      "user": "mary",
*      "sensorData": [
*        {
*          "ts": "1529542230",
*          "temp": 12,
*          "loc": {
*            "lat": -37.84674,
*            "lon": 145.115113
*          }
*        },
*        {
*          "ts": "1529572230",
*          "temp": 17,
*          "loc": {
*            "lat": -37.850026,
*            "lon": 145.117683
*          }
*        }
*      ]
*    }
*  ]
* @apiErrorExample {json} Error-Response:
*  {
*    "User does not exist"
*  }
*/

app.use(express.static(`${__dirname}/public/generated-docs`));

app.get('/docs', (req, res) => {
  res.sendFile(`${__dirname}/public/generated-docs/index.html`);
});