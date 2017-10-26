<template>
  <div class="Reservations">  
    <router-link to="create-reservation">
      <v-btn
        absolute
        dark
        fab
        top
        right
        color="pink"
      >
        <v-icon>add</v-icon>
      </v-btn>
    </router-link>
    <v-layout row>
      <v-flex xs12 sm6 offset-sm3 v-if="reservations.length > 0">
        <reservation v-for="reservation in reservations" :reservation="reservation"></reservation>
      </v-flex>
      <v-flex xs12 v-else>
        <v-card>
          <v-card-title primary-title>
            <div>
              <div class="headline">No Reservations Found</div>
              <span class="grey--text">Click below to make one now.</span>
            </div>
          </v-card-title>
          <v-card-actions>
            <router-link to="create-reservation"><v-btn flat color="purple">Create Reservation</v-btn></router-link>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
import Reservation from '@/components/Reservation'
export default {
  name: 'reservations',
  components: {
    Reservation
  },
  data () {
    return {
      title: 'Reservations List',
      reservations: []
    }
  },
  mounted () {
    this.$http.get('reservation')
    .then((response) => {
      console.log('response:', response)
      this.reservations = response.data
    })
    .catch((err) => {
      console.log('err', err)
    })
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
.Reservations {
  position: relative;
}
</style>
