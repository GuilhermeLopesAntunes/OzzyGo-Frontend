import { IsString, IsNotEmpty, IsInt, IsOptional, IsArray, IsUUID, ValidateNested, IsEnum, ValidateIf } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export enum QuestionType {
    MULTIPLE_CHOICE = 'multiple_choice',
    FILL_THE_BLANKS = 'fill_the_blanks',
    ESSAY = 'essay'
}


export class MultipleChoiceDetailDto {
    @ApiProperty({ 
        example: 'Qual é a organela conhecida como "casa de força" da célula?',
        description: 'A pergunta que será exibida ao aluno'
    })
    @IsString() 
    @IsNotEmpty() 
    prompt!: string;

    @ApiProperty({ 
        example: ['Ribossomo', 'Mitocôndria', 'Complexo de Golgi', 'Lisossomo'],
        description: 'Array de opções para o aluno escolher'
    })
    @IsArray() 
    options!: any[]; 

    @ApiProperty({ 
        example: 1,
        description: 'O índice (começando em 0) da opção correta no array de options'
    })
    @IsInt() 
    correctOptionIndex!: number;
}

export class FillTheBlanksDetailDto {
    @ApiProperty({ 
        example: 'O processo de [___] é responsável por gerar energia na célula.',
        description: 'A frase contendo marcadores (ex: [___]) onde o aluno deve preencher'
    })
    @IsString() 
    @IsNotEmpty() 
    promptWithBlanks!: string;

    @ApiProperty({ 
        example: ['Respiração Celular'],
        description: 'Array contendo as respostas corretas na ordem em que as lacunas aparecem'
    })
    @IsArray() 
    correctAnswers!: any[]; 
}

export class EssayDetailDto {
    @ApiProperty({ 
        example: 'Explique com suas palavras a teoria da endossimbiose.',
        description: 'O tema ou pergunta da redação/dissertação'
    })
    @IsString() 
    @IsNotEmpty() 
    prompt!: string;

    @ApiPropertyOptional({ 
        example: 50,
        description: 'Quantidade mínima de palavras exigidas'
    })
    @IsInt() 
    @IsOptional() 
    minWords?: number;
}

export class CreateQuestionDto {
    @ApiProperty({ 
        enum: QuestionType, 
        example: QuestionType.MULTIPLE_CHOICE,
        description: 'O tipo da questão que ditará qual objeto de detalhe deve ser enviado'
    })
    @IsEnum(QuestionType) 
    type!: QuestionType;

    @ApiProperty({ 
        example: 1,
        description: 'A ordem em que a questão aparecerá para o aluno na lição (1, 2, 3...)'
    })
    @IsInt() 
    sequenceOrder!: number;

    @ApiPropertyOptional({ 
        example: 10,
        description: 'Quantidade de XP que o aluno ganha ao acertar essa questão especificamente'
    })
    @IsInt() 
    @IsOptional() 
    xpReward?: number;


    @ApiPropertyOptional({ 
        type: MultipleChoiceDetailDto,
        description: 'Obrigatório APENAS se type = multiple_choice'
    })
    @ValidateIf(o => o.type === QuestionType.MULTIPLE_CHOICE)
    @ValidateNested() @Type(() => MultipleChoiceDetailDto)
    multipleChoice?: MultipleChoiceDetailDto;

    @ApiPropertyOptional({ 
        type: FillTheBlanksDetailDto,
        description: 'Obrigatório APENAS se type = fill_the_blanks'
    })
    @ValidateIf(o => o.type === QuestionType.FILL_THE_BLANKS)
    @ValidateNested() @Type(() => FillTheBlanksDetailDto)
    fillTheBlanks?: FillTheBlanksDetailDto;

    @ApiPropertyOptional({ 
        type: EssayDetailDto,
        description: 'Obrigatório APENAS se type = essay'
    })
    @ValidateIf(o => o.type === QuestionType.ESSAY)
    @ValidateNested() @Type(() => EssayDetailDto)
    essay?: EssayDetailDto;
}


export class CreateClassworkDto {
    @ApiProperty({ 
        example: 'Módulo 1: A Célula',
        description: 'Título principal da Lição'
    })
    @IsString() 
    @IsNotEmpty() 
    title!: string;

    @ApiPropertyOptional({ 
        example: 'Aprenda sobre a estrutura básica da vida nesta aventura!',
        description: 'Descrição opcional da lição'
    })
    @IsString() 
    @IsOptional() 
    description?: string;

    @ApiPropertyOptional({ 
        example: 100,
        description: 'Recompensa total de XP ao finalizar a lição'
    })
    @IsInt() 
    @IsOptional() 
    xpReward?: number;

    @ApiPropertyOptional({ 
        example: 20,
        description: 'Recompensa total de Rubys ao finalizar a lição'
    })
    @IsInt() 
    @IsOptional() 
    rubyReward?: number;

    @ApiProperty({ 
        example: ['123e4567-e89b-12d3-a456-426614174000', '987fcdeb-51a2-43d7-9012-426614174000'],
        description: 'Array com os UUIDs das turmas que receberão essa lição'
    })
    @IsArray() 
    @IsUUID("4", { each: true }) 
    classroomIds!: string[];

    @ApiProperty({ 
        type: [CreateQuestionDto],
        description: 'Array contendo as questões/passos que compõem esta lição'
    })
    @IsArray() 
    @ValidateNested({ each: true }) 
    @Type(() => CreateQuestionDto)
    questions!: CreateQuestionDto[];
}