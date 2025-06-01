<script setup>
const shippingMethods = [
  {
    name: 'Standard Shipping',
    time: '3-5 business days',
    price: 'Free on orders over $50',
    description: 'Best for non-urgent deliveries',
    features: [
      'Tracking included',
      'Insurance up to $100',
      'Delivery confirmation'
    ]
  },
  {
    name: 'Express Shipping',
    time: '2-3 business days',
    price: '$9.99',
    description: 'Faster delivery for urgent orders',
    features: [
      'Priority handling',
      'Tracking included',
      'Insurance up to $200',
      'Signature required'
    ]
  },
  {
    name: 'Next Day Delivery',
    time: '1 business day',
    price: '$19.99',
    description: 'Guaranteed next-day delivery',
    features: [
      'Next business day delivery',
      'Priority handling',
      'Real-time tracking',
      'Insurance up to $500',
      'Signature required'
    ]
  }
];

const internationalShipping = {
  regions: [
    {
      name: 'North America',
      countries: 'Canada, Mexico',
      time: '5-7 business days',
      startingPrice: '$14.99'
    },
    {
      name: 'Europe',
      countries: 'UK, EU Countries',
      time: '7-10 business days',
      startingPrice: '$19.99'
    },
    {
      name: 'Asia Pacific',
      countries: 'Australia, Japan, South Korea',
      time: '8-12 business days',
      startingPrice: '$24.99'
    },
    {
      name: 'Rest of World',
      countries: 'Other Countries',
      time: '10-15 business days',
      startingPrice: '$29.99'
    }
  ]
};
</script>

<template>
  <div class="bg-white">
    <div class="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
      <div class="max-w-3xl mx-auto">
        <h1 class="text-3xl font-extrabold text-gray-900 text-center mb-8">
          Chính sách vận chuyển
        </h1>

        <!-- Shipping Methods -->
        <section class="mt-8">
          <h2 class="text-2xl font-bold text-gray-900 mb-4">
            Phương thức vận chuyển
          </h2>
          <div class="prose prose-primary prose-lg text-gray-500">
            <p>
              Chúng tôi cung cấp các phương thức vận chuyển sau để đáp ứng nhu cầu của khách hàng:
            </p>
            <ul>
              <li>
                <strong>Giao hàng tiêu chuẩn:</strong> 2-3 ngày làm việc (miễn phí cho đơn hàng trên 1.000.000đ)
              </li>
              <li>
                <strong>Giao hàng nhanh:</strong> 1-2 ngày làm việc (phụ phí 30.000đ)
              </li>
              <li>
                <strong>Giao hàng hỏa tốc:</strong> Trong ngày (chỉ áp dụng nội thành, phụ phí 50.000đ)
              </li>
            </ul>
          </div>
        </section>

        <!-- Delivery Areas -->
        <section class="mt-8">
          <h2 class="text-2xl font-bold text-gray-900 mb-4">
            Khu vực giao hàng
          </h2>
          <div class="prose prose-primary prose-lg text-gray-500">
            <p>
              Chúng tôi thực hiện giao hàng trên toàn quốc với thời gian giao hàng có thể khác nhau tùy theo khu vực:
            </p>
            <ul>
              <li>
                <strong>Nội thành Hà Nội và TP.HCM:</strong> 1-2 ngày làm việc
              </li>
              <li>
                <strong>Các tỉnh thành khác:</strong> 3-5 ngày làm việc
              </li>
              <li>
                <strong>Vùng sâu vùng xa:</strong> 5-7 ngày làm việc
              </li>
            </ul>
          </div>
        </section>

        <!-- Shipping Costs -->
        <section class="mt-8">
          <h2 class="text-2xl font-bold text-gray-900 mb-4">
            Phí vận chuyển
          </h2>
          <div class="prose prose-primary prose-lg text-gray-500">
            <p>
              Phí vận chuyển được tính dựa trên:
            </p>
            <ul>
              <li>Khoảng cách vận chuyển</li>
              <li>Trọng lượng và kích thước gói hàng</li>
              <li>Phương thức vận chuyển được chọn</li>
            </ul>
            <p>
              Phí vận chuyển cụ thể sẽ được hiển thị trong quá trình thanh toán sau khi bạn nhập địa chỉ giao hàng.
            </p>
          </div>
        </section>

        <!-- Free Shipping -->
        <section class="mt-8">
          <h2 class="text-2xl font-bold text-gray-900 mb-4">
            Miễn phí vận chuyển
          </h2>
          <div class="prose prose-primary prose-lg text-gray-500">
            <p>
              Chúng tôi áp dụng miễn phí vận chuyển cho:
            </p>
            <ul>
              <li>Đơn hàng có giá trị từ 1.000.000đ trở lên</li>
              <li>Các chương trình khuyến mãi đặc biệt</li>
              <li>Thành viên VIP</li>
            </ul>
            <p>
              <em>Lưu ý: Miễn phí vận chuyển chỉ áp dụng cho phương thức giao hàng tiêu chuẩn.</em>
            </p>
          </div>
        </section>

        <!-- Tracking Orders -->
        <section class="mt-8">
          <h2 class="text-2xl font-bold text-gray-900 mb-4">
            Theo dõi đơn hàng
          </h2>
          <div class="prose prose-primary prose-lg text-gray-500">
            <p>
              Sau khi đơn hàng được xác nhận, bạn có thể theo dõi trạng thái đơn hàng bằng cách:
            </p>
            <ul>
              <li>Đăng nhập vào tài khoản và kiểm tra trong mục "Đơn hàng của tôi"</li>
              <li>Sử dụng mã vận đơn được gửi qua email</li>
              <li>Liên hệ trực tiếp với bộ phận CSKH của chúng tôi</li>
            </ul>
          </div>
        </section>

        <!-- Additional Information -->
        <section class="mt-8">
          <h2 class="text-2xl font-bold text-gray-900 mb-4">
            Thông tin bổ sung
          </h2>
          <div class="prose prose-primary prose-lg text-gray-500">
            <p>
              Một số lưu ý quan trọng về vận chuyển:
            </p>
            <ul>
              <li>Thời gian giao hàng không bao gồm thứ 7, chủ nhật và các ngày lễ</li>
              <li>Đơn hàng sẽ được xử lý trong vòng 24 giờ làm việc</li>
              <li>Chúng tôi sẽ liên hệ trước khi giao hàng</li>
              <li>Quý khách vui lòng kiểm tra hàng kỹ trước khi nhận</li>
            </ul>
          </div>
        </section>

        <!-- Contact -->
        <section class="mt-12 bg-gray-50 rounded-lg p-8">
          <h2 class="text-2xl font-bold text-gray-900 mb-4">
            Hỗ trợ vận chuyển
          </h2>
          <p class="text-lg text-gray-500 mb-4">
            Nếu bạn có bất kỳ câu hỏi nào về vận chuyển, vui lòng liên hệ với chúng tôi:
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
            <a href="mailto:shipping@eshop.vn" class="text-primary-600 hover:text-primary-500">
              <span class="sr-only">Email</span>
              <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </a>
            <span class="text-gray-500">shipping@eshop.vn</span>
          </div>
        </section>
      </div>
    </div>
  </div>
</template> 