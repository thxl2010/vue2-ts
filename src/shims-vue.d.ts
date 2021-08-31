declare module '*.vue' {
  import Vue from 'vue';
  export default Vue;
}

declare function catchErr(o: any): void;

import { Message } from 'element-ui';
declare module 'vue/types/vue' {
  interface Vue {
    $message: Message;
    $catchError: catchErr;
  }
}
