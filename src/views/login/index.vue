<template>
  <div class="login">
    <h1>登录</h1>
    <el-form
      ref="form"
      :model="form"
      :rules="rules"
      label-width="80px"
      label-position="top"
      class="login-form"
    >
      <el-form-item label="手机号" prop="phone">
        <el-input v-model="form.phone"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input type="password" v-model="form.password"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button
          type="primary"
          @click="onSubmit"
          :loading="isLoading"
          class="login-btn"
          >登录</el-button
        >
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { login } from '@/services/user';
import { Form } from 'element-ui';
import { SET_USER } from '@/store/types';

export default Vue.extend({
  name: 'LoginIndex',
  data() {
    return {
      form: {
        phone: '',
        password: '',
      },
      rules: {
        phone: [
          { required: true, message: '请输入手机号', trigger: 'blur' },
          {
            pattern: /^1\d{10}/,
            message: '请输入正确的手机号',
            trigger: 'blur',
          },
        ],
        password: [
          { required: true, message: '请选择活动区域', trigger: 'change' },
          {
            min: 6,
            max: 18,
            message: '长度在 6 到 18 个字符',
            trigger: 'blur',
          },
        ],
      },
      isLoading: false,
    };
  },
  methods: {
    onSubmit() {
      const form = this.$refs.form as Form;
      form.validate(async (valid) => {
        if (valid) {
          try {
            this.isLoading = true;
            const data = await login(this.form);
            this.$message.success('登录成功');
            this.$store.commit(SET_USER, data);
            this.$router.push((this.$route.query.redirect as string) || '/');
          } catch (error) {
            this.$catchError(error);
          }
          this.isLoading = false;
        } else {
          form.resetFields();
        }
      });
    },
  },
});
</script>

<style lang="scss" scoped>
.login {
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.login-form {
  width: 300px;
  background-color: #fff;
  padding: 20px;
  border-radius: 4px;
}

.login-btn {
  width: 100%;
}
</style>
