<template>
  <div class="main-menu-wrapper">
    <div class="row">
      <div class="col-sm-12">
        <h3>Recent Conversations</h3>

        <table class="table">
          <thead>
            <tr>
              <td>Date</td>
              <td>User Type</td>
              <td>Total Messages</td>
              <td>Status</td>
              <td>Conversation Details</td>
            </tr>
          </thead>
          <tbody>
            <tr v-for="message in messages" :key="message.conversationId">
            <td>{{message.startTime}}</td>
            <td>{{message.userType}}</td>
            <td>{{message.messages.length}}</td>
            <td><span v-if="message.isMissed" class="badge badge-warning">Missed</span></td>
            <td><router-link :to='`/conversation/${message.conversationId}`'>View Details</router-link></td>
          </tr>
          </tbody>
        </table>
      </div>
  </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue"
import { DataService } from '../utilities/data-service'

export default Vue.extend({
  data () {
    return {
      fields: ['startTime', 'conversationId'],
      bots: [],
      bot: {},
      messages: [] as any[]
    }
  },
  name: 'MainMenu',
  methods: {

  },
  async created() {
    console.log('created')
    const response = await DataService.getConversations()
    const conversations:any = {}
      response.forEach((message:any) => {
        let conversationId = message.conversationId.toString()
        if(conversations[conversationId]) {
          conversations[conversationId].push(message)
        } else {
          conversations[conversationId] = []
          conversations[conversationId].push(message)
        }
      })
      const formattedConversations = []
      for (let conversation in conversations){
        formattedConversations.push({
          conversationId: conversation,
          startTime: new Date(parseInt(conversation)).toLocaleString(),
          messages: conversations[conversation],
          isMissed: conversations[conversation].filter((message:any) => message.messageStatus === 'Missed').length > 0 ? true : false,
          userType: conversations[conversation].filter((message:any) => message.userType !== "VCU").map((message:any) => message.userType)[0]
        })
      }
      formattedConversations
      .sort((a,b) =>  parseInt(b.conversationId) - parseInt(a.conversationId))
      this.messages = formattedConversations
  }
})
</script>

<style>

</style>
