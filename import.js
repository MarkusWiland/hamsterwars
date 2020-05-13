// Imports
const hamsters = require('./data.json')
const { db } = require('./firebase')

const importToFireStore = () => {
    try {
        hamsters.forEach(hamster => {
            db.collection('hamsters').doc().set(hamster);
            console.log('data file imported')
        });
    } catch (err) {
        console.error(err)
    }
}

importToFireStore();
