import { computed, nextTick, ref, watch } from 'vue';
export const useSetButtonPositon = (props) => {};
export const useSetButton = ({ cancelText, confirmText }) => {
  return {
    cancelText,
    confirmText
  };
};
export const useModal = (props, emit, popupRef) => {
  const isVisible = computed({
    get() {
      return props.modelValue;
    },
    set(val: boolean) {
      emit('update:modelValue', val);
    }
  });
  watch(
    () => props.modelValue,
    async (val) => {
      !popupRef.value && (await nextTick());
      if (val) {
        popupRef.value && popupRef.value.open();
      } else {
        popupRef.value && popupRef.value.close();
      }
    },
    {
      immediate: true
    }
  );
  return {isVisible};
};
