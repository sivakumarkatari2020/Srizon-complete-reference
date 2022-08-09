'use strict';

const eventData = require('../../data/events/admin');

const deleteCategory = async (req,res,next) => {
    try {
        let id = req.params.id;
        const getCategoriesWithID = await eventData.getCategoriesWithID(id);
        console.log(getCategoriesWithID);
        if(getCategoriesWithID.length > 0){
            let flag = 0;
            for(let i=0;i<getCategoriesWithID.length;i++){
                const deleteCategory = await eventData.deleteCategory(getCategoriesWithID[i].id);
                if(deleteCategory.status !== 200){
                    flag = 1;
                    res.send(deleteCategory);
                    break;
                };
            }
            if(flag == 0){
                const deleteCategory = await eventData.deleteCategory(id);
                res.send(deleteCategory);
            }
        }else{
            const deleteCategory = await eventData.deleteCategory(id);
            res.send(deleteCategory);
        }
    } catch (error) {
        res.status(400).send(error.message);
    }
}

module.exports = {
    deleteCategory
}