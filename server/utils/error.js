export class ErrorResponse {
  constructor(err = {}) {
    this.message = '';
    this.name;
    this.code;
    this.handleRawError(err);
  }
  handleRawError(err) {
    if(err.message && typeof err.message === 'string') {
      this.message = err.message;
    } else {
      console.error('Unrecognized error', err);
    }
  }
  toJSON() {
    return {
      message: typeof this.message === 'string' ? this.message : 'Something went wrong, please try again.',
      name: typeof this.type === 'string' ? this.name : undefined,
      code: typeof this.code === 'number' ? this.code : undefined
    };
  }
}
