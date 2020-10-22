<template>
  <div class="vcu-online-message">
    <span v-if="message.from === 'bot' " class="from-title from-bot"> {{ botName }} </span>
    <span v-if="message.from === 'you' " class="from-title from-human"> You </span>
    <vue-markdown v-if="message.initialMessage === true">{{message.content}}</vue-markdown>
    <vue-markdown v-if="!message.initialMessage">{{message.content}}</vue-markdown>
    <!-- <span v-if="message.initialMessage === true" v-html="message.content"> </span>
    <span v-if="!message.initialMessage" v-html="message.content"></span> -->
  </div>
</template>
<script>
import VueMarkdown from 'vue-markdown'
export default {
  name: 'ChatMessage',
  components: {
    VueMarkdown
  },
  props: {
    botName: {
      type: String,
      required: true
    },
    message: {
      type: Object,
      required: true
    }
  }
}
</script>