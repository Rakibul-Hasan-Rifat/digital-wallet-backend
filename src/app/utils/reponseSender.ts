import { Response } from "express"

interface IResData<T> {
    success: boolean
    statusCode: number
    message: string
    data: T,
    meta?: {
        total: number
    }
}

const responseSernder = <T>(res: Response, resData: IResData<T>) => {
    res.status(resData.statusCode).json({
        success: resData.success,
        statusCode: resData.statusCode,
        message: resData.message,
        meta: resData.meta,  
        data: resData.data,
    })
}

export default responseSernder;