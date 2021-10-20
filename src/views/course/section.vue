<template>
  <div class="course-section">
    <el-card>
      <div slot="header">课程名称</div>
      <el-tree
        :data="data"
        :props="defaultProps"
        draggable
        @node-drop="handleDrop"
      >
        <div class="inner" slot-scope="{ node, data }">
          <span>{{ node.label }}</span>
          <span v-if="data.sectionName">
            <el-button size="mini" @click="handleClickEdit(node, data)"
              >编辑</el-button
            >
            <el-button size="mini" @click="handleClickEdit(node, data)"
              >添加课时</el-button
            >
            <el-button size="mini" @click="handleClickEdit(node, data)"
              >状态</el-button
            >
          </span>
          <span v-if="data.theme">
            <el-button size="mini" @click="handleClickEdit(node, data)"
              >编辑</el-button
            >
            <el-button size="mini" @click="handleClickEdit(node, data)"
              >上传视频</el-button
            >
            <el-button size="mini" @click="handleClickEdit(node, data)"
              >状态</el-button
            >
          </span>
        </div>
      </el-tree>
    </el-card>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { getSectionAndLesson } from '@/services/course-section';

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
    return {
      data: [],
      defaultProps: {
        children: 'lessonDTOS',
        label(data: any) {
          return data.sectionName || data.theme;
        },
      },
    };
  },
  computed: {},
  watch: {},
  created() {
    this.loadgetSectionAndLesson();
  },
  methods: {
    async loadgetSectionAndLesson() {
      const { courseId } = this;
      this.data = await getSectionAndLesson({ courseId });
    },
    handleDrop(
      draggingNode: Node,
      dropNode: Node,
      type: 'before' | 'after' | 'inner',
      ev: DragEvent
    ) {
      // 共四个参数，依次为：被拖拽节点对应的 Node、结束拖拽时最后进入的节点、被拖拽节点的放置位置（before、after、inner）、event
      console.log('handleDrop :', draggingNode, dropNode, type, ev);
      return type !== 'inner';
    },
    handleClickEdit(node: any, data: any) {
      console.log('handleClickEdit :', node, data);
    },
  },
});
</script>

<style lang="scss" scoped>
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
</style>
