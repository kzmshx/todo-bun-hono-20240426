import { JsonHTTPException } from "./json-http-exception";

export class NotFoundException extends JsonHTTPException {
  constructor(message = "Not Found") {
    super(404, { message });
  }
}
