<template>
  <div class="menu-create">
    <MenuForm :isEdit="false" />
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import MenuForm from './components/MenuForm.vue';

export default Vue.extend({
  name: 'MenuCreate',
  components: {
    MenuForm,
  },
  data() {
    return {};
  },
});
</script>

<style lang="scss" scoped></style>
