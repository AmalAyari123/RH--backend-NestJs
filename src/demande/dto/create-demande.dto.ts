import {IsNotEmpty} from 'class-validator';
export class CreateDemandeDto{
    @IsNotEmpty()
    date_debut:Date;
    @IsNotEmpty()
    date_fin:Date;
    @IsNotEmpty()
    type: String;
    commentaire?: String;
    justificatifId?: number; 
    count : number;
}
