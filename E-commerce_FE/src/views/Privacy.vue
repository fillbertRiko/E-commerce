<script setup>
const privacyTopics = [
  {
    title: 'Information We Collect',
    icon: 'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z',
    sections: [
      {
        subtitle: 'Personal Information',
        content: 'Name, email address, phone number, billing and shipping addresses provided during account creation or checkout.'
      },
      {
        subtitle: 'Payment Information',
        content: 'Credit card numbers, payment method details (processed securely through our payment providers).'
      },
      {
        subtitle: 'Usage Data',
        content: 'Browsing history, product interactions, device information, and IP address.'
      }
    ]
  },
  {
    title: 'How We Use Your Data',
    icon: 'M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z',
    sections: [
      {
        subtitle: 'Order Processing',
        content: 'Fulfilling orders, processing payments, and providing shipping updates.'
      },
      {
        subtitle: 'Account Management',
        content: 'Managing your account, maintaining your purchase history, and handling returns.'
      },
      {
        subtitle: 'Communication',
        content: 'Sending order confirmations, shipping updates, and promotional materials (if opted in).'
      }
    ]
  },
  {
    title: 'Data Protection',
    icon: 'M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z',
    sections: [
      {
        subtitle: 'Security Measures',
        content: 'SSL encryption, secure payment processing, and regular security audits to protect your data.'
      },
      {
        subtitle: 'Data Storage',
        content: 'Your data is stored on secure servers with restricted access and regular backups.'
      },
      {
        subtitle: 'Third-Party Services',
        content: 'We only share your data with trusted partners necessary for order fulfillment and site functionality.'
      }
    ]
  }
];

const userRights = [
  {
    title: 'Access Your Data',
    description: 'Request a copy of your personal data that we have collected.'
  },
  {
    title: 'Correct Your Data',
    description: 'Update or correct any inaccurate personal information.'
  },
  {
    title: 'Delete Your Data',
    description: 'Request deletion of your personal data (subject to legal requirements).'
  },
  {
    title: 'Data Portability',
    description: 'Receive your data in a structured, commonly used format.'
  },
  {
    title: 'Withdraw Consent',
    description: 'Opt-out of marketing communications and data processing.'
  },
  {
    title: 'Lodge Complaints',
    description: 'Contact relevant data protection authorities with concerns.'
  }
];

const cookieTypes = [
  {
    name: 'Essential Cookies',
    description: 'Required for basic site functionality and security.',
    required: true
  },
  {
    name: 'Functional Cookies',
    description: 'Remember your preferences and enhance your experience.',
    required: false
  },
  {
    name: 'Analytics Cookies',
    description: 'Help us understand how visitors use our website.',
    required: false
  },
  {
    name: 'Marketing Cookies',
    description: 'Used to deliver relevant advertisements and promotions.',
    required: false
  }
];
</script>

<template>
  <div class="bg-white">
    <div class="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
      <div class="max-w-3xl mx-auto">
        <h1 class="text-3xl font-extrabold text-gray-900 text-center mb-8">
          Chính sách bảo mật
        </h1>

        <!-- Introduction -->
        <section class="mt-8">
          <h2 class="text-2xl font-bold text-gray-900 mb-4">
            Giới thiệu
          </h2>
          <div class="prose prose-primary prose-lg text-gray-500">
            <p>
              Chúng tôi coi trọng quyền riêng tư của bạn và cam kết bảo vệ thông tin cá nhân của bạn. 
              Chính sách bảo mật này mô tả cách chúng tôi thu thập, sử dụng và bảo vệ thông tin của bạn 
              khi bạn sử dụng website của chúng tôi.
            </p>
          </div>
        </section>

        <!-- Information We Collect -->
        <section class="mt-8">
          <h2 class="text-2xl font-bold text-gray-900 mb-4">
            Thông tin chúng tôi thu thập
          </h2>
          <div class="prose prose-primary prose-lg text-gray-500">
            <p>
              Chúng tôi thu thập các loại thông tin sau:
            </p>
            <ul>
              <li>
                <strong>Thông tin cá nhân:</strong> Tên, địa chỉ email, số điện thoại, địa chỉ giao hàng
              </li>
              <li>
                <strong>Thông tin thanh toán:</strong> Chi tiết thẻ tín dụng, thông tin tài khoản ngân hàng
              </li>
              <li>
                <strong>Thông tin kỹ thuật:</strong> Địa chỉ IP, loại trình duyệt, thiết bị sử dụng
              </li>
              <li>
                <strong>Thông tin sử dụng:</strong> Lịch sử mua hàng, sản phẩm đã xem
              </li>
            </ul>
          </div>
        </section>

        <!-- How We Use Information -->
        <section class="mt-8">
          <h2 class="text-2xl font-bold text-gray-900 mb-4">
            Cách chúng tôi sử dụng thông tin
          </h2>
          <div class="prose prose-primary prose-lg text-gray-500">
            <p>
              Chúng tôi sử dụng thông tin của bạn để:
            </p>
            <ul>
              <li>Xử lý và giao đơn hàng của bạn</li>
              <li>Liên lạc với bạn về đơn hàng</li>
              <li>Gửi thông tin về sản phẩm và khuyến mãi (nếu bạn đồng ý)</li>
              <li>Cải thiện dịch vụ và trải nghiệm mua sắm</li>
              <li>Phát hiện và ngăn chặn gian lận</li>
            </ul>
          </div>
        </section>

        <!-- Information Sharing -->
        <section class="mt-8">
          <h2 class="text-2xl font-bold text-gray-900 mb-4">
            Chia sẻ thông tin
          </h2>
          <div class="prose prose-primary prose-lg text-gray-500">
            <p>
              Chúng tôi không bán hoặc cho thuê thông tin cá nhân của bạn cho bên thứ ba. 
              Tuy nhiên, chúng tôi có thể chia sẻ thông tin với:
            </p>
            <ul>
              <li>Đối tác vận chuyển để giao hàng</li>
              <li>Đối tác thanh toán để xử lý giao dịch</li>
              <li>Cơ quan pháp luật theo yêu cầu</li>
            </ul>
          </div>
        </section>

        <!-- Data Security -->
        <section class="mt-8">
          <h2 class="text-2xl font-bold text-gray-900 mb-4">
            Bảo mật dữ liệu
          </h2>
          <div class="prose prose-primary prose-lg text-gray-500">
            <p>
              Chúng tôi áp dụng các biện pháp bảo mật sau:
            </p>
            <ul>
              <li>Mã hóa SSL cho mọi giao dịch</li>
              <li>Bảo vệ máy chủ bằng tường lửa</li>
              <li>Giới hạn quyền truy cập dữ liệu</li>
              <li>Kiểm tra bảo mật định kỳ</li>
            </ul>
          </div>
        </section>

        <!-- Cookies -->
        <section class="mt-8">
          <h2 class="text-2xl font-bold text-gray-900 mb-4">
            Cookie và công nghệ theo dõi
          </h2>
          <div class="prose prose-primary prose-lg text-gray-500">
            <p>
              Chúng tôi sử dụng cookie để:
            </p>
            <ul>
              <li>Ghi nhớ thông tin đăng nhập</li>
              <li>Theo dõi giỏ hàng</li>
              <li>Phân tích hành vi người dùng</li>
              <li>Cải thiện trải nghiệm website</li>
            </ul>
            <p>
              Bạn có thể tắt cookie trong trình duyệt, nhưng điều này có thể ảnh hưởng đến một số tính năng của website.
            </p>
          </div>
        </section>

        <!-- Your Rights -->
        <section class="mt-8">
          <h2 class="text-2xl font-bold text-gray-900 mb-4">
            Quyền của bạn
          </h2>
          <div class="prose prose-primary prose-lg text-gray-500">
            <p>
              Bạn có các quyền sau đối với dữ liệu của mình:
            </p>
            <ul>
              <li>Quyền truy cập thông tin cá nhân</li>
              <li>Quyền yêu cầu chỉnh sửa thông tin</li>
              <li>Quyền yêu cầu xóa thông tin</li>
              <li>Quyền từ chối tiếp thị trực tiếp</li>
              <li>Quyền khiếu nại với cơ quan bảo vệ dữ liệu</li>
            </ul>
          </div>
        </section>

        <!-- Contact -->
        <section class="mt-12 bg-gray-50 rounded-lg p-8">
          <h2 class="text-2xl font-bold text-gray-900 mb-4">
            Liên hệ về bảo mật
          </h2>
          <p class="text-lg text-gray-500 mb-4">
            Nếu bạn có thắc mắc về chính sách bảo mật, vui lòng liên hệ:
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
            <a href="mailto:privacy@eshop.vn" class="text-primary-600 hover:text-primary-500">
              <span class="sr-only">Email</span>
              <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </a>
            <span class="text-gray-500">privacy@eshop.vn</span>
          </div>
        </section>

        <!-- Updates -->
        <section class="mt-8">
          <h2 class="text-2xl font-bold text-gray-900 mb-4">
            Cập nhật chính sách
          </h2>
          <div class="prose prose-primary prose-lg text-gray-500">
            <p>
              Chúng tôi có thể cập nhật chính sách bảo mật này theo thời gian. Mọi thay đổi sẽ được 
              thông báo trên website và qua email (nếu cần thiết). Việc tiếp tục sử dụng website sau 
              khi thay đổi đồng nghĩa với việc bạn chấp nhận những thay đổi đó.
            </p>
            <p class="text-sm mt-4">
              <em>Cập nhật lần cuối: Tháng 3, 2024</em>
            </p>
          </div>
        </section>
      </div>
    </div>
  </div>
</template> 