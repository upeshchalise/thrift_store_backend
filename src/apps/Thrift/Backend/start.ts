import { CreateAdminSeeder } from '../../../contexts/Thrift/User/infrastructure/seeder/create-admin-seeder';
import { Container } from './Container';
import { Server } from './server';

const container = new Container();
const server = container.invoke().resolve<Server>('server');
const adminSeeder = container.invoke().resolve<CreateAdminSeeder>('createAdminSeeder');

server
.start()
.then(async () => {
    console.log("server started");
    adminSeeder.addAdminSeeder();
})
.catch((err: Error) => {
    console.log(err);
    process.exit(1)
})