const express = require('express');
const bodyParser = require('body-parser');
const router = express.Router();
// const app = express();


// variables
const dataPath = './data/data.json';
// const dataPath = fs.readFile(path.join(__dirname, './data.json'));
const fs = require('fs');


const writeFile = (fileData, callback, filePath = dataPath, encoding = 'utf8') => {

    fs.writeFile(filePath, fileData, encoding, (err) => {
        if (err) {
            throw err;
        }

        callback();
    });
};

// READ
router.get('/', (req, res) => {
    fs.readFile(dataPath, 'utf8', (err, data) => {
        if (err) {
            throw err;
        }

        res.send(JSON.parse(data));
        });
});

// READ
router.get('/:userId', (req, res) => {
    fs.readFile(dataPath, 'utf8', (err, data) => {
        if (err) {
            throw err;
        }

        readData = JSON.parse(data);
        // console.log(Object.keys(readData), req.params.userId);
        // console.log(readData[req.params.userId]);

        if (Object.keys(readData).indexOf(req.params.userId) == -1){
            res.send('user not found');
        }else{
            // res.send('user not found');
            res.send(readData[req.params.userId]);
        }
        
        // res.send(readData[req.params.userId]);
        });
});


// CREATE
router.post('/', (req, res) => {

    fs.readFile(dataPath, 'utf8', (err, data) => {
        if (err) {
            throw err;
        }

        readData = JSON.parse(data)
        // const newUserId = String(Object.keys(readData).length + 1) ;
        const newUserId = String(req.body.id)

        console.log(Object.keys(readData))
        console.log(Object.keys(readData).indexOf(newUserId))

        if (Object.keys(readData).indexOf(newUserId) == -1){
            console.log('newUserId: ', newUserId)

            // add the new user
            const data1 = {
                "name": req.body.name,
                "password": req.body.password,
                "profession": req.body.profession,
                "id": req.body.id
            }
            readData[newUserId] = data1;

            writeFile(JSON.stringify(readData, null, 2), () => {
                res.status(200).send('new user added');
            });
        } else{
            res.send('user already exist')
        }
    });
    
});

// UPDATE
router.post('/:userId', (req, res) => {

    fs.readFile(dataPath, 'utf8', (err, data) => {
        if (err) {
            throw err;
        }

        readData = JSON.parse(data)

        console.log('newUserId: ', req.params.userId)

        if (Object.keys(readData).indexOf(req.params.userId) == -1){
            res.send('user does not exist')
        } else {

        // Update User
        const data1 = {
            "name": req.body.name,
            "password": req.body.password,
            "profession": req.body.profession,
            "id": req.body.id
        }
        if (String(req.params.userId) != String(req.body.id)){
            delete readData[req.params.userId]
            readData[String(req.body.id)] = data1;
        } else{
            readData[req.params.userId] = data1;
        }
        writeFile(JSON.stringify(readData, null, 2), () => {
            res.status(200).send('user data updated');
        });
        }
    });
});


// DELETE
router.delete('/:userId', (req, res) => {

    fs.readFile(dataPath, 'utf8', (err, data) => {
        if (err) {
            throw err;
        }

        readData = JSON.parse(data)

        console.log('newUserId: ', req.params.userId)

        if (Object.keys(readData).indexOf(req.params.userId) == -1){
            res.send('user does not exist')
        } else {
            delete readData[req.params.userId]
            writeFile(JSON.stringify(readData, null, 2), () => {
                res.status(200).send('user data deleted');
            });
        }
    });

});

// }

module.exports = router ;