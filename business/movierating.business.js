const Item = require('../module/movie.schema');

//create
const createMovieRating = async (movieData) => {
    try {
        const newMovieRating = new Item(movieData);
        await newMovieRating.save();
        return newMovieRating;
    } catch (err) {
        throw err;
    }
}


//get all 
const getAllMovieRating = async () => {
    try {
        const allMovieRating = await Item.find();
        return allMovieRating;
    } catch (err) {
        throw err;
    }

};
//get by id
const getbyID = async (id) => {
    try {
        const movieRatingById = await Item.findById(id);
        return movieRatingById;

    } catch (err) {
        throw err;
    }
}

// get by name
const getByName = async (name) => {
    try {
        const MovieRatingByName = await Item.findOne({ moviename: name });
        return MovieRatingByName;
    } catch (err) {
        throw err;
    }
}

// update all
const updateMovieRating = async (id, toUpdateMovieData) => {
    try {
        const updatedItem = await Item.findByIdAndUpdate(id, toUpdateMovieData, { new: true });
        return updatedItem;

    } catch (err) {
        throw err;
    }
}


// delete by id
const deleteMovieRating = async (id) => {
    try {
        const deleteData = await Item.findByIdAndDelete(id);
        return deleteData;

    } catch (err) {
        throw err;
    }
}
// export

const exportMovieRating = async () => {
    try {
        const exportedData = await Item.find({}).lean();
        return exportedData
    } catch (err) {
        console.error('Error fetching item:',error);
        throw err;
    }
}
// const exportMovieRating = async() => Item.find({}).lean();


module.exports = {
    createMovieRating,
    getAllMovieRating,
    getbyID,
    getByName,
    updateMovieRating,
    deleteMovieRating,
    exportMovieRating,
}