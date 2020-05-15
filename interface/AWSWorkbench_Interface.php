<?php

if ( ! defined( 'ABSPATH' ) ) {
	die( '-1' );
}

require_once dirname(__FILE__) . '/AWSWorkbench_Interface_Builder_Base.php';
require_once dirname(__FILE__) . '/AWSWorkbench_Interface_Builder_MainMenu.php';
require_once dirname(__FILE__) . '/Interface_Chat_Dialog.php';

class AWSWorkbench_Interface {

  public function __construct () {

  }

  public function init () {

    $main_menu = new AWSWorkbench_Interface_MainMenu('WP Lex Chatbot', 'wp-lex-chatbot', 'top-level', '');
    $main_menu->init();

    $chat_dialog = new Interface_Chat_Dialog();
    $chat_dialog->init();

    // The main interface class will always bootstrap the js and css resources
    add_action('admin_enqueue_scripts', array($this, 'bootstrap_admin_app') );
    add_action('init', array($this, 'bootstrap_frontend_app') );
  }

  public function bootstrap_admin_app ($hook) {
    $hooks = array(
      'toplevel_page_wp-lex-chatbot',
    );
    if (in_array($hook, $hooks)){
      wp_enqueue_style('bootstrap-css', plugins_url('/assets/bootstrap.min.css', dirname(__FILE__) ), array());
      wp_enqueue_style('aws-workbench-css', plugins_url('/assets/aws-workbench.css', dirname(__FILE__) ), array());
      wp_enqueue_script('bootstrap-js',  plugins_url('/assets/bootstrap.min.js', dirname(__FILE__) ), array('jquery'), false, true );
      wp_enqueue_script('aws-workbench', plugins_url('/dist/main.js', dirname(__FILE__) ), array(), false, true );
      wp_localize_script('aws-workbench', 'AWS_WORKBENCH', array('rest_nonce'=> wp_create_nonce('wp_rest')));
    }
  }

  public function bootstrap_frontend_app ($hook) {
      wp_enqueue_script('chatbot-ui', plugins_url('/dist/frontend.js', dirname(__FILE__) ), array(), false, true );
  }



}