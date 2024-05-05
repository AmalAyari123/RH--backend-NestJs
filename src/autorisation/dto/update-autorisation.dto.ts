import { PartialType } from '@nestjs/mapped-types';
import { CreateAutorisationDto } from './create-autorisation.dto';

export class UpdateAutorisationDto extends PartialType(CreateAutorisationDto) {}
