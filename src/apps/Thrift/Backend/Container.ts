import { AwilixContainer, InjectionMode, asClass, asFunction, createContainer } from 'awilix';
import { ErrorMiddleware } from '../../../contexts/Shared/infrastructure/middleware/error-middleware';
import { createPrismaClient } from '../../../contexts/Shared/infrastructure/persistence/prisma';
import { GetUserByEmailService } from '../../../contexts/Thrift/User/application/get-user-by-email.service';
import { PrismaUserRepository } from '../../../contexts/Thrift/User/infrastructure/repository/prisma-user.repository';
import { CreateAdminSeeder } from '../../../contexts/Thrift/User/infrastructure/seeder/create-admin-seeder';
import * as controllers from './controllers';
import { Router } from './router';
import { MasterRouter } from './routes/routes';
import { Server } from './server';

export class Container {
    private readonly container: AwilixContainer;

    constructor() {
      this.container = createContainer({
        injectionMode: InjectionMode.CLASSIC
      });
  
      this.register();
    }

    public register(): void {
        this.container
      .register({
        //core components
        server: asClass(Server).singleton(),
        router: asFunction(Router).singleton(),
        db: asFunction(createPrismaClient).singleton(),
      })

      .register({
        errorMiddleware: asClass(ErrorMiddleware).singleton(),
        masterRouter: asFunction(MasterRouter).singleton()
      })
      .register({
        healthCheckControllers: asClass(controllers.HealthCheckController).singleton()
      })
      .register({
        getUserByEmailService: asClass(GetUserByEmailService).singleton(),
        getUserByEmailController: asClass(controllers.GetUserByEmailController),
        userRepository: asClass(PrismaUserRepository).singleton()
      })
      .register({
        createAdminSeeder: asClass(CreateAdminSeeder).singleton()
      })
    }

    public invoke(): AwilixContainer {
        return this.container
    }
}