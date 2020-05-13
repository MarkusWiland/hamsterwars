const { Router } = require('express');
const { auth, db } = require('./../firebase');

const router = new Router();

router.get('/top', async (req, res) => {

    let array = []

    let snapshot = await db.collection('hamsters').orderBy('wins', 'desc').limit(5).get()

    snapshot.forEach(hamster => {
        array.push(hamster.data())
    })

    res.status(200).send(array)


})



router.get('/bottom', async (req, res) => {

    let array = []

    let snapshot = await db.collection('hamsters').get()

    snapshot.forEach(doc => {
        array.push(doc.data())
    })

    // sorterar från lägst till högst
    array.sort((a, b) => {
        return b.id - a.id
    })

    // kör en kopia av arrayen och slicear den och tar ut 5 första.
    let topFive = array.slice(0, 5)
    console.log(topFive)
    res.status(200).send(array)

})






module.exports = router;