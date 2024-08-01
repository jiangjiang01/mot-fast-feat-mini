import { reactive, watch } from 'vue';
import { MoreStatus, PageState } from './type';

function isObject(obj: any) {
  return Object.prototype.toString.call(obj) === '[object Object]';
}

export function usePage(options?: Partial<PageState>) {
  const defaultPageState = () => ({
    page: 1,
    limit: 20,
    skip: 0,
    more: MoreStatus.More,
  });
  const state = reactive(defaultPageState());

  if (options && isObject(options)) {
    Object.assign(state, options);
  }

  watch(
    () => state.page,
    () => {
      state.skip = (state.page - 1) * state.limit;
    }
  );

  function init() {
    const initData = defaultPageState();
    if (isObject(options)) {
      Object.assign(initData, options);
    }
    Object.assign(state, initData);
  }

  return {
    pageState: state,
    pageInit: init,
  };
}
