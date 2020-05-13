const { Router } = require('express');
const { auth, db } = require('./../firebase');

const router = new Router();

router.get('/top', async (req, res) => {
    try {
        let array = []

        let snapshot = await db.collection('hamsters').orderBy('wins', 'desc').limit(5).get()

        snapshot.forEach(hamster => {
            array.push(hamster.data())
        })

        res.status(200).send(array)
    } catch (err) {
        console.error(err)
        res.status(500).send(err)
    }

})



router.get('/bottom', async (req, res) => {
    try {
        let array = []

        let snapshot = await db.collection('hamsters').orderBy('defeats', 'desc').limit(5).get()

        snapshot.forEach(doc => {
            array.push(doc.data())
        })

        res.status(200).send(array)
    } catch (err) {
        console.error(err)
        res.status(500).send(err)
    }
})






module.exports = router;