const { Router } = require('express');
const { auth, db } = require('./../firebase');

const router = new Router();


router.get('/', async (req, res) => {

    try {
        // create empty array
        const dbArray = []

        // get all from collection games
        const getDB = await db.collection('games').get()
        getDB.forEach(game => {
            dbArray.push(game.data())
        });

        res.status(200).send(dbArray)


    } catch (err) {
        console.error(err)
        res.status(500).send(err)
    }
})


router.post('/', async (req, res) => {

    try {
        // get the right date for posting.
        let date = new Date().toDateString();
        // post in new object with, id, timeStamp, contestants, winner
        await db.collection('games').doc().set({
            id: req.body.id,
            timeStamp: date,
            contestants: req.body.contestants,
            winner: req.body.winner
        })
        res.status(200).send({ msg: "game is on" })

    } catch (err) {
        console.error(err)

        res.status(500).send(err)
    }

})



module.exports = router;