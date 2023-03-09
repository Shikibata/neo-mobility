<template>
  <v-container fluid full-width full-height class="absolute-fill pa-0">
    <v-img
        src="https://www.lamborghini.com/sites/it-en/files/DAM/lamborghini/facelift_2019/model_detail/augmented-reality/aventador/svj/11_17/ar_aventador_svj_m.png"
        :aspect-ratio="16/9"
    ></v-img>
  </v-container>
  <v-container>
    <Reservation />
  </v-container>
</template>

<script setup>
import Reservation from '@/components/ReservationBase.vue'
</script>

