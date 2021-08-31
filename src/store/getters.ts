import { StateInterface } from '@/models/store/state';

export const userName = (state: StateInterface) => state.user?.name;
