import { Request, Response } from "express";
export declare function CreateAnimal(req: Request, res: Response): Promise<void>;
export declare function UpdateAnimal(req: Request, res: Response): Promise<void>;
export declare function DeleteAnimal(req: Request, res: Response): Promise<void>;
export declare function GetAll(req: Request, res: Response): Promise<void>;
export declare function GetSingle(req: Request, res: Response): Promise<void>;
