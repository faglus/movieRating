const { createUser,getAllUser,getByEmail } = require('../business/userMovieRating.busniess');

const { format } = require('date-fns');
const md5 = require('md5');

// create

const createUserController = async (req, res) => {
    const userInfo = {
        firstname:req.body.firstname,
        lastname:req.body.lastname,
        email:req.body.email,
        password:md5(req.body.password),
        createdat:format(new Date(),'yyyy-MM-dd HH:mm')

    }

    const item =await createUser(userInfo);
    res.status(200).json(item)
}
 
// get all user
const getAllUserController =async(req,res)=>{
    const data = await getAllUser();
    res.status(200).json(data);
}

// const getByIdUserController = async (req, res) => {
//     const { id } = req.params;
//     const items = await getbyIDUser(id);
//     if (!items) {
//         res.status(404).json({ message: 'given ID not found!!' });
//     } else {

//         res.status(200).json(items)
//     }
// }
const getByEmailController = async (req, res) => {
    const { email } = req.params;
    const item = await getByEmail(email);
    if (!item) {
        res.status(404).json({ message: 'given Name not found!!' });

    } else {

        res.status(200).json(item)
    }
}

module.exports={
    createUserController,
    getAllUserController,
    
    getByEmailController
}