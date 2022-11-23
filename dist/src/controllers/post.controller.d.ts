import { Request, Response } from 'express';
export declare const createPost: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const updatePost: (req: Request, res: Response) => Promise<void>;
export declare const deletePost: (req: Request, res: Response) => Promise<void>;
export declare const getPosts: (req: Request, res: Response) => Promise<void>;
