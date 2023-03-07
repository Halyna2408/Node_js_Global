export class ResponseError extends Error {
    statusCode: number;

    constructor(message = 'No response') {
        super(message);
        this.statusCode = 404;
    } 
}