<script setup>
defineProps({
  title: {
    type: String,
    required: true
  },
  value: {
    type: [String, Number],
    required: true
  },
  icon: {
    type: String,
    required: true
  },
  trend: {
    type: Number,
    default: 0
  },
  trendLabel: {
    type: String,
    default: 'so với tháng trước'
  }
});
</script>

<template>
  <div class="bg-white overflow-hidden shadow rounded-lg">
    <div class="p-5">
      <div class="flex items-center">
        <div class="flex-shrink-0">
          <span class="text-2xl" v-html="icon"></span>
        </div>
        <div class="ml-5 w-0 flex-1">
          <dl>
            <dt class="text-sm font-medium text-gray-500 truncate">
              {{ title }}
            </dt>
            <dd class="flex items-baseline">
              <div class="text-2xl font-semibold text-gray-900">
                {{ value }}
              </div>

              <div
                v-if="trend !== 0"
                :class="[
                  'ml-2 flex items-baseline text-sm font-semibold',
                  trend > 0 ? 'text-green-600' : 'text-red-600'
                ]"
              >
                <template v-if="trend > 0">
                  <svg class="self-center flex-shrink-0 h-5 w-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M5.293 9.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 7.414V15a1 1 0 11-2 0V7.414L6.707 9.707a1 1 0 01-1.414 0z" clip-rule="evenodd" />
                  </svg>
                </template>
                <template v-else>
                  <svg class="self-center flex-shrink-0 h-5 w-5 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M14.707 10.293a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 111.414-1.414L9 12.586V5a1 1 0 012 0v7.586l2.293-2.293a1 1 0 011.414 0z" clip-rule="evenodd" />
                  </svg>
                </template>
                <span class="sr-only">
                  {{ trend > 0 ? 'Tăng' : 'Giảm' }}
                </span>
                {{ Math.abs(trend) }}%
              </div>
            </dd>
            <dd class="mt-1 text-sm text-gray-500">
              {{ trendLabel }}
            </dd>
          </dl>
        </div>
      </div>
    </div>
  </div>
</template> 