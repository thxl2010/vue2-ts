import { StateInterface } from '@/models/store/state';

export const userId = (state: StateInterface) => state.user?.user_id;
