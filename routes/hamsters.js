const { Router } = require('express');
const { auth, db } = require('./../firebase');

const router = new Router();

router.get('/', async (req, res) => {

    try {
        // create empty array
        const array = []
        // go into collection hamsters and grab all into it.
        const snapShot = await db.collection('hamsters').get();
        // looping through the callback from snapShot.
        snapShot.forEach(doc => {
            // push data into array.
            array.push(doc.data())
        })

        res.status(200).send(array)
    } catch (err) {
        res.status(500)
        console.error(err)
    }
})

router.get('/random', async (req, res) => {

    try {
        // create empty array
        const array = []
        // go into collection hamsters and grab all into it.
        const snapShot = await db.collection('hamsters').get();
        // looping through the callback from snapShot.
        snapShot.forEach(doc => {
            // push data into array.
            array.push(doc.data())
        })
        let random = Math.floor(Math.random() * array.length)

        res.status(200).send(array[random])
    } catch (err) {
        res.status(500)
        console.error(err)
    }
})

router.get('/:id', async (req, res) => {
    try {

        let obj;

        let snapShot = await db.collection('hamsters').where('id', '==', parseInt(req.params.id)).get();

        snapShot.forEach(doc => {
            obj = doc.data()
        })

        res.status(200).send(obj)
    } catch (err) {
        res.status(500)
        console.error(err)
    }

})
router.put('/:id/result', async (req, res) => {
    try {
        let hamsterId;
        let results;
        let hamster = await db.collection('hamsters')
            .where("id", "==", parseInt(req.params.id)).get();

        hamster.forEach(async hamster => {
            // getting data from ind. hamsters.
            let hamsterData = hamster.data()
            // getting hamster id
            hamsterId = hamster.id
            // make a object with wins, defeats, games.
            results = {
                wins: hamsterData.wins += req.body.wins,
                defeats: hamsterData.defeats += req.body.defeats,
                games: hamsterData.games + 1
            }

            await db.collection('hamsters').doc(hamsterId).update(results)
        })
        res.status(200).send({ msg: "Resultatet uppdaterad: ", result: results })
    } catch (err) {
        console.error(err)
        res.status(500).send(err)
    }
})




module.exports = router;