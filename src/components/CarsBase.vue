<template>
  <div>
    <v-container>
      <v-form validate-on="submit" @submit.prevent="insertCar">
        <v-text-field v-model="carName" label="carName" />
        <v-btn type="submit" block class="mt-2">Create car</v-btn>
      </v-form>
    </v-container>

    <v-table>
      <thead>
      <tr>
        <th>Car Name</th>
        <th>Is Reserved</th>
        <th>Actions</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="car in cars" :key="car.id">
        <td>{{ car.carName }}</td>
        <td>{{ isCarReserved(car) }}</td>
        <td>
          <v-btn @click="deleteCar(car.id)">Delete</v-btn>
        </td>
      </tr>
      </tbody>
    </v-table>
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
      carCreated: false,
    }
  },
  computed : {
      isCarReserved() {
        return car => {
          if (car.isReserved) {
            const booking = this.bookingsData.find(booking => booking.carId === car.id)
            console.log(booking)
            return `Booked until ${booking.dateEnd}`
          } else {
            return 'Available'
          }
        }
      }
  },
  async mounted() {
    await this.getCar()
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
        this.carCreated = true
        await this.getCar()
      }
    },
    async deleteCar(id) {
      if (confirm('Are you sure you want to delete this car?')) {
        const { data, error } = await supabase.from('cars').delete().match({ id })
        if (error) {
          console.error(error)
        } else {
          console.log(data)
          await this.getCar()
        }
      }
    },
  },
}
</script>
