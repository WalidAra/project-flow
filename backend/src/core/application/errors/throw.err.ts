class ValidateError extends Error {
  status: number;
  constructor(message: string, status: number = 400) {
    super(message);
    this.name = "ValidateError";
    this.status = status;
  }
}

export default ValidateError;
