import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class CreateBoardDto {
    @ApiProperty({
        required: true,
        example: 'title',
        description: '제목'
    })
    @IsNotEmpty()
    title: string;
    
    @ApiProperty({
        required: true,
        example: 'description',
        description: '내용'
    })
    @IsNotEmpty()
    description: string;
}