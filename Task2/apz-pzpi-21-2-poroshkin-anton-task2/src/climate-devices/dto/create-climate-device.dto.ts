import { ClimateDeviceType } from '../entities/climate-device.entity';

export class CreateClimateDeviceDto {
  type: ClimateDeviceType;
  address: string;
  accessionNumber: string;
  roomId: string;
}
