<script setup>
const returnSteps = [
  {
    id: 1,
    title: 'Start Your Return',
    description: 'Log in to your account and go to your orders. Select the item you want to return and initiate the return process.',
    icon: 'M15 12a3 3 0 11-6 0 3 3 0 016 0z M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z'
  },
  {
    id: 2,
    title: 'Print Label',
    description: 'Once approved, we\'ll email you a prepaid return shipping label. Print it and attach it to your package.',
    icon: 'M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z'
  },
  {
    id: 3,
    title: 'Pack Items',
    description: 'Pack the items securely in their original packaging if possible. Include all tags, accessories, and documentation.',
    icon: 'M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4'
  },
  {
    id: 4,
    title: 'Ship Return',
    description: 'Drop off your package at any authorized shipping location. Keep the tracking number for reference.',
    icon: 'M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h8a1 1 0 001-1z M16 16V6a1 1 0 011-1h2a1 1 0 011 1v10a1 1 0 01-1 1h-2a1 1 0 01-1-1z'
  },
  {
    id: 5,
    title: 'Refund Processing',
    description: 'Once we receive and inspect your return, we\'ll process your refund within 2-3 business days.',
    icon: 'M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z'
  }
];

const returnGuidelines = [
  'Items must be returned within 30 days of delivery',
  'Items must be unused and in original condition',
  'All original tags and packaging must be intact',
  'Include original receipt or gift receipt',
  'Damaged or defective items will be inspected',
  'Special or customized orders may not be eligible',
  'Some items may have different return periods',
  'Return shipping is free for defective items'
];

const commonIssues = [
  {
    title: 'Wrong Size',
    description: 'If the item doesn\'t fit, return it in original condition with tags attached.',
    eligible: true
  },
  {
    title: 'Changed Mind',
    description: 'You can return items you no longer want within 30 days.',
    eligible: true
  },
  {
    title: 'Defective Item',
    description: 'Defective items can be returned for free within 90 days.',
    eligible: true
  },
  {
    title: 'Missing Parts',
    description: 'Items with missing parts can be returned or replaced.',
    eligible: true
  },
  {
    title: 'Used Items',
    description: 'Used or worn items cannot be returned.',
    eligible: false
  },
  {
    title: 'No Receipt',
    description: 'Items without proof of purchase may only be eligible for store credit.',
    eligible: 'partial'
  }
];
</script>

<template>
  <div class="bg-white">
    <div class="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
      <div class="max-w-3xl mx-auto">
        <h1 class="text-3xl font-extrabold text-gray-900 text-center mb-8">
          Chính sách đổi trả
        </h1>

        <!-- Overview -->
        <section class="mt-8">
          <h2 class="text-2xl font-bold text-gray-900 mb-4">
            Tổng quan
          </h2>
          <div class="prose prose-primary prose-lg text-gray-500">
            <p>
              Chúng tôi cam kết mang đến sự hài lòng cho khách hàng với chính sách đổi trả linh hoạt trong vòng 30 ngày. 
              Chính sách này áp dụng cho hầu hết các sản phẩm, với một số điều kiện cụ thể được nêu dưới đây.
            </p>
          </div>
        </section>

        <!-- Return Period -->
        <section class="mt-8">
          <h2 class="text-2xl font-bold text-gray-900 mb-4">
            Thời hạn đổi trả
          </h2>
          <div class="prose prose-primary prose-lg text-gray-500">
            <ul>
              <li>30 ngày kể từ ngày nhận hàng cho việc hoàn trả</li>
              <li>7 ngày đổi sang sản phẩm khác</li>
              <li>3 ngày đổi size/màu sắc (nếu còn hàng)</li>
            </ul>
            <p>
              <em>Lưu ý: Thời gian trên không bao gồm ngày lễ và cuối tuần</em>
            </p>
          </div>
        </section>

        <!-- Return Conditions -->
        <section class="mt-8">
          <h2 class="text-2xl font-bold text-gray-900 mb-4">
            Điều kiện đổi trả
          </h2>
          <div class="prose prose-primary prose-lg text-gray-500">
            <p>
              Sản phẩm đủ điều kiện đổi trả khi:
            </p>
            <ul>
              <li>Còn nguyên tem mác, nhãn sản phẩm</li>
              <li>Chưa qua sử dụng hoặc giặt ủi</li>
              <li>Không có dấu hiệu hư hỏng, bẩn, rách</li>
              <li>Còn đầy đủ phụ kiện và bao bì đóng gói ban đầu</li>
            </ul>
          </div>
        </section>

        <!-- Non-Returnable Items -->
        <section class="mt-8">
          <h2 class="text-2xl font-bold text-gray-900 mb-4">
            Sản phẩm không được đổi trả
          </h2>
          <div class="prose prose-primary prose-lg text-gray-500">
            <ul>
              <li>Đồ lót, đồ bơi vì lý do vệ sinh</li>
              <li>Sản phẩm đã qua sử dụng</li>
              <li>Sản phẩm giảm giá trên 50%</li>
              <li>Sản phẩm được đặt riêng theo yêu cầu</li>
              <li>Thẻ quà tặng</li>
            </ul>
          </div>
        </section>

        <!-- Return Process -->
        <section class="mt-8">
          <h2 class="text-2xl font-bold text-gray-900 mb-4">
            Quy trình đổi trả
          </h2>
          <div class="prose prose-primary prose-lg text-gray-500">
            <ol>
              <li>
                <strong>Bước 1:</strong> Liên hệ với bộ phận CSKH qua email hoặc hotline
              </li>
              <li>
                <strong>Bước 2:</strong> Điền form yêu cầu đổi trả và cung cấp thông tin đơn hàng
              </li>
              <li>
                <strong>Bước 3:</strong> Đóng gói sản phẩm theo hướng dẫn
              </li>
              <li>
                <strong>Bước 4:</strong> Gửi sản phẩm về địa chỉ của chúng tôi
              </li>
              <li>
                <strong>Bước 5:</strong> Chờ xác nhận và hoàn tiền/đổi sản phẩm
              </li>
            </ol>
          </div>
        </section>

        <!-- Refund Methods -->
        <section class="mt-8">
          <h2 class="text-2xl font-bold text-gray-900 mb-4">
            Phương thức hoàn tiền
          </h2>
          <div class="prose prose-primary prose-lg text-gray-500">
            <p>
              Sau khi yêu cầu đổi trả được chấp nhận, chúng tôi sẽ hoàn tiền theo phương thức thanh toán ban đầu:
            </p>
            <ul>
              <li>Thẻ tín dụng: 5-10 ngày làm việc</li>
              <li>Chuyển khoản ngân hàng: 3-5 ngày làm việc</li>
              <li>Ví điện tử: 1-2 ngày làm việc</li>
            </ul>
          </div>
        </section>

        <!-- Shipping Costs -->
        <section class="mt-8">
          <h2 class="text-2xl font-bold text-gray-900 mb-4">
            Chi phí vận chuyển
          </h2>
          <div class="prose prose-primary prose-lg text-gray-500">
            <ul>
              <li>Đổi trả do lỗi sản phẩm: Chúng tôi chịu phí vận chuyển</li>
              <li>Đổi trả theo yêu cầu khách hàng: Khách hàng chịu phí vận chuyển</li>
              <li>Đổi size/màu: Miễn phí cho lần đổi đầu tiên</li>
            </ul>
          </div>
        </section>

        <!-- Contact -->
        <section class="mt-12 bg-gray-50 rounded-lg p-8">
          <h2 class="text-2xl font-bold text-gray-900 mb-4">
            Hỗ trợ đổi trả
          </h2>
          <p class="text-lg text-gray-500 mb-4">
            Nếu bạn cần hỗ trợ về việc đổi trả, vui lòng liên hệ:
          </p>
          <div class="flex items-center space-x-4">
            <a href="tel:+842812345678" class="text-primary-600 hover:text-primary-500">
              <span class="sr-only">Điện thoại</span>
              <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
            </a>
            <span class="text-gray-500">028-1234-5678</span>
            <span class="text-gray-300">|</span>
            <a href="mailto:returns@eshop.vn" class="text-primary-600 hover:text-primary-500">
              <span class="sr-only">Email</span>
              <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </a>
            <span class="text-gray-500">returns@eshop.vn</span>
          </div>
        </section>
      </div>
    </div>
  </div>
</template>

<style scoped>
.step-line {
  height: 2px;
  background: linear-gradient(to right, #4F46E5 0%, #4F46E5 100%);
}
</style> 