export class CustomError extends Error {
  private constructor(
    public readonly statusCode: number,
    public readonly message: string
  ) {
    super(message)
  }

  /**
   * The HTTP `400 Bad Request` response status code indicates that the server cannot or will not process the request due to something that is perceived to be a client error (for example, malformed request syntax, invalid request message framing, or deceptive request routing).
   * @param m - Message
   */
  static badRequest = (m: string) => new CustomError(400, m)

  /**
   * The HTTP `401 Unauthorized` response status code indicates that the client request has not been completed because it lacks valid authentication credentials for the requested resource.
   * @param m - Message
   */
  static unauthorized = (m: string) => new CustomError(401, m)

  /**
   * The HTTP `403 Forbidden` response status code indicates that the server understands the request but refuses to authorize it.
   * @param m - Message
   */
  static forbidden = (m: string) => new CustomError(403, m)

  /**
   * The HTTP `404 Not Found` response status code indicates that the server cannot find the requested resource. Links that lead to a 404 page are often called broken or dead links and can be subject to link rot.
   * @param m - Message
   */
  static notFound = (m: string) => new CustomError(404, m)

  /**
   * The HTTP `500 Internal Server Error` server error response code indicates that the server encountered an unexpected condition that prevented it from fulfilling the request.
   * @param m - Message
   */
  static internalServerError = (m: string) => new CustomError(500, m)
}
