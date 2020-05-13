const { Router } = require('express');
const { auth, db } = require('./../firebase');

const router = new Router();


router.get('/total', async (req, res) => {

    try {
        // calling for collection games and get it
        const total = await db.collection('games').get()

        // the number of games is in total obj under _size.
        const totalGames = total.size
        res.status(200).send({ msg: `Total numbers of games is ${totalGames}` })
    } catch (err) {
        console.error(err)
        res.status(500).send(err)
    }
})


module.exports = router;