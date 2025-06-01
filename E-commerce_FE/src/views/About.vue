<template>
  <div class="bg-white">
    <!-- Hero section -->
    <div class="relative">
      <div class="absolute inset-x-0 bottom-0 h-1/2 bg-gray-100"></div>
      <div class="max-w-7xl mx-auto sm:px-6 lg:px-8">
        <div class="relative shadow-xl sm:rounded-2xl sm:overflow-hidden">
          <div class="absolute inset-0">
            <img class="h-full w-full object-cover" 
                 src="https://images.unsplash.com/photo-1521737852567-6949f3f9f2b5?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=2830&q=80&sat=-100" 
                 alt="Đội ngũ của chúng tôi">
            <div class="absolute inset-0 bg-gradient-to-r from-primary-600 to-primary-800 mix-blend-multiply"></div>
          </div>
          <div class="relative px-4 py-16 sm:px-6 sm:py-24 lg:py-32 lg:px-8">
            <h1 class="text-center text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl">
              <span class="block text-white">Về Chúng Tôi</span>
            </h1>
            <p class="mt-6 max-w-lg mx-auto text-center text-xl text-white sm:max-w-3xl">
              Chúng tôi là một đội ngũ đam mê về thương mại điện tử, cam kết mang đến trải nghiệm mua sắm tốt nhất cho khách hàng
            </p>
          </div>
        </div>
      </div>
    </div>

    <!-- Story section -->
    <div class="relative py-16 bg-white overflow-hidden">
      <div class="relative px-4 sm:px-6 lg:px-8">
        <div class="text-lg max-w-prose mx-auto">
          <h2>
            <span class="block text-base text-center text-primary-600 font-semibold tracking-wide uppercase">
              Câu chuyện của chúng tôi
            </span>
            <span class="mt-2 block text-3xl text-center leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
              Hành trình phát triển
            </span>
          </h2>
          <p class="mt-8 text-xl text-gray-500 leading-8">
            Thành lập vào năm 2020, chúng tôi bắt đầu với một ý tưởng đơn giản: tạo ra một nền tảng thương mại điện tử 
            mang đến trải nghiệm mua sắm trực tuyến tuyệt vời nhất cho người tiêu dùng Việt Nam.
          </p>
        </div>
        <div class="mt-6 prose prose-primary prose-lg text-gray-500 mx-auto">
          <p>
            Với đội ngũ chuyên gia giàu kinh nghiệm và niềm đam mê không ngừng, chúng tôi không ngừng cải tiến và 
            phát triển để mang đến những sản phẩm chất lượng cao với giá cả hợp lý.
          </p>
          <p>
            Sứ mệnh của chúng tôi là trở thành điểm đến tin cậy cho mọi nhu cầu mua sắm trực tuyến của bạn, 
            nơi bạn có thể tìm thấy mọi thứ mình cần với sự thuận tiện và an tâm tuyệt đối.
          </p>
        </div>
      </div>
    </div>

    <!-- Values section -->
    <div class="bg-gray-50 pt-16 pb-20 px-4 sm:px-6 lg:pt-24 lg:pb-28 lg:px-8">
      <div class="relative max-w-lg mx-auto lg:max-w-7xl">
        <div>
          <h2 class="text-3xl tracking-tight font-extrabold text-gray-900 sm:text-4xl">
            Giá trị cốt lõi
          </h2>
          <p class="mt-3 text-xl text-gray-500">
            Những giá trị định hình mọi quyết định và hành động của chúng tôi
          </p>
        </div>
        <div class="mt-12 grid gap-16 lg:grid-cols-3 lg:gap-x-8 lg:gap-y-12">
          <div>
            <div>
              <span class="inline-flex items-center justify-center p-3 bg-primary-500 rounded-md shadow-lg">
                <svg class="h-6 w-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
                </svg>
              </span>
            </div>
            <div class="mt-6">
              <h3 class="text-lg font-medium text-gray-900">
                Khách hàng là trọng tâm
              </h3>
              <p class="mt-2 text-base text-gray-500">
                Mọi quyết định của chúng tôi đều hướng đến việc mang lại giá trị tốt nhất cho khách hàng.
              </p>
            </div>
          </div>

          <div>
            <div>
              <span class="inline-flex items-center justify-center p-3 bg-primary-500 rounded-md shadow-lg">
                <svg class="h-6 w-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </span>
            </div>
            <div class="mt-6">
              <h3 class="text-lg font-medium text-gray-900">
                Chất lượng và uy tín
              </h3>
              <p class="mt-2 text-base text-gray-500">
                Cam kết cung cấp sản phẩm chất lượng cao và dịch vụ đáng tin cậy.
              </p>
            </div>
          </div>

          <div>
            <div>
              <span class="inline-flex items-center justify-center p-3 bg-primary-500 rounded-md shadow-lg">
                <svg class="h-6 w-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </span>
            </div>
            <div class="mt-6">
              <h3 class="text-lg font-medium text-gray-900">
                Đổi mới liên tục
              </h3>
              <p class="mt-2 text-base text-gray-500">
                Không ngừng cải tiến và phát triển để mang đến trải nghiệm tốt hơn mỗi ngày.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Contact CTA -->
    <div class="bg-primary-700">
      <div class="max-w-2xl mx-auto text-center py-16 px-4 sm:py-20 sm:px-6 lg:px-8">
        <h2 class="text-3xl font-extrabold text-white sm:text-4xl">
          <span class="block">Want to learn more?</span>
          <span class="block">Get in touch with us.</span>
        </h2>
        <p class="mt-4 text-lg leading-6 text-primary-200">
          We'd love to hear from you and answer any questions you might have.
        </p>
        <RouterLink
          :to="{ name: 'contact' }"
          class="mt-8 w-full inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-primary-600 bg-white hover:bg-primary-50 sm:w-auto"
        >
          Contact Us
        </RouterLink>
      </div>
    </div>
  </div>
</template>

<script setup>
import { RouterLink } from 'vue-router';
</script> 