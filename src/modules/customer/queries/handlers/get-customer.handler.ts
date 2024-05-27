import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CustomerEntity } from '../../entities/customer.entity';
import { GetCustomerQuery } from '../impl/get-customer.query';
import { NotFoundException } from '@nestjs/common';
import { GetCustomerResponseDto } from '../../dtos/response/get-customer-response.dto';

@QueryHandler(GetCustomerQuery)
export class GetCustomerHanlder implements IQueryHandler<GetCustomerQuery> {
  constructor(
    @InjectRepository(CustomerEntity)
    private readonly repository: Repository<CustomerEntity>,
  ) {}

  async execute(query: GetCustomerQuery): Promise<GetCustomerResponseDto> {
    try {
      //Get customer
      const customer = await this.getCustomer(query.id);

      //return customer;
      const responseDto = new GetCustomerResponseDto();
      responseDto.customerId = customer.customerId;
      responseDto.firstName = customer.firstName;
      responseDto.lastName = customer.lastName;
      responseDto.age = customer.age;
      responseDto.createdAt = customer.createdAt;
      responseDto.updatedAt = customer.updatedAt;

      return responseDto;
    } catch (error) {
      // if (error instanceof NotFoundException) {
      //   // Re-lanza la misma excepción para preservar el estado HTTP 404
      //   throw error;
      // }
      // Cualquier otro tipo de exepcion
      throw new error('An error occurred: ' + error.message);
    }
  }

  private async getCustomer(customerId: string) {
    const customer: CustomerEntity = await this.repository.findOne({
      where: { customerId: customerId },
    });

    if (!customer) {
      throw new NotFoundException(`Customer with ID ${customerId} not found.`);
    }

    return customer;
  }
}
