<script setup>
import { useAuthStore } from '@/stores/auth';
import { reactive, ref } from 'vue';

const authStore = useAuthStore();

const formData = reactive({
  username: '',
  email: '',
  password: ''
});


</script>

<template>
  <div>
    <main>
      <h1 class="title">Đăng ký tài khoản mới</h1>
      <form @submit.prevent="()=>{authStore.authenticate('register', formData)}" class="w-1/2 mx-auto space-y-6">
        <div>
          <label for="username">Tên đăng nhập:</label>
          <input type="text" id="username" v-model="formData.username" />
        </div>
        <div>
          <label for="email">Email:</label>
          <input type="email" id="email" v-model="formData.email" />
        </div>
        <div>
          <label for="password">Mật khẩu:</label>
          <input type="password" id="password" v-model="formData.password" />
        </div>
        <button type="submit" class="primary-btn">Đăng ký</button>
      </form>
    </main>
  </div>
</template>
