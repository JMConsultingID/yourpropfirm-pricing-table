<?php
/**
 * Plugin functions and definitions for Public.
 *
 * For additional information on potential customization options,
 * read the developers' documentation:
 *
 * @package yourpropfirm-pricing-table
 */
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