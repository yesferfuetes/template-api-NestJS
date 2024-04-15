import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CustomerEntity } from '../../entities/customer.entity';
import { CreateCustomerCommand } from '../impl/create-customer.command';

@CommandHandler(CreateCustomerCommand)
export class CreateCustomerHanlder
  implements ICommandHandler<CreateCustomerCommand>
{
  constructor(
    @InjectRepository(CustomerEntity)
    private readonly repository: Repository<CustomerEntity>,
  ) {}

  async execute(command: CreateCustomerCommand): Promise<CustomerEntity> {
    try {
      return await this.createCustomer(command);
    } catch (error) {
      throw new Error('Error al crear el cliente');
    }
  }

  private async createCustomer(
    command: CreateCustomerCommand,
  ): Promise<CustomerEntity> {
    const { customerId, firstName, lastName, age } =
      command.createCustomerRequestDto;
    const customer = this.repository.create({
      customerId,
      firstName,
      lastName,
      age,
    });
    return await this.repository.save(customer);
  }
}
