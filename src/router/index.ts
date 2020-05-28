import Vue from 'vue'
import Router from 'vue-router'
import RecentConversations from '../pages/RecentConversations.vue'
import ConversationDetails from '../pages/ConversationDetails.vue'



Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'RecentConversations',
      component: RecentConversations
    },
    {
      path: '/conversation/:conversationId',
      name: 'ConversationDetails',
      component: ConversationDetails
    }
  ]
})