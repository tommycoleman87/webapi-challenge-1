const express = require('express');
const projectsDB = require('../data/helpers/projectModel');
const router = express.Router();

router.get('/:id',validateProjectID, (req, res) => {
    const id = req.params.id;
    projectsDB.get(id)
    .then(result => {
        res.status(200).json(result)
    })
    .catch(err => {
        res.status(500).json({error: err})
    })
})


function validateProjectID (req, res, next) {
    const id = req.params.id
    projectsDB.get(id)
    .then(result => {
        if(result) {
            next();
        } else {
            res.status(400).json({message: "A project with that ID doesn't exist"})
        }
    })
    .catch(err => {
        res.status(500).json({error: err})
    })
}
module.exports = router;