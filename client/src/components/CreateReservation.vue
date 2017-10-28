<template>
  <div class="create__reservation">
    <form>
      <v-text-field
        label="Meeting Name"
        v-model="meetingName"
        :error-messages="meetingNameErrors"
        :counter="20"
        @input="$v.meetingName.$touch()"
        @blur="$v.meetingName.$touch()"
        required
        prepend-icon="fa-calendar-check-o"
      ></v-text-field>
      <v-text-field
        label="Owner Name"
        v-model="owner"
        :error-messages="ownerErrors"
        @input="$v.owner.$touch()"
        @blur="$v.owner.$touch()"
        required
        prepend-icon="fa-user-o"
      ></v-text-field>
      <v-text-field
        label="Owner E-mail"
        v-model="ownerEmail"
        :error-messages="ownerEmailErrors"
        @input="$v.ownerEmail.$touch()"
        @blur="$v.ownerEmail.$touch()"
        required
        prepend-icon="fa-envelope-o"
      ></v-text-field>
      <v-menu
        lazy
        :close-on-content-click="false"
        v-model="startDateMenu"
        transition="scale-transition"
        offset-y
        full-width
        :nudge-right="40"
        max-width="290px"
        min-width="290px"
      >
        <v-text-field
          slot="activator"
          label="Start Date"
          :error-messages="startDateErrors"
          @input="$v.startDate.$touch()"
          @blur="$v.startDate.$touch()"
          v-model="startDate"
          prepend-icon="fa-calendar"
          required
          readonly
        ></v-text-field>
        <v-date-picker v-model="startDate" no-title scrollable actions>
          <template scope="{ save, cancel }">
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn flat color="primary" @click="cancel">Cancel</v-btn>
              <v-btn flat color="primary" @click="save">OK</v-btn>
            </v-card-actions>
          </template>
        </v-date-picker>
      </v-menu>
      <v-menu
        lazy
        :close-on-content-click="false"
        v-model="startTimeMenu"
        transition="scale-transition"
        offset-y
        full-width
        :nudge-right="40"
        max-width="290px"
        min-width="290px"
      >
        <v-text-field
          slot="activator"
          label="Start Time"
          :error-messages="startTimeErrors"
          @input="$v.startTime.$touch()"
          @blur="$v.startTime.$touch()"
          v-model="startTime"
          prepend-icon="fa-clock-o"
          required
          readonly
        ></v-text-field>
        <v-time-picker v-model="startTime" no-title scrollable actions>
          <template scope="{ save, cancel }">
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn flat color="primary" @click="cancel">Cancel</v-btn>
              <v-btn flat color="primary" @click="save">OK</v-btn>
            </v-card-actions>
          </template>
        </v-time-picker>
      </v-menu>
      <v-menu
        lazy
        :close-on-content-click="false"
        v-model="endDateMenu"
        transition="scale-transition"
        offset-y
        full-width
        :nudge-right="40"
        max-width="290px"
        min-width="290px"
      >
        <v-text-field
          slot="activator"
          label="End Date"
          :error-messages="endDateErrors"
          @input="$v.endDate.$touch()"
          @blur="$v.endDate.$touch()"
          v-model="endDate"
          prepend-icon="fa-calendar"
          required
          readonly
        ></v-text-field>
        <v-date-picker v-model="endDate" no-title scrollable actions>
          <template scope="{ save, cancel }">
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn flat color="primary" @click="cancel">Cancel</v-btn>
              <v-btn flat color="primary" @click="save">OK</v-btn>
            </v-card-actions>
          </template>
        </v-date-picker>
      </v-menu>
      <v-menu
        lazy
        :close-on-content-click="false"
        v-model="endTimeMenu"
        transition="scale-transition"
        offset-y
        full-width
        :nudge-right="40"
        max-width="290px"
        min-width="290px"
      >
        <v-text-field
          slot="activator"
          label="End Time"
          :error-messages="endTimeErrors"
          @input="$v.endTime.$touch()"
          @blur="$v.endTime.$touch()"
          v-model="endTime"
          prepend-icon="fa-clock-o"
          required
          readonly
        ></v-text-field>
        <v-time-picker v-model="endTime" no-title scrollable actions>
          <template scope="{ save, cancel }">
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn flat color="primary" @click="cancel">Cancel</v-btn>
              <v-btn flat color="primary" @click="save">OK</v-btn>
            </v-card-actions>
          </template>
        </v-time-picker>
      </v-menu>
      <v-btn @click="createRservation" :disabled="disabled">submit</v-btn>
    </form>
  </div>
</template>

<script>
import { validationMixin } from 'vuelidate'
import { required, maxLength, email } from 'vuelidate/lib/validators'
export default {
  name: 'CreateReservation',
  mixins: [validationMixin],
  validations: {
    meetingName: { required, maxLength: maxLength(20) },
    owner: { required },
    ownerEmail: { required, email },
    startDate: { required },
    startTime: { required },
    endDate: { required },
    endTime: { required }
  },
  data () {
    return {
      disabled: false,
      meetingName: '',
      owner: '',
      ownerEmail: '',
      startTime: null,
      startDate: null,
      endTime: null,
      endDate: null,
      startMenu: false,
      startModal: false,
      endMenu: false,
      endModal: false
    }
  },
  computed: {
    meetingNameErrors () {
      const errors = []
      if (!this.$v.meetingName.$dirty) return errors
      !this.$v.meetingName.required && errors.push('This field is required.')
      return errors
    },
    ownerErrors () {
      const errors = []
      if (!this.$v.owner.$dirty) return errors
      !this.$v.owner.required && errors.push('Item is required')
      return errors
    },
    ownerEmailErrors () {
      const errors = []
      if (!this.$v.ownerEmail.$dirty) return errors
      !this.$v.ownerEmail.email && errors.push('Must be valid e-mail')
      !this.$v.ownerEmail.required && errors.push('E-mail is required')
      return errors
    },
    startDateErrors () {
      const errors = []
      if (!this.$v.startDate.$dirty) return errors
      !this.$v.startDate.required && errors.push('Start date is required.')
      return errors
    },
    startTimeErrors () {
      const errors = []
      if (!this.$v.startTime.$dirty) return errors
      !this.$v.startTime.required && errors.push('Start time is required.')
      return errors
    },
    endDateErrors () {
      const errors = []
      if (!this.$v.endDate.$dirty) return errors
      !this.$v.endDate.required && errors.push('End date is required.')
      return errors
    },
    endTimeErrors () {
      const errors = []
      if (!this.$v.endTime.$dirty) return errors
      !this.$v.endTime.required && errors.push('End time is required.')
      return errors
    }
  },
  methods: {
    createRservation () {
      this.disabled = true
      this.$http.post('reservation', {
        meetingName: this.meetingName,
        owner: this.owner,
        ownerEmail: this.ownerEmail,
        start: `${this.startDate} ${this.startTime}`,
        end: `${this.endDate} ${this.endTime}`
      })
      .then((response) => {
        console.log('response:', response)
        // this.reservations = response.data
        this.disabled = false
      })
      .catch((err) => {
        console.log('err', err)
        this.disabled = false
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
