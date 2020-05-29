<template>
  <div>
    <div class="card">
      <div class="card-body">
        <h5 class="card-title">{{userType}}</h5>
        <h6 class="card-subtitle mb-2 text-muted">{{conversation[0].messageTime}}</h6>
        <p>Referral Url: <a :href="conversation[0].referralURL" target="_blank">{{conversation[0].referralURL}}</a></p>
        <p v-if="isMissed"><span class="badge badge-warning">Missed</span></p>
      </div>
    </div>
    <h5 class="mt-3">Chat Transcript</h5>
    <ul class="list-group">
      <li class="list-group-item" v-for="message in conversation" :key="message.conversationId">
        <p>{{message.userType}} | <small class="text-muted">{{message.messageTime}}</small></p>
        <p v-html="message.messageText"></p>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  data (){
    return {

    }
  },
  computed: {
    isMissed() {
      const missedMessages = this.conversation.filter((message:any) => message.messageStatus === 'Missed')
      return missedMessages.length > 0
    },
    userType() {
      const userTypes = this.conversation
      .filter((message:any) => message.userType !== "VCU")
      .map((message:any) => message.userType)
      return userTypes[0]
    }
  },
  props: {
    conversation: {
      required: true,
      type: Array
    }
  }
})
</script>