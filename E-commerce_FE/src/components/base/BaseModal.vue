<template>
    <TransitionRoot appear :show="true" as="template">
        <Dialog as="div" @close="handleClose" class="relative z-10">
            <!-- Backdrop -->
            <TransitionChild as="template" enter="ease-out duration-300" enter-from="opacity-0" enter-to="opacity-100"
                leave="ease-in duration-200" leave-from="opacity-100" leave-to="opacity-0">
                <div class="fixed inset-0 bg-black bg-opacity-25" />
            </TransitionChild>

            <div class="fixed inset-0 overflow-y-auto">
                <div class="flex min-h-full items-center justify-center p-4 text-center">
                    <!-- Modal panel -->
                    <TransitionChild as="template" enter="ease-out duration-300" enter-from="opacity-0 scale-95"
                        enter-to="opacity-100 scale-100" leave="ease-in duration-200" leave-from="opacity-100 scale-100"
                        leave-to="opacity-0 scale-95">
                        <DialogPanel
                            class="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                            <!-- Header -->
                            <DialogTitle as="h3" class="text-lg font-medium leading-6 text-gray-900">
                                <slot name="title"></slot>
                            </DialogTitle>

                            <!-- Content -->
                            <div class="mt-4">
                                <slot name="content"></slot>
                            </div>

                            <!-- Footer -->
                            <div class="mt-6">
                                <slot name="footer"></slot>
                            </div>
                        </DialogPanel>
                    </TransitionChild>
                </div>
            </div>
        </Dialog>
    </TransitionRoot>
</template>

<script setup>
import { Dialog, DialogPanel, DialogTitle, TransitionRoot, TransitionChild } from '@headlessui/vue';

const emit = defineEmits(['close']);

const handleClose = () => {
    emit('close');
};
</script>