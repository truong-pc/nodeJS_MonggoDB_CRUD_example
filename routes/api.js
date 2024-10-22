const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
const User = require('../models/studentschema');
// Replace this query  by your url monggoDB server
const query = 'mongodb+srv://pctytn:1234567890@cluster0.ffjwq.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';
const db = query;
mongoose.Promise = global.Promise;

async function connectDB() {
    try {
        await mongoose.connect(db, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log("Database connected successfully");
    } catch (error) {
        console.log("Error!" + error);
    }
}

connectDB();



router.post('/users', async (request, response) => {
    try {
        const user = new User({
            StudentId: request.body.StudentId,
            name: request.body.name,
            email: request.body.email,
            birthday: request.body.birthday,
            address: request.body.address
        });
        const newItem = await user.save();
        response.status(201).json({success: true});
    } catch (error) {
        console.log(error);
        response.status(500).json({error: error.message});
    }
});

router.get('/users', async (request, response) => {
    try {
        const users = await User.find();
        response.status(200).json(users);
    } catch (error) {
        console.log(error);
        response.status(500).json({ error: error.message });
    }
});

router.get('/users/:id', async (request, response) => {
    const user = await User.findById(request.params.id);
    response.status(200).json(user);
});

router.put('/users/:id', async (request, response) => {
    try {
        const userId = request.params.id;
        // Fetch the user from the database
        const user = await User.findById(userId);
        user.StudentId = request.body.StudentId;
        user.name = request.body.name;
        user.email = request.body.email;
        user.birthday = request.body.birthday;
        user.address = request.body.address;
        const updatedItem = await user.save();
        response.status(200).json(updatedItem);
    } catch (error) {
        console.log(error);
        res.status(500).json({error: err.message});
    }
});

router.delete('/users/:id', async (request, response) => {
    try {
    const userId = request.params.id;
    // Fetch the user from the database
    const user = await User.findById(userId);
    await user.deleteOne();
    response.status(200).json({ message : 'Deleted item' });
    }catch(err){
        console.log(err);
        response.status(500).json({error: err.message});
    }
});


module.exports = router;