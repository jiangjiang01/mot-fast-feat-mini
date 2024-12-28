import type { PropType } from 'vue';
import type { OriginDataType, FieldNamesProps, DataListViewItem, DealDataType, ModelValueType } from './type';

export const comProps = {
  // 绑定值，支持多种数据格式，开发者输入什么，到时候拿到的就是什么，也可以在 change 事件获取最全的数据
  // 举例：
  // 1.单选强制 string： "230811"
  // 2.多选强制 array：["230811","230811"]
  modelValue: {
    type: [Object, String] as PropType<ModelValueType>,
    default() {
      return '';
    }
  },
  // 渲染数据
  renderData: {
    type: Array,
    default() {
      return [];
    }
  },
  // 多选
  multiple: {
    type: Boolean,
    default: false
  },
  fieldNames: {
    type: Object as PropType<FieldNamesProps>,
    default: () => {
      return {
        text: 'text',
        value: 'value',
        children: 'children'
      };
    }
  },
  multipleText: {
    type: String,
    default: '项'
  },
  showCommonUsedCity: {
    type: Boolean,
    default: false
  }
};

const commonUsedCityList = [
  {
    text: '北京',
    value: '110100'
  },
  {
    text: '上海',
    value: '310100'
  },
  {
    text: '广州',
    value: '440100'
  },
  {
    text: '深圳',
    value: '440300'
  },
  {
    text: '南京',
    value: '320100'
  },
  {
    text: '苏州',
    value: '320500'
  },
  {
    text: '天津',
    value: '120100'
  },
  {
    text: '武汉',
    value: '420100'
  }
] as DataListViewItem[];

export const COMMONUSEDCITYLIST = 'CommonUsedCityList';
export const getCommonUsedCityList = (fieldNames: FieldNamesProps) => {
  let storageCommonUsedCityList = uni.getStorageSync(COMMONUSEDCITYLIST) ?? [];

  if (storageCommonUsedCityList?.length === 0) {
    const list = commonUsedCityList.map((item) => {
      return {
        [fieldNames.text]: item.text,
        [fieldNames.value]: item.value
      };
    });
    storageCommonUsedCityList = list;
    uni.setStorageSync(COMMONUSEDCITYLIST, list);
  }

  return storageCommonUsedCityList;
};

export const setStorageCommonUsedCityList = (items: DataListViewItem[]) => {
  const storageCommonUsedCityList: DataListViewItem[] = uni.getStorageSync(COMMONUSEDCITYLIST) ?? [];
  // 删除 “市”
  items = items.map((item) => {
    const cityStrSlice = item.text.slice(-1);
    console.log(cityStrSlice, 'cityStrSlice');

    if (cityStrSlice === '市') item.text = item.text.replace(cityStrSlice, '');
    return item;
  });
  console.log(items, 'items');

  // 去重
  const list: DataListViewItem[] = Array.from(
    new Set([...items, ...storageCommonUsedCityList].map(JSON.stringify as any))
  ).map(JSON.parse as any);

  uni.setStorageSync(COMMONUSEDCITYLIST, list.slice(0, 8));
};

/**
 * 递归根据原始数据
 * {"text":"广东省","value":"110000","children":[{"text":"深圳市","value":"110100","children":[{"text":"南山区","value":"110101"}]}]}
 * 转换为
 * [{"text":"广东省","value":"110000","parent_value":null},{"text":"深圳市","value":"110100","parent_value":"110000"},{"text":"南山区","value":"110101","parent_value":"110100"}]
 */
export const dealDataFn = (
  nodes: OriginDataType[],
  result: DealDataType[] = [],
  parent_value: string | null = null,
  props: Record<string, any>
): DealDataType[] => {
  const valueField = props.fieldNames.value as Exclude<keyof FieldNamesProps, 'children'>;
  const childrenField = props.fieldNames.children as Exclude<keyof FieldNamesProps, 'text' | 'value'>;

  for (let i = 0; i < nodes.length; i++) {
    const node = nodes[i];
    const child: Record<string, any> = {};
    for (const key in node) {
      if (key !== childrenField) {
        child[key] = node[key as Exclude<keyof FieldNamesProps, 'children'>];
      }
    }
    if (parent_value !== null && parent_value !== undefined && parent_value !== '') {
      child.parent_value = parent_value;
    }
    result.push(child as DealDataType);
    const children = node[childrenField];
    if (children) {
      dealDataFn(children, result, node[valueField], props);
    }
  }
  return result;
};

// 提供叶子结点，返回整个树的路径
export const _findNodePath = (
  key: ModelValueType,
  nodes: OriginDataType[],
  path: DataListViewItem[] = [],
  fieldNames: Record<string, any>
): DataListViewItem[] => {
  const textField = fieldNames.text as Exclude<keyof FieldNamesProps, 'children'>;
  const valueField = fieldNames.value as Exclude<keyof FieldNamesProps, 'children'>;
  const childrenField = fieldNames.children as Exclude<keyof FieldNamesProps, 'text' | 'value'>;
  for (let i = 0; i < nodes.length; i++) {
    const node = nodes[i];
    const children = node[childrenField];
    const text = node[textField];
    const value = node[valueField];

    path.push({ [textField]: text, [valueField]: value } as unknown as FieldNamesProps);

    if (value === key) {
      return path;
    }

    if (children) {
      const p = _findNodePath(key, children, path, fieldNames);
      if (p.length) {
        return p;
      }
    }

    path.pop();
  }
  return [];
};

export const _updateBindData = (dealData: DealDataType[], selected: DataListViewItem[]) => {
  const dataList = _filterData(dealData, selected);

  return dataList;
};

// 按照层级过滤出数据 dataList[0] 为省份数据，dataList[1] 为市数据,dataList[2] 为区县
export const _filterData = (data: DealDataType[], paths: DataListViewItem[]): DealDataType[][] => {
  const dataList = [];

  dataList.push(
    data.filter((item) => {
      return !item.parent_value;
    })
  );

  for (let i = 0; i < paths.length; i++) {
    const value = paths[i].value;
    const nodes = data.filter((item) => {
      return item.parent_value === value;
    });

    if (nodes.length) {
      dataList.push(nodes);
    }
  }

  return dataList;
};
