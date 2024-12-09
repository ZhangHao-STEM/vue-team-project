//导入request.js请求工具
//import request from '@/utils/request.js'

//提供调用注册接口的函数
/*
export const userRegisterService = (registerData) => {
    //借助UrlSearchParams完成传递
    const params = new URLSearchParams()
    for (let key in registerData){
        params.append(key,registerData[key]);
    }

    return request.post('/user/register',params);
}*/
//提供调用登录接口的函数
/*export const userLoginService = (loginData) => {
    //借助UrlSearchParams完成传递
    const params = new URLSearchParams()
    for (let key in loginData){
        params.append(key,loginData[key]);
    }
    return request.post('/user/login',params);
}*/

// 模拟用户数据库
const simulatedUserDatabase = [
    { username: 'admin', password: 'admin123' }, // 示例用户
];

export const userRegisterService = (registerData) => {
    // 模拟请求延迟
    return new Promise((resolve) => {
        setTimeout(() => {
            // 检查用户是否已经注册
            const userExists = simulatedUserDatabase.some(
                (user) => user.username === registerData.username
            );

            if (userExists) {
                resolve({ code: 1, msg: '用户名已存在' }); // 注册失败
            } else {
                // 模拟成功注册
                simulatedUserDatabase.push({
                    username: registerData.username,
                    password: registerData.password,
                });
                resolve({ code: 0, msg: '注册成功' }); // 注册成功
            }
        }, 1000); // 模拟 1 秒钟延迟
    });
};

// 提供调用模拟登录接口的函数
export const userLoginService = (loginData) => {
    // 获取本地存储的用户名和密码（假设这些数据已经在注册时存储）
    const storedUsername = localStorage.getItem('username');
    const storedPassword = localStorage.getItem('password');

    // 模拟登录验证：检查输入的用户名和密码是否与存储的匹配
    if (storedUsername === loginData.username && storedPassword === loginData.password) {
        // 如果匹配，返回模拟成功的结果
        return Promise.resolve({ code: 0, msg: '登录成功' });
    } else {
        // 如果不匹配，返回模拟失败的结果
        return Promise.resolve({ code: 1, msg: '用户名或密码错误' });
    }
};
