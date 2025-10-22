import { Response } from "express";

interface responseObject {
  success: string;
  data: object;
  status?: number;
}

class ResponseWrapper {
  public res: Response;
  constructor(response: Response) {
    this.res = response;
  }
  public handler(
    response: responseObject,
    success_code: number,
    fail_code: number
  ): Response {
    if (response.success) {
      return this.res.status(success_code).send(response);
    }
    if (response.status) {
      fail_code = response.status;
    }
    delete response.status;
    return this.res.status(fail_code).send(response);
  }

  public created(response: responseObject): Response {
    return this.handler(response, 201, 400);
  }
  public ok(response: responseObject): Response {
    return this.handler(response, 200, 400);
  }
  public auauthorized(response: responseObject): Response {
    return this.handler(response, 201, 401);
  }
  public forbidden(response: responseObject): Response {
    return this.handler(response, 200, 403);
  }
}
