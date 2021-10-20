<template>
  <div ref="editor" class="text-editor"></div>
</template>

<script lang="ts">
import Vue from 'vue';
import E from 'wangeditor';
import { uploadCourseImage } from '@/services/course';

export default Vue.extend({
  name: 'TextEditor',
  props: {
    value: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      editor: null,
      isUploading: false,
      percentage: 0,
    };
  },
  watch: {
    value() {
      (this.editor as any).txt.html(this.value);
    },
  },
  // 组件已经渲染好，可以初始化操作 DOM 了
  mounted() {
    this.initEditor();
  },
  methods: {
    initEditor() {
      const editor = new E(this.$refs.editor as any);
      // 实现上传图片
      editor.config.customUploadImg = async (
        resultFiles: Array<File>,
        insertImgFn: (url: string) => void
      ) => {
        // resultFiles 是 input 中选中的文件列表
        // insertImgFn 是获取图片 url 后，插入到编辑器的方法
        let data: any;

        try {
          this.isUploading = true;
          const fd = new FormData();
          resultFiles.forEach((file: File) => {
            fd.append('file', file);
          });
          data = await uploadCourseImage(fd, (e: any) => {
            this.percentage = Math.floor((e.loaded / e.total) * 100);
          });
        } catch (err) {
          this.$catchError(err);
        }

        // 将图片插入到编辑器中
        insertImgFn(data.name);
      };

      this.editor = editor as any;
      // 注意：事件监听必须在 create 之前
      editor.config.onchange = (value: string) => {
        this.$emit('input', value);
      };
      editor.create();

      // 注意：设置初始化必须在 create 之后
      // console.log(this.value)
      // editor.txt.html(this.value)
    },
  },
});
</script>
