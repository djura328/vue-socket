<template>
  <v-container grid-list-md>
    <v-layout row wrap>

      <v-flex xs12>
        <p v-if="isConnected">We're connected to the server!</p>
      </v-flex>

      <v-flex xs12>
        Message: {{status}}
      </v-flex>

      <v-flex xs10>
        <v-text-field v-model="message" solo></v-text-field>
      </v-flex>

      <v-flex xs2>
        <v-btn color="info" @click="emitEvent">Send</v-btn>
      </v-flex>

      <v-flex xs10>
        <v-layout row wrap px-2>
          <template v-for="response in responses">
            <v-flex class="xs6 text-xs-left">{{response.message}}</v-flex>
            <v-flex class="xs6 text-xs-right">{{response.user}}</v-flex>
          </template>
        </v-layout>
      </v-flex>

    </v-layout>
  </v-container>
</template>

<script>
    export default {
        props: {
          channel: {default: null}
        },
        data () {
            return {
                message: '',
                responses: [],
                /*channel:'channel1',*/
                isConnected: false,
                status:''
            }
        },
        sockets: {
            connect() {
                // Fired when the socket connects.
                this.isConnected = true;
                console.log('connect')
            },

            disconnect() {
                this.isConnected = false;
                console.log('disconnect')
            },

            // Fired when the server sends something on the "messageChannel" channel.
            statusChannel(data) {
                this.status = data
                console.log('messageChannel')
            }
        },
        created () {
            this.$options.sockets[this.channel] = (data) => {
                this.responses.push(data)
                console.log('created')
                console.log(data)
            }
        },
        methods: {
            emitEvent () {
                this.$socket.emit(this.channel, this.message)
            }
        },
        watch:{
            channel(){
                this.$options.sockets[this.channel] = (data) => {
                    this.responses.push(data)
                    console.log(data)
                }
            }
        }
    }
</script>