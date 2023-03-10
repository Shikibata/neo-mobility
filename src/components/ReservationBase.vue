<template>

  <v-container class="my-8">
    <v-card-title class="text-h4 text-center">
      Rent a car
    </v-card-title>
  <v-form v-model="valid" @submit.prevent="insertBookings">
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
    <v-snackbar v-if="reservationConfirmed" v-model="reservationConfirmed" :timeout="3000" color="success" class="pa-md-4 mx-lg-auto">
      Reservation confirmed!
    </v-snackbar>
  </v-form>
  </v-container>

  <v-container>
    <v-table>
      <thead>
      <tr>
        <th>Car Name</th>
        <th>Start Date</th>
        <th>End Date</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="(booking, index) in bookings" :key="index">
        <td>{{ booking.carName }}</td>
        <td>{{ booking.startDate }}</td>
        <td>{{ booking.endDate }}</td>
      </tr>
      </tbody>
    </v-table>
  </v-container>

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
      reservationConfirmed: false,
      bookings: [],
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
    await this.getClients()
    await this.getCars()
    await this.getBookings()
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
          available: true,
        }))

        const { data: bookings, error: bookingError } = await supabase
            .from('bookings')
            .select('*')
            .gte('dateEnd', this.startDate)
            .lte('dateStart', this.endDate)

        if (bookings) {
          bookings.forEach(booking => {
            const bookedCar = this.cars.find(car => car.id === booking.carId)
            if (bookedCar) {
              bookedCar.available = false
            }
          })
        }
        if (bookingError) {
          console.error(bookingError)
        } else {
          bookings.forEach(booking => {
            const bookedCar = this.cars.find(car => car.id === booking.carId)
            if (bookedCar) {
              bookedCar.available = false
            }
          })
      }
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
    async getBookings() {
      const { data, error } = await supabase.from('bookings').select('*')
      if (error) {
        console.error(error)
      } else {
        const { data: cars, error: carError } = await supabase.from('cars').select('*')

        if (carError) {
          console.error(carError)
        } else {
          this.bookings = data.map(booking => {
            const car = cars.find(car => car.id === booking.carId)
            return {
              carName: car.carName,
              startDate: booking.dateStart,
              endDate: booking.dateEnd,
            }
          })
          console.log(this.bookings)
        }
      }
    },
    async insertBookings() {
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
        this.reservationConfirmed = true
        await this.getBookings();
      }
    },
  },
}
</script>
