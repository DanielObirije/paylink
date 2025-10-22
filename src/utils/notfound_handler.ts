import { Request,Response } from "express";
import { success } from "zod";

export const notFoundHandler = (req: Request,res: Response)=> {
    res.status(404)
   return  res.json({success:false,data:{message:"invalid api call"}})
}