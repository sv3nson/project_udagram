import { reject } from 'bluebird';
import express from 'express';
import validateUrl from 'valid-url';
import {filterImageFromURL, deleteLocalFiles} from '../../util/util';


const router = express.Router();
router.get('/filteredimage', async (req, res) => {
    const image_url: string = decodeURIComponent(req.query.image_url);
    let imagePath: string = null;
    try {
        if (!validateUrl.isUri(image_url)) return res.status(400).send('Value of parameter image_url not valid.');
        imagePath = await filterImageFromURL(image_url);
        res.status(200).sendFile(imagePath, ()=>{
            deleteLocalFiles([imagePath])});
    } catch(err){
        res.status(500).json({
            messages: "Internal Error processing file"
        })
    } 
    
    
})

export default router