import { SET_USER } from './types';
import { StateInterface } from '@/models/store/state';

export default {
  [SET_USER](state: StateInterface, data: string): void {
    state.user = JSON.parse(data);
    window.localStorage.setItem('user', data);
  },
};
