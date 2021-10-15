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
          <el-form-item label="角色名称：" prop="name">
            <el-input v-model="form.name" placeholder="资源名称"></el-input>
          </el-form-item>

          <el-form-item>
            <el-button @click="onReset" :disabled="isLoading">重置</el-button>
            <el-button type="primary" @click="onSubmit" :disabled="isLoading"
              >查询搜索</el-button
            >
          </el-form-item>
        </el-form>
      </div>

      <el-button @click="handleCreate">添加角色</el-button>
    </el-card>

    <el-table
      :data="tableData"
      border
      style="width: 100%"
      :header-cell-style="align"
      :cell-style="align"
    >
      <el-table-column type="index" label="编号" width="80"> </el-table-column>
      <el-table-column prop="name" label="角色名称"></el-table-column>
      <el-table-column prop="description" label="描述"></el-table-column>
      <el-table-column prop="createdTime" label="添加时间">
        <template slot-scope="scope">
          <span>
            {{ formatDate2S(scope.row.createdTime) }}
          </span>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="150">
        <template slot-scope="scope">
          <el-button type="text" @click="handleAllocateMenu(scope.row)"
            >分配菜单</el-button
          >
          <el-button type="text" @click="handleAllocateResource(scope.row)"
            >分配资源</el-button
          >
          <el-button type="text" @click="handleEdit(scope.row)">编辑</el-button>
          <el-button type="text" @click="handleDelete(scope.$index, scope.row)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="form.current"
      :page-sizes="[10, 20, 30, 40, 50]"
      :page-size="form.size"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
      :disabled="isLoading"
      style="margin-top: 1em"
    >
    </el-pagination>

    <CreateOrEdit
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
import { formatDate2S } from '@/utils/days';
import { getRolesByCondition, deleteRole } from '@/services/role';
import CreateOrEdit from './components/CreateOrEdit.vue';
import { Form } from 'element-ui';

export default Vue.extend({
  name: 'RoleIndex',
  components: {
    CreateOrEdit,
  },
  data() {
    return {
      form: {
        name: '',
        current: 1,
        size: 50,
      },
      total: 0,
      align: { textAlign: 'center' },
      tableData: [],
      isLoading: false,
      dialogVisible: false,
      id: 0,
      detail: {},
    };
  },
  created() {
    this.onSubmit();
  },
  methods: {
    formatDate2S,
    async loadRolesPages() {
      this.isLoading = true;
      const data = await getRolesByCondition(this.form);
      this.isLoading = false;
      const { total, records } = data;
      this.total = total;
      this.tableData = records;
    },
    handleSizeChange(val: number) {
      this.form.size = val;
      this.form.current = 1;
      this.loadRolesPages();
    },
    handleCurrentChange(val: number) {
      this.form.current = val;
      this.loadRolesPages();
    },
    async onSubmit() {
      this.form.current = 1;
      this.loadRolesPages();
    },
    onReset() {
      (this.$refs.form as Form).resetFields();
      this.onSubmit();
    },
    handleDelete(index: number, row: any) {
      this.$confirm('确认删除吗？', '删除提示', {})
        .then(async () => {
          await deleteRole({ id: row.id });
          this.onSubmit();
        })
        .catch(this.$catchError);
    },
    handleEdit(row: any) {
      const { id, name, code, description } = row;
      this.id = id;
      this.detail = {
        ...this.detail,
        name,
        code,
        description,
      };
      this.updateVisible(true);
    },
    handleCreate() {
      this.id = 0;
      this.detail = {
        ...this.detail,
        name: '',
        code: '',
        description: '',
      };
      this.updateVisible(true);
    },
    updateVisible(val: boolean) {
      this.dialogVisible = val;
    },
    onSaveSuccess() {
      this.updateVisible(false);
      this.onSubmit();
    },

    /**
     * 分配菜单
     */
    handleAllocateMenu() {
      console.log('handleAllocateMenu');
    },

    /**
     * 分配资源
     */
    handleAllocateResource() {
      console.log('handleAllocateResource');
    },
  },
});
</script>
