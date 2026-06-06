import { relations } from "drizzle-orm";
import { jsonb } from "drizzle-orm/pg-core";
import { pgEnum } from "drizzle-orm/pg-core";
import { 
    pgTable, 
    text, 
    timestamp, 
    boolean, 
    uuid, 
    integer, 
    doublePrecision, 
    primaryKey 
} from "drizzle-orm/pg-core";

export const userRoleEnum = pgEnum("user_role", ["student", "professor", "admin"])
export const questionTypeEnum = pgEnum("question_type", ["multiple_choice", "fill_the_blanks", "essay", "alternative"]);

export const users = pgTable("users", {
    id: uuid("id").defaultRandom().primaryKey(),
    email: text("email").notNull().unique(),
    passwordHash: text("password_hash").notNull(),
    name: text("name").notNull(),
    username: text("username").notNull().unique(),
    role: userRoleEnum('role').notNull().default("student"),
    isVerified: boolean('is_verified').notNull().default(false),
    isActive: boolean('is_active').notNull().default(true),
    verificationToken: text("verificationToken"),
    verificationTokenExpiresAt: timestamp('verification_token_expires_at'),
    resetToken: text("reset_token"),
    resetTokenExpiresAt: timestamp("reset_token_expires_at"),
    refreshTokenHash: text('refresh_token_hash'),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull()
});

export const schools = pgTable("schools", {
    id: uuid("id").defaultRandom().primaryKey(),
    name: text("name").notNull(),
    code: text("code").notNull().unique(), 
    active: boolean("active").default(true).notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const classrooms = pgTable("classrooms", {
    id: uuid("id").defaultRandom().primaryKey(),
    schoolId: uuid("school_id")
        .notNull()
        .references(() => schools.id, { onDelete: "cascade" }),
        name: text("name").notNull(),
        code: text("code").notNull().unique(),
        active: boolean("active").default(true).notNull(),
        createdAt: timestamp("created_at").defaultNow().notNull(),
    });

export const students = pgTable("students", {
    id: uuid('student_id')
        .notNull() 
        .references(() => users.id, { onDelete: "cascade" }),
    classroomId: uuid("classroom_id")
        .references(() => classrooms.id, { onDelete: "set null" }),
    level: integer("level").default(1).notNull(),
    currentXp: integer("current_xp").default(0).notNull(), 
    totalXp: integer("total_xp").default(0).notNull(),
    levelProgress: doublePrecision("level_progress").default(0).notNull(),
    rank: integer("rank"),
    ruby: integer("ruby").default(100).notNull(),
    trophy: integer("trophy").default(0).notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull()
}, (table) => {
  
    return {
        pk: primaryKey({ columns: [table.id] }) 
    };
});
export const professors = pgTable("professors", {
    id: uuid('professor_id')
        .notNull()
        .references(() => users.id, { onDelete: "cascade" }),
    specialization: text("specialization"),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull()
}, (table) => {
    return {
        pk: primaryKey({ columns: [table.id] })
    };
}



);


export const professorClassrooms = pgTable("professor_classrooms", {
    professorId: uuid("professor_id")
        .notNull()
        .references(() => professors.id, { onDelete: "cascade" }),
    classroomId: uuid("classroom_id")
        .notNull()
        .references(() => classrooms.id, { onDelete: "cascade" }),
    assignedAt: timestamp("assigned_at").defaultNow().notNull()
}, (table) => {
    return {
        pk: primaryKey({ columns: [table.professorId, table.classroomId] })
    }
});

export const studentsRelations = relations(students, ({ one }) => ({
    user: one(users, {
        fields: [students.id],      
        references: [users.id],     
    }),

    classroom: one(classrooms, {
        fields: [students.classroomId],
        references: [classrooms.id],
    })
}));

export const professorsRelations = relations(professors, ({ one, many }) => ({
    user: one(users, {
        fields: [professors.id],
        references: [users.id],
    }),

    classrooms: many(professorClassrooms), 
}));


export const classworks = pgTable("classworks", {
    id: uuid("id").defaultRandom().primaryKey(),
    professorId: uuid("professor_id")
        .notNull()
        .references(() => professors.id, { onDelete: "cascade" }),
    title: text("title").notNull(),
    description: text("description"),

    subject: text("subject").notNull(),
    difficulty: integer("difficulty").default(1).notNull(),
    
    xpReward: integer("xp_reward").default(50).notNull(),
    rubyReward: integer("ruby_reward").default(10).notNull(),
    
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull()
});

export const classworkClassrooms = pgTable("classwork_classrooms", {
    classworkId: uuid("classwork_id")
        .notNull()
        .references(() => classworks.id, { onDelete: "cascade" }),
    classroomId: uuid("classroom_id")
        .notNull()
        .references(() => classrooms.id, { onDelete: "cascade" }),
    dueDate: timestamp("due_date"),
    assignedAt: timestamp("assigned_at").defaultNow().notNull()
}, (table) => {
    return {
        pk: primaryKey({ columns: [table.classworkId, table.classroomId] })
    };
});

export const questions = pgTable("questions", {
    id: uuid("id").defaultRandom().primaryKey(),
    classworkId: uuid("classwork_id")
        .notNull()
        .references(() => classworks.id, { onDelete: "cascade" }), 
    
    type: questionTypeEnum("type").notNull(),
    sequenceOrder: integer("sequence_order").notNull(), 
    
    xpReward: integer("xp_reward").default(10).notNull(), 
});

export const qMultipleChoice = pgTable("q_multiple_choice", {
    questionId: uuid("question_id")
        .primaryKey()
        .references(() => questions.id, { onDelete: "cascade" }),
    prompt: text("prompt").notNull(), 
    options: jsonb("options").notNull(), 
    correctOptionIndex: integer("correct_option_index").notNull(), 
});

export const qFillTheBlanks = pgTable("q_fill_the_blanks", {
    questionId: uuid("question_id")
        .primaryKey()
        .references(() => questions.id, { onDelete: "cascade" }),
    promptWithBlanks: text("prompt_with_blanks").notNull(), 
    correctAnswers: jsonb("correct_answers").notNull(), 
});

export const qEssay = pgTable("q_essay", {
    questionId: uuid("question_id")
        .primaryKey()
        .references(() => questions.id, { onDelete: "cascade" }),
    prompt: text("prompt").notNull(),
    minWords: integer("min_words").default(0),
});

export const classworksRelations = relations(classworks, ({ one, many }) => ({
    professor: one(professors, {
        fields: [classworks.professorId],
        references: [professors.id],
    }),
    classrooms: many(classworkClassrooms),
    questions: many(questions), 
}));

export const classworkClassroomsRelations = relations(classworkClassrooms, ({ one }) => ({
    classwork: one(classworks, {
        fields: [classworkClassrooms.classworkId],
        references: [classworks.id],
    }),
    classroom: one(classrooms, {
        fields: [classworkClassrooms.classroomId],
        references: [classrooms.id],
    }),
}));

export const questionsRelations = relations(questions, ({ one }) => ({
    classwork: one(classworks, {
        fields: [questions.classworkId],
        references: [classworks.id],
    }),
    
    multipleChoice: one(qMultipleChoice, {
        fields: [questions.id],
        references: [qMultipleChoice.questionId]
    }),
    fillTheBlanks: one(qFillTheBlanks, {
        fields: [questions.id],
        references: [qFillTheBlanks.questionId]
    }),
    essay: one(qEssay, {
        fields: [questions.id],
        references: [qEssay.questionId]
    }),
}));

export type User = typeof users.$inferSelect
export type NewUser = typeof users.$inferInsert
export type School = typeof schools.$inferSelect
export type NewSchool = typeof schools.$inferInsert