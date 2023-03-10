<template>
  <v-container>
    <v-table>
      <thead>
      <tr>
        <th class="w-50">logs</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="log in logs" :key="log.event_message">
        <td>{{ log.event_message }}</td>
      </tr>
      </tbody>
    </v-table>
  </v-container>
</template>

<script>
import supabase from '../plugins/supabase'

export default {
  data() {
    return {
      logs: [],
      event_message: ''
    }
  },
  async mounted() {
    this.getLogs()
  },
  methods: {
    async getLogs() {
      const { data, error } = await supabase.from('edge_logs').select('*')
      if (error) {
        console.error(error)
      } else {
        this.logs = data
        console.log(data)
      }
    },
  },
}
</script>
