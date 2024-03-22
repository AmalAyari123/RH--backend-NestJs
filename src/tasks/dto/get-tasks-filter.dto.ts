import { IsIn, IsNotEmpty, IsOptional } from "class-validator";
import { TaskStatus } from "../task-status";

export class GetTasksFilter{
    @IsOptional()
    @IsIn([TaskStatus.DONE , TaskStatus.IN_PROGRESS , TaskStatus.OPEN])
    status: TaskStatus;

    @IsNotEmpty()
    search:string

}