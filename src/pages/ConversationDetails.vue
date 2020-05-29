<template>
  <div>
    <h3>Conversation Details</h3>
    <conversation :conversation="conversation"></conversation>
  </div>

</template>

<script lang="ts">
import Vue from 'vue'
import Conversation from '../components/Conversation.vue'
import { DataService } from '../utilities/data-service'
export default Vue.extend({
  data () {
    return {
      conversation: [] as any[]
    }
  },
  components: {
    Conversation
  },
  computed: {
  },
  beforeRouteUpdate(to, from, next) {
    console.log(to)
    console.log('Updating route', this)
    next()
  },
  updated () {
    console.log('Component updated')
  },
  async created () {
    this.conversation = await DataService.getConversationById(this.$route.params.conversationId)
    if(this.conversation.length > 0) {
      this.conversation.sort((a:any, b:any) => a.messageDateTime - b.messageDateTime)
    }

    this.conversation = this.conversation.map(message => {
      message.messageTime = new Date(message.messageDateTime).toLocaleString()
      return message
    })
  }
})
</script>