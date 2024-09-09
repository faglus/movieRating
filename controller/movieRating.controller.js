const { createMovieRating, getAllMovieRating, getbyID, getByName, updateMovieRating, deleteMovieRating, exportMovieRating } = require('../business/movierating.business');
const { format } = require('date-fns');
const XLSX = require('xlsx');


//Create 
const createContollerMovieRating = async (req, res) => {
    const newItem = {
        moviename: req.body.moviename,
        releasedata: req.body.releasedata,
        review: req.body.review,
        directoryname: req.body.directoryname,
        productionhouse: req.body.productionhouse,
        earning: req.body.earning,
        budget: req.body.budget,
        movieid: req.body.movieid,
        createdat: format(new Date(), 'yyy-MM-dd HH:mm')
    };
    const Item = await createMovieRating(newItem);
    res.status(200).json(Item);
}

//get all
const getAllControllerMovieRating = async (req, res) => {
    const Item = await getAllMovieRating();
    res.status(200).json(Item);
}


//getby id
const getByIdController = async (req, res) => {
    const { id } = req.params;
    const items = await getbyID(id);
    if (!items) {
        res.status(404).json({ message: 'given ID not found!!' });
    } else {

        res.status(200).json(items)
    }
}

// get by name 
const getByNameController = async (req, res) => {
    const { name } = req.params;
    const item = await getByName(name);
    if (!item) {
        res.status(404).json({ message: 'given Name not found!!' });

    } else {

        res.status(200).json(item)
    }
}

// update all
const updateMovieRatingController = async (req, res) => {
    try {
        const { id } = req.params;
        let movieRatingData = await getbyID(id);
  
        
        if (!movieRatingData) {
            return res.status(404).json({ message: "Movie rating not found" });
        }

        // Iterate over the keys in the request body and update the corresponding fields
        Object.keys(req.body).forEach(key => {
            movieRatingData[key] = req.body[key];
        });

        // Make sure to await the update operation
        const updatedItem = await updateMovieRating(id, movieRatingData);

        res.status(200).json(updatedItem);
    } catch (error) {
        res.status(500).json({ message: "An error occurred", error: error.message });
    }
};

//delete by id
const deleteMovieRatingController = async (req, res) => {
    const { id } = req.params;
    const deletedData = await deleteMovieRating(id);
    try {
        if (!deletedData) {
            res.status(404).json({ message: 'GIVEN DATA DOES NOT FOUND' })
        } else {
            res.status(200).json({ message: 'Rating Deleted' })
        }
    } catch (error) {
        return res.status(500).json({ message: 'ERROR OCCURED', error: error.message });

    }
};

// export
// const exportMovieRatingController = async (req, res) => {
//     try {
//         const item = await exportMovieRating();
//         const workbook = XLSX.utils.book_new();
//         const worksheet = XLSX.utils.json_to_sheet(item);
//         XLSX.utils.book_append_sheet(workbook, worksheet, 'Item');
//         const buffer = XLSX.write(workbook, { bookType: "xlsx", type: "buffer" });
//         res.setHeader('Content-Disposition', 'attachment; filename=output.xlsx');
//         res.setHeader('content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheet.sheet');
//         res.send(buffer);

//         console.log('excel file sent as a response');

//     } catch (err) {
//         throw err;
//     }

// }
// const exportMovieRatingController = async (req, res) => { 
//     try { 
//         const MovingRatingItem = await exportMovieRating(); 
//         const workbook = XLSX.utils.book_new(); 
 
//         const worksheet = XLSX.utils.json_to_sheet(MovingRatingItem); 
//         XLSX.utils.book_append_sheet(workbook, worksheet, 'Item'); 
 
//         const buffer = XLSX.write(workbook, { bookType: "xlsx", type: 'buffer' }); 
 
//         res.setHeader('Content-Disposition', 'attachment; filename= output.xlsx'); 
//         res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheet.sheet'); 
 
//         res.send(buffer); 
 
//         console.log('excel file sent as a response'); 
//     } catch (err) { 
//         res.send(err); 
//     } 
// ;}

const exportMovieRatingController = async (req, res) =>{
    try{
        const MovieRatingData = await exportMovieRating();
        const workbook = XLSX.utils.book_new();

    const worksheet = XLSX.utils.json_to_sheet(MovieRatingData);
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Item');

    const buffer = XLSX.write(workbook, {bookType: "xlsx", type: "buffer"});

    res.setHeader('Content-Disposition', 'attachment; filename = output.xlsx');
    res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
    res.send(buffer);
    
    // XLSX.write(res, workbook,{bookSST: true});
    
    console.log('excel file sent as a response');
    
    
}catch(err){
    res.status(500).send(err.message);
}

}


// import
const importMovieRatingController = async (req, res) => { 
    try { 
        if (!req.file) { 
            return res.status(400).json({ message: " No file uploaded" }); 
        } 
        const workbook = XLSX.read(req.file.buffer); 
        const sheetNames = workbook.SheetNames; 
 
        const excelData = []; 
        sheetNames.forEach((sheetName) => { 
            const worksheet = workbook.Sheets[sheetName]; 
            const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 }); 
            excelData.push(...jsonData); 
        }); 
        res.json({ message: "Excel file uploaded", data: excelData }); 
    } catch (err) { 
        console.error('Error in parsing Excel file', err); 
        res.status(500).json({ message: 'Internal server error' }); 
    } 
}
module.exports = {
    createContollerMovieRating,
    getAllControllerMovieRating,
    getByIdController,
    getByNameController,
    updateMovieRatingController,
    deleteMovieRatingController,
    exportMovieRatingController,
    importMovieRatingController
}