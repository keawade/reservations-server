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
      ></v-text-field>
      <v-text-field
        label="Owner Name"
        v-model="owner"
        :error-messages="ownerErrors"
        @input="$v.owner.$touch()"
        @blur="$v.owner.$touch()"
        required
      ></v-text-field>
      <v-text-field
        label="Owner E-mail"
        v-model="ownerEmail"
        :error-messages="ownerEmailErrors"
        @input="$v.ownerEmail.$touch()"
        @blur="$v.ownerEmail.$touch()"
        required
      ></v-text-field>
      <v-menu
        lazy
        :close-on-content-click="false"
        v-model="startMenu"
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
          :error-messages="startErrors"
          @input="$v.start.$touch()"
          @blur="$v.start.$touch()"
          v-model="start"
          prepend-icon="event"
          required
          readonly
        ></v-text-field>
        <v-date-picker v-model="start" no-title scrollable actions>
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
        v-model="endMenu"
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
          :error-messages="startErrors"
          @input="$v.end.$touch()"
          @blur="$v.end.$touch()"
          v-model="end"
          prepend-icon="event"
          required
          readonly
        ></v-text-field>
        <v-date-picker v-model="end" no-title scrollable actions>
          <template scope="{ save, cancel }">
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn flat color="primary" @click="cancel">Cancel</v-btn>
              <v-btn flat color="primary" @click="save">OK</v-btn>
            </v-card-actions>
          </template>
        </v-date-picker>
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
    start: { required },
    end: { required }
  },
  data () {
    return {
      disabled: false,
      meetingName: '',
      owner: '',
      ownerEmail: '',
      start: null,
      end: null,
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
    startErrors () {
      const errors = []
      if (!this.$v.start.$dirty) return errors
      !this.$v.start.required && errors.push('Start Date is required.')
      return errors
    },
    endErrors () {
      const errors = []
      if (!this.$v.end.$dirty) return errors
      !this.$v.end.required && errors.push('End Date is required.')
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
        start: this.start,
        end: this.end
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
