<script setup>
import { ref, onMounted } from 'vue';
import { dashboardApi } from '@/services/api';
import StatisticCard from '@/components/admin/StatisticCard.vue';
import OrderChart from '@/components/admin/OrderChart.vue';
import RecentOrders from '@/components/admin/RecentOrders.vue';

const statistics = ref([]);
const chartData = ref([]);
const recentOrders = ref([]);
const loading = ref({
  statistics: true,
  chart: true,
  orders: true
});
const error = ref({
  statistics: null,
  chart: null,
  orders: null
});

const fetchStatistics = async () => {
  try {
    loading.value.statistics = true;
    const response = await dashboardApi.getStatistics();
    statistics.value = response.data;
  } catch (err) {
    error.value.statistics = 'Không thể tải dữ liệu thống kê';
    console.error('Error fetching statistics:', err);
  } finally {
    loading.value.statistics = false;
  }
};

const fetchChartData = async () => {
  try {
    loading.value.chart = true;
    const response = await dashboardApi.getChartData({
      startDate: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], // 7 ngày trước
      endDate: new Date().toISOString().split('T')[0] // Hôm nay
    });
    chartData.value = response.data;
  } catch (err) {
    error.value.chart = 'Không thể tải dữ liệu biểu đồ';
    console.error('Error fetching chart data:', err);
  } finally {
    loading.value.chart = false;
  }
};

const fetchRecentOrders = async () => {
  try {
    loading.value.orders = true;
    const response = await dashboardApi.getRecentOrders();
    recentOrders.value = response.data;
  } catch (err) {
    error.value.orders = 'Không thể tải dữ liệu đơn hàng';
    console.error('Error fetching recent orders:', err);
  } finally {
    loading.value.orders = false;
  }
};

onMounted(() => {
  fetchStatistics();
  fetchChartData();
  fetchRecentOrders();
});
</script>

<template>
  <div class="py-6">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
      <h1 class="text-2xl font-semibold text-gray-900">Tổng quan</h1>
    </div>
    
    <div class="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
      <!-- Thống kê -->
      <div class="mt-8">
        <div v-if="error.statistics" class="bg-red-50 p-4 rounded-md">
          <p class="text-red-700">{{ error.statistics }}</p>
        </div>
        <div v-else class="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          <template v-if="loading.statistics">
            <div v-for="i in 4" :key="i" class="bg-white shadow rounded-lg p-5 animate-pulse">
              <div class="h-8 bg-gray-200 rounded w-3/4"></div>
              <div class="mt-4 h-6 bg-gray-200 rounded w-1/2"></div>
            </div>
          </template>
          <template v-else>
            <StatisticCard
              v-for="stat in statistics"
              :key="stat.title"
              v-bind="stat"
            />
          </template>
        </div>
      </div>

      <!-- Biểu đồ -->
      <div class="mt-8">
        <div v-if="error.chart" class="bg-red-50 p-4 rounded-md">
          <p class="text-red-700">{{ error.chart }}</p>
        </div>
        <div v-else>
          <div v-if="loading.chart" class="bg-white p-6 rounded-lg shadow">
            <div class="h-64 bg-gray-200 rounded animate-pulse"></div>
          </div>
          <OrderChart v-else :data="chartData" />
        </div>
      </div>

      <!-- Đơn hàng gần đây -->
      <div class="mt-8">
        <div v-if="error.orders" class="bg-red-50 p-4 rounded-md">
          <p class="text-red-700">{{ error.orders }}</p>
        </div>
        <div v-else>
          <div v-if="loading.orders" class="bg-white shadow rounded-lg">
            <div class="px-4 py-5 sm:px-6">
              <div class="h-8 bg-gray-200 rounded w-1/4 animate-pulse"></div>
            </div>
            <div class="border-t border-gray-200">
              <div v-for="i in 5" :key="i" class="px-4 py-3">
                <div class="h-6 bg-gray-200 rounded w-full animate-pulse"></div>
              </div>
            </div>
          </div>
          <RecentOrders v-else :orders="recentOrders" />
        </div>
      </div>
    </div>
  </div>
</template> 