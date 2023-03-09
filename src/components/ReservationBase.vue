<template>
  <v-form v-model="valid" @submit.prevent="submit">
    <v-row>
      <v-col cols="12">
        <v-select v-model="selectedClient" :items="clients" item-title="username" item-value="id" label="Select Client" :rules="[rules.required]" />
      </v-col>
      <v-col cols="6">
        <Datepicker v-model="startDate" :offset="5"/>
      </v-col>
      <v-col cols="6">
        <Datepicker v-model="endDate" :offset="5"/>
      </v-col>
      <v-col cols="12">
        <v-select v-model="selectedCar" :items="cars" item-title="carName" item-value="id" label="Select Car" :rules="[rules.required]" />
      </v-col>
    </v-row>
    <v-btn type="submit" :disabled="!valid">Make Reservation</v-btn>
  </v-form>
</template>

<script>
import supabase from '../plugins/supabase.js'
import Datepicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css';

export default {
  components: {
    Datepicker
  },

  data() {
    return {
      valid: false,
      startDate: null,
      endDate: null,
      selectedCar: null,
      cars: [],
      selectedClient: null,
      clients: [],
      picker: new Date().toISOString().substr(0, 10),
    }
  },
  computed: {
    rules() {
      return {
        required: value => !!value || 'Required.',
      }
    },
  },
  async created() {
    await this.getCars()
    await this.getClients()
  },
  methods: {
    async getCars() {
      const { data, error } = await supabase.from('cars').select('*')
      if (error) {
        console.error(error)
      } else {
        this.cars = data.map(car => ({
          id: car.id,
          carName: car.carName,
        }))
      }
    },

    async getClients() {
      const { data, error } = await supabase.from('clients').select('*')
      if (error) {
        console.error(error)
      } else {
        this.clients = data.map(client => ({
          id: client.id,
          username: client.username,
        }))
      }
    },

    async submit() {
      const { data: bookings, error } = await supabase.from('bookings').insert([
        {
          dateStart: this.startDate,
          dateEnd: this.endDate,
          carId: this.selectedCar,
          clientId: this.selectedClient,
        },
      ])
      if (error) {
        console.error(error)
      } else {
        console.log(bookings)
      }
    },
  },
}
</script>
