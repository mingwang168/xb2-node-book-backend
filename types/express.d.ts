import { TokenPayload } from "../src/auth/interface";
import {GetBooksOptionsFilter, GetBooksOptionsPagination} from '../src/book/service';

declare global {
  namespace Express {
    export interface Request {
      user: TokenPayload;
      fileMetaData:{width?:number;height?:number;metadata?:{}};
      sort: string;
      filter:GetBooksOptionsFilter;
      pagination:GetBooksOptionsPagination;
  }
    }
  }

