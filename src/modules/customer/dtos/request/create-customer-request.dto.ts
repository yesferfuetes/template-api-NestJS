import { IsString, IsInt, Min, Max } from 'class-validator';

export class CreateCustomerRequestDto {
  @IsString()
  customerId: string;

  @IsString()
  firstName: string;

  @IsString()
  lastName: string;

  @IsInt()
  @Min(0)
  @Max(150)
  age: number;
}
