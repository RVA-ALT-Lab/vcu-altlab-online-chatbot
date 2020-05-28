<template>
  <div class="main-menu-wrapper">
    <div class="row">
      <div class="col-md-6">
        <h3>Main Menu</h3>
        <div v-for="(messages, key) in conversations" :key="key">
          {{key}}
        </div>
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
      bots: [],
      bot: {},
      messages: []
    }
  },
  computed: {
    conversations () {
      const conversations:any = {}
      this.messages.forEach((message:any) => {
        console.log(message)
        let conversationId = message.conversationId.toString()
        console.log(conversations)
        if(conversations[conversationId]) {
          conversations[conversationId].push(message)
        } else {
          conversations[conversationId] = []
        }
      })
      const formattedConversations = []
      for (let conversation in conversations){
        formattedConversations.push({
          conversationId: conversation,
          startTime: new Date(parseInt(conversation)).toLocaleString(),
          messages: conversations[conversation]
        })
      }
      return formattedConversations
    }
  },
  name: 'MainMenu',
  methods: {

  },
  async created() {
    this.messages = await DataService.getConversations()
  }
})
</script>

<style>

</style>
