const express = require('express')
const { auth } = require('./firebase');
const app = express();


// alla post.body tolkas som json
app.use(express.json())





app.use('/', express.static('public'))
app.use('/assets', express.static('assets'))


const hamstersroute = require('./routes/hamsters');
app.use('/hamsters', hamstersroute);

const chartsRoute = require('./routes/charts');
app.use('/charts', chartsRoute);

const gamesRoute = require('./routes/games');
app.use('/games', gamesRoute);




app.listen(3000, () => {
    console.log('server up n runnig, let get some HAMSTERS!!!')
})