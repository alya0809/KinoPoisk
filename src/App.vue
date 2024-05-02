 <template>
  <v-app>
    <v-app-bar :elevation="0" app color="#1E3046">
      <template v-slot:prepend>
        <v-toolbar-title>
          <router-link to="/" class="router">
            <img src="./components/img/fut.png" alt="Логотип" class="logo">
          </router-link>
        </v-toolbar-title>
      </template>
      <v-btn><router-link to="/favorites" class="router">Избранное</router-link></v-btn>
      <v-btn><router-link to="/my_ratings" class="router">Мои оценки</router-link></v-btn>
    </v-app-bar>
    <v-main> 
      <router-view></router-view>
    </v-main>
    <v-footer color="#1E3046">
      <v-row justify="center" no-gutters>
        <v-col class="text-center mt-4" cols="12">
          {{ new Date().getFullYear() }} — <strong>ПоисКино</strong>
        </v-col>
      </v-row>
    </v-footer>
  </v-app>
 </template>
    
<script>

</script>

<style lang="scss" scoped>

</style>