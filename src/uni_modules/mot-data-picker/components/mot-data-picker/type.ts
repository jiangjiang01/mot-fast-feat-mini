// 处理本地数据
export interface OriginDataType {
  text: string;
  value: string | null;
  children: OriginDataType[];
  disable?: boolean;
}

export interface FieldNamesProps {
  text: string;
  value: string;
  children: string;
}

export type DataListViewItem = Omit<OriginDataType, 'children'>;

export interface DealDataType extends Omit<OriginDataType, 'children'> {
  parent_value: string | null;
}

export type ModelValueType = string | number | string[] | number[];
