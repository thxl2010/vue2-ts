<template>
  <div class="course-section">
    <div class="header">
      <div class="page-header">
        <div class="header-left" @click="$router.go(-1)">
          <i class="el-icon-back"></i>
          <div class="page-header-title">返回</div>
        </div>
        <span>{{ course.courseName }}</span>
      </div>
      <el-button type="primary" @click="handleShowAddSection">
        <i class="el-icon-plus"></i>
        添加阶段</el-button
      >
    </div>
    <el-card>
      <div slot="header">课程名称</div>
      <el-tree
        :data="sections"
        :props="defaultProps"
        draggable
        v-loading="isLoading"
        :allow-drop="allowDrop"
        @node-drop="handleNodeDrop"
      >
        <div class="inner" slot-scope="{ node, data }">
          <span>{{ node.label }}</span>
          <!-- section -->
          <span v-if="data.sectionName">
            <el-button size="mini" @click.stop="handleShowEditSection(data)"
              >编辑</el-button
            >
            <el-button size="mini" @click.stop="handleShowAddLesson(data)"
              >添加课时</el-button
            >
            <el-select
              class="select-status"
              size="mini"
              v-model="data.status"
              placeholder="请选择"
              @change="handleChangeSectionStatus(data)"
            >
              <el-option label="已隐藏" :value="0" />
              <el-option label="待更新" :value="1" />
              <el-option label="已更新" :value="2" />
            </el-select>
          </span>

          <!-- lession -->
          <span v-else>
            <el-button
              size="mini"
              @click="handleShowEditLesson(data, node.parent.data)"
              >编辑</el-button
            >
            <el-button
              size="mini"
              type="success"
              @click="
                $router.push({
                  name: 'course-video',
                  params: {
                    courseId,
                  },
                  query: {
                    sectionId: node.parent.id,
                    lessonId: data.id,
                  },
                })
              "
              >上传视频</el-button
            >
            <el-select
              size="mini"
              class="select-status"
              v-model="data.status"
              placeholder="请选择"
              @change="handleChangeLessonStatus(data)"
            >
              <el-option label="已隐藏" :value="0" />
              <el-option label="待更新" :value="1" />
              <el-option label="已更新" :value="2" />
            </el-select>
          </span>
        </div>
      </el-tree>
    </el-card>

    <!-- 添加阶段 -->
    <el-dialog title="添加课程阶段" :visible.sync="isAddSectionShow">
      <el-form ref="section-form" :model="section" label-width="70px">
        <el-form-item label="课程名称">
          <el-input
            :value="course.courseName"
            autocomplete="off"
            disabled
          ></el-input>
        </el-form-item>
        <el-form-item label="章节名称" prop="sectionName">
          <el-input v-model="section.sectionName" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="章节描述" prop="description">
          <el-input
            v-model="section.description"
            type="textarea"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="章节排序" prop="orderNum">
          <el-input type="number" v-model="section.orderNum">
            <template slot="append">数字控制排序，数字越大越靠后</template>
          </el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="isAddSectionShow = false">取 消</el-button>
        <el-button type="primary" @click="submitSection">确 定</el-button>
      </div>
    </el-dialog>
    <!-- /添加阶段 -->

    <!-- 添加课时 -->
    <el-dialog title="添加课时" :visible.sync="isAddLessonShow">
      <el-form ref="lesson-form" :model="lesson" label-width="100px">
        <el-form-item label="课程名称">
          <el-input
            :value="course.courseName"
            autocomplete="off"
            disabled
          ></el-input>
        </el-form-item>
        <el-form-item label="章节名称" prop="sectionName">
          <el-input
            :value="lesson.sectionName"
            disabled
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="课时名称" prop="sectionName">
          <el-input v-model="lesson.theme" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="时长" prop="description">
          <el-input
            v-model.number="lesson.duration"
            type="number"
            autocomplete="off"
          >
            <template slot="append">分钟</template>
          </el-input>
        </el-form-item>
        <el-form-item label="是否开放试听" prop="description">
          <el-switch v-model="lesson.isFree"></el-switch>
        </el-form-item>
        <el-form-item label="课时排序" prop="description">
          <el-input type="number" v-model="lesson.orderNum">
            <template slot="append">数字控制排序，数字越大越靠后</template>
          </el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="isAddLessonShow = false">取 消</el-button>
        <el-button type="primary" @click="submitLesson">确 定</el-button>
      </div>
    </el-dialog>
    <!-- /添加课时 -->
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Form } from 'element-ui';
import { getCourseById } from '@/services/course';
import {
  getSectionAndLesson,
  saveOrUpdateSection,
  getSectionById,
} from '@/services/course-section';
import { saveOrUpdateLesson } from '@/services/course-lesson';

export default Vue.extend({
  name: 'CourseSection',
  components: {},
  props: {
    courseId: {
      type: [String, Number],
      required: true,
    },
  },
  data() {
    const section = {
      courseId: this.courseId,
      sectionName: '',
      description: '',
      orderNum: 0,
      status: 0,
    };

    const lesson = {
      courseId: this.courseId,
      sectionId: undefined,
      sectionName: '',
      theme: '',
      duration: 0,
      isFree: false,
      orderNum: 0,
      status: 0,
    };

    return {
      course: {},
      sections: [],
      defaultProps: {
        children: 'lessonDTOS',
        label(data: any) {
          return data.sectionName || data.theme;
        },
      },
      isAddSectionShow: false,
      section,
      isAddLessonShow: false,
      lesson,
      isLoading: false,
    };
  },
  computed: {},
  watch: {},
  created() {
    this.loadCourse();
    this.loadSectionAndLesson();
  },
  methods: {
    async loadCourse() {
      const { courseId } = this;
      this.course = await getCourseById({ courseId });
    },
    async loadSectionAndLesson() {
      const { courseId } = this;
      this.sections = await getSectionAndLesson({ courseId });
    },

    // 添加阶段
    handleShowAddSection() {
      this.section = {
        courseId: this.courseId,
        sectionName: '',
        description: '',
        orderNum: 0,
        status: 0,
      };
      this.isAddSectionShow = true;
    },
    async handleShowEditSection(data: any) {
      this.section = await getSectionById({ sectionId: data.id });
      this.isAddSectionShow = true;
    },
    async submitSection() {
      await saveOrUpdateSection(this.section);
      this.loadSectionAndLesson();
      this.isAddSectionShow = false;
      (this.$refs['section-form'] as Form).resetFields();
      this.$message.success('操作成功');
    },
    async handleChangeSectionStatus(section: any) {
      await saveOrUpdateSection(section);
      this.$message.success('操作成功');
    },

    // 添加课时
    handleShowAddLesson(data: any) {
      this.lesson = {
        sectionName: data.sectionName,
        sectionId: data.id,
        courseId: this.courseId,
        theme: '',
        duration: 0,
        isFree: false,
        orderNum: 0,
        status: 0,
      };
      this.isAddLessonShow = true;
    },
    handleShowEditLesson(lesson: any, section: any) {
      this.lesson = lesson;
      this.lesson.sectionName = section.sectionName;
      this.isAddLessonShow = true;
    },
    async submitLesson() {
      await saveOrUpdateLesson(this.lesson);
      this.$message.success('操作成功');
      this.loadSectionAndLesson();
      this.isAddLessonShow = false;
    },
    async handleChangeLessonStatus(lesson: any) {
      const { id, status } = lesson;
      const data = {
        id,
        status,
      };
      await saveOrUpdateLesson(data);
      this.$message.success('操作成功');
    },

    /**
     * 拖拽时判定目标节点能否被放置
     * @param {TreeNode} draggingNode - 拖动的节点
     * @param {TreeNode} dropNode - 放置的目标节点
     * @param {string} type - 参数有三种情况：'prev'、'inner' 和 'next'，分别表示放置在目标节点前、插入至目标节点和放置在目标节点后
     */
    allowDrop(
      draggingNode: any,
      dropNode: any,
      type: 'prev' | 'next' | 'inner'
    ) {
      return (
        draggingNode.data.sectionId === dropNode.data.sectionId &&
        type !== 'inner'
      );
    },
    // 拖拽排序
    async handleNodeDrop(
      draggingNode: any,
      dropNode: any,
      type: 'before' | 'after' | 'inner',
      ev: any
    ) {
      this.isLoading = true;
      try {
        await Promise.all(
          dropNode.parent.childNodes.map((item: any, index: number) => {
            if (draggingNode.data.lessonDTOS) {
              // 阶段
              return saveOrUpdateSection({
                id: item.data.id,
                orderNum: index + 1,
              });
            } else {
              // 课时
              return saveOrUpdateLesson({
                id: item.data.id,
                orderNum: index + 1,
              });
            }
          })
        );
        this.$message.success('排序成功');
      } catch (error) {
        this.$catchError(error);
      }
      this.isLoading = false;
    },
    handleClickEdit(node: any, data: any) {
      console.log('handleClickEdit :', node, data);
    },
  },
});
</script>

<style lang="scss" scoped>
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5em;
}
.page-header {
  display: flex;
  line-height: 24px;
}

.header-left {
  display: flex;
  cursor: pointer;
  margin-right: 40px;
  position: relative;
  &::after {
    content: '';
    position: absolute;
    width: 1px;
    height: 16px;
    right: -20px;
    top: 50%;
    transform: translateY(-50%);
    background-color: #dcdfe6;
  }
  .el-icon-back {
    align-self: center;
    margin-right: 6px;
  }
}

.inner {
  flex: 1;
  padding: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #ebeef5;
}

::v-deep .el-tree-node__content {
  height: auto;
}

.select-status {
  max-width: 100px;
  margin-left: 8px;
}
</style>
