import { request } from "express";

export interface IAuthorizer<R, S, N> {
  authorize(req: R, res: S, next: N): void;
}
