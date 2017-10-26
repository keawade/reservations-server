<template>
  <div class="reservation">
    <v-card>
      <!-- <v-card-media
        src="/static/doc-images/cards/sunshine.jpg"
        height="200px"
      >
      </v-card-media> -->
      <v-card-title primary-title>
        <div>
          <div class="headline">{{reservation.meetingName}}</div>
          <span class="grey--text">{{reservation.owner}} - {{reservation.ownerEmail}}</span>
        </div>
      </v-card-title>
      <v-card-actions>
        <!-- <v-btn flat>Share</v-btn>
        <v-btn flat color="purple">Explore</v-btn> -->
        <v-spacer></v-spacer>
        <v-btn icon @click.native="show = !show">
          <v-icon>{{ show ? 'keyboard_arrow_down' : 'keyboard_arrow_up' }}</v-icon>
        </v-btn>
      </v-card-actions>
      <v-slide-y-transition>
        <v-card-text v-show="show">
          Extra meeting details and stuff could go here.. if they wanted to.
        </v-card-text>
      </v-slide-y-transition>
    </v-card>
  </div>
</template>

<script>
export default {
  name: 'reservation',
  data () {
    return {
      title: 'Reservation',
      show: false
    }
  },
  props: ['reservation']
}
</script>