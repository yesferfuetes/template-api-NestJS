import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { GetCustomerQuery } from '../queries/impl/get-customer.query';
import { GetCustomerResponseDto } from '../dtos/response/get-customer-response.dto';
import { GetAllCustomersResponseDto } from '../dtos/response/getall-customers-response.dto';
import { CreateCustomerRequestDto } from '../dtos/request/create-customer-request.dto';
import { GetAllCustomersQuery } from '../queries/impl/getall-customer.query';
import { CreateCustomerCommand } from '../commands/impl/create-customer.command';

@Controller('customers')
export class CustomerController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Get(':id')
  async getCustomer(@Param('id') id: string): Promise<GetCustomerResponseDto> {
    return await this.queryBus.execute(new GetCustomerQuery(id));
  }

  @Get('')
  async getAllCustomers(): Promise<GetAllCustomersResponseDto> {
    return await this.queryBus.execute(new GetAllCustomersQuery());
  }

  @Post('create')
  async createCustomer(
    @Body() createCustomerDto: CreateCustomerRequestDto,
  ): Promise<GetCustomerResponseDto> {
    return await this.commandBus.execute(
      new CreateCustomerCommand(createCustomerDto),
    );
  }
}
