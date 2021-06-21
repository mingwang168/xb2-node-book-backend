import app from './app';
import { APP_PORT } from './app/config';
import {connection} from './app/database/mysql';

app.listen(APP_PORT,() => {
    console.log(`服务器已启动在: ${APP_PORT} 端口~`)
});

connection.connect(err=>{
    if(err){
        console.log('连接数据库失败~',err.message);
        return
    }
    console.log('连接数据库成功~')
});