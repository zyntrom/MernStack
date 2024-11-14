import express from 'express';
import {Book} from '../models/bookmodel.js';

const router= express.Router();



router.post('/',async (request,response)=>{
    try{
        if(
            !request.body.title ||
            !request.body.auther ||
            !request.body.publishYear
        ){
            return response.status(400).send({
                message:'Send all the required fileds'
            });
        }

        const newBook ={
            title: request.body.title,
            auther:request.body.auther,
            publishYear:request.body.publishYear
        }

        const book = await Book.create(newBook);
        return response.status(201).send(book);
    }catch(error){
        console.log(error);
        response.status(500).send({message: error.message});
    }
});

router.get('/',async (request,response) =>{
    try{
        const books =await Book.find({});
        return response.status(200).json({
            count : books.length,
            data : books
        });
    }catch(error){
        console.log(error);
        response.status(500).send({message:error.message});
    }
});
router.get('/:id',async (request,response) =>{
    try{

        const { id } = request.params;
        const book =await Book.findById(id);
        return response.status(200).json(book);
    }catch(error){
        console.log(error);
        response.status(500).send({message:error.message});
    }
});
router.put('/:id',async (request,response)=>{
    try{
        if(
            !request.body.title ||
            !request.body.auther ||
            !request.body.publishYear
        ){
            return response.status(400).send({
                message:'Send all the required fileds'
            });
        }
        const { id }=request.params;
        const result =await Book.findByIdAndUpdate(id,request.body);
        if(!result){
            return response.status(400).send({
                message:'Book not found'
            });
        }
        return response.status(200).send({message:'book updated'});
    }catch(error){
        console.log(error);
        response.status(500).send({message:error.message});
    }
});

router.delete('/:id',async (request,response)=>{
    try{
        const { id } = request.params;
        const result = await Book.findByIdAndDelete(id);
        if(!result){
            return response.status(400).send({
                message:'Book not found'
            });
        }
        return response.status(200).send({message:"Deleted Book"});
    }catch(error){
        console.log(error);
        response.status(500).send({message:error.message});
    }
});


export default router;