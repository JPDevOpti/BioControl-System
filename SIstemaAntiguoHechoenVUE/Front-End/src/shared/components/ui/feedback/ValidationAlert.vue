<template>
  <div ref="alertContainerRef" tabindex="-1" role="alert" aria-live="assertive">
    <Notification
      :visible="visible"
      type="error"
      :title="title"
      :message="message"
      :inline="true"
      :auto-close="false"
      @close="$emit('close')"
      class="w-full col-span-full"
    >
    <template #content>
      <div class="w-full mt-3">
        <ul class="w-full list-disc list-inside space-y-2 text-sm text-red-700">
          <li v-for="error in errors" :key="error" class="text-red-700 break-words">
            {{ error }}
          </li>
        </ul>
      </div>
    </template>
  </Notification>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, onMounted } from 'vue'
import Notification from './Notification.vue'

const alertContainerRef = ref<HTMLElement | null>(null)

defineExpose({
  get $el() {
    return alertContainerRef.value
  }
})

interface Props {
  visible: boolean
  errors: string[]
  title?: string
}

const props = withDefaults(defineProps<Props>(), {
  title: 'Por favor corrija los siguientes errores:'
})

const emit = defineEmits<{
  close: []
}>()

const message = computed(() => {
  if (props.errors.length === 0) return ''
  if (props.errors.length === 1) return ''
  return `${props.errors.length} errores encontrados`
})
</script>

