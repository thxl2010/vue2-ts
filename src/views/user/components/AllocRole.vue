<template>
  <el-dialog
    title="分配角色"
    :visible.sync="dialogVisible"
    :before-close="beforeClose"
    width="50%"
  >
    <el-select v-model="roleIdList" multiple placeholder="请选择">
      <el-option
        v-for="item in roles"
        :key="item.id"
        :label="item.name"
        :value="item.id"
      >
      </el-option>
    </el-select>
    <span slot="footer" class="dialog-footer">
      <el-button @click="$emit('update-visible', false)">取 消</el-button>
      <el-button type="primary" @click="handleAllocRole">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script lang="ts">
import Vue from 'vue';
import { getAllRoles, allocateUserRoles, getUserRoles } from '@/services/role';

export default Vue.extend({
  name: 'AllocRole',
  components: {},
  props: {
    dialogVisible: {
      type: Boolean,
      default: false,
    },
    id: {
      type: [Number, String],
      default: 0,
    },
  },
  data() {
    return {
      roles: [],
      roleIdList: [],
    };
  },
  watch: {
    async dialogVisible(val, oldVal) {
      if (val && !oldVal) {
        this.roles = await getAllRoles();
        const userRoles = await getUserRoles({ userId: this.id });
        this.roleIdList = userRoles.map((item: any) => item.id);
      }
    },
  },
  methods: {
    beforeClose() {
      this.$emit('update-visible', false);
    },
    async handleAllocRole() {
      await allocateUserRoles({
        userId: this.id,
        roleIdList: this.roleIdList,
      });
      this.$message.success('操作成功');
      this.$emit('on-success');
    },
  },
});
</script>
