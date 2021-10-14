<template>
  <el-dialog
    :title="id ? '编辑资源' : '添加资源'"
    :visible="dialogVisible"
    :before-close="beforeClose"
    width="40%"
  >
    <el-form ref="form" :model="form" :rules="rules" label-width="150px">
      <el-form-item label="资源名称：" prop="name">
        <el-input v-model="form.name" style="width: 250px"></el-input>
      </el-form-item>
      <el-form-item label="资源路径：" prop="url">
        <el-input v-model="form.url" style="width: 250px"></el-input>
      </el-form-item>
      <el-form-item label="资源分类：" prop="categoryId">
        <el-select
          v-model="form.categoryId"
          placeholder="资源分类"
          style="width: 250px"
          clearable
        >
          <el-option
            v-for="item in resourceCategories"
            :label="item.name"
            :value="item.id"
            :key="item.id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="描述：" prop="description">
        <el-input
          type="textarea"
          v-model="form.description"
          rows="5"
          style="width: 250px"
        ></el-input>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="$emit('update-visible', false)">取 消</el-button>
      <el-button type="primary" @click="onSubmit">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script lang="ts">
import Vue from 'vue';
import { Form } from 'element-ui';
import { saveOrUpdateResource } from '@/services/resource';

export default Vue.extend({
  name: 'ResourceCreateOrEdit',
  props: {
    resourceCategories: {
      type: Array,
      default: () => [],
    },
    dialogVisible: {
      type: Boolean,
      default: false,
    },
    detail: {
      type: Object,
      default: () => ({}),
    },
    id: {
      type: Number,
      default: 0,
    },
  },
  data() {
    return {
      form: {
        // id: 0,
        name: '',
        url: '',
        categoryId: null,
      },
      rules: {
        name: [{ required: true, message: '请输入资源名称', trigger: 'blur' }],
        url: [{ required: true, message: '请输入资源路径', trigger: 'blur' }],
      },
      isLoading: false,
    };
  },
  watch: {
    dialogVisible(val, oldVal) {
      if (val && !oldVal) {
        this.form = {
          ...this.form,
          ...this.detail,
        };
      }
    },
  },
  methods: {
    beforeClose() {
      this.$emit('update-visible', false);
    },
    async onSubmit() {
      const form = this.$refs.form as Form;
      const option = this.id
        ? {
            ...this.form,
            id: this.id,
          }
        : this.form;

      form.validate(async (valid) => {
        if (valid) {
          try {
            await saveOrUpdateResource(option);
            this.$message.success('提交成功');
            this.$emit('on-success');
          } catch (error) {
            this.$catchError(error);
          }
        }
      });
    },
  },
});
</script>

<style lang="scss" scoped></style>
