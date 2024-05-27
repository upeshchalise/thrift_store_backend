import { AwilixContainer, InjectionMode, asClass, asFunction, asValue, createContainer } from 'awilix';
import { JWTAdminAuthorizer } from '../../../contexts/Shared/infrastructure/authorizer/admin-authorizer';
import { JWTCustomerAuthorizer } from '../../../contexts/Shared/infrastructure/authorizer/customer-authorizer';
import { JWTUserAuthorizer } from '../../../contexts/Shared/infrastructure/authorizer/user-authorizer';
import { ErrorMiddleware } from '../../../contexts/Shared/infrastructure/middleware/error-middleware';
import { createPrismaClient } from '../../../contexts/Shared/infrastructure/persistence/prisma';
import { upload } from '../../../contexts/Shared/infrastructure/uploads/image-upload';
import { CreateProductService } from '../../../contexts/Thrift/Product/application/create-product.service';
import { DeleteProductService } from '../../../contexts/Thrift/Product/application/delete-product.service';
import { GetAllProductService } from '../../../contexts/Thrift/Product/application/get-all-product.service';
import { GetProductByProductIdService } from '../../../contexts/Thrift/Product/application/get-product-by-product-id.service';
import { GetProductsByUserIdService } from '../../../contexts/Thrift/Product/application/get-produts-by-user-id.service';
import { UpdateProductService } from '../../../contexts/Thrift/Product/application/update-product.service';
import { PrismaProductRepository } from '../../../contexts/Thrift/Product/infrastructure/repository/prisma-product.repository';
import { CreateProductSeeder } from '../../../contexts/Thrift/Product/infrastructure/seeder/create-product.seeder';
import { CreateUserService } from '../../../contexts/Thrift/User/application/create-user.service';
import { GetUserByEmailService } from '../../../contexts/Thrift/User/application/get-user-by-email.service';
import { GetUserByIdService } from '../../../contexts/Thrift/User/application/get-user-by-id.service';
import { UpdateUserService } from '../../../contexts/Thrift/User/application/update-user.service';
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
        upload: asValue(upload)
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
        createUserService: asClass(CreateUserService).singleton(),
        createUserController: asClass(controllers.CreateUserController),
        getUserByIdService: asClass(GetUserByIdService).singleton(),
        getUserByIdController: asClass(controllers.GetUserByIdController).singleton(),
        loginUserController: asClass(controllers.LoginUserController),
        updateUserService: asClass(UpdateUserService).singleton(),
        updateUserController: asClass(controllers.UpdateUserController).singleton(),
        userRepository: asClass(PrismaUserRepository).singleton()
      })
      .register({
        createProductService: asClass(CreateProductService).singleton(),
        createProductController: asClass(controllers.CreateProductController),
        getProductsByUserIdController: asClass(controllers.GetProductsByUserIdController).singleton(),
        getProductsByUserIdService: asClass(GetProductsByUserIdService).singleton(),
        getProductByProductIdService: asClass(GetProductByProductIdService).singleton(),
        getProductByProductIdController: asClass(controllers.GetProductByProductIdController),
        updateProductService:asClass(UpdateProductService).singleton(),
        updateProductController: asClass(controllers.UpdateProductController),
        deleteProductService:asClass(DeleteProductService).singleton(),
        deleteProductController: asClass(controllers.DeleteProductController), 
        getAllProductService: asClass(GetAllProductService).singleton(),
        getAllProductController: asClass(controllers.GetAllProductsController),
        productRepository: asClass(PrismaProductRepository).singleton()
      })
      .register({
        adminAuthorizer: asClass(JWTAdminAuthorizer).singleton(),
        userAuthorizer: asClass(JWTUserAuthorizer).singleton(),
        customerAuthorizer: asClass(JWTCustomerAuthorizer).singleton()
      })
      .register({
        createAdminSeeder: asClass(CreateAdminSeeder).singleton(),
        createProductSeeder: asClass(CreateProductSeeder).singleton()
      })
    }

    public invoke(): AwilixContainer {
        return this.container
    }
}