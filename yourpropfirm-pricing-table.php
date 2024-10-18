<?php
/**
 * @link              https://yourpropfirm.com
 * @since             1.2.1
 * @package           yourpropfirm-pricing-table
 * GitHub Plugin URI: https://github.com/JMConsultingID/yourpropfirm-pricing-table
 * GitHub Branch: develop
 * @wordpress-plugin
 * Plugin Name:       YourPropfirm Pricing Table
 * Plugin URI:        https://yourpropfirm.com
 * Description:       This Plugin to Create YourPropfirm Pricing Table
 * Version:           1.2.1.0
 * Author:            YourPropfirm Team
 * Author URI:        https://yourpropfirm.com
 * License:           GPL-2.0+
 * License URI:       http://www.gnu.org/licenses/gpl-2.0.txt
 * Text Domain:       yourpropfirm-pricing-table
 * Domain Path:       /languages
 */

if ( ! defined( 'ABSPATH' ) ) {
    exit; // Exit if accessed directly.
}

define( 'YOURPROPFIRM_TABLE_VERSION', '1.2.1.0' );

if (!function_exists('is_plugin_active')) {
    include_once(ABSPATH . '/wp-admin/includes/plugin.php');
}


require plugin_dir_path( __FILE__ ) . 'inc/yourpropfirm-pricing-table-functions.php';