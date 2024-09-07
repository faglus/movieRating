const user = require('../module/userMovieRating.schema');

const createUser = async (userData) => {
    try {
        const newUser = new user(userData);
        await newUser.save();
        return newUser;

    } catch (err) {
        throw err;
    }
}

const getAllUser =async()=>{
    try{
        const allUserData = await user.find();
        return allUserData;

    } catch (err){
        throw err;
    }
}

// const getbyIDUser = async (id) => {
//     try {
//         const movieRatingById = await Item.findById(id);
//         return movieRatingById;

//     } catch (err) {
//         throw err;
//     }
// }

const getByEmail =async (email) =>{
    try{
        const MovieRatingByName =user.findOne({email:email});
        return MovieRatingByName;
    } catch (err){
        throw err;
    }
}

module.exports = {
    createUser,
    getAllUser,
    
    getByEmail
}