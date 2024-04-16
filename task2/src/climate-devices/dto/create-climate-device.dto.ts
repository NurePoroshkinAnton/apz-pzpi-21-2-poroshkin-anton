import {
  ClimateDeviceStatus,
  ClimateDeviceType,
} from '../entities/climate-device.entity';

export class CreateClimateDeviceDto {
  type: ClimateDeviceType;
  address: string;
  status: ClimateDeviceStatus;
  roomId: string;
}
