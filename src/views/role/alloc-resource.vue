<template>
  <el-card class="box-card">
    <el-tree
      ref="tree"
      :data="resources"
      :props="defaultProps"
      node-key="id"
      show-checkbox
      default-expand-all
      :default-checked-keys="checkedKeys"
    ></el-tree>

    <div style="margin-top: 20px; text-align: center">
      <el-button @click="onReset" :disabled="isLoading">清空</el-button>
      <el-button type="primary" @click="onSubmit" :disabled="isLoading"
        >保存</el-button
      >
    </div>
  </el-card>
</template>

<script lang="ts">
import Vue from 'vue';
import { Tree } from 'element-ui';
import {
  getAllResources,
  allocateRoleResources,
  getRoleResources,
} from '@/services/resource';
import { getAllResourceCategories } from '@/services/resourceCategory';

export default Vue.extend({
  name: 'AllocResource',
  props: {
    roleId: [String, Number],
  },
  data() {
    return {
      resources: [],
      defaultProps: {
        children: 'children',
        label: 'name',
      },
      checkedKeys: [],
      isLoading: false,
    };
  },
  created() {
    this.loadRoleResources();
    this.loadResourceList();
  },
  methods: {
    async loadResourceList() {
      const categories = await getAllResourceCategories();
      const resources = await getAllResources();
      resources.forEach((resource: any) => {
        const category = categories.find(
          (category: any) => category.id === resource.categoryId
        );
        if (category) {
          category.children = category.children || [];
          category.children = [...category.children, resource];
        }
      });

      // 修改顶层分类 ID：因为分类 ID 和资源 ID 冲突
      categories.forEach((item: any) => {
        item.id = Math.random();
      });
      this.resources = categories;
    },
    async onSubmit() {
      const checkedNodes = (this.$refs.tree as Tree).getCheckedNodes();
      const resourceIdList: number[] = [];
      checkedNodes.forEach((item) => {
        if (!item.children) {
          resourceIdList.push(item.id);
        }
      });
      const param = {
        roleId: this.roleId, // this.$route.params.roleId,
        resourceIdList,
      };
      await allocateRoleResources(param);
      this.$message.success('提交成功');
      this.$router.go(-1);
    },
    onReset() {
      (this.$refs.tree as Tree).setCheckedKeys([]);
    },
    async loadRoleResources() {
      const data = await getRoleResources({ roleId: this.roleId });
      this.getCheckedKeys(data);
    },
    getCheckedKeys(data: any) {
      data.forEach((item: any) => {
        if (item.resourceList && item.resourceList.length) {
          this.getCheckedKeys(item.resourceList);
        } else if (item.selected) {
          // this.checkedKeys.push(item.id as never);
          this.checkedKeys = [...this.checkedKeys, item.id] as any;
        }
      });
    },
  },
});
</script>
