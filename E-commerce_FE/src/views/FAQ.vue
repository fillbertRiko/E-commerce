<script setup>
import { ref } from 'vue';

const faqs = ref([
  {
    id: 1,
    question: 'Làm thế nào để theo dõi đơn hàng của tôi?',
    answer: 'Sau khi đặt hàng, bạn sẽ nhận được email xác nhận với mã đơn hàng. Bạn có thể sử dụng mã này để theo dõi đơn hàng trong tài khoản của mình hoặc trên trang Theo dõi đơn hàng của chúng tôi.'
  },
  {
    id: 2,
    question: 'Chính sách đổi trả như thế nào?',
    answer: 'Chúng tôi chấp nhận đổi trả trong vòng 30 ngày kể từ ngày mua hàng. Sản phẩm phải còn nguyên tem mác và trong tình trạng chưa sử dụng. Vui lòng xem trang Chính sách đổi trả để biết thêm chi tiết.'
  },
  {
    id: 3,
    question: 'Các phương thức thanh toán được chấp nhận?',
    answer: 'Chúng tôi chấp nhận thanh toán qua thẻ tín dụng/ghi nợ (Visa, MasterCard), chuyển khoản ngân hàng, ví điện tử (Momo, ZaloPay) và thanh toán khi nhận hàng (COD).'
  },
  {
    id: 4,
    question: 'Thời gian giao hàng là bao lâu?',
    answer: 'Thời gian giao hàng thông thường là 2-5 ngày làm việc đối với khu vực nội thành và 5-7 ngày làm việc đối với khu vực ngoại thành. Thời gian có thể thay đổi tùy theo địa điểm giao hàng.'
  },
  {
    id: 5,
    question: 'Làm thế nào để tạo tài khoản?',
    answer: 'Bạn có thể dễ dàng tạo tài khoản bằng cách nhấp vào nút "Đăng ký" ở góc trên cùng bên phải của trang web. Điền thông tin cá nhân của bạn và làm theo hướng dẫn để hoàn tất quá trình đăng ký.'
  },
  {
    id: 6,
    question: 'Tôi có thể thay đổi hoặc hủy đơn hàng không?',
    answer: 'Bạn có thể thay đổi hoặc hủy đơn hàng trong vòng 24 giờ sau khi đặt hàng. Sau thời gian này, vui lòng liên hệ với bộ phận chăm sóc khách hàng để được hỗ trợ.'
  },
  {
    id: 7,
    question: 'Do you offer gift wrapping?',
    answer: 'Yes, we offer gift wrapping services for a small additional fee. You can select this option during checkout and even include a personalized message.'
  }
]);

const openItems = ref(new Set());

const toggleItem = (id) => {
  if (openItems.value.has(id)) {
    openItems.value.delete(id);
  } else {
    openItems.value.add(id);
  }
};

const isOpen = (id) => openItems.value.has(id);
</script>

<template>
  <div class="bg-white">
    <div class="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:py-20 lg:px-8">
      <div class="lg:grid lg:grid-cols-3 lg:gap-8">
        <div>
          <h2 class="text-3xl font-extrabold text-gray-900">
            Câu hỏi thường gặp
          </h2>
          <p class="mt-4 text-lg text-gray-500">
            Không tìm thấy câu trả lời bạn cần? 
            <a href="/contact" class="font-medium text-primary-600 hover:text-primary-500">
              Liên hệ với đội ngũ hỗ trợ của chúng tôi
            </a>
          </p>
        </div>
        <div class="mt-12 lg:mt-0 lg:col-span-2">
          <dl class="space-y-12">
            <div>
              <dt class="text-lg leading-6 font-medium text-gray-900">
                Làm thế nào để theo dõi đơn hàng của tôi?
              </dt>
              <dd class="mt-2 text-base text-gray-500">
                Sau khi đặt hàng, bạn sẽ nhận được email xác nhận với mã đơn hàng. Bạn có thể sử dụng mã này để theo dõi 
                đơn hàng trong tài khoản của mình hoặc trên trang Theo dõi đơn hàng của chúng tôi.
              </dd>
            </div>

            <div>
              <dt class="text-lg leading-6 font-medium text-gray-900">
                Chính sách đổi trả như thế nào?
              </dt>
              <dd class="mt-2 text-base text-gray-500">
                Chúng tôi chấp nhận đổi trả trong vòng 30 ngày kể từ ngày mua hàng. Sản phẩm phải còn nguyên tem mác 
                và trong tình trạng chưa sử dụng. Vui lòng xem trang Chính sách đổi trả để biết thêm chi tiết.
              </dd>
            </div>

            <div>
              <dt class="text-lg leading-6 font-medium text-gray-900">
                Các phương thức thanh toán được chấp nhận?
              </dt>
              <dd class="mt-2 text-base text-gray-500">
                Chúng tôi chấp nhận thanh toán qua thẻ tín dụng/ghi nợ (Visa, MasterCard), chuyển khoản ngân hàng, 
                ví điện tử (Momo, ZaloPay) và thanh toán khi nhận hàng (COD).
              </dd>
            </div>

            <div>
              <dt class="text-lg leading-6 font-medium text-gray-900">
                Thời gian giao hàng là bao lâu?
              </dt>
              <dd class="mt-2 text-base text-gray-500">
                Thời gian giao hàng thông thường là 2-5 ngày làm việc đối với khu vực nội thành và 5-7 ngày làm việc 
                đối với khu vực ngoại thành. Thời gian có thể thay đổi tùy theo địa điểm giao hàng.
              </dd>
            </div>

            <div>
              <dt class="text-lg leading-6 font-medium text-gray-900">
                Làm thế nào để tạo tài khoản?
              </dt>
              <dd class="mt-2 text-base text-gray-500">
                Bạn có thể dễ dàng tạo tài khoản bằng cách nhấp vào nút "Đăng ký" ở góc trên cùng bên phải của trang web. 
                Điền thông tin cá nhân của bạn và làm theo hướng dẫn để hoàn tất quá trình đăng ký.
              </dd>
            </div>

            <div>
              <dt class="text-lg leading-6 font-medium text-gray-900">
                Tôi có thể thay đổi hoặc hủy đơn hàng không?
              </dt>
              <dd class="mt-2 text-base text-gray-500">
                Bạn có thể thay đổi hoặc hủy đơn hàng trong vòng 24 giờ sau khi đặt hàng. Sau thời gian này, 
                vui lòng liên hệ với bộ phận chăm sóc khách hàng để được hỗ trợ.
              </dd>
            </div>
          </dl>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.rotate-180 {
  transform: rotate(180deg);
}
</style> 