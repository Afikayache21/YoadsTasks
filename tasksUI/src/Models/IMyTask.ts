// src/Models/IMyTask.ts

export interface IMyTask {
    createdAt: Date;
    description: string;
    dueDate: Date;
    email: string;
    id: number;
    isCompleted: boolean;
    title: string;
}

