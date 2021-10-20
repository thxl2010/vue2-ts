<template>
  <div class="course-edit">
    <el-card>
      <div slot="header">
        <el-steps :active="step">
          <el-step
            v-for="(item, index) in steps"
            :key="index"
            :title="item.title"
            :icon="item.icon"
            @click.native="step = index"
          ></el-step>
        </el-steps>
      </div>
      <el-form v-model="form">
        <div v-show="step === 0">
          <el-form-item label="名称">
            <el-input v-model="form.courseName"></el-input>
          </el-form-item>
          <el-form-item label="简介">
            <el-input v-model="form.brief"></el-input> </el-form-item
          ><el-form-item label="讲师名称">
            <el-input v-model="form.teacherDTO.teacherName"></el-input>
          </el-form-item>
          <el-form-item label="职位">
            <el-input
              v-model="form.teacherDTO.position"
            ></el-input> </el-form-item
          ><el-form-item label="讲师简介">
            <el-input
              v-model="form.teacherDTO.description"
            ></el-input> </el-form-item
          ><el-form-item label="课程概述">
            <el-input
              style="margin-bottom: 10px"
              v-model="form.previewFirstField"
              type="textarea"
              placeholder="概述1"
            ></el-input>
            <el-input
              v-model="form.previewSecondField"
              type="textarea"
              placeholder="概述2"
            ></el-input>
          </el-form-item>
        </div>
        <div v-show="step === 1">
          <el-form-item label="课程封面">
            <course-image
              v-model="form.courseListImg"
              :limit="5"
            /> </el-form-item
          ><el-form-item label="解锁封面">
            <course-image v-model="form.courseImgUrl" :limit="5" />
          </el-form-item>
          <el-form-item label="课程排序">
            <el-input-number
              v-model="form.sortNum"
              label="数字控制排序，数字越大越靠后"
            ></el-input-number>
          </el-form-item>
        </div>
        <div v-show="step === 2">
          <el-form-item label="售卖价格">
            <el-input v-model.number="form.discounts" type="number">
              <template slot="append">元</template>
            </el-input>
          </el-form-item>
          <el-form-item label="商品原价">
            <el-input v-model.number="form.price" type="number">
              <template slot="append">元</template>
            </el-input>
          </el-form-item>
          <el-form-item label="销量">
            <el-input v-model.number="form.sales" type="number">
              <template slot="append">单</template>
            </el-input>
          </el-form-item>
          <el-form-item label="活动标签">
            <el-input v-model="form.discountsTag"></el-input>
          </el-form-item>
        </div>
        <div v-show="step === 3">
          <el-form-item label="限时秒杀开关">
            <el-switch
              v-model="form.activityCourse"
              active-color="#13ce66"
              inactive-color="#ff4949"
            >
            </el-switch>
          </el-form-item>
          <template v-if="form.activityCourse">
            <el-form-item label="开始时间">
              <el-date-picker
                v-model="form.activityCourseDTO.beginTime"
                type="date"
                placeholder="选择日期时间"
                value-format="yyyy-MM-dd"
              />
            </el-form-item>
            <el-form-item label="结束时间">
              <el-date-picker
                v-model="form.activityCourseDTO.endTime"
                type="date"
                placeholder="选择日期时间"
                value-format="yyyy-MM-dd"
              />
            </el-form-item>
            <el-form-item label="秒杀价">
              <el-input
                v-model.number="form.activityCourseDTO.amount"
                type="number"
              >
                <template slot="append">元</template>
              </el-input>
            </el-form-item>
            <el-form-item label="秒杀库存">
              <el-input
                v-model.number="form.activityCourseDTO.stock"
                type="number"
              >
                <template slot="append">个</template>
              </el-input>
            </el-form-item>
          </template>
        </div>
        <div v-show="step === 4">
          <el-form-item label="">
            <text-editor v-model="form.courseDescriptionMarkDown" />
          </el-form-item>
          <el-form-item label="是否发布">
            <el-switch
              v-model="form.status"
              :active-value="1"
              :inactive-value="0"
              active-color="#13ce66"
              inactive-color="#ff4949"
            />
          </el-form-item>
          <el-form-item style="text-align: center">
            <el-button type="primary" @click="submit">提交</el-button>
          </el-form-item>
        </div>
        <el-form-item style="text-align: center" v-if="step >= 0 && step < 4">
          <el-button @click="step += 1">下一步</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import CourseImage from './CourseImage.vue';
import TextEditor from '@/components/TextEditor/index.vue';
import { saveOrUpdateCourse, getCourseById } from '@/services/course';
import { formatDate } from '@/utils/days.ts';

export default Vue.extend({
  name: 'CourseCreateOrEdit',
  components: {
    CourseImage,
    TextEditor,
  },
  props: {
    isEdit: {
      type: Boolean,
      default: false,
    },
    courseId: {
      type: [String, Number],
    },
  },
  data() {
    return {
      step: 0,
      steps: [
        { title: '基本信息', icon: 'el-icon-edit' },
        { title: '课程封面', icon: 'el-icon-upload' },
        { title: '销售信息', icon: 'el-icon-picture' },
        { title: '秒杀活动', icon: 'el-icon-picture' },
        { title: '课程详情', icon: 'el-icon-edit' },
      ],
      form: {
        // id: '',
        courseName: '',
        brief: '',
        teacherDTO: {
          // id: 0,
          // courseId: 0,
          teacherName: '',
          position: '',
          description: '',
        },
        previewFirstField: '',
        previewSecondField: '',
        courseListImg: '',
        courseImgUrl: '',
        sortNum: 0,
        discounts: 0,
        price: 0,
        sales: 0,
        discountsTag: '',
        activityCourse: false, // 是否开启活动秒杀
        activityCourseDTO: {
          // id: 0,
          // courseId: 0,
          beginTime: '',
          endTime: '',
          amount: 0,
          stock: 0,
        },
        courseDescriptionMarkDown: '',
        status: 0, // 0：未发布，1：已发布
      },
    };
  },
  created() {
    if (this.isEdit) {
      this.loadCourse();
    }
  },
  methods: {
    async submit() {
      try {
        await saveOrUpdateCourse(this.form);
        this.$message.success('保存成功');
        this.$router.push({ name: 'course' });
      } catch (error) {
        this.$catchError(error);
      }
    },

    async loadCourse() {
      const data = await getCourseById({ courseId: this.courseId });
      const { activityCourseDTO } = data;
      if (activityCourseDTO) {
        activityCourseDTO.beginTime = formatDate(activityCourseDTO.beginTime);
        activityCourseDTO.endTime = formatDate(activityCourseDTO.endTime);
      }
      console.log('0 this.form :', this.form);
      this.form = {
        ...this.form,
        ...data,
      };
      console.log('this.form :', this.form);
    },
  },
});
</script>
