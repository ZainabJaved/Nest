import { IsNotEmpty ,IsNumber, IsString,IsEnum} from "class-validator"
import { Category } from "../schemas/book.schema"
import { User } from "../../auth/schemas/user.schema"



export class CreateBookDTO
{
    @IsNotEmpty()
    @IsString()
    readonly title: string

    @IsNotEmpty()
    @IsString()
    readonly description: string

    @IsNotEmpty()
    @IsString()
    readonly author: string

    @IsNotEmpty()
    @IsNumber()
    readonly price: number

    @IsNotEmpty()
    @IsEnum(Category, {message : 'Please write correct category.'})
    readonly category: Category

    @IsNotEmpty({message: 'You cannot pass user ID'})
    readonly user:User
    
}