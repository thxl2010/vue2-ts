export interface MenuInterface {
  id?: number;
  name: string;
  href: string;
  parentId: number;
  description: string;
  icon: string;
  shown: boolean;
  orderNum: number;
}
