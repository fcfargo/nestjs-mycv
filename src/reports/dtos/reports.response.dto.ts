import { Expose } from 'class-transformer';

export class ReportResponseDto {
  @Expose()
  id: number;

  @Expose()
  make: string;

  @Expose()
  model: string;

  @Expose()
  year: number;

  @Expose()
  mileage: number;

  @Expose()
  lng: number;

  @Expose()
  lat: number;

  @Expose()
  price: number;

  @Expose()
  user_id: number;

  @Expose()
  approved: boolean;
}
