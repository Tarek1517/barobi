<script setup>
import { ref, watch } from 'vue';

const props = defineProps({
    isOpen: {
        type: Boolean,
        required: true,
    },
    booking: {
        type: Object,
        default: null,
    },
    isLoading: {
        type: Boolean,
        default: false,
    },
});

const emit = defineEmits(['close', 'submit']);

const rating = ref(0);
const hoverRating = ref(0);
const comment = ref('');

// Reset form when modal opens
watch(() => props.isOpen, (newVal) => {
    if (newVal) {
        rating.value = 0;
        hoverRating.value = 0;
        comment.value = '';
    }
});

const setRating = (val) => {
    rating.value = val;
};

const handleSubmit = () => {
    if (rating.value === 0) {
        alert('Please select a rating');
        return;
    }

    emit('submit', {
        rating: rating.value,
        comment: comment.value,
        booking_id: props.booking?.id,
    });
};
</script>

<template>
    <Teleport to="body">
        <div v-if="isOpen" class="fixed inset-0 z-[9999] flex items-center justify-center overflow-y-auto" role="dialog"
            aria-modal="true" aria-labelledby="modal-title">
            <!-- Backdrop -->
            <div class="fixed inset-0 bg-black/50" aria-hidden="true" @click="$emit('close')"></div>

            <!-- Modal container -->
            <div
                class="relative bg-white rounded-xl shadow-xl w-full max-w-lg mx-4 sm:mx-0 transform transition-all sm:align-middle">
                <!-- Header & content -->
                <div class="px-6 pt-6 pb-4">
                    <h3 id="modal-title" class="text-lg font-medium text-gray-900">
                        Leave Feedback
                    </h3>
                    <p class="text-sm text-gray-500 mt-2 mb-4">
                        How was your stay at
                        <span class="font-semibold text-gray-700">{{ booking?.accommodation?.title }}</span>?
                    </p>

                    <!-- Star Rating -->
                    <div class="flex gap-2 mb-6">
                        <button v-for="star in 5" :key="star" type="button"
                            class="focus:outline-none transition-transform hover:scale-110" @click="setRating(star)"
                            @mouseenter="hoverRating = star" @mouseleave="hoverRating = 0">
                            <Icon :name="star <= (hoverRating || rating) ? 'mdi:star' : 'mdi:star-outline'"
                                class="w-8 h-8"
                                :class="star <= (hoverRating || rating) ? 'text-yellow-400' : 'text-gray-300'" />
                        </button>
                    </div>

                    <!-- Comment -->
                    <div>
                        <label for="comment" class="block text-sm font-medium text-gray-700 mb-1">
                            Comment
                        </label>
                        <textarea id="comment" v-model="comment" rows="4" placeholder="Share your experience..."
                            class="mt-1 block w-full border border-gray-300 rounded-md p-2 shadow-sm focus:ring-primary focus:border-primary text-sm"></textarea>
                    </div>
                </div>

                <!-- Footer -->
                <div class="px-6 py-4 bg-gray-50 flex flex-col sm:flex-row-reverse gap-3">
                    <button type="button"
                        class="w-full sm:w-auto inline-flex justify-center rounded-md border border-transparent px-4 py-2 bg-primary text-white font-medium shadow-sm hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                        :disabled="isLoading" @click="handleSubmit">
                        <span v-if="isLoading">Submitting...</span>
                        <span v-else>Submit Feedback</span>
                    </button>

                    <button type="button"
                        class="w-full sm:w-auto inline-flex justify-center rounded-md border border-gray-300 px-4 py-2 bg-white text-gray-700 font-medium shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                        @click="$emit('close')">
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    </Teleport>
</template>
