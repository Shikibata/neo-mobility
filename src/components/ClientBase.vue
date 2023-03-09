<template>
  <div>
    <v-btn @click="getClients">Get list of clients</v-btn>
    <v-list>
      <v-list-item v-for="client in clients" :key="client.username">{{ client.username }}</v-list-item>
    </v-list>
    <v-container>
      <v-form validate-on="submit" @submit.prevent="insertClient">
        <v-text-field v-model="username" label="Username" />
        <v-btn type="submit" block class="mt-2">Create client</v-btn>
      </v-form>
    </v-container>
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
      }
  }
}
}
</script>
