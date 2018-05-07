<?php
/**
 * Add theme options page in admin menu
 */
if( function_exists('acf_add_options_page') ) {

    acf_add_options_page(array(
        'page_title' 	=> __('Theme Settings'),
        'menu_title'	=> __('Theme Settings'),
        'menu_slug' 	=> 'theme-general-settings',
        'capability'	=> 'edit_posts',
        'redirect'		=> false
    ));

    /*foreach ( pll_languages_list() as $lang ) {
        acf_add_options_sub_page(array(
            'page_title' 	=> __("Settings $lang"),
            'menu_title'	=> __("Settings $lang"),
            'menu_slug' 	=> "theme-general-settings-$lang",
            'post_id' => $lang,
            'parent' => 'theme-general-settings'
        ));
    }*/
}