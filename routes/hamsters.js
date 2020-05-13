const { Router } = require('express');
const { auth, db } = require('./../firebase');

const router = new Router();

router.get('/', async (req, res) => {

    try {
        const array = []

        const snapShot = await db.collection('hamsters').get();

        snapShot.forEach(doc => {
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
        const array = []

        const snapShot = await db.collection('hamsters').get();

        snapShot.forEach(doc => {
            array.push(doc.data())
        })
        let random = Math.floor(Math.random() * array.length)
        console.log(array[random])
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
            let hamsterData = hamster.data()
            hamsterId = hamster.id
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