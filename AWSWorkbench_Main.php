<?php

if ( ! defined( 'ABSPATH' ) ) {
	die( '-1' );
}

require_once dirname(__FILE__) . '/interface/AWSWorkbench_Interface.php';

class AWSWorkbench_Main {

  public function __construct () {

  }

  public function init ($file) {
    $AWS_INTERFACE = new AWSWorkbench_Interface();
    $AWS_INTERFACE->init();
  }

}