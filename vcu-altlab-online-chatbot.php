<?php

/**
 * The plugin bootstrap file
 *
 * This file is read by WordPress to generate the plugin information in the plugin
 * admin area. This file also includes all of the dependencies used by the plugin,
 * registers the activation and deactivation functions, and defines a function
 * that starts the plugin.
 *
 * @link              http://example.com
 * @since             1.0.0
 * @package           Plugin_Name
 *
 * @wordpress-plugin
 * Plugin Name:       VCU ALTLab Chatbot
 * Plugin URI:        http://example.com/plugin-name-uri/
 * Description:       This is a short description of what the plugin does. It's displayed in the WordPress admin area.
 * Version:           1.0.0
 * Author:            Your Name or Your Company
 * Author URI:        http://example.com/
 * License:           GPL-2.0+
 * License URI:       http://www.gnu.org/licenses/gpl-2.0.txt
 * Text Domain:       plugin-name
 * Domain Path:       /languages
 */



function vcu_altlab_chatbot_register_dependencies (){
wp_register_script('vue-js', 'https://cdn.jsdelivr.net/npm/vue/dist/vue.js', null, null, true);
wp_register_style('vcu-online-chatbot-css', plugin_dir_url(__FILE__) . '/vcu-altlab-online-chatbot.css');
wp_register_script('vcu-online-chatbot-js', plugin_dir_url(__FILE__) . '/vcu-altlab-online-chatbot.js', null, null, true);

wp_enqueue_style('vcu-online-chatbot-css');
wp_enqueue_script('vue-js');
wp_enqueue_script('vcu-online-chatbot-js');

}

add_action('init', 'vcu_altlab_chatbot_register_dependencies');


function vcu_altlab_add_chatbot (){
    if (0 == wp_get_current_user()->ID){
        echo '
        <div id="vcu-online-virtual-assistant">
        <div id="vcu-online-chat-button" @click="toggleVirtualAssistant">
            <svg fill="#FFFFFF" version="1.1" viewBox="0 0 100 100" xmlns="http
            ://www.w3.org/2000/svg">
                <path d="m85.078 12.301c-5.4102-4.543-11.699-7.918-18.477-9.9102-4.1523-1.2656-8.4375-2.0352-12.773-2.2891-2.1172-0.13281-4.2383-0.13281-6.3594 0-2.7773 0.14063-5.543 0.44141-8.2891 0.89844-5.8164 1.0508-11.414 3.0781-16.551 6-6.9102 3.7461-12.727 9.2266-16.879 15.898-5.4258 8.5273-7.1016 18.91-4.6406 28.711 1.9961 8.1445 6.5039 15.449 12.891 20.879 7.9883 6.9961 17.922 11.395 28.469 12.602 1.2617 0.070312 2.4375 0.65625 3.2461 1.6211 0.8125 0.96875 1.1875 2.2266 1.0352 3.4805 0 1.6406-0.37109 3.2695-0.57031 4.8984-0.30859 1.2109-0.375 2.4727-0.19922 3.7109 0.015625 0.35156 0.17969 0.68359 0.45312 0.91406 0.26953 0.22656 0.625 0.33203 0.97656 0.28516 1.0273-0.13281 2.0352-0.39453 3-0.78125 4.2695-1.9766 8.3164-4.3945 12.078-7.2188 8.3555-5.9023 16.238-12.438 23.59-19.551 2.5625-2.3477 4.8789-4.9492 6.9219-7.7578 4.4961-6.3672 6.9414-13.957 7-21.75 0.003906-3.4609-0.46875-6.9023-1.4102-10.23-2.3398-8.0117-7.0469-15.129-13.512-20.41zm-55.359 38.438c-2.3359 0.019531-4.4492-1.3828-5.3477-3.5391-0.89844-2.1562-0.39844-4.6445 1.2578-6.2891 1.6562-1.6484 4.1484-2.125 6.2969-1.2148 2.1523 0.91406 3.5352 3.0391 3.5039 5.375-0.03125 3.1328-2.5781 5.6602-5.7109 5.668zm20.219 0h0.003906c-2.3242-0.019531-4.4062-1.4336-5.2773-3.5859-0.875-2.1484-0.36719-4.6172 1.2812-6.25 1.6523-1.6328 4.1211-2.1133 6.2617-1.2188 2.1445 0.89844 3.5352 2.9961 3.5312 5.3164-0.03125 3.1797-2.6172 5.7461-5.7969 5.75zm20.34 0h0.003906c-2.332 0.015625-4.4375-1.3789-5.3359-3.5273-0.89844-2.1523-0.41406-4.6289 1.2305-6.2812 1.6445-1.6484 4.1211-2.1445 6.2734-1.25 2.1523 0.89062 3.5547 2.9922 3.5508 5.3203 0.003906 3.168-2.5547 5.7383-5.7188 5.75z"/>
            </svg>
            <span>Open Chat</span>
        </div>


        <div id="vcu-online-chat-bot" v-bind:class="{open: isVisible}">
        <div class="vcu-online-chat-header">
        <img src="https://online.vcu.edu/wp-content/themes/online2015/library/images/svg/online-vcu-horz-hover.svg" width="115px">
            <div class="vcu-online-chat-header-controls">
                <div id="vcu-online-minimize-button" @click="toggleVirtualAssistant">
                    <svg  version="1.1" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                        <path d="m51.242 6.4727c-24.148 0-43.727 19.578-43.727 43.727 0 24.148 19.578 43.727 43.727 43.727 24.148 0 43.727-19.578 43.727-43.727 0.003906-24.148-19.574-43.727-43.727-43.727zm21.688 45.816h-43.371v-4.1797h43.375z"/>
                    </svg>
                </div>
                <div id="vcu-online-close-button" @click="toggleVirtualAssistant">
                    <svg version="1.1" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                        <path d="m50 10c-22.109 0-40 17.883-40 40 0 22.109 17.891 40 40 40 22.117 0 40-17.891 40-40 0-22.121-17.879-40-40-40zm-15.25 23c0.074219-0.003906 0.14453-0.003906 0.21875 0 0.53906-0.003906 1.0586 0.20703 1.4375 0.59375l13.594 13.562 13.562-13.562c0.36328-0.37109 0.85547-0.58203 1.375-0.59375 0.82812-0.035156 1.5938 0.44922 1.918 1.2109 0.32812 0.76562 0.14844 1.6484-0.44922 2.2266l-13.594 13.594 13.594 13.562c0.37891 0.375 0.58984 0.88672 0.58984 1.4219 0 0.53125-0.21094 1.043-0.58984 1.4219-0.375 0.375-0.88672 0.58984-1.4219 0.58984s-1.043-0.21484-1.4219-0.58984l-13.562-13.594-13.594 13.594c-0.78516 0.78516-2.0586 0.78516-2.8438 0s-0.78516-2.0586 0-2.8438l13.562-13.562-13.562-13.594c-0.56641-0.54297-0.76562-1.3633-0.50781-2.1016 0.25391-0.73828 0.91797-1.2617 1.6953-1.3359z" fill-rule="evenodd"/>
                    </svg>
                </div>
            </div>
        </div>
        <div class="vcu-online-chat-window">
                <div class="vcu-online-message">
                        <span class="from-title from-bot"><img src="https://branding.vcu.edu/bar/academic/images/vcu-seal--gold.svg" width="75px"></span>
                        <span>
                                <p>Howdy! I\'m the Online@VCU Virtual Assistant.</p>
                                <p>In a few brief words, let we know how I can help you. If I can\'t answer, I\'ll put you in touch with someone who can.</p>
                                <p>You can also start with one of these popular topics: </p>
                                <a href="#" v-on:click="autoSubmitQuestion(\'blackboard\')">Blackboard Courses</a>
                                <br>
                                <a href="#" v-on:click="autoSubmitQuestion(\'tuitionAndFees\')">Tuition and Fees</a>
                        </span>
                </div>
            <chat-message v-for="message in messages" :message="message"></chat-message>
        </div>
        <div class="vcu-online-chat-input">
            <div class="vcu-online-input-container">
            <input type="text" v-model="chatText" v-on:keyup.enter="sendTextChatMessage" id="chat-text" placeholder="Tell us what you need" aria-label="Tell us what you need">
            <button type="button" id="send-chat" @click="sendTextChatMessage">Send</button>
            </div>
        </div>

        </div>
</div>

    ';
    }
}

add_action('wp_footer', 'vcu_altlab_add_chatbot');


?>
