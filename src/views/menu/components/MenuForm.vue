<template>
  <el-card class="baox-card">
    <div slot="header" class="clearfix">
      <span>{{ isEdit ? '编辑' : '添加' }}菜单</span>
    </div>
    <el-form ref="form" :model="form" :rules="rules" label-width="80px">
      <el-form-item label="菜单名称" prop="name">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="菜单路径" prop="href">
        <el-input v-model="form.href"></el-input>
      </el-form-item>
      <el-form-item label="上级菜单" prop="parentId">
        <el-select v-model="form.parentId" placeholder="请选择活动区域">
          <el-option label="无上级菜单" :value="-1"></el-option>
          <el-option
            v-for="item in parentMenuList"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="描述" prop="description">
        <el-input v-model="form.description"></el-input>
      </el-form-item>
      <el-form-item label="前端图标" prop="icon">
        <el-input v-model="form.icon"></el-input>
      </el-form-item>
      <el-form-item label="是否显示" prop="shown">
        <el-radio-group v-model="form.shown">
          <el-radio :label="true">是</el-radio>
          <el-radio :label="false">否</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="排序" prop="orderNum">
        <el-input type="number" v-model="form.orderNum" :min="1"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit" :loading="isLoading"
          >立即创建</el-button
        >
        <el-button v-if="!isEdit">重置</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script lang="ts">
import Vue from 'vue';
import { Form } from 'element-ui';
import { createMenu, getEditMenuInfo } from '@/services/menu';

export default Vue.extend({
  name: 'MenuForm',
  props: {
    isEdit: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      parentMenuList: [], // 父级菜单列表
      form: {
        // id: 0,
        name: '',
        href: '',
        parentId: -1, // -1 表示没有上级菜单
        description: '',
        icon: '',
        shown: true,
        orderNum: 0,
      },
      rules: {
        name: [{ required: true, message: '请输入菜单名称', trigger: 'blur' }],
        href: [{ required: true, message: '请输入菜单名称', trigger: 'blur' }],
      },
      isLoading: false,
    };
  },
  methods: {
    async loadMenuInfo() {
      const { parentMenuList, menuInfo } = await getEditMenuInfo({
        id: this.$route.params.id || -1,
      });
      this.parentMenuList = parentMenuList;
      if (this.isEdit && menuInfo) {
        this.form = menuInfo;
      }
      console.log('loadMenuInfo data :', parentMenuList);
    },

    async onSubmit() {
      const form = this.$refs.form as Form;
      form.validate(async (valid) => {
        if (valid) {
          try {
            await createMenu(this.form);
            this.$message.success('提交成功');
            this.$router.back();
          } catch (error) {
            this.$catchError(error);
          }
        }
      });
    },
  },
  created() {
    this.loadMenuInfo();
  },
});
</script>

<style lang="scss" scoped></style>
