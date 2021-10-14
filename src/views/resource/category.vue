<template>
  <div>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <el-button @click="handleCreate">添加</el-button>
      </div>

      <el-table
        :data="tableData"
        border
        style="width: 100%"
        :header-cell-style="align"
        :cell-style="align"
      >
        <el-table-column type="index" label="编号" width="80">
        </el-table-column>
        <el-table-column prop="name" label="名称"></el-table-column>
        <el-table-column prop="createdTime" label="创建时间">
          <template slot-scope="scope">
            <span>
              {{ formatDate2S(scope.row.createdTime) }}
            </span>
          </template>
        </el-table-column>
        <el-table-column prop="sort" label="排序"></el-table-column>
        <el-table-column label="操作" width="150">
          <template slot-scope="scope">
            <el-button size="mini" @click="handleEdit(scope.row)"
              >编辑</el-button
            >
            <el-button
              size="mini"
              type="danger"
              @click="handleDelete(scope.$index, scope.row)"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </el-card>

    <CreateOrEditCategory
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
import {
  getAllResourceCategories,
  deleteResourceCategory,
} from '@/services/resourceCategory';
import CreateOrEditCategory from './components/CreateOrEditCategory.vue';

export default Vue.extend({
  name: 'ResourceCategories',
  components: {
    CreateOrEditCategory,
  },
  data() {
    return {
      align: { textAlign: 'center' },
      tableData: [],
      dialogVisible: false,
      id: 0,
      detail: {},
    };
  },
  created() {
    this.loadAllResourceCategories();
  },
  methods: {
    formatDate2S,
    async loadAllResourceCategories() {
      this.tableData = await getAllResourceCategories();
    },
    handleDelete(index: number, row: any) {
      this.$confirm('确认删除吗？', '删除提示', {})
        .then(async () => {
          await deleteResourceCategory({ id: row.id });
          this.loadAllResourceCategories();
        })
        .catch(this.$catchError);
    },
    handleEdit(row: any) {
      const { id, name, sort } = row;
      this.id = id;
      this.detail = {
        ...this.detail,
        name,
        sort,
      };
      this.updateVisible(true);
    },
    handleCreate() {
      this.id = 0;
      this.detail = {
        ...this.detail,
        name: '',
        sort: '',
      };
      this.updateVisible(true);
    },
    updateVisible(val: boolean) {
      this.dialogVisible = val;
    },
    onSaveSuccess() {
      this.updateVisible(false);
      this.loadAllResourceCategories();
    },
  },
});
</script>
