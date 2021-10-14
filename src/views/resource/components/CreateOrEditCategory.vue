<template>
  <el-dialog
    :title="id ? '编辑分类' : '添加分类'"
    :visible="dialogVisible"
    :before-close="beforeClose"
    width="40%"
  >
    <el-form ref="form" :model="form" :rules="rules" label-width="150px">
      <el-form-item label="名称：" prop="name">
        <el-input v-model="form.name" style="width: 250px"></el-input>
      </el-form-item>
      <el-form-item label="排序：" prop="sort">
        <el-input v-model="form.sort" style="width: 250px"></el-input>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="$emit('update-visible', false)">取 消</el-button>
      <el-button type="primary" @click="onSubmit" :loading="isLoading"
        >确 定</el-button
      >
    </span>
  </el-dialog>
</template>

<script lang="ts">
import Vue from 'vue';
import { Form } from 'element-ui';
import { saveOrUpdateResourceCategory } from '@/services/resourceCategory';

export default Vue.extend({
  name: 'ResourceCategoryCreateOrEdit',
  props: {
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
        sort: '',
      },
      rules: {
        name: [{ required: true, message: '请输入名称', trigger: 'blur' }],
        sort: [{ required: true, message: '请输入排序', trigger: 'blur' }],
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
          this.isLoading = true;
          try {
            await saveOrUpdateResourceCategory(option);
            this.$message.success('提交成功');
            this.$emit('on-success');
          } catch (error) {
            this.$catchError(error);
          }
          this.isLoading = false;
        }
      });
    },
  },
});
</script>
