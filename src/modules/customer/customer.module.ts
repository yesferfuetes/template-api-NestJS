import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CustomerController } from './controllers/customer.controller';
import { CommandHandlers } from './commands/handlers';
import { CustomerEntity } from './entities/customer.entity';
import { QueryHandlers } from './queries/handlers';

@Module({
  imports: [
    CqrsModule,
    // importando entidades
    TypeOrmModule.forFeature([CustomerEntity]),
  ],
  controllers: [CustomerController],
  providers: [...CommandHandlers, ...QueryHandlers],
})
export class CustomerModule {}
