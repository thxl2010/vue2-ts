<template>
  <div class="course">
    <el-form ref="form" :inline="true" :model="form" class="demo-form-inline">
      <el-form-item label="课程名称：" prop="name">
        <el-input v-model="form.courseName" placeholder="资源名称"></el-input>
      </el-form-item>
      <el-form-item label="状态" prop="status">
        <el-select v-model="form.status">
          <el-option label="全部" value=""></el-option>
          <el-option label="上架" value="1"></el-option>
          <el-option label="下架" value="0"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button @click="onSubmit" :disabled="isLoading">查询</el-button>
      </el-form-item>

      <el-button
        style="float: right"
        type="primary"
        @click="
          $router.push({
            name: 'course-create',
          })
        "
        >添加课程</el-button
      >
    </el-form>

    <el-card>
      <el-table
        :data="tableData"
        border
        style="width: 100%"
        :header-cell-style="align"
        :cell-style="align"
      >
        <el-table-column prop="id" label="ID" width="100"> </el-table-column>
        <el-table-column prop="courseName" label="课程名称"></el-table-column>
        <el-table-column prop="price" label="价格"> </el-table-column>
        <el-table-column prop="sortNum" label="排序"> </el-table-column>
        <el-table-column prop="status" label="上架状态">
          <template slot-scope="scope">
            <el-switch
              v-model="scope.row.status"
              active-color="#13ce66"
              inactive-color="#ff4949"
              :active-value="1"
              :inactive-value="0"
              :disabled="scope.row.isStatusLoading"
              @change="onStateChange(scope.row)"
            />
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button
              @click="
                $router.push({
                  name: 'course-edit',
                  params: {
                    courseId: scope.row.id,
                  },
                })
              "
              >编辑</el-button
            >
            <el-button
              @click="
                $router.push({
                  name: 'course-section',
                  params: {
                    courseId: scope.row.id,
                  },
                })
              "
              >内容管理</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </el-card>
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
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { getQueryCourses, changeState } from '@/services/course';

export default Vue.extend({
  name: 'CourseIndex',
  data() {
    return {
      form: {
        name: '',
        currentPage: 1,
        pageSize: 50,
      },
      total: 0,
      align: { textAlign: 'center' },
      tableData: [],
      isLoading: false,
    };
  },
  created() {
    this.onSubmit();
  },
  methods: {
    async loadCoursesPages() {
      this.isLoading = true;
      const data = await getQueryCourses(this.form);
      this.isLoading = false;
      const { total, records } = data;
      this.total = total;
      this.tableData = records;
    },
    handleSizeChange(val: number) {
      this.form.pageSize = val;
      this.form.currentPage = 1;
      this.loadCoursesPages();
    },
    handleCurrentChange(val: number) {
      this.form.currentPage = val;
      this.loadCoursesPages();
    },
    async onSubmit() {
      this.form.currentPage = 1;
      this.loadCoursesPages();
    },

    async onStateChange(course: any) {
      course.isStatusLoading = true;
      await changeState({
        courseId: course.id,
        status: course.status,
      });
      this.$message.success(`${course.status === 0 ? '下架' : '上架'}成功`);
      course.isStatusLoading = false;
    },
  },
});
</script>

<style lang="scss" scoped></style>
