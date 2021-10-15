<template>
  <el-card class="box-card">
    <el-tree
      ref="tree"
      :data="menu"
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
  getMenuNodeList,
  allocateRoleMenus,
  getRoleMenus,
} from '@/services/menu';
import { MenuNodeListInterface } from '@/models/menu/Menu.interface';

export default Vue.extend({
  name: 'AllocMenu',
  props: {
    roleId: [String, Number],
  },
  data() {
    return {
      menu: [],
      defaultProps: {
        children: 'subMenuList',
        label: 'name',
      },
      checkedKeys: [],
      isLoading: false,
    };
  },
  created() {
    this.loadRoleMenus();
    this.loadMenuList();
  },
  methods: {
    async loadMenuList() {
      const data = await getMenuNodeList();
      this.menu = data;
    },
    async onSubmit() {
      const param = {
        roleId: this.roleId, // this.$route.params.roleId,
        menuIdList: (this.$refs.tree as Tree).getCheckedKeys(),
      };
      await allocateRoleMenus(param);
      this.$message.success('提交成功');
      this.$router.go(-1);
    },
    onReset() {
      (this.$refs.tree as Tree).setCheckedKeys([]);
    },
    async loadRoleMenus() {
      const data = await getRoleMenus({ roleId: this.roleId });
      this.getCheckedKeys(data);
    },
    getCheckedKeys(data: MenuNodeListInterface[]) {
      data.forEach((item: MenuNodeListInterface) => {
        if (item.subMenuList && item.subMenuList.length) {
          this.getCheckedKeys(item.subMenuList);
        } else if (item.selected) {
          // this.checkedKeys.push(item.id as never);
          this.checkedKeys = [...this.checkedKeys, item.id] as any;
        }
      });
    },
  },
});
</script>
