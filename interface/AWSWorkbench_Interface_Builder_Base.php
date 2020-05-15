<?php

if ( ! defined( 'ABSPATH' ) ) {
	die( '-1' );
}

class AWSWorkbench_Interface_Base {
  public $MENU_PAGE_SLUG;
  public $MENU_PAGE_TYPE;
  public $MENU_PAGE_NAME;
  public function __construct ($MENU_PAGE_NAME, $MENU_PAGE_SLUG, $MENU_PAGE_TYPE, $HASH = null) {
    $this->MENU_PAGE_NAME = $MENU_PAGE_NAME;
    $this->MENU_PAGE_SLUG = $MENU_PAGE_SLUG;
    $this->MENU_PAGE_TYPE = $MENU_PAGE_TYPE;
    $this->HASH = $HASH;
  }

  public function init () {
    add_action( 'admin_menu', array($this, 'create_menu') );
  }

  public function create_menu () {
    if ($this->MENU_PAGE_TYPE === 'top-level'){
      add_menu_page(
        __( $this->MENU_PAGE_NAME, 'textdomain' ),
        $this->MENU_PAGE_NAME,
        'manage_options',
        $this->MENU_PAGE_SLUG . $this->HASH,
        array($this, 'render_admin_menu_page'),
        'dashicons-format-status',
        6
      );
    } else {
      add_submenu_page(
        'aws-workbench',
        __( $this->MENU_PAGE_NAME, 'textdomain' ),
        $this->MENU_PAGE_NAME,
        'manage_options',
        $this->MENU_PAGE_SLUG . $this->HASH,
        array($this, 'render_admin_menu_page')
      );
    }
  }
  public function render_admin_menu_page () {
    include AWS_WORKBENCH_DIR . '/views/' . $this->MENU_PAGE_SLUG . '.php';
  }

}