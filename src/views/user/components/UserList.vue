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
          <el-form-item label="手机号：" prop="phone">
            <el-input
              v-model="form.phone"
              placeholder="请输入手机号"
            ></el-input>
          </el-form-item>
          <el-form-item label="注册时间：" prop="rangeDate">
            <el-date-picker
              v-model="form.rangeDate"
              type="daterange"
              range-separator="至"
              start-placeholder="开始时间"
              end-placeholder="结束时间"
              value-format="yyyy-MM-dd"
              :picker-options="pickerOptions"
            ></el-date-picker>
          </el-form-item>

          <el-form-item>
            <el-button @click="onReset" :disabled="isLoading">重置</el-button>
            <el-button type="primary" @click="onSubmit" :disabled="isLoading"
              >查询搜索</el-button
            >
          </el-form-item>
        </el-form>
      </div>
    </el-card>

    <el-table
      :data="tableData"
      border
      style="width: 100%"
      :header-cell-style="align"
      :cell-style="align"
    >
      <el-table-column prop="id" label="用户ID" width="100"> </el-table-column>
      <el-table-column prop="name" label="头像" width="80">
        <template slot-scope="scope">
          <img
            width="30px"
            :src="
              scope.row.portrait ||
              'https://cube.elemecdn.com/9/c2/f0ee8a3c7c9638a54940382568c9dpng.png'
            "
          />
        </template>
      </el-table-column>
      <el-table-column prop="name" label="用户名" width="120">
      </el-table-column>
      <el-table-column prop="description" label="描述"></el-table-column>
      <el-table-column prop="createTime" label="添加时间">
        <template slot-scope="scope">
          <span>
            {{ formatDate2S(scope.row.createTime) }}
          </span>
        </template>
      </el-table-column>
      <el-table-column prop="status" label="状态" width="80">
        <template slot-scope="scope">
          <el-switch
            v-model="scope.row.status"
            :active-value="STATUS.ENABLE"
            :inactive-value="STATUS.DISABLE"
            active-color="#13ce66"
            inactive-color="#ff4949"
            @change="
              handleEnableOrForbidUser(false, /* 第一个参数忽略 */ scope.row)
            "
          >
          </el-switch>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="150">
        <template slot-scope="scope">
          <el-button type="text" @click="handleSelectRole(scope.row)"
            >分配角色</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="form.currentPage"
      :page-sizes="[10, 20, 30, 40, 50]"
      :page-size="form.pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
      :disabled="isLoading"
      style="margin-top: 1em"
    >
    </el-pagination>

    <AllocRole
      :dialogVisible="dialogVisible"
      @update-visible="updateVisible"
      :id="id"
      @on-success="onSaveSuccess"
    />
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { formatDate2S } from '@/utils/days';
import { getUserPages, forbidUser, enableUser } from '@/services/user';
import AllocRole from './AllocRole.vue';
import { Form, DatePicker } from 'element-ui';
import { UsersQueryFormInterface } from '@/models/user/User.interface';

const STATUS = {
  ENABLE: 'ENABLE',
  DISABLE: 'DISABLE',
};

export default Vue.extend({
  name: 'UserList',
  components: {
    AllocRole,
  },
  data() {
    return {
      form: {
        phone: '',
        rangeDate: [],
        startCreateTime: '',
        endCreateTime: '',
        currentPage: 1,
        pageSize: 50,
      },
      pickerOptions: {
        shortcuts: [
          {
            text: '最近一周',
            onClick(picker: DatePicker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit('pick', [start, end]);
            },
          },
          {
            text: '最近一个月',
            onClick(picker: DatePicker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit('pick', [start, end]);
            },
          },
          {
            text: '最近三个月',
            onClick(picker: DatePicker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit('pick', [start, end]);
            },
          },
        ],
      },
      total: 0,
      align: { textAlign: 'center' },
      tableData: [],
      STATUS,
      isLoading: false,
      dialogVisible: false,
      id: 0,
    };
  },
  created() {
    this.onSubmit();
  },
  methods: {
    formatDate2S,
    async loadUserPages() {
      this.isLoading = true;
      const { rangeDate, ...filterParams } = this.form;
      const option: UsersQueryFormInterface = {
        ...filterParams,
        startCreateTime: rangeDate[0] ? rangeDate[0] : '',
        endCreateTime: rangeDate[1] ? rangeDate[1] : '',
      };
      const data = await getUserPages(option);
      this.isLoading = false;
      const { total, records } = data;
      this.total = total;
      this.tableData = records;
    },
    handleSizeChange(val: number) {
      this.form.pageSize = val;
      this.form.currentPage = 1;
      this.loadUserPages();
    },
    handleCurrentChange(val: number) {
      this.form.currentPage = val;
      this.loadUserPages();
    },
    async onSubmit() {
      this.form.currentPage = 1;
      this.loadUserPages();
    },
    onReset() {
      (this.$refs.form as Form).resetFields();
      this.onSubmit();
    },

    async handleEnableOrForbidUser(status: boolean, user: any) {
      console.log('handleEnableOrForbidUser :', status);
      const option = { userId: user.id };
      try {
        const data = user.status
          ? await forbidUser(option)
          : await enableUser(option);
        console.log('forbidUser', data);
        user.status =
          user.status === STATUS.ENABLE ? STATUS.DISABLE : STATUS.ENABLE;
      } catch (error) {
        this.$message.warning('您没有权限！');
      }
    },

    /**
     * 分配角色
     */
    updateVisible(val: boolean) {
      this.dialogVisible = val;
    },
    onSaveSuccess() {
      this.updateVisible(false);
      this.onSubmit();
    },
    handleSelectRole(row: any) {
      this.id = row.id;
      this.updateVisible(true);
    },
  },
});
</script>
