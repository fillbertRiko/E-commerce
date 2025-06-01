<script setup>
import { computed } from 'vue';

const props = defineProps({
  padding: {
    type: String,
    default: 'normal',
    validator: (value) => ['none', 'small', 'normal', 'large'].includes(value)
  },
  shadow: {
    type: String,
    default: 'normal',
    validator: (value) => ['none', 'small', 'normal', 'large'].includes(value)
  },
  hover: {
    type: Boolean,
    default: false
  },
  border: {
    type: Boolean,
    default: true
  }
});

const classes = computed(() => {
  const paddingClasses = {
    none: '',
    small: 'p-3',
    normal: 'p-6',
    large: 'p-8'
  };

  const shadowClasses = {
    none: '',
    small: 'shadow-sm',
    normal: 'shadow',
    large: 'shadow-lg'
  };

  return [
    'bg-white rounded-lg',
    paddingClasses[props.padding],
    shadowClasses[props.shadow],
    props.hover && 'transition-shadow duration-200 hover:shadow-lg',
    props.border && 'border border-gray-200'
  ];
});
</script>

<template>
  <div :class="classes">
    <slot />
  </div>
</template> 