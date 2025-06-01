<script setup>
import { formatCurrency } from '@/utils/format';

defineProps({
  orders: {
    type: Array,
    required: true
  }
});

const getStatusClass = (status) => {
  const classes = {
    pending: 'bg-yellow-100 text-yellow-800',
    processing: 'bg-blue-100 text-blue-800',
    completed: 'bg-green-100 text-green-800',
    cancelled: 'bg-red-100 text-red-800'
  };
  return classes[status] || 'bg-gray-100 text-gray-800';
};

const getStatusText = (status) => {
  const texts = {
    pending: 'Chờ xử lý',
    processing: 'Đang xử lý',
    completed: 'Hoàn thành',
    cancelled: 'Đã hủy'
  };
  return texts[status] || status;
};
</script>

<template>
  <div class="bg-white shadow rounded-lg">
    <div class="px-4 py-5 sm:px-6">
      <h3 class="text-lg leading-6 font-medium text-gray-900">
        Đơn hàng gần đây
      </h3>
    </div>
    <div class="flex flex-col">
      <div class="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div class="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
          <div class="overflow-hidden">
            <table class="min-w-full divide-y divide-gray-200">
              <thead class="bg-gray-50">
                <tr>
                  <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Mã đơn hàng
                  </th>
                  <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Khách hàng
                  </th>
                  <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Tổng tiền
                  </th>
                  <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Trạng thái
                  </th>
                  <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Ngày đặt
                  </th>
                </tr>
              </thead>
              <tbody class="bg-white divide-y divide-gray-200">
                <tr v-for="order in orders" :key="order.id">
                  <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    #{{ order.id }}
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {{ order.customerName }}
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {{ formatCurrency(order.total) }}
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap">
                    <span :class="['px-2 inline-flex text-xs leading-5 font-semibold rounded-full', getStatusClass(order.status)]">
                      {{ getStatusText(order.status) }}
                    </span>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {{ order.date }}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template> 