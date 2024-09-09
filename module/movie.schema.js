const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
    moviename: {
        type: String,
        required: true,
    },
    releasedata: {
        type: String,
        required: true,
    },
    review: {
        type: String,
        required: true,
    },
    directoryname: {
        type: String,
        required: true,
    },
    productionhouse: {
        type: String,
        required: true,
    },
    
    earning: {
        type: Number,
        required: true,
    },
    budget: {
        type: Number,
        required: true,
    },
    movieid: {
        type: String,
        required: true,
    },
    createdat: {
        type: String,
        required: false,
    }
})


const movieRating = mongoose.model('movieRating', movieSchema);
module.exports = movieRating;
