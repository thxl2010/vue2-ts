<template>
  <div class="menu">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <el-button @click="$router.push({ name: 'menu-create' })"
          >添加菜单</el-button
        >
      </div>
      <el-table :data="list" style="width: 100%">
        <el-table-column type="index" label="编号"> </el-table-column>
        <el-table-column prop="name" label="菜单名称"> </el-table-column>
        <el-table-column prop="level" label="菜单等级"> </el-table-column>
        <el-table-column prop="icon" label="前端图标"> </el-table-column>
        <el-table-column prop="orderNum" label="排序"> </el-table-column>
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
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { getAllMenu, deleteMenu } from '@/services/menu';

export default Vue.extend({
  name: 'MenuIndex',
  data() {
    return {
      list: [],
    };
  },
  methods: {
    async loadAllMenu() {
      const data = await getAllMenu();
      this.list = data;
    },
    handleEdit(row: any) {
      this.$router.push({
        name: 'menu-edit',
        params: {
          id: row.id,
        },
      });
    },
    handleDelete(index: number, row: any) {
      this.$confirm('确认删除吗？', '删除提示', {})
        .then(async () => {
          await deleteMenu({ id: row.id });
          this.loadAllMenu();
        })
        .catch(this.$catchError);
    },
  },
  created() {
    this.loadAllMenu();
  },
});
</script>

<style lang="scss" scoped></style>
