import express from 'express';
import authenticate from "../middlewares/authenticate";
import BookModel from "../Models/BookModel";
import commonValidations from "../validations/commonValidations";


let router = express.Router();

router.get('/',authenticate, (req,res)=>{
    const page = req.query.page?parseInt(req.query.page):1;
    const find = {};
    if(req.query.category){
        find.categories = req.query.category
    }
    BookModel.paginate(find,{
        page: page,
        limit: 2,
        populate: [{path:'language',select:'name'},'categories']
    }).then((books)=>{
        res.json({ books });
    });

});
router.get('/:id',authenticate, (req,res)=>{
    BookModel.findOne({_id:req.params.id}).then((book)=>{
        if(book === null){
            res.status(400).json({ error:'Book Not found' });
        }else{
            res.json({ book });
        }
    }).catch((errors)=>{
        res.status(400).json({ error:'Book Not found' });
    });

});

router.delete('/',authenticate, (req,res)=>{
    const { _id } = req.body;
    const update = BookModel.findOneAndDelete({_id:_id}).then(()=>{
        res.json({
            success: true
        })
    });
});
router.put('/',authenticate, (req,res)=>{
    const { errors, isValid } = commonValidations(req.body,{
        name: 'required',
        writer: 'required',
        publisher: 'required',
        language: 'required',
        items: 'required',
        categories: 'required'
    },{
        categories: {
            required: 'Please, select an item'
        }
    });
    const { _id, name, writer, publisher, language, items, details, categories } = req.body;

    if(isValid){
        BookModel.findByIdAndUpdate(_id,{$set:{name, writer, publisher, language, items, details, categories}}, { new: true })
        .then((book)=>{
            if(book===null){
                res.status(401).json({ errors: { _flash: 'Book Not found. Maybe deleted by another user'}});
            }
            res.json({ book });
        });
    }else{
        res.status(400).json({ errors });
    }
});
router.post('/',authenticate, (req,res)=>{
    const { errors, isValid } = commonValidations(req.body,{
        name: 'required',
        writer: 'required',
        publisher: 'required',
        language: 'required',
        items: 'required',
        categories: 'required'
    },{
        categories: {
            required: 'Please, select an item'
        }
    });
    const { name, writer, publisher, language, items, details, categories } = req.body;

    if(isValid){
        const Book = new BookModel({name, writer, publisher, language, items, details, categories});
        Book.save().then((book)=>{
            res.json({ book });
        })
    }else{
        res.status(400).json({ errors });
    }
});
export default router;