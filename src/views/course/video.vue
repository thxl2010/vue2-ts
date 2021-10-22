<template>
  <div class="container">
    <el-card>
      <div slot="header">
        <div>课程：{{ course.courseName || '--' }}</div>
        <div>阶段：{{ section.sectionName || '--' }}</div>
        <div>课时：{{ lesson.theme || '--' }}</div>
      </div>
      <el-form label-width="40px">
        <el-form-item label="视频">
          <input ref="video-file" type="file" />
        </el-form-item>
        <el-form-item label="封面">
          <input ref="image-file" type="file" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="authUpload">开始上传</el-button>
          <el-button @click="$router.back()">返回</el-button>
        </el-form-item>
        <el-form-item>
          <p v-if="loadedPercent > 0 && !isUploadSuccess">
            视频上传中：{{ loadedPercent }}%
          </p>
          <p v-else-if="loadedPercent === 100">
            视频转码中：{{
              isTransCodeSuccess ? '完成' : '正在处理，请稍后...'
            }}
          </p>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script lang="ts">
/* eslint-disable */
import Vue from 'vue';
import { getCourseById } from '@/services/course';
import { getSectionById } from '@/services/course-section';
import { getLessonById } from '@/services/course-lesson';
import {
  aliyunImagUploadAddressAdnAuth,
  aliyunVideoUploadAddressAdnAuth,
  transCodeVideo,
  getAliyunTransCodePercent,
} from '@/services/aliyun-oss';

export default Vue.extend({
  props: {
    courseId: {
      type: [String, Number],
      required: true,
    },
  },
  data() {
    return {
      course: {},
      section: {},
      lesson: {},
      uploader: null,
      videoId: null,
      imageUrl: '',
      fileName: '',
      isUploadSuccess: false,
      isTransCodeSuccess: false,
      loadedPercent: 0,
    };
  },
  created() {
    this.initUploader();
    this.loadCourse();
    this.loadSection();
    this.loadLesson();
  },
  methods: {
    async loadCourse() {
      const { courseId } = this;
      this.course = await getCourseById({ courseId });
    },
    async loadSection() {
      const { sectionId } = this.$route.query;
      const section = await getSectionById({ sectionId });
      this.section = section || {};
    },
    async loadLesson() {
      const { lessonId } = this.$route.query;
      this.lesson = await getLessonById({ lessonId });
    },
    authUpload() {
      this.isUploadSuccess = false;
      this.isTransCodeSuccess = false;

      const videoInput = this.$refs['video-file'] as HTMLInputElement;
      const imageInput = this.$refs['image-file'] as HTMLInputElement;
      if (
        !(videoInput && videoInput.files && videoInput.files.length) ||
        !(imageInput && imageInput.files && imageInput.files.length)
      ) {
        return this.$message.warning('请选择文件上传');
      }
      const uploader: any = this.uploader as any;
      if (videoInput && videoInput.files && videoInput.files.length) {
        const videoFile = videoInput.files[0];
        this.fileName = videoFile.name;
        uploader.addFile(videoFile, null, null, null, '{"Vod":{}}');
      }
      if (imageInput && imageInput.files && imageInput.files.length) {
        const imageFile = imageInput.files[0];
        uploader.addFile(imageFile, null, null, null, '{"Vod":{}}');
      }
      uploader.startUpload();
    },
    initUploader() {
      this.uploader = new window.AliyunUpload.Vod({
        // 阿里账号ID，必须有值 ，值的来源https://help.aliyun.com/knowledge_detail/37196.html
        userId: 1618139964448548,
        // 上传到点播的地域， 默认值为'cn-shanghai',//eu-central-1,ap-southeast-1
        region: 'cn-shanghai',
        // 分片大小默认1M，不能小于100K
        partSize: 1048576,
        // 并行上传分片个数，默认5
        parallel: 5,
        // 网络原因失败时，重新上传次数，默认为3
        retryCount: 3,
        // 网络原因失败时，重新上传间隔时间，默认为2秒
        retryDuration: 2,
        // 开始上传
        onUploadstarted: async (uploadInfo: any) => {
          console.log('onUploadstarted', uploadInfo);
          let uploadAuthInfo = null;
          if (uploadInfo.isImage) {
            const data = await aliyunImagUploadAddressAdnAuth();
            this.imageUrl = data.imageURL;
            uploadAuthInfo = data;
          } else {
            const data = await aliyunVideoUploadAddressAdnAuth({
              fileName: uploadInfo.file.name,
            });
            this.videoId = data.videoId;
            uploadAuthInfo = data;
          }

          // console.log('uploadAuthInfo', uploadAuthInfo)

          (this.uploader as any).setUploadAuthAndAddress(
            uploadInfo,
            uploadAuthInfo.uploadAuth,
            uploadAuthInfo.uploadAddress,
            uploadAuthInfo.videoId || uploadAuthInfo.imageId
          );
        },
        // 文件上传成功
        onUploadSucceed: (uploadInfo: any) => {
          console.log('onUploadSucceed', uploadInfo);
        },
        // 文件上传失败
        onUploadFailed: (uploadInfo: any, code: any, message: any) => {
          console.log('onUploadFailed :', code, message);
        },
        // 文件上传进度，单位：字节
        onUploadProgress: (
          uploadInfo: any,
          totalSize: any,
          loadedPercent: any
        ) => {
          console.log(
            'onUploadProgress :',
            uploadInfo,
            totalSize,
            loadedPercent,
            uploadInfo.isImage
          );
          if (!uploadInfo.isImage) {
            this.loadedPercent = Math.floor(loadedPercent * 100);
          }
        },
        // 上传凭证超时
        onUploadTokenExpired: (uploadInfo: any) => {
          console.log('onUploadTokenExpired');
        },
        // 全部文件上传结束
        onUploadEnd: async (uploadInfo: any) => {
          this.isUploadSuccess = true;
          const data = await transCodeVideo({
            lessonId: this.$route.query.lessonId,
            fileId: this.videoId,
            coverImageUrl: this.imageUrl,
            fileName: this.fileName,
          });
          console.log('transCodeVideo data :', data);

          const timer = setInterval(async () => {
            const data = await getAliyunTransCodePercent(
              this.$route.query.lessonId as string
            );
            console.log('转码进度', data);
            if (data === 100) {
              this.isTransCodeSuccess = true;
              window.clearInterval(timer);
              console.log('转码成功');
            }
          }, 3000);
        },
      });
    },
  },
});
</script>
