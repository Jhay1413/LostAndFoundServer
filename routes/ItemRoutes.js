const router = require('express').Router();
const multer = require('multer');
const ItemDetailsModel = require('../models/Items')
const storage = multer.memoryStorage();
const upload = multer({storage: storage})
const cloudinary = require('cloudinary').v2
cloudinary.config({ 
    cloud_name: 'dzry3teae', 
    api_key: '331924875182981', 
    api_secret: 'h3XBeI36w5wppWYLvynGouYUnh8' 
  });
async function handleUpload(file) {
    const res = await cloudinary.uploader.upload(file, {
      resource_type: "auto",
    });
    return res;
}
router.get('/getAllItems', async (req,res)=>{
    ItemDetailsModel.find()
        .sort({ Date: -1 })
        .then(items =>res.json(items))
        .catch(err=>res.status(400).json('error:' + err));
})
router.post('/insertItems',upload.single("image"), async (req,res)=>{
    const ItemData = req.body;

    try {
                const b64 = Buffer.from(req.file.buffer).toString("base64");
                const dataURI = `data:${req.file.mimetype};base64,${b64}`;
                const cldres = await handleUpload(dataURI);

                if(cldres.secure_url){
                    const imageUrl = cldres.secure_url
                    const newItem = new ItemDetailsModel({
                        ItemCategory: req.body.category,
                        ItemBrand:req.body.brand,
                        ItemColor:req.body.color,
                        imageUrl:imageUrl,
                      
                    });
                    newItem.save()
                    .then(()=>{
                        res.json('New Item Added ! ');
                    })
                    .catch((err)=>res.status(400).json('err' + err))
                }
                else{
                    res.json("image not uploaded to database");
                }
               

    } catch (error) {
        console.error(error);
        res.status(500).send('Server Error ! ');
    }
})

router.put('/updateItem/:id',upload.single("image"), async (req,res)=>{
    const {id} = req.params;
    const itemData = req.body;
    
    try {
        const item = await ItemDetailsModel.findById(id);

        item.ItemCategory = itemData.category;
        item.ItemBrand = itemData.brand;
        item.ItemColor = itemData.color;

        if(!item){
            return res.status(404).json({message:"Item not found ! "})
        }
       
        if(req.file){
            const b64 = Buffer.from(req.file.buffer).toString("base64");
            const dataURI = `data:${req.file.mimetype};base64,${b64}`;
            const cldres = await handleUpload(dataURI);

            if(cldres.secure_url){
                item.imageUrl = cldres.secure_url;
            }
        }
        else{
            item.imageUrl = itemData.imageURL;
        }

        await item.save();
        res.status(200).json({message:"Item Updated Successfully"});

    }catch (error) {
        console.error(error); 
        res.status(500).json({ message: 'Error updating document' });
    }
})
router.delete('/deleteItem/:id',async (req,res)=>{
    try {
        const Item = await ItemDetailsModel.findOneAndDelete({_id: req.params.id});
        if(!Item){
            return res.status(400).send('Item not Found ! ')
        }
        return res.status(200).send('Deleted Successfully ! ')
    } catch (error) {
        console.error(error); 
        res.status(500).json({ message: 'Error Deleting document' });
    }
})

module.exports = router