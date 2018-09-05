(function(Vue) {


    Vue.component('ChatMessage', {
        props: ['message'],
        template: `
        <div class="vcu-online-message">
        <span v-if="message.from === 'bot' " class="from-title from-bot"> Online@VCU </span>
        <span v-if="message.from === 'you' " class="from-title from-human"> You </span>
        <span v-if="message.initialMessage === true" v-html="message.content"> </span>
        <span v-if="!message.initialMessage" v-html="message.content"></span>
        </div>
        `
    })


    let virtualAssistant = new Vue({
        el: '#vcu-online-virtual-assistant',
        data () {
            return {
                chatText: '',
                messages: [],
                isVisible: false,
                timestamp: null,
                userID: null,
                url: 'https://fqtjet7xb6.execute-api.us-east-1.amazonaws.com/default/lexBotIntegration',
                autoQuestions: {
                    'blackboard': 'I am having trouble with blackboard',
                    'tuitionAndFees': 'I need information about tuition and fees'
                }
            }
        },
        methods: {
            toggleVirtualAssistant: function () {
                this.isVisible = !this.isVisible
            },
            updateBotState: function (state) {
                this.botState = state
            },
            scrollChatWindow: function () {
                setTimeout(function ( ){
                    let chatWindow = document.querySelector('.vcu-online-chat-window')
                    chatWindow.scrollTop = chatWindow.scrollHeight
                }, 500)
            },
            clearChatInput: function () {
                this.chatText = ''
            },
            autoSubmitQuestion: function (question) {
                this.chatText = this.autoQuestions[question]
                this.sendTextChatMessage()
            },
            sendTextChatMessage: function ( ) {
                if (this.userID == null) {
                    this.userID = Date.now()
                }
                this.timestamp = Date.now()
                let newChat = this.chatText
                console.log(newChat)
                this.postChatMessage(newChat)
            },
            postChatMessage: function (newChat) {
                this.displayResponse(newChat,'you')
                 let body = {
                    "body-json": {
                        "timestamp": this.timestamp,
                        "body": newChat,
                        "userID": this.userID
                    }
                  }
                 fetch(this.url, {
                    method: 'POST',
                    body: JSON.stringify(body),
                    headers: new Headers({
                      'Content-Type': 'application/json'
                    })
                  }).then(res => res.json())
                  .catch(error => console.error('Error:', error))
                  .then(response => console.log('Success:', this.displayResponse(response, 'bot') ))

                this.clearChatInput()
            },
            displayResponse: function (message, from) {
                let messageObject = {
                    'from': from,
                    'content': message,
                    'time': new Date().toLocaleTimeString()
                }
                this.messages.push(messageObject)
                this.scrollChatWindow()
            }
        },
        created () {

        },
        mounted () {

        }
    })

})(Vue)