const express = require('express');
const router = express.Router();

const { createUserController,getAllUserController,getByEmailController } = require('../controller/userMovieRating.controller');

router.post('/createuser', createUserController);
router.get('/getalluser',getAllUserController);
router.get('/getbyemail/:email', getByEmailController);


module.exports = router