import {Prop, Schema,SchemaFactory } from "@nestjs/mongoose";
import mongoose from "mongoose";
import { User } from "src/auth/schemas/user.schema";

export enum Category {
    ADVENTURE = 'Adventure',
    CLASSICS = 'Classics',
    CRIME ='Crime',
    FANTASY =' Fantasy',
}
@Schema({
    timestamps : true
})
export class Book
{
    @Prop()
    title: String;

    @Prop()
    description: String;

    @Prop()
    author: String;
    
    @Prop()
    price: number;

    @Prop()
    category : Category;

    @Prop({type : mongoose.Schema.Types.ObjectId, ref : 'User'})
    user: User;
}
export const BookSchema = SchemaFactory.createForClass(Book)