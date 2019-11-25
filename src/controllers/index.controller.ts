import { Controller, Get, Route } from "tsoa";

// tslint:disable-next-line: no-var-requires
const swaggerConfig = require("../../api/dist/swagger");

@Route("")
export class IndexController extends Controller {
  @Get("")
  public async index() {
    return swaggerConfig;
  }
}
