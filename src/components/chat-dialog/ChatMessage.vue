<template>
  <div class="vcu-online-message">
    <span v-if="message.from === 'bot' " class="from-title from-bot"> {{ botName }} </span>
    <span v-if="message.from === 'you' " class="from-title from-human"> You </span>
    <span v-if="message.initialMessage === true" v-html="message.content"> </span>
    <span v-if="!message.initialMessage" v-html="message.content"></span>
  </div>
</template>
<script>
export default {
  name: 'ChatMessage',
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