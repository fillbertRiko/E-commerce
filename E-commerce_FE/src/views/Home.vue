<script setup>
import { ref } from 'vue';

const features = [
  {
    title: 'Miễn phí vận chuyển',
    description: 'Miễn phí vận chuyển cho đơn hàng trên 1.000.000đ',
    icon: `<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"></path></svg>`
  },
  {
    title: 'Thanh toán an toàn',
    description: 'Bảo mật thanh toán 100%',
    icon: `<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path></svg>`
  },
  {
    title: 'Hỗ trợ 24/7',
    description: 'Luôn sẵn sàng hỗ trợ bạn',
    icon: `<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z"></path></svg>`
  },
  {
    title: 'Dễ dàng đổi trả',
    description: 'Chính sách đổi trả trong 30 ngày',
    icon: `<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 15v-1a4 4 0 00-4-4H8m0 0l3 3m-3-3l3-3m9 14V5a2 2 0 00-2-2H6a2 2 0 00-2 2v16l4-2 4 2 4-2 4 2z"></path></svg>`
  }
];
</script>

<template>
  <div>
    <!-- Hero Section -->
    <section class="relative bg-white overflow-hidden">
      <div class="max-w-7xl mx-auto">
        <div class="relative z-10 pb-8 bg-white sm:pb-16 md:pb-20 lg:max-w-2xl lg:w-full lg:pb-28 xl:pb-32">
          <main class="mt-10 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28">
            <div class="sm:text-center lg:text-left">
              <h1 class="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
                <span class="block xl:inline">Chào mừng đến với</span>
                <span class="block text-primary-600 xl:inline"> E-Shop</span>
              </h1>
              <p class="mt-3 text-base text-gray-500 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
                Khám phá những sản phẩm tuyệt vời với giá cả hợp lý. Mua sắm an toàn với hệ thống thanh toán bảo mật và giao hàng nhanh chóng.
              </p>
              <div class="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start">
                <div class="rounded-md shadow">
                  <RouterLink to="/products" class="btn btn-primary w-full px-8 py-3">
                    Mua sắm ngay
                  </RouterLink>
                </div>
                <div class="mt-3 sm:mt-0 sm:ml-3">
                  <RouterLink to="/categories" class="btn btn-outline text-primary-600 hover:text-primary-700 w-full px-8 py-3">
                    Xem danh mục
                  </RouterLink>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
      <div class="lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2">
        <img class="h-56 w-full object-cover sm:h-72 md:h-96 lg:w-full lg:h-full" 
             src="https://images.unsplash.com/photo-1551434678-e076c223a692?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2850&q=80" 
             alt="E-commerce banner">
      </div>
    </section>

    <!-- Features Section -->
    <section class="py-12 bg-gray-50">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="lg:text-center">
          <h2 class="text-base text-primary-600 font-semibold tracking-wide uppercase">Tính năng</h2>
          <p class="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
            Tại sao chọn chúng tôi
          </p>
          <p class="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
            Chúng tôi mang đến trải nghiệm mua sắm tốt nhất với những tính năng tuyệt vời
          </p>
        </div>

        <div class="mt-10">
          <div class="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
            <div v-for="feature in features" :key="feature.title" 
                 class="relative bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300">
              <div>
                <div class="absolute h-12 w-12 flex items-center justify-center rounded-md bg-primary-500 text-white">
                  <span v-html="feature.icon"></span>
                </div>
                <p class="ml-16 text-lg leading-6 font-medium text-gray-900">{{ feature.title }}</p>
              </div>
              <div class="mt-2 ml-16 text-base text-gray-500">
                {{ feature.description }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Newsletter Section -->
    <section class="bg-white py-16">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center">
          <h2 class="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Đăng ký nhận tin
          </h2>
          <p class="mt-4 text-lg leading-6 text-gray-500">
            Cập nhật thông tin về sản phẩm mới và khuyến mãi
          </p>
        </div>
        <form class="mt-8 sm:flex justify-center">
          <input type="email" 
                 class="form-control sm:max-w-xs" 
                 placeholder="Nhập email của bạn"
                 required>
          <div class="mt-3 sm:mt-0 sm:ml-3">
            <button type="submit" class="btn btn-primary w-full sm:w-auto">
              Đăng ký
            </button>
          </div>
        </form>
      </div>
    </section>
  </div>
</template>