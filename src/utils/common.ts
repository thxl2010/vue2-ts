import { VueConstructor } from 'vue';
import { Message } from 'element-ui';
import { encodeHtml } from '@/utils/index';

export default {
  install(Vue: VueConstructor): void {
    Vue.prototype.$catchError = (err: any) => {
      if (err && (err.message || err.mesg || err.msg || err.errorMessage)) {
        Message.error(err.message || err.mesg || err.msg || err.errorMessage);
      } else {
        console.error('catch err :', err);
      }
    };

    Vue.prototype.$encodeHtml = encodeHtml;
  },
};
