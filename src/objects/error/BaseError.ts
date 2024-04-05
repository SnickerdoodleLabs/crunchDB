export class BaseError extends Error {
    public type: string;
    public src?: unknown;
  
    constructor(
      message: string,
      type: string,
      src: unknown,
    ) {
      super(message);
      this.type = type;
      this.src = src;
    }
  }