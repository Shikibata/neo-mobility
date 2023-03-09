<template>
  <div>
    <v-btn @click="getCar">Get list of cars</v-btn>
    <v-list>
      <v-list-item v-for="car in cars" :key="car.carName">
        <v-list-item-content>
          <v-list-item-title>{{ car.carName }}</v-list-item-title>
          <v-list-item-subtitle>{{ isCarReserved(car)}}</v-list-item-subtitle>        </v-list-item-content>
      </v-list-item>
    </v-list>
    <v-container>
      <v-form validate-on="submit" @submit.prevent="insertCar">
        <v-text-field v-model="carName" label="carName" />
        <v-btn type="submit" block class="mt-2">Create car</v-btn>
      </v-form>
    </v-container>
  </div>
</template>

<script>
import supabase from '../plugins/supabase.js'

export default {
  data() {
    return {
      cars: [],
      carName: '',
      bookings: [],
      booking: null,
    }
  },
  computed : {
      isCarReserved() {
        return car => {
          if (car.isReserved) {
            // Find the booking for this car and return its end date
            const booking = this.bookingsData.find(booking => booking.carId === car.id)
            console.log(booking)
            return `Booked until ${booking.dateEnd}`
          } else {
            return 'Available'
          }
        }
      }
  },
  methods: {
    async getCar() {
      const { data: carsData, error } = await supabase.from('cars').select(`*`)
      if (error) {
        console.error(error)
      } else {
        const { data: bookingsData, error: bookingsError } = await supabase.from('bookings').select('*')
        if (bookingsError) {
          console.error(bookingsError)
        } else {
          // Add isReserved and endDate properties to each car
          const cars = carsData.map(car => ({
            ...car,
            isReserved: bookingsData.some(booking => booking.carId === car.id)
          }))
          cars.forEach(car => {
            if (car.isReserved) {
              const booking = bookingsData.find(booking => booking.carId === car.id)
              car.endDate = booking.endDate
            }
          })
          this.cars = cars
          this.bookingsData = bookingsData
        }
      }
    },
    async insertCar() {
      const { data, error } = await supabase.from('cars').insert([
        { carName: this.carName },
      ])
      if (error) {
        console.error(error)
      } else {
        console.log(data)
      }
    },
  },
}
</script>
