import { ArgumentMetadata, BadRequestException, PipeTransform } from "@nestjs/common";
import { TaskStatus } from "src/tasks/task-status";
export class TaksValidationStatusPipe implements PipeTransform{
   readonly allowedStatus = [
    TaskStatus.DONE,
    TaskStatus.IN_PROGRESS,
    TaskStatus.OPEN

   ];
   transform(value: any) {
    value= value.toUpperCase();
    if ( !this.isStatusValid(value)){
        throw new BadRequestException("invalid status");
        return value;

    }
       
   }
   private isStatusValid(status:any) {
    const idx = this.allowedStatus.indexOf(status);
    return idx!= -1 ;

   }

}