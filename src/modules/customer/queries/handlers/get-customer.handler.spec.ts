import { Test } from '@nestjs/testing';
import { GetCustomerHanlder } from './get-customer.handler';
import { GetCustomerQuery } from '../impl/get-customer.query';
import { Repository } from 'typeorm';
import { CustomerEntity } from '../../entities/customer.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { mock, MockProxy } from 'jest-mock-extended';

describe('GetCustomerHanlder', () => {
  let handler: GetCustomerHanlder;
  let mockRepository: MockProxy<Repository<CustomerEntity>>;

  beforeEach(async () => {
    // Crear mocks para las dependencias
    const module = await initApp();
    handler = module.get<GetCustomerHanlder>(GetCustomerHanlder);
    mockRepository = module.get(getRepositoryToken(CustomerEntity));
  });

  it('should be defined', () => {
    expect(handler).toBeDefined();
    expect(mockRepository).toBeDefined();
  });

  it('should throw an error when the customer does not exist', async () => {
    const query = new GetCustomerQuery('123');
    mockRepository.findOneBy.mockResolvedValue(null);

    await expect(handler.execute(query)).rejects.toThrow();
  });

  it('should return customer data when customer is found', async () => {
    const mockCustomer = {
      customerId: '123',
      firstName: 'John',
      lastName: 'Doe',
      age: 30,
      createdAt: new Date(),
      updatedAt: new Date(),
    } as CustomerEntity;

    // Configurar el mock del repositorio para devolver un cliente específico
    mockRepository.findOne.mockResolvedValue(mockCustomer);

    // Simular el input del query
    const query = new GetCustomerQuery('123');

    // Ejecutar el handler
    const result = await handler.execute(query);

    // Verificar el resultado
    expect(result).toEqual({
      customerId: mockCustomer.customerId,
      firstName: mockCustomer.firstName,
      lastName: mockCustomer.lastName,
      age: mockCustomer.age,
      createdAt: mockCustomer.createdAt,
      updatedAt: mockCustomer.updatedAt,
    });

    // Verificar que se llamó al método findOne del repositorio
    expect(mockRepository.findOne).toHaveBeenCalledWith({
      where: { customerId: '123' },
    });
  });

  it('should throw an error when an exception occurs', async () => {
    const query = new GetCustomerQuery('123');
    mockRepository.findOneBy.mockRejectedValue(new Error('Error'));

    await expect(handler.execute(query)).rejects.toThrow();
  });
});

async function initApp() {
  return await Test.createTestingModule({
    providers: [
      GetCustomerHanlder,
      {
        provide: getRepositoryToken(CustomerEntity),
        useValue: mock<Repository<CustomerEntity>>(),
      },
    ],
  }).compile();
}
