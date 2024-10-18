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

/**
 * Enqueue scripts and styles for Table Pricing Live Version.
 */
function yourpropfirm_pricing_table_pricing_table() {
    $enabled_pricing_table = get_option('yourpropfirm_pricing_table_enable_table_pricing');
    if ($enabled_pricing_table === '1') {
        // Get plugin URL dynamically
        $plugin_url = plugins_url( '', __FILE__ ); // Gets the URL of the plugin directory

        // Enqueue styles        
        wp_enqueue_style( 'yourpropfirm-pricing-table-font-awesome-css', 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css');
        wp_enqueue_style( 'yourpropfirm-pricing-table-swiper-bundle-css', $plugin_url . '/assets/css/swiper-bundle.min.css');
        wp_enqueue_style( 'yourpropfirm-pricing-table-tippy-css', $plugin_url . '/assets/css/tippy.css');
        wp_enqueue_style( 'yourpropfirm-pricing-table-tippy-light-css', $plugin_url . '/assets/css/tippy-light.css');
        wp_enqueue_style( 'yourpropfirm-pricing-table-plugins-css', $plugin_url . '/assets/css/yourpropfirm-pricing-table-pricing-table.css', array('yourpropfirm-pricing-table-font-awesome-css', 'yourpropfirm-pricing-table-swiper-bundle-css', 'yourpropfirm-pricing-table-tippy-css', 'yourpropfirm-pricing-table-tippy-light-css'), YOURPROPFIRM_TABLE_VERSION, 'all' );

        // Enqueue scripts        
        wp_enqueue_script( 'yourpropfirm-pricing-table-swiper-bundle-js', $plugin_url . '/assets/js/swiper-bundle.min.js', array('jquery'), null, true );
        wp_enqueue_script( 'yourpropfirm-pricing-table-popper-js', $plugin_url . '/assets/js/popper.min.js', array(), null, true );
        wp_enqueue_script( 'yourpropfirm-pricing-table-tippy-js', $plugin_url . '/assets/js/tippy-bundle.umd.min.js', array(), null, true );

        wp_enqueue_script( 'yourpropfirm-pricing-table-pricing-table-level-all-js', $plugin_url . '/assets/js/yourpropfirm-pricing-table-pricing-table-level-all.js', array('jquery', 'yourpropfirm-pricing-table-swiper-bundle-js','yourpropfirm-pricing-table-popper-js', 'yourpropfirm-pricing-table-tippy-js'), YOURPROPFIRM_TABLE_VERSION, true );
    }
}
add_action( 'wp_enqueue_scripts', 'yourpropfirm_pricing_table_pricing_table', 20);