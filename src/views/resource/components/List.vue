<template>
  <div>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <el-form
          ref="form"
          :inline="true"
          :model="form"
          class="demo-form-inline"
        >
          <el-form-item label="资源名称：" prop="name">
            <el-input
              v-model="form.name"
              placeholder="资源名称"
            ></el-input> </el-form-item
          ><el-form-item label="资源路径：" prop="url">
            <el-input v-model="form.url" placeholder="资源路径"></el-input>
          </el-form-item>
          <el-form-item label="资源分类：" prop="categoryId">
            <el-select
              v-model="form.categoryId"
              placeholder="资源分类"
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
          <el-form-item>
            <el-button @click="onReset" :disabled="isLoading">重置</el-button>
            <el-button type="primary" @click="onSubmit" :disabled="isLoading"
              >查询搜索</el-button
            >
          </el-form-item>
        </el-form>
      </div>
      <el-button @click="handleCreate">添加</el-button>
      <el-button @click="handleClickResourceCategories">资源分类</el-button>
    </el-card>

    <el-table
      :data="tableData"
      v-loading="isLoading"
      border
      style="width: 100%"
      :header-cell-style="align"
      :cell-style="align"
    >
      <el-table-column type="index" label="编号" width="80"></el-table-column>
      <el-table-column prop="name" label="资源名称"></el-table-column>
      <el-table-column prop="url" label="资源路径"></el-table-column>
      <el-table-column prop="description" label="描述"> </el-table-column>
      <el-table-column prop="createdTime" label="添加时间">
        <template slot-scope="scope">
          <span>
            {{ formatDate2S(scope.row.createdTime) }}
          </span>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="150">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.row)">编辑</el-button>
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="form.current"
      :page-sizes="[10, 20, 30, 40]"
      :page-size="form.size"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
      :disabled="isLoading"
      style="margin-top: 1em"
    >
    </el-pagination>

    <CreateOrEdit
      :resourceCategories="resourceCategories"
      :dialogVisible="dialogVisible"
      @update-visible="updateVisible"
      :id="id"
      :detail="detail"
      @on-success="onSaveSuccess"
    />
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import {
  getResourcePages,
  getResourceById,
  deleteResource,
} from '@/services/resource';
import { getAllResourceCategories } from '@/services/resourceCategory';
import { formatDate2S } from '@/utils/days';
import { Form } from 'element-ui';
import CreateOrEdit from './CreateOrEdit.vue';

export default Vue.extend({
  name: 'ResourceList',
  components: {
    CreateOrEdit,
  },
  props: {},
  data() {
    return {
      align: { textAlign: 'center' },
      resourceCategories: [],
      form: {
        id: '',
        name: '',
        startCreateTime: '',
        url: '',
        categoryId: '',
        endCreateTime: '',
        current: 0,
        size: 10,
      },
      tableData: [],
      total: 0,
      isLoading: false,

      dialogVisible: false,
      id: 0,
      detail: {},
    };
  },
  created() {
    this.loadAllResourceCategories();
    this.loadResourcePages();
  },
  methods: {
    async loadAllResourceCategories() {
      const data = await getAllResourceCategories();
      this.resourceCategories = data;
    },
    async loadResourcePages() {
      this.isLoading = true;
      const data = await getResourcePages(this.form);
      this.isLoading = false;
      const { total, records } = data;
      this.total = total;
      this.tableData = records;
    },
    handleSizeChange(val: number) {
      this.form.size = val;
      this.form.current = 1;
      this.loadResourcePages();
    },
    handleCurrentChange(val: number) {
      this.form.current = val;
      this.loadResourcePages();
    },
    formatDate2S: formatDate2S,

    onSubmit() {
      this.form.current = 1;
      this.loadResourcePages();
    },
    onReset() {
      (this.$refs.form as Form).resetFields();
      this.onSubmit();
    },

    handleDelete(index: number, row: any) {
      this.$confirm('确认删除吗？', '删除提示', {})
        .then(async () => {
          await deleteResource({ id: row.id });
          this.loadResourcePages();
        })
        .catch(this.$catchError);
    },
    async handleEdit(row: any) {
      this.id = row.id;
      const { name, url, categoryId, description } = await getResourceById({
        id: row.id,
      });
      this.detail = {
        ...this.detail,
        name,
        url,
        categoryId,
        description,
      };
      this.updateVisible(true);
    },
    handleCreate() {
      this.id = 0;
      this.detail = {
        ...this.detail,
        name: '',
        url: '',
        description: '',
      };
      this.updateVisible(true);
    },
    updateVisible(val: boolean) {
      this.dialogVisible = val;
    },
    onSaveSuccess() {
      this.updateVisible(false);
      this.loadResourcePages();
    },

    handleClickResourceCategories() {
      this.$router.push({ name: 'resource-category' });
    },
  },
});
</script>

<style lang="scss" scoped></style>
