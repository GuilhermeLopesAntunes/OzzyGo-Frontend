import { Injectable, NotFoundException, Inject } from '@nestjs/common';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import { eq, asc } from 'drizzle-orm';
import * as schema from '../db/schema'
import { db } from 'src/db';
import { CreateClassworkDto, QuestionType } from './dto/create-classwork.dto';

@Injectable()
export class ClassworksService {
    


    async create(professorId: string, dto: CreateClassworkDto) {
        return await db.transaction(async (tx) => {

            const [classwork] = await tx.insert(schema.classworks).values({
                professorId,
                title: dto.title,
                description: dto.description,
                xpReward: dto.xpReward ?? 50,
                rubyReward: dto.rubyReward ?? 10,
            }).returning();

 
            if (dto.classroomIds && dto.classroomIds.length > 0) {
                const classroomLinks = dto.classroomIds.map(classroomId => ({
                    classworkId: classwork.id,
                    classroomId,
                }));
                await tx.insert(schema.classworkClassrooms).values(classroomLinks);
            }

         
            if (dto.questions && dto.questions.length > 0) {
                for (const qDto of dto.questions) {
                    const [question] = await tx.insert(schema.questions).values({
                        classworkId: classwork.id,
                        type: qDto.type,
                        sequenceOrder: qDto.sequenceOrder,
                        xpReward: qDto.xpReward ?? 10,
                    }).returning();

           
                    if (qDto.type === QuestionType.MULTIPLE_CHOICE && qDto.multipleChoice) {
                        await tx.insert(schema.qMultipleChoice).values({
                            questionId: question.id,
                            prompt: qDto.multipleChoice.prompt,
                            options: qDto.multipleChoice.options,
                            correctOptionIndex: qDto.multipleChoice.correctOptionIndex,
                        });
                    } else if (qDto.type === QuestionType.FILL_THE_BLANKS && qDto.fillTheBlanks) {
                        await tx.insert(schema.qFillTheBlanks).values({
                            questionId: question.id,
                            promptWithBlanks: qDto.fillTheBlanks.promptWithBlanks,
                            correctAnswers: qDto.fillTheBlanks.correctAnswers,
                        });
                    } else if (qDto.type === QuestionType.ESSAY && qDto.essay) {
                        await tx.insert(schema.qEssay).values({
                            questionId: question.id,
                            prompt: qDto.essay.prompt,
                            minWords: qDto.essay.minWords,
                        });
                    }
                }
            }

            return { success: true, classworkId: classwork.id };
        });
    }

    async findOneForPlayer(classworkId: string) {
        const classwork = await db.query.classworks.findFirst({
            where: eq(schema.classworks.id, classworkId),
            with: {
                questions: {
                    orderBy: [asc(schema.questions.sequenceOrder)], // <-- A ORDENAÇÃO
                    with: {
                        multipleChoice: true,
                        fillTheBlanks: true,
                        essay: true,
                    }
                }
            }
        });

        if (!classwork) throw new NotFoundException('Lição não encontrada');
        return classwork;
    }


    async findMyClassworks(studentId: string) {
   
        const student = await db.query.students.findFirst({
            where: eq(schema.students.id, studentId)
        });

        if (!student || !student.classroomId) return [];


        const relations = await db.query.classworkClassrooms.findMany({
            where: eq(schema.classworkClassrooms.classroomId, student.classroomId),
            with: { classwork: true }
        });

        return relations.map(r => r.classwork);
    }
}