// src/Models/IUser.ts

import {IMyTask} from "./IMyTask.ts";
export interface IUser {
    email: string;
    password: string;
    tasks?: IMyTask[];
}