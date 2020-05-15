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

define('AWS_WORKBENCH_DIR', dirname(__FILE__) );

require_once dirname(__FILE__) . '/AWSWorkbench_Main.php';
require_once dirname(__FILE__) . '/interface/Interface_Chat_Dialog.php';

// Initialize main class which registers clients for other services
$AWSWorkbench_Main = new AWSWorkbench_Main();
$AWSWorkbench_Main->init(__FILE__);

?>
