import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Book } from './schemas/book.schema';
import * as mongoose from 'mongoose';
import { NOTFOUND } from 'dns';
import {Query } from 'express-serve-static-core';
import { User } from 'src/auth/schemas/user.schema';


@Injectable()
export class BookService {
    constructor(
        @InjectModel(Book.name)
        private bookModel: mongoose.Model<Book>
    ) {}


    async findAll(query: Query): Promise<Book[]>{
    
        const resPerPage = 2
        const currentPage = Number(query.page) || 1
        const skip = resPerPage *  (currentPage - 1)
       const keyword = query.keyword ? {
        title: {
            $regex : query.keyword,
            $options: 'i'
        }
       }: {}
        const  books = await this.bookModel.find({... keyword}).limit(resPerPage).skip(skip)
        return books;
    }
    async create(book : Book, user:User ): Promise<Book>
    {
        const data = Object.assign(book, {user : user._id})
        const res = await this.bookModel.create(book)
        return res
    }
    async findByID(id : String): Promise<Book>
    {
        const IsValidID = mongoose.isValidObjectId(id)
        if(!IsValidID)
        {
            throw new BadRequestException('Please Enter Correct ID')
        }
        const book = await this.bookModel.findById(id)
        if (!book){
            throw new NotFoundException('Book not found');
        }
        return book    
    }
    async updateByID(id : String, book: Book ): Promise<Book>
    {
         return await this.bookModel.findByIdAndUpdate(id, book, {
            new: true,
            runValidators: true
         })    
    }
    async deleteByID(id : String): Promise<Book>
    {
         return await this.bookModel.findByIdAndDelete(id)    
    }
}
