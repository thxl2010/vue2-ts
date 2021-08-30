<template>
  <div id="app">
    <h1>Vue</h1>
    <router-view />
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
// import Component from 'vue-class-component';
import request from '@/utils/request';

export default Vue.extend({
  data() {
    return {
      name: 'DU',
      message: 'Hello TS',
    };
  },
  methods: {
    test() {
      this.name;
    },
  },
  created() {
    request.get('/api/getUser').then((data) => {
      console.log('request data :', data);
    });
  },
});

// @Component
// export default class App extends Vue {
//   name = 'DU';
//   message = 'Hello vue-class-component';

//   // computed
//   get msg(): string {
//     return 'Hi, ' + this.name;
//   }
//   created(): void {
//     console.log('app created');
//     this.test();
//   }

//   test(): void {
//     console.log(this.name);
//   }
// }
</script>

<style lang="scss" scoped>
.main {
  background-color: $body-bg;
}
</style>
