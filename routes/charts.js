const { Router } = require('express');
const { auth, db } = require('./../firebase');

const router = new Router();

router.get('/top', async (req, res) => {
    try {
        // create empty array
        let chartsArray = []
        // get into collection hamster and go trough wins and get 5 with most wins.
        let snapshot = await db.collection('hamsters').orderBy('wins', 'desc').limit(5).get()

        snapshot.forEach(hamster => {
            chartsArray.push(hamster.data())
        })

        res.status(200).send(chartsArray)
    } catch (err) {
        console.error(err)
        res.status(500).send(err)
    }

})



router.get('/bottom', async (req, res) => {
    try {
        let chartsArray = []
        // get into collection hamster and go trough defeats and get 5 with most defeats.
        let snapshot = await db.collection('hamsters').orderBy('defeats', 'desc').limit(5).get()

        snapshot.forEach(doc => {
            // push the data into the empty array
            chartsArray.push(doc.data())
        })

        res.status(200).send(chartsArray)
    } catch (err) {
        console.error(err)
        res.status(500).send(err)
    }
})






module.exports = router;