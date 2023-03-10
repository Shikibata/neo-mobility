<template>
<v-container class="my-16">
  <v-row>
      <v-col md="4">
        <v-card class="elevation-10">
          <v-card-title class="text-center font-weight-bold">
            Cars
          </v-card-title>
          <v-card-text class="text-center">
            View all cars and their details
          </v-card-text>
          <router-link class="text-decoration-none d-block text-center text-uppercase font-weight-bold py-2 px-4 primary white--text" to="/cars">View Cars</router-link>
        </v-card>
      </v-col>

      <v-col md="4">
        <v-card class="elevation-10">
          <v-card-title class="text-center font-weight-bold">
            Clients
          </v-card-title>
          <v-card-text class="text-center">
            View all clients and their details
          </v-card-text>
          <router-link class="text-decoration-none d-block text-center text-uppercase font-weight-bold py-2 px-4 secondary white--text" to="/clients">View Clients</router-link>
        </v-card>
      </v-col>

      <v-col md="4">
        <v-card class="elevation-10">
          <v-card-title class="text-center font-weight-bold">
            Bookings
          </v-card-title>
          <v-card-text class="text-center">
            View all bookings and their details
          </v-card-text>
          <router-link class="text-decoration-none d-block text-center text-uppercase font-weight-bold py-2 px-4 primary white--text" to="/booking">View Bookings</router-link>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<style>
.primary {
  background-color: #37bf45;
}

.secondary {
  background-color: #99e73e;
}

</style>
