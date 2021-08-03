import {greet} from './playground/demo';
import request from 'supertest';
import app from '../app';
import {connection} from './database/mysql';

describe('演示单元测试',() => {
    test('测试greet函数:',() => {
        const greeting=greet('王明辉')
        expect(greeting).toBe('您好,王明辉')
    })
});

describe('演示接口测试',() => {
    afterAll(async()=>{
        connection.end();
    });
    test('测试 Get /', async () => {
        const response=await request(app).get('/');
        expect(response.status).toBe(200);
        expect(response.body).toEqual({title:'小白兔的开发之路'});
    })
    test('测试 Post /echo', async () => {
        const response=await request(app).post('/echo').send({message:'你好~'});
        expect(response.status).toBe(201);
        expect(response.body).toEqual({message:'你好~'})
    })
})