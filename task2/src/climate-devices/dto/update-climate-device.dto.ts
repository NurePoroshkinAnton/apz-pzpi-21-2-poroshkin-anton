import { PartialType } from '@nestjs/mapped-types';
import { CreateClimateDeviceDto } from './create-climate-device.dto';

export class UpdateClimateDeviceDto extends PartialType(
  CreateClimateDeviceDto,
) {}
