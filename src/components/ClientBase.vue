<template>
  <div>
    <v-container class="my-8">
      <v-card-title class="text-h4 text-center">
        Create a new client
      </v-card-title>
      <v-form validate-on="submit" @submit.prevent="insertClient">
        <v-text-field v-model="username" label="Username" />
        <v-btn type="submit" block class="mt-2">Create client</v-btn>
      </v-form>
    </v-container>

    <v-table class="ma-8 font-weight-bold">
      <caption class="text-h4 my-5">List of all the clients</caption>
      <thead>
      <tr>
        <th class="w-50">Username</th>
        <th class="w-50">Actions</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="client in clients" :key="client.id">
        <td>{{ client.username }}</td>
        <td>
          <v-btn @click="deleteClient(client.id)">Delete</v-btn>
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
      clients: [],
      username: '',
    }
  },
  async mounted() {
    await this.getClients()
  },
  methods: {
    async getClients() {
      const { data, error } = await supabase.from('clients').select(`*`)
      if (error) {
        console.error(error)
      } else {
        this.clients = data
        console.log(data)
      }
  },
  async insertClient() {
      const { data, error } = await supabase.from('clients').insert([
        { username: this.username },
      ])
    if (error) {
        console.error(error)
      } else {
        console.log(data)
        await this.getClients()
    }
  },
    async deleteClient(id) {
      if (confirm('Are you sure you want to delete this client?')) {
        const { data, error } = await supabase.from('clients').delete().match({ id })
        if (error) {
          console.error(error)
        } else {
          console.log(data)
          await this.getClients()
        }
      }
    },
}
}
</script>
