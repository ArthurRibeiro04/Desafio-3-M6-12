import { Response } from "express"

export default class appErr{
    statusCode: number
    message: string
  
    constructor(message: string, statusCode = 400){
      this.message = message
      this.statusCode = statusCode
    }
  }

  export const handleError = (err: appErr, res: Response) => {
    const { statusCode, message } = err;

    return res.status(statusCode).json({
      message: message
    })
  }