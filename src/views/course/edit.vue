<template>
  <div class="course-edit">
    <create-or-edit is-edit :course-id="courseId" />
  </div>
</template>

<script lang="ts">
import Vue from 'vue';

import CreateOrEdit from './components/CreateOrEdit.vue';

export default Vue.extend({
  name: 'CourseEdit',
  props: {
    courseId: {
      type: [String, Number],
      required: true,
    },
  },
  components: {
    CreateOrEdit,
  },
});
</script>
