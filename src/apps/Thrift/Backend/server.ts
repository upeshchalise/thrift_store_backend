import * as dotenv from 'dotenv';
import express from 'express';
import * as http from 'http';
import { AddressInfo } from 'net';
dotenv.config()

export class Server {
    private readonly express: express.Application;
    private http: http.Server | any;

    constructor(private router: express.Router){
        this.express = express();
        this.express.use(this.router)
        this.express.use(express.static('public'))
    }

    public start = async () : Promise<void> => {
        return await new Promise<void>(resolve => {
            this.http = this.express.listen(process.env.PORT, ()=> {
                const {port} = this.http.address() as AddressInfo;
                console.log(`application started at ${port}`);
                resolve();
            })
        })
    }

    get httpServer() {
        return this.http;
      }

      public stop = async (): Promise<void> => {
        return new Promise((resolve, reject) => {
          if (this.http) {
            this.http.close((error: any) => {
              if (error) {
                return reject(error);
              }
              return resolve();
            });
          }
    
          return resolve();
        });
      };
    
      public invoke = (): express.Application => this.express;
}