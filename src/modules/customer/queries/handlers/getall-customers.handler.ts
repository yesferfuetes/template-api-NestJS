import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CustomerEntity } from '../../entities/customer.entity';
import { GetAllCustomersQuery } from '../../queries/impl/getall-customer.query';
import { InternalServerErrorException } from '@nestjs/common';
import { GetAllCustomersResponseDto } from '../../dtos/response/getall-customers-response.dto';
import { GetCustomerResponseDto } from '../../dtos/response/get-customer-response.dto';

@QueryHandler(GetAllCustomersQuery)
export class GetAllCustomersHandler
  implements IQueryHandler<GetAllCustomersQuery>
{
  constructor(
    @InjectRepository(CustomerEntity)
    private readonly repository: Repository<CustomerEntity>,
  ) {}

  async execute(
    query: GetAllCustomersQuery,
  ): Promise<GetAllCustomersResponseDto> {
    try {
      const customers = await this.repository.find();

      const responseDto = new GetAllCustomersResponseDto();

      responseDto.customers = customers.map((customer) => {
        const customerDto = new GetCustomerResponseDto();
        customerDto.customerId = customer.customerId;
        customerDto.firstName = customer.firstName;
        customerDto.lastName = customer.lastName;
        customerDto.age = customer.age;
        customerDto.createdAt = customer.createdAt;
        customerDto.updatedAt = customer.updatedAt;

        return customerDto;
      });

      return responseDto;
    } catch (error) {
      throw new InternalServerErrorException(
        'An error occurred: ' + error.message,
      );
    }
  }
}
