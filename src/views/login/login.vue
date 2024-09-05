<template>
  <div class="flex items-center justify-center w-[100vw] h-[100vh] relative">
    <div class="absolute top-4 right-4 z-10 flex items-center">
      <el-button class="mr-4" size="small" icon="Switch" @click="changeOptinsIndex" circle />
      <el-switch inline-prompt active-icon="Sunny" inactive-icon="Moon" size="large" v-model="thmem.isDark" @change="onChangeDark($event as boolean)"></el-switch>
    </div>
    <Particles id="tsparticles" :options="options[optionsIndex]" style="z-index: -1;" v-if="showBG"/>
    <div class="login_box flex justify-center items-center box-border" style="position: relative;">
      <div class="dark_item w-[100%] h-[100%] transition-all" style="position: absolute;opacity: .8; z-index: 0;"></div>
      <div class="login pc:flex pc:justify-center p-10" style="z-index: 1;">
        <div class="flex items-center w-[100%] pc:w-[50%]">
          <img src="../../assets/images/login.png" style="width: 100%" alt="" />
        </div>

        <div
          class="box-border flex items-center justify-center w-[100%]  pc:w-[500px] pl-4 pr-4 pt-2 pb-2 mt-4 pc:mt-0 pc:ml-4 bg-[rgba(255,255,255,.8)] dark_item transition-all rounded-[20px]">
          <div class="login_form box-border flex flex-col justify-center items-center max-w-[90%]"
            style="width: 100%; height: 100%;">
            <el-text class="title font-semibold" style="font-size: 30px; font-weight: 800;" type="primary">
              SuperAdmin
            </el-text>
            <el-form style="width: 100%" :model="loginParams" :rules="rules" ref="ruleFormRef">
              <el-form-item prop="account">
                <el-input class="mt-6" prefix-icon="User" size="large" placeholder="账号" clearable
                  v-model="loginParams.account" />
              </el-form-item>
              <el-form-item prop="password">
                <el-input class="mt-2" prefix-icon="Lock" size="large" type="password" placeholder="密码" show-password
                  v-model="loginParams.password" @keyup.enter.native="onLogin(ruleFormRef)" />
              </el-form-item>
              <el-form-item>
                <div class="flex w-full">
                  <el-button type="danger" round size="large" class="mt-6" style="width: 100%"
                    @click="onReset">重置</el-button>
                  <el-button type="primary" round size="large" class="mt-6" style="width: 100%"
                    @click="onLogin(ruleFormRef)">登陆</el-button>
                </div>
              </el-form-item>
            </el-form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { options } from "@/config/particlesConfig";
// import { LoginParams } from '@/typings/api_model/user'
import { useUserStore } from '@/stores/userStore'
import { ElMessage } from 'element-plus'
import type { FormInstance, FormRules } from 'element-plus'
import { thmemStore } from '@/stores/thmemStore'

let showBG = ref(true)

let optionsIndex = ref(0)
const changeOptinsIndex = () => {
  showBG.value = false
  let length = options.length
  if(optionsIndex.value==length-1){
    optionsIndex.value = 0
  }else{
    optionsIndex.value = optionsIndex.value + 1
  }
  setTimeout(() => {
    showBG.value = true
  }, 100);
}

const _thmemStore = thmemStore()
let { thmem, _colorList } = storeToRefs(_thmemStore)
const { changeDark } = _thmemStore


const router = useRouter()

const { login } = useUserStore()
let loginParams = ref<any>({
  account: '',
  password: ''
})

const ruleFormRef = ref<FormInstance>()

// 表单验证
const rules = ref<FormRules>({
  account: [{ required: true, message: '请输入账号', trigger: 'blur' }],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    { min: 6, message: '密码需要大于6位', trigger: 'blur' }
  ]
})

// 重置
const onReset = () => {
  loginParams.value = {
    account: '',
    password: ''
  }
}

// 登陆
const onLogin = async (formEl: FormInstance | undefined) => {
  if (!formEl) return
  await formEl.validate(async (valid, fields) => {
    if (valid) {
      // login(loginParams.value)
      ElMessage.success('登陆成功！')
      router.push('/')
    }
  })
}

const onChangeDark = (value: boolean) => {
  changeDark(value)
}
</script>

<style scoped lang="scss">
.login_box {
  width: 100%;
  height: 100%;
  // background-image: url('../../../src/assets/images/background4.jpg');
  background-repeat: no-repeat;
  background-size: cover;
}
</style>