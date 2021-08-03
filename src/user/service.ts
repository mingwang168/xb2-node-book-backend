import { connection } from "../app/database/mysql";
import { UserModel } from "./model";

export const createUser = async (user: UserModel) => {
  const statement = `insert into user set ?`;
  const [data] = await connection.promise().query(statement, user);
  return data;
};
interface GetUserOptions {
  password?: boolean;
}
export const getUser = (condition: string) => {
  return async (param: string | number, options: GetUserOptions = {}) => {
    const { password } = options;
    const statement = `select user.id,user.name, if(count(avatar.id),1,null) as avatar ${
      password ? ",user.password" : ""
    } from user left join avatar on avatar.userId=user.id where ${condition}=?`;
    const [data] = await connection.promise().query(statement, param);
    const result = data as any;
    return result[0].id?result[0]:null;
  };
};
export const getUserByName=getUser('user.name');
export const getUserById=getUser('user.id');

export const updateUser= async (id:number,userData:UserModel)=>{
const statement=`update user set ? where user.id=?`;
const params=[userData,id]
const [data]=await connection.promise().query(statement,params);
return data;
}
export const deleteUser=async (userId:number) => {
  const statement=`delete from user where id=?`;
  const [data]=await connection.promise().query(statement,userId);
  return data;
}