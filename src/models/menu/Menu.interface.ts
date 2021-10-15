export interface MenuFormInterface {
  id?: number;
  name: string;
  href: string;
  parentId: number;
  description: string;
  icon: string;
  shown: boolean;
  orderNum: number;
}

export interface MenuInterface {
  parentId: string | number;
  selected: boolean;
  id: string | number;
  name: string;
  href: string;
  description: string;
  icon: string;
  shown: boolean;
  orderNum: number;
  createdBy: string | number;
  updatedBy: string;
  createdTime: string | number;
  updatedTime: string | number;
  operatorId: string | number;
  level: number;
}

export interface MenuNodeListInterface {
  parentId: string | number;
  selected: boolean;
  id: string | number;
  name: string;
  href: string;
  description: string;
  icon: string;
  shown: boolean;
  orderNum: number;
  createdBy: string | number;
  updatedBy: string;
  createdTime: string | number;
  updatedTime: string | number;
  operatorId: string | number;
  level: number;
  subMenuList?: Array<MenuInterface>;
}
