import { Controller, Query, Get,Post,Body ,Delete ,UseGuards,Put, Param, Req } from '@nestjs/common';
import { BookService } from './book.service';
import { Book } from './schemas/book.schema'
import { CreateBookDTO } from './dto/create-book.dto';
import {Query as ExpressQuery } from 'express-serve-static-core';
import { UpdateBookDTO } from './dto/update-book.dto';
import {AuthGuard} from '@nestjs/passport'
@Controller('books')
export class BookController {
    constructor(private bookService : BookService) {}

   @Get()
   async getAllBooks(@Query() query : ExpressQuery): Promise <Book[]> {
        return this.bookService.findAll(query);
   }

   @Post()
   @UseGuards(AuthGuard())
   async createBook(
    @Body()
    book: CreateBookDTO,
    @Req() req
   ): Promise<Book> {
     console.log(req.user);
    return this.bookService.create(book, req.user);
   }

   @Get(':id')
   async getBook(
    @Param('id')
    id: string
   ): Promise<Book>
   {
    return this.bookService.findByID(id);
   }
  
   @Put(':id')
   async updateBook(
    @Param('id')
    id:string,
    @Body()
    book: UpdateBookDTO
   ): Promise<Book> {
    return this.bookService.updateByID(id,book);
   }

   @Delete(":id")
   async deleteBook(
    @Param('id')
    id: string
   ): Promise<Book>
   {
    return this.bookService.deleteByID(id);
   }
}