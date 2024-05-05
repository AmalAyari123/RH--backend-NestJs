import { IsIn, IsNotEmpty, IsOptional } from "class-validator";
import { DemandeStatus } from "./demande-status";

export class GetDemandeFilter{
    @IsOptional()
    @IsIn([DemandeStatus.Accepte , DemandeStatus.Attente , DemandeStatus.REJETE])
    status: DemandeStatus;

    search:string

}