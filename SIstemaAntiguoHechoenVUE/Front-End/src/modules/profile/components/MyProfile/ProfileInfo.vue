<template>
  <ComponentCard title="Información Personal">
    <!-- Personal Information Grid -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
      <!-- Nombre completo -->
      <InfoCard
        icon="user"
        label="Nombre Completo"
        :value="`${user.firstName} ${user.lastName}`"
      />

      <!-- Correo electrónico -->
      <InfoCard
        icon="email"
        label="Correo Electrónico"
        :value="user.email"
      />

      <!-- Estado -->
      <InfoCard
        icon="status"
        label="Estado"
        :value="user.isActive ? 'Activo' : 'Inactivo'"
        :statusColor="user.isActive ? 'green' : 'red'"
      />

      <!-- Teléfono -->
      <InfoCard
        v-if="user.phone"
        icon="phone"
        label="Teléfono"
        :value="user.phone"
      />

      <!-- Documento -->
      <InfoCard
        v-if="user.document"
        icon="document"
        label="Documento"
        :value="`${user.documentType} ${user.document}`"
      />
    </div>

    <!-- Role Specific Information -->
    <div v-if="user.roleSpecificData && hasRoleSpecificData" class="border-t border-gray-200 pt-6">
      <h4 class="text-md font-semibold text-gray-900 mb-4">
        Información Adicional
      </h4>
      
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <InfoCard
          v-if="user.roleSpecificData.observaciones"
          icon="document"
          label="Observaciones"
          :value="user.roleSpecificData.observaciones"
        />
      </div>
    </div>
  </ComponentCard>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { UserProfile } from '../../types/userProfile.types'
import ComponentCard from '@/shared/components/layout/ComponentCard.vue'
import InfoCard from './InfoCard.vue'

interface Props {
  user: UserProfile
}

const props = defineProps<Props>()

const hasRoleSpecificData = computed(() => {
  if (!props.user.roleSpecificData) return false
  
  const data = props.user.roleSpecificData
  return !!(
    data.iniciales ||
    data.registroMedico ||
    data.observaciones
  )
})
</script>

