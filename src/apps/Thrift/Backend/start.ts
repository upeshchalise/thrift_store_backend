import { Container } from './Container';
import { Server } from './server';

const container = new Container();
const server = container.invoke().resolve<Server>('server');

server
.start()
.then(async () => {
    console.log("server started");
})
.catch((err: Error) => {
    console.log(err);
    process.exit(1)
})