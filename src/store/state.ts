import { StateInterface } from '@/models/store/state';

const state: StateInterface = {
  user: JSON.parse(window.localStorage.getItem('user') || 'null'),
  // user: null,
};

export default state;
