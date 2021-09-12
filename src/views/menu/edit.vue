<template>
  <div class="menu-edit">
    <MenuForm :isEdit="true" />
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import MenuForm from './components/MenuForm.vue';

export default Vue.extend({
  name: 'MenuEdit',
  components: {
    MenuForm,
  },
  data() {
    return {};
  },
});
</script>

<style lang="scss" scoped></style>
