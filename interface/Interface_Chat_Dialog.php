<?php

class Interface_Chat_Dialog {

  public function __construct (){

  }
  public function init() {
    add_action('wp_footer', array($this,'add_chatbot_dialog_html') );
  }
  public function add_chatbot_dialog_html (){
        echo '<div id="wp-lex-chatbot"></div>';

}

}