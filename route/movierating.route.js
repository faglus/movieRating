const express = require('express');
const router = express.Router();

const { createContollerMovieRating, getAllControllerMovieRating, getByIdController, getByNameController, deleteMovieRatingController, updateMovieRatingController, exportMovieRatingController, importMovieRatingController } = require('../controller/movieRating.controller');


const multer =require('multer');
const fs =require('fs');
const storage =multer.memoryStorage();
const upload =multer({storage});


router.post('/create', createContollerMovieRating);
router.get('/getallmovie', getAllControllerMovieRating);
router.get('/:id', getByIdController);
router.get('/getbyname/:name', getByNameController);
router.delete('/deletebyid/:id', deleteMovieRatingController);
router.patch('/updatealldata/:id', updateMovieRatingController);
router.get('/export', exportMovieRatingController);
router.get('/import', upload.single('excelData'),importMovieRatingController);


module.exports = router;