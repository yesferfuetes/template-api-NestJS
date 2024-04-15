import { ICommand } from '@nestjs/cqrs';
import { CreateCustomerRequestDto } from '../../dtos/request/create-customer-request.dto';

export class CreateCustomerCommand implements ICommand {
  constructor(
    public readonly createCustomerRequestDto: CreateCustomerRequestDto,
  ) {}
}
