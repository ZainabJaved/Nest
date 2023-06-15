import { IsOptional , IsString, IsNumber, IsEnum, IsNotEmpty} from "class-validator"
import { Category } from "../schemas/book.schema"
import { User } from "../../auth/schemas/user.schema"

export class UpdateBookDTO
{
    @IsOptional()
    @IsString()
    readonly title: string

    @IsOptional()
    @IsString()
    readonly description: string

    @IsOptional()
    @IsString()
    readonly author: string

    @IsOptional()
    @IsNumber()
    readonly price: number

    @IsOptional()
    @IsEnum(Category, {message : 'Please write correct category.'})
    readonly category: Category
    
    @IsNotEmpty({message: 'You cannot pass user ID'})
    readonly user:User
    
}