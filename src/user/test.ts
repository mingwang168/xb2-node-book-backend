import request from 'supertest';
import app from '../app';
import {connection} from '../app/database/mysql';
import bcrypt from 'bcrypt';
import {getUserById,deleteUser} from './service';
import { signToken } from '../auth/service';
import { UserModel } from './model';

const testUser:UserModel={
    name:'xb2-test-user-name',
    password:'111111',
}
const testUserUpdated:UserModel={
    name:'xb2-test-user-new-name',
    password:'222222',
}
let testUserCreated:UserModel;

afterAll(async () => {
    if(testUserCreated){
        await deleteUser(testUserCreated.id!);
    }
    connection.end();
});

describe('测试创建用户接口',() => {
    test('创造用户的时候必须提供用户名',async () => {
        const response= await request(app).post('/users').send({password:testUser.password});
        expect(response.status).toBe(400);
        expect(response.body).toEqual({message:'用户名不能空'});
    });
    test('创造用户的时候必须提供用户名',async () => {
        const response= await request(app).post('/users').send({name:testUser.name});
        expect(response.status).toBe(400);
        expect(response.body).toEqual({message:'密码不能空'});
    });
    test('成功创建用户后响应阙状态码应该为 201', async () => {
        const response= await request(app).post('/users').send(testUser);
        testUserCreated= await getUserById(response.body.insertId,{password:true});
        expect(response.status).toBe(201);
    });
});

describe('测试获得用户接口',() => {
    test('响应里应该包含指定的属性',async () => {
        const response=await request(app).get(`/users/${testUserCreated.id}`);
        expect(response.status).toBe(200);
        expect(response.body.name).toBe(testUser.name);
        expect(response.body).toMatchObject({
            id:expect.any(Number),
            name:expect.any(String),
            avatar:null,
        })
    });
    test('当前用户不存在时,响应的状态码是 404',async () => {
        const response=await request(app).get(`/users/-1`);
        expect(response.status).toBe(404);
    })
});

describe('测试更新用户接口',() => {
    test('更新用户时需要验证用户身份',async () => {
        const response= await request(app).patch('/users');
        expect(response.status).toBe(401);
    });
    test('更新用户数据', async () => {
        const token=signToken({
            payload:{id:testUserCreated.id,name:testUserCreated.name}
        });
        const response=await request(app).patch('/users').set('Authorization',`Bearer ${token}`).send({
            validate:{password:testUser.password},
            update:{name:testUserUpdated.name,
                    password:testUserUpdated.password},});
        const user=await getUserById(testUserCreated.id!,{password:true});
        const matched=await bcrypt.compare(testUserUpdated.password!,user.password);
        expect(response.status).toBe(200);
        expect (matched).toBeTruthy();
        expect(user.name).toBe(testUserUpdated.name);
    })
})