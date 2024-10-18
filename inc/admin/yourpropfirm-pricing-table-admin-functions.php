<?php
/**
 * Plugin functions and definitions for Admin.
 *
 * For additional information on potential customization options,
 * read the developers' documentation:
 *
 * @package yourpropfirm-pricing-table
 */
function yourpropfirm_pricing_table_add_menu_page() {
    add_menu_page(
        'YPF Pricing Table', // Page title
        'YPF Pricing Table', // Menu title
        'manage_options', // Capability
        'yourpropfirm_pricing_table', // Menu slug
        'yourpropfirm_pricing_table_settings_page', // Function to display the page content
        'dashicons-screenoptions', // Icon URL
        3 // Position
    );

    add_submenu_page(
        'yourpropfirm_pricing_table', // Parent slug
        'YPF Pricing Table', // Page title
        'YPF Pricing Table', // Menu title
        'manage_options', // Capability
        'yourpropfirm_pricing_table_settings', // Menu slug
        'yourpropfirm_pricing_table_settings_page' // Function to display the page content
    );
}
add_action( 'admin_menu', 'yourpropfirm_pricing_table_add_menu_page' );


function yourpropfirm_pricing_table_settings_page() {
    ?>
    <div class="wrap">
        <h1>YourPropfirm Table Pricing Settings</h1>
        <form method="post" action="options.php">
            <?php
            settings_fields( 'yourpropfirm_pricing_table_settings_group' );
            do_settings_sections( 'yourpropfirm-pricing-table-settings' );
            submit_button( 'Generate Shortcode' );
            ?>
        </form>
    </div>
    <?php
}

// Hook for adding admin settings
add_action( 'admin_init', 'yourpropfirm_pricing_table_register_table_pricing_setting_fields' );

function yourpropfirm_pricing_table_register_table_pricing_setting_fields() {
    register_setting( 'yourpropfirm_pricing_table_settings_group', 'yourpropfirm_pricing_table_enable_table_pricing' );
    register_setting( 'yourpropfirm_pricing_table_settings_group', 'yourpropfirm_pricing_table_mode' );
    register_setting( 'yourpropfirm_pricing_table_settings_group', 'yourpropfirm_pricing_table_style' );
    register_setting( 'yourpropfirm_pricing_table_settings_group', 'yourpropfirm_pricing_table_category' );
    register_setting( 'yourpropfirm_pricing_table_settings_group', 'yourpropfirm_pricing_table_category_active' );
    register_setting( 'yourpropfirm_pricing_table_settings_group', 'yourpropfirm_pricing_table_enable_html_value' );
    register_setting( 'yourpropfirm_pricing_table_settings_group', 'yourpropfirm_pricing_table_logo_url' );
    register_setting( 'yourpropfirm_pricing_table_settings_group', 'yourpropfirm_pricing_table_tooltips' );
    register_setting( 'yourpropfirm_pricing_table_settings_group', 'yourpropfirm_pricing_table_tooltip_post_id' );

    add_settings_section(
        'yourpropfirm_pricing_table_settings_section',
        'YourPropFirm Pricing Table Settings',
        'yourpropfirm_pricing_table_settings_section_callback',
        'yourpropfirm-pricing-table-settings'
    );

    add_settings_field(
        'yourpropfirm_pricing_table_enable_table_pricing',
        'Enable Pricing Table',
        'yourpropfirm_pricing_table_enable_table_pricing_callback',
        'yourpropfirm-pricing-table-settings',
        'yourpropfirm_pricing_table_settings_section'
    );

    add_settings_field(
        'yourpropfirm_pricing_table_pricing_title_generate',
        'Generate Shortcode',
        'yourpropfirm_pricing_table_pricing_title_generate_callback',
        'yourpropfirm-pricing-table-settings',
        'yourpropfirm_pricing_table_settings_section'
    );

    add_settings_field(
        'yourpropfirm_pricing_table_mode',
        'Tab Mode',
        'yourpropfirm_pricing_table_mode_callback',
        'yourpropfirm-pricing-table-settings',
        'yourpropfirm_pricing_table_settings_section'
    );

    add_settings_field(
        'yourpropfirm_pricing_table_style',
        'Select Table Style',
        'yourpropfirm_pricing_table_style_callback',
        'yourpropfirm-pricing-table-settings',
        'yourpropfirm_pricing_table_settings_section'
    );

    add_settings_field(
        'yourpropfirm_pricing_table_category',
        'Select Product Categories',
        'yourpropfirm_pricing_table_category_callback',
        'yourpropfirm-pricing-table-settings',
        'yourpropfirm_pricing_table_settings_section'
    );

    add_settings_field(
        'yourpropfirm_pricing_table_category_active',
        'Category Active Tab (Level 2)',
        'yourpropfirm_pricing_table_category_active_callback',
        'yourpropfirm-pricing-table-settings',
        'yourpropfirm_pricing_table_settings_section'
    );

    add_settings_field(
        'yourpropfirm_pricing_table_enable_html_value',
        'Enable HTML value',
        'yourpropfirm_pricing_table_enable_html_value_callback',
        'yourpropfirm-pricing-table-settings',
        'yourpropfirm_pricing_table_settings_section'
    );

    add_settings_field(
        'yourpropfirm_pricing_table_logo_url',
        'Header Logo',
        'yourpropfirm_pricing_table_logo_url_callback',
        'yourpropfirm-pricing-table-settings',
        'yourpropfirm_pricing_table_settings_section'
    );

    add_settings_field(
        'yourpropfirm_pricing_table_tooltips',
        'Enable Tooltips Table',
        'yourpropfirm_pricing_table_tooltips_callback',
        'yourpropfirm-pricing-table-settings',
        'yourpropfirm_pricing_table_settings_section'
    );

    add_settings_field(
        'yourpropfirm_pricing_table_tooltip_post_id',
        'Tooltips Post-Id',
        'yourpropfirm_pricing_table_tooltip_post_id_callback',
        'yourpropfirm-pricing-table-settings',
        'yourpropfirm_pricing_table_settings_section'
    );

    add_settings_field(
        'yourpropfirm_pricing_table_pricing_description',
        'Shortcode',
        'yourpropfirm_pricing_table_pricing_description_callback',
        'yourpropfirm-pricing-table-settings',
        'yourpropfirm_pricing_table_settings_section'
    );
}


function yourpropfirm_pricing_table_settings_section_callback() {
    // Get the base URL of the site
    $site_url = home_url();
    // Manually append the path to the JSON file within the child theme directory
    $file_url = $site_url . '/wp-content/themes/hellotheme/inc/functions/import/acf-export-ypf-default-2024.json';
    
    echo '<p>Configure & Generate your Pricing Table settings below.</p>';
    echo '<p><strong>Download ACF Template:</strong> If you want to use a pre-built ACF template for your pricing table, you can download the JSON file from the link below and import it into your ACF settings.</p>';
    echo '<a href="' . esc_url($file_url) . '" download>Download ACF Template JSON File</a>';
}


function yourpropfirm_pricing_table_enable_table_pricing_callback() {
    $options = get_option( 'yourpropfirm_pricing_table_enable_table_pricing' );
    ?>
    <input type="checkbox" name="yourpropfirm_pricing_table_enable_table_pricing" value="1" <?php checked( 1, $options, true ); ?> />
    <?php
}

function yourpropfirm_pricing_table_pricing_title_generate_callback() {
    ?>
    <p>Generate Shortcode on your Front-End or Table Pricing Page</p>
    <?php
}

function yourpropfirm_pricing_table_mode_callback() {
    $options = get_option( 'yourpropfirm_pricing_table_mode' );
    ?>
    <select name="yourpropfirm_pricing_table_mode">
        <option value="level-1" <?php selected( $options, 'level-1' ); ?>>Tab Level 1</option>
        <option value="level-2" <?php selected( $options, 'level-2' ); ?>>Tab Level 2</option>
    </select>
    <?php
}

function yourpropfirm_pricing_table_style_callback() {
    $options = get_option( 'yourpropfirm_pricing_table_style' );
    ?>
    <select name="yourpropfirm_pricing_table_style">
        <option value="style1" <?php selected( $options, 'style1' ); ?>>Table Style 1</option>
    </select>
    <?php
}

function yourpropfirm_pricing_table_category_callback() {
    $options = get_option( 'yourpropfirm_pricing_table_category' );
    ?>
    <input type="text" id="yourpropfirm_pricing_table_category" name="yourpropfirm_pricing_table_category" value="<?php  echo esc_attr($options) ?>" placeholder="Categories slug url : 1-phase-challenge, 2-phase-challenge" />
    <?php
}

function yourpropfirm_pricing_table_category_active_callback() {
    $options = get_option( 'yourpropfirm_pricing_table_category_active' );
    ?>
    <input type="text" id="yourpropfirm_pricing_table_category_active" name="yourpropfirm_pricing_table_category_active" value="<?php  echo esc_attr($options) ?>" placeholder="Category slug url : 1-phase-challenge" />
    <?php
}

function yourpropfirm_pricing_table_enable_html_value_callback() {
    $options = get_option( 'yourpropfirm_pricing_table_enable_html_value' );
    ?>
    <select name="yourpropfirm_pricing_table_enable_html_value">
        <option value="yes" <?php selected( $options, 'yes' ); ?>>Yes</option>
        <option value="no" <?php selected( $options, 'no' ); ?>>No</option>
    </select>
    <?php
}



function yourpropfirm_pricing_table_logo_url_callback() {
    $options = get_option( 'yourpropfirm_pricing_table_logo_url' );
    ?>
    <input type="text" id="yourpropfirm_pricing_table_logo_url" name="yourpropfirm_pricing_table_logo_url" value="<?php  echo esc_attr($options) ?>" placeholder="if using text, leave it default blank" />
    <?php
}

function yourpropfirm_pricing_table_tooltips_callback() {
    $options = get_option( 'yourpropfirm_pricing_table_tooltips' );
    ?>
    <select name="yourpropfirm_pricing_table_tooltips">
        <option value="yes" <?php selected( $options, 'yes' ); ?>>Yes</option>
        <option value="no" <?php selected( $options, 'no' ); ?>>No</option>
    </select>
    <?php
}

function yourpropfirm_pricing_table_tooltip_post_id_callback() {
    $options = get_option( 'yourpropfirm_pricing_table_tooltip_post_id' );
    ?>
    <input type="text" id="yourpropfirm_pricing_table_tooltip_post_id" name="yourpropfirm_pricing_table_tooltip_post_id" value="<?php  echo esc_attr($options) ?>" placeholder="Tooltips Post ID" />
    <?php
}

function yourpropfirm_pricing_table_pricing_description_callback() {
    $mode = get_option( 'yourpropfirm_pricing_table_mode', 'level-1' );
    $style = get_option( 'yourpropfirm_pricing_table_style', 'style1' );
    $categories = get_option( 'yourpropfirm_pricing_table_category', 'origin' ); 
    $category_active = get_option( 'yourpropfirm_pricing_table_category_active', '' ); 
    $html_value = get_option( 'yourpropfirm_pricing_table_enable_html_value', 'yes' );
    $logo_url = get_option( 'yourpropfirm_pricing_table_logo_url' );
    $tooltips = get_option( 'yourpropfirm_pricing_table_tooltips', 'no' ); 
    $tooltips_post_id = get_option( 'yourpropfirm_pricing_table_tooltip_post_id', '16787' ); 


    if ($mode === 'level-1'){
        $shortcode_tag = 'yourpropfirm_table_level_1';
    } else {
        $shortcode_tag = 'yourpropfirm_table_level_2';
    }
    ?>
    <p>Use this shortcode on your Front-End or Table Pricing Page : <br/>
    <code>
        [<?php echo esc_attr( $shortcode_tag ); ?> tab_mode='<?php echo esc_attr( $mode ); ?>' style='<?php echo esc_attr( $style ); ?>' category='<?php echo esc_attr( $categories ); ?>' category_active='<?php echo esc_attr( $category_active ); ?>' html_value='<?php echo esc_attr( $html_value ); ?>' tooltips='<?php echo esc_attr( $tooltips ); ?>' tooltips_post_id='<?php echo esc_attr( $tooltips_post_id ); ?>' logo_url='<?php echo esc_attr( $logo_url ); ?>' ]
    </code>
    </p>
    <?php
}