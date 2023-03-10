<template>
    <v-toolbar app>
      <v-toolbar-title>
        <router-link to="/" tag="span" style="cursor: pointer" class="hidden-xs-and-down text-decoration-none">
          <v-img src="@/assets/logo.png" alt="logo" class="flex" />
        </router-link>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items class="hidden-xs-only">
        <v-btn v-for="(item, index) in menuItems" :key="index" :to="item.path" flat>
          <v-icon left dark>{{ item.icon }}</v-icon>
          <span class="hidden-sm-and-down">{{ item.title }}</span>
        </v-btn>
      </v-toolbar-items>
    </v-toolbar>
</template>

<script>
export default {
  name: "Navbar",
  data() {
    return {
      appTitle: 'Neo Mobility',
      sidebar: false,
      menuItems: [
        { title: 'Clients', path: '/clients', icon: 'mdi-account' },
        { title: 'Cars', path: '/cars', icon: 'mdi-car' },
        { title: 'Bookings', path: '/booking', icon: 'mdi-calendar' },
        { title: 'Logs', path: '/logs', icon: 'mdi-file-document'},
      ],
    };
  },
};
</script>

<style scoped>
.v-img {
  height: 50px!important;
  width: 100px;
}
</style>
