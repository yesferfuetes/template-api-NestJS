import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { GetCustomerQuery } from '../queries/impl/get-customer.query';
import { GetCustomerResponseDto } from '../dtos/response/get-customer-response.dto';

@Controller('customers')
export class CustomerController {
  constructor(
    private commandBus: CommandBus,
    private queryBus: QueryBus,
  ) {}

  @Get(':id')
  async getCustomer(@Param('id') id: string): Promise<GetCustomerResponseDto> {
    return await this.queryBus.execute(new GetCustomerQuery(id));
  }
}
