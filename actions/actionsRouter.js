const express = require('express');
const actionsDB = require('../data/helpers/actionModel');
const projectsDB = require('../data/helpers/projectModel');
const router = express.Router();
router.use(express.json())


router.get('/:actionid', validateActionID, (req, res) => {
    const actionId = req.params.actionid;
    actionsDB.get(actionId)
    .then(result => {
        res.status(200).json(result)
    })
    .catch(err => {
        res.status(500).json({error: err})
    })
})

router.post('/', validateActionProjectID, validateAction, (req, res) => {
    const action = req.body;
    actionsDB.insert(action)
    .then(result => {
        res.status(201).json(result)
    })
    .catch(err => {
        res.status(500).json({error: err})
    })
})

router.put('/:actionid', validateActionID, validateAction, (req, res) => {
    const actionId = req.params.actionid;
    const action = req.body;
    actionsDB.update(actionId, action)
    .then(result => {
        res.status(200).json(result)
    })
    .catch(err => {
        res.status(500).json({error: err})
    })
})


router.delete('/:actionid', validateActionID, (req, res) => {
    const actionId = req.params.actionid;
    actionsDB.remove(actionId)
    .then(result => {
        res.status(200).json(result)
    })
    .catch(err => {
        res.status(500).json({error: err})
    })
})

function validateActionID (req, res, next) {
    const actionId = req.params.actionid
    actionsDB.get(actionId)
    .then(result => {
        if(result) {
            next();
        } else {
            res.status(404).json({message: "Could not find an action with the specified ID"})
        }
    })
    .catch(err => {
        res.status(500).json({error: err})
    })
}

function validateAction (req, res, next) {
    const action = req.body;
    if(!action.project_id) {
        res.status(400).json({message: 'Please provide a valid project_id for the action'})
    } else if(!action.notes) {
        res.status(400).json({message: 'Please provide the required notes field in the action'})
    } else if(!action.description){
        res.status(400).json({message: 'Please provide the required description field in the action'})
    } else {
        next();
    }
}

function validateActionProjectID (req, res, next) {
    const projectId = req.body.project_id;
    projectsDB.get(projectId)
    .then(result => {
        if(result) {
            next()
        } else {
            res.status(404).json({message: "A project with the specified ID could not be found"})
        }
    })
    .catch(err => {
        res.status(500).json({error: err})
    })
}
module.exports = router;