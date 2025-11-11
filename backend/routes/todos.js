const express = require('express')
const router = express.Router()
const Todo = require('../models/Todo')

router.get('/', async(req, res) => {
    try{
        const todos = await Todo.find();
        res.json(todos);
    }
    catch(err){
        console.log(`Error occured during get all todos request : ${err}`)
        res.status(400).json({'message' : 'Error occured during get all todos request'})
    }
})

router.post('/', async(req,res) => {
    const todo = new Todo({
        title : req.body.title
    })

    try{
        const newSaved = await todo.save();
        res.status(201).json(newSaved)
    }
    catch(err){
        res.status(400).json({'message' : 'Error occured while creating Todo'})
    }

})

router.patch('/:id', async(req, res) => {
    const {id} = req.params;
    const todo = await Todo.findById(id);
    if (!todo) {
        return res.status(404).json({'message': 'Todo not found'});
        }
    if (req.body.title){
        todo.title = req.body.title;
    }
    if (req.body.completed !== undefined){
        todo.completed = req.body.completed;
    }
    try{
        const patchtodo = await todo.save();  
        res.status(200).json(patchtodo)
    }
    catch(err){
        res.status(400).json({'message' : 'error during update of todo list'})
    }
})

router.delete('/:id', async(req, res) => {
    try{
        const todoDelete = await Todo.findByIdAndDelete(req.params.id);
        res.status(200).json({'message' : 'todo successfully deleted'})
    }
    catch(err){
        res.status(400).json({'message' : 'error during deleting of todo list'})
    }
})

module.exports = router;