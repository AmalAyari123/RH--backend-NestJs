import { IsNotEmpty } from "class-validator";

export class CreateAutorisationDto {



    @IsNotEmpty()
    heure_debut:Date;
    @IsNotEmpty()
    heure_fin:Date;
    @IsNotEmpty()
    jour:Date;
    
}
