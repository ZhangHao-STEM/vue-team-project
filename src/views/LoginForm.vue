<script setup>
import {ref} from 'vue'
import { User, Lock } from '@element-plus/icons-vue'
import { View, Hide } from '@element-plus/icons-vue'

//控制注册与登录表单的显示， 默认显示注册
const isRegister = ref(false)

// 控制显示密码明文的状态
const showPassword = ref(false)

const togglePasswordVisibility = () => {
  showPassword.value = !showPassword.value;  // 切换密码显示状态
}

//定义数据模型
const registerData = ref({
  username: '',
  password: '',
  rePassword: ''
})

//二次校验密码的函数
const checkRePassword = (rule, value, callback) => {
  if (value === '') {
    callback(new Error('请再次确认密码'))
  } else if (value !== registerData.value.password) {
    callback('二次确认密码不相同请重新输入')
  } else {
    callback()
  }
}

//定义表单校验规则
const rules = ref({
  username: [
    {required: true, message: '请输入用户名', trigger: 'blur'},
    {min: 5, max: 16, message: '请输入长度5~16非空字符', trigger: 'blur'}
  ],
  password: [
    {required: true, message: '请输入密码', trigger: 'blur'},
    {min: 5, max: 16, message: '请输入长度5~16非空字符', trigger: 'blur'}
  ],
  rePassword: [{validator: checkRePassword, trigger: 'blur'}] //校验二次输入密码是否相同
})

//导入提示框组件
import {ElMessage} from 'element-plus'
//调用后台接口完成注册
import {userRegisterService} from '@/api/user.js'
/*
const register = async () => {
  //registerData是一个响应式对象，调用时现需要加上.value
  let result = await userRegisterService(registerData.value);
  if(result.code === 0) {
    //成功
    alert(result.msg ? result.massage:'注册成功');
  }else{
    //失败
    alert('注册失败')
  }

  //登录函数
import {userLoginService} from '@/api/user.js'
const login = async () =>{
    //调用接口完成登录
    let result = await userLoginService(registerData.value);
    if(result.code == 0){
        alert(result.msg ? result.msg : '登录成功')
    }else{
        alert('登录失败')
    }
}
}*/
// 注册函数
const register = async () => {
  try {
    const result = await userRegisterService(registerData.value); // 调用模拟注册函数

    if (result.code === 0) {
      // 注册成功
      ElMessage.success('注册成功!')

      // 注册成功后将用户名和密码存储到 localStorage
      localStorage.setItem('username', registerData.value.username);
      localStorage.setItem('password', registerData.value.password);
    } else {
      // 注册失败
      ElMessage.error('注册失败');
    }
  } catch (error) {
    ElMessage.error('请求失败');
  }
};

//导入路由函数
import {useRouter} from 'vue-router'
const router = useRouter()
import {userLoginService} from '@/api/user.js';

const login = async () => {
  // 调用模拟登录服务
  const result = await userLoginService(registerData.value);  // 使用注册数据作为登录凭证

  if (result.code === 0) {
    ElMessage.success('登录成功!')
    //跳转到首页面
    router.push('/')
  } else {
    ElMessage.error('登录失败');
  }
};

//定义函数，清空数据模型
const clearRegisterData = () => {
  registerData.value = {
    username: '',
    password: '',
    rePassword: ''
  }
}
</script>

<template>
  <el-row class="login-page">
    <el-col :span="12" class="bg"></el-col>
    <el-col :span="6" :offset="3" class="form">
      <!-- 注册表单 -->
      <el-form ref="form" size="large" autocomplete="off" v-if="isRegister" :model="registerData" :rules="rules">
        <el-form-item>
          <h1>注册</h1>
        </el-form-item>
        <el-form-item prop="username">
          <el-input :prefix-icon="User" placeholder="请输入用户名" v-model="registerData.username"></el-input>
        </el-form-item>

        <el-form-item prop="password">
          <el-input
              :prefix-icon="Lock"
              :type="showPassword ? 'text' : 'password'"
              placeholder="请输入密码"
              v-model="registerData.password"
          >
            <template #append>
              <el-icon @click="togglePasswordVisibility">
                <View v-if="!showPassword" />
                <Hide v-if="showPassword" />
              </el-icon>
            </template>
          </el-input>
        </el-form-item>

        <el-form-item prop="rePassword">
          <el-input
              :prefix-icon="Lock"
              :type="showPassword ? 'text' : 'password'"
              placeholder="请输入再次密码"
              v-model="registerData.rePassword"
          >
            <template #append>
              <el-icon @click="togglePasswordVisibility">
                <View v-if="!showPassword" />
                <Hide v-if="showPassword" />
              </el-icon>
            </template>
          </el-input>
        </el-form-item>
        <!-- 注册按钮 -->
        <el-form-item>
          <el-button class="button" type="primary" auto-insert-space @click="register">
            注册
          </el-button>
        </el-form-item>
        <el-form-item class="flex">
          <el-link type="info" :underline="false" @click="isRegister = false; clearRegisterData()">
            ← 返回
          </el-link>
        </el-form-item>
      </el-form>
      <!-- 登录表单 -->
      <el-form ref="form" size="large" autocomplete="off" v-else :model="registerData" :rules="rules">
        <el-form-item>
          <h1>登录</h1>
        </el-form-item>
        <el-form-item prop="username">
          <el-input :prefix-icon="User" placeholder="请输入用户名" v-model="registerData.username"></el-input>
        </el-form-item>

        <el-form-item prop="password">
          <el-input
              name="password"
              :prefix-icon="Lock"
              :type="showPassword ? 'text' : 'password'"
              placeholder="请输入密码"
              v-model="registerData.password"
          >
            <template #append>
              <el-icon @click="togglePasswordVisibility">
                <View v-if="!showPassword" />
                <Hide v-if="showPassword" />
              </el-icon>
            </template>
          </el-input>
        </el-form-item>
        <el-form-item class="flex">
          <div class="flex">
            <el-checkbox>记住我</el-checkbox>
            <el-link type="primary" :underline="false">忘记密码？</el-link>
          </div>
        </el-form-item>
        <!-- 登录按钮 -->
        <el-form-item>
          <el-button class="button" type="primary" auto-insert-space @click="login">登录</el-button>
        </el-form-item>
        <el-form-item class="flex">
          <el-link type="info" :underline="false" @click="isRegister = true">
            注册 →
          </el-link>
        </el-form-item>
      </el-form>
    </el-col>
  </el-row>
</template>

<style lang="scss" scoped>
/* 样式 */
.login-page {
  height: 100vh;
  background-color: #fff;

  .bg {
    background: url('@/assets/logo2.png') no-repeat 60% center / 240px auto,
    url('@/assets/login_bg.jpg') no-repeat center / cover;
    border-radius: 0 20px 20px 0;
  }

  .form {
    display: flex;
    flex-direction: column;
    justify-content: center;
    user-select: none;

    .title {
      margin: 0 auto;
    }

    .button {
      width: 100%;
    }

    .flex {
      width: 100%;
      display: flex;
      justify-content: space-between;
    }
  }
}
</style>