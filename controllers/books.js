const router = require('express').Router()
const res = require('express/lib/response')
const books = require('../models/books')
const db = require('../models')

//SEEDER
router.get('/seed', (req, res) => {
    db.Books.insertMany([{
        "title": "The Shinobi Initiative",
        "description": "The reality-bending adventures of a clandestine service agency in the year 2166",
        "year": 2014,
        "quantity": 10,
        "imageURL": "https://imgur.com/LEqsHy5.jpeg"
      },
      {
        "title": "Tess the Wonder Dog",
        "description": "The tale of a dog who gets super powers",
        "year": 2007,
        "quantity": 3,
        "imageURL": "https://imgur.com/cEJmGKV.jpg"
      },
      {
        "title": "The Annals of Arathrae",
        "description": "This anthology tells the intertwined narratives of six fairy tales.",
        "year": 2016,
        "quantity": 8,
        "imageURL": "https://imgur.com/VGyUtrr.jpeg"
      },
      {
        "title": "W∀RP",
        "description": "A time-space anomaly folds matter from different points in earth's history in on itself, sending six unlikely heroes on a race against time as worlds literally collide.",
        "year": 2010,
        "quantity": 4,
        "imageURL": "https://imgur.com/qYLKtPH.jpeg"
      }])
        .then(res.status(200).json({
            message: 'Seed successful'
        }))
        .catch(res.status(400).json({
            message: 'Seed unsuccessful'
        }))
})




//SHOW ONE
router.get('/:id', (req, res) => {
    db.Books.findById(req.params.id)
        .then(foundBook => {
            res.json(foundBook)
        })
        .catch( err => {
            res.json({msg: 'ERROR: Invalid ID'})
        })
})

//UPDATE
router.put('/:id', (req, res) => {
    db.Books.findByIdAndUpdate(req.params.id, req.body)
        .then(() => {
            db.Books.findById(req.params.id)
                .then(foundBook => {
                    res.json(foundBook)
                })
                .catch( err => {
                    res.json({msg: 'ERROR: Invalid ID'})
                })
        })
        .catch( err => {
            res.json({msg: 'ERROR: Invalid ID'})
        })
})

//NEW
router.post('/', (req, res) => {
    db.Books.create(req.body)
        .then(() => {
            res.redirect('/books')
        })
        .catch(err => {
            res.json({msg: 'ERROR: Invalid Post Request'})
        })
})

//DELETE
router.delete('/:id', (req, res) => {
    db.Books.findByIdAndDelete(req.params.id)
        .then( ()=> {
            res.redirect('/books')
        })
        .catch( err => {
            res.json({msg: 'ERROR: Invalid ID'})
        })
})

//SHOW ALL
router.get('/', (req, res) => {
    db.Books.find()
        .then(foundBooks => {
            res.json(foundBooks)
        })
        .catch(err => {
            res.json({msg: 'ERROR 404'})
        })
})

module.exports = router