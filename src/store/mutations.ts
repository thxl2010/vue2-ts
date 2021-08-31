import { SET_USER } from './types';
import { StateInterface } from '@/models/store/state';
import { UserInterface } from '@/models/user/User.interface';

export default {
  [SET_USER](state: StateInterface, data: UserInterface) {
    state.user = data;
  },
};
