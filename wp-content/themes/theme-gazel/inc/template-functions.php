<?php
/**
 * Functions which enhance the theme by hooking into WordPress
 *
 * @package base
 */

/*
 * --- Вырезаем image у Yoast Seo
*/

add_filter( 'wpseo_xml_sitemap_img', '__return_false' );

/**
 * Create Options page (Smart Custom Fields Plugin)
 */
if ( class_exists( 'SCF' ) ) {
  SCF::add_options_page( 'Поля сайта', 'Поля сайта', 'administrator', 'siteoptions', '', '25' );
  SCF::add_options_page( 'Коды', 'Коды', 'administrator', 'sitescripts', '', '26' );
  SCF::add_options_page( 'Клиенты', 'Клиенты', 'administrator', 'clients', '', '7' );
}

/**
 * Add site url to hash links in wp_nav_menu on all pages exception front page
 */
add_filter( 'nav_menu_link_attributes', 'special_nav_link', 10, 2 );
function special_nav_link( $atts, $item ) {
  if ( ! is_front_page() ) {
    $href = $atts['href'];
    $site_url = site_url() . '/';
    $atts['href'] = preg_replace('/(^#)/', $site_url . '#' , $href);
  }
  return $atts;
}

/**
 * Register AJAX
 */
add_action( 'wp_enqueue_scripts', 'myajax_data', 99 );

function myajax_data(){
  wp_localize_script( 'app-js', 'myajax',
    array(
      'url' => admin_url('admin-ajax.php'),
      'nonce' => wp_create_nonce('myajax-nonce'),
    )
  );
};

/**
 * Hook function for AJAX
 */
add_action('wp_ajax_mail_handler', 'mail_handler');
add_action('wp_ajax_nopriv_mail_handler', 'mail_handler');

include 'form-handler.php';


/**
 * Получаем нужные посты
 */
function get_content ( $post_type, $posts_per_page, $cat_id = '', $order = 'DESC' ) {

    $args = array(
      'post_type'   => $post_type, // Post type
      'order' => $order, // Order
      // 'orderby' => 'date', // Order by
      'posts_per_page' => $posts_per_page, // Posts per page
      'cat' => $cat_id, // Category
    );

    $query = new WP_Query( $args );
    return $query;
};


/**
 * Получаем нужные посты в таксономии
 */
function get_content_tax( $post_type, $tax_name = '', $cat_id = '', $order = 'DESC', $posts_per_page = '' ) {

    $args = array(
      'post_type' => $post_type, // Post type
      'order' => $order, // Order
      // 'orderby' => 'date', // Order by
      'posts_per_page' => $posts_per_page, // Posts per page
      'tax_query' => array(
        array(
          'taxonomy' => $tax_name,
          'field'    => 'id',
          'terms'    => array( $cat_id )
        )
      )
    );

    $query = new WP_Query( $args );
    return $query;
};


// Вычисляем цену
function price($post_id, $km, $method, $correction, $term_id, $show_two_way) {
  // $post_id = post ID
  // $km = километров от МКАД
  // $method = дорога в одну или в две стороны
  // $correction = цена км для заданного региона
  // $term_id = term ID
  // $show_two_way = показывать туда-обратно

  $post = get_post($post_id);
  $price_hour = get_post_meta($post_id,'price_hour',true);
  $min_worktime = get_post_meta($post_id,'min_worktime',true);
  $km_price_value = SCF::get_option_meta( 'siteoptions', 'km_price' );
  $regions = get_post_meta($post_id,'region',false);
  $corrections = get_post_meta($post_id,'correction',false);

  $price_total = [];

  if ( $method ) {
      // туда
      $km_price = (int)$km * (int)$km_price_value;
    } else {
      // туда-обратно
      $km_price = (int)$km * ( (int)$km_price_value * 2 );
    }

  $price = ( (int)$price_hour * (int)$min_worktime ) + $km_price;
  $price_total[] = (floor($price/100))*100;

  for ( $i = 0; $i < count($regions); $i++ ) {
    if ( $regions[$i] == $term_id ) {
      $correct = explode(',',$corrections[$i]);

      $price_to = $km * $correct[0];
      $price_from = $km * $correct[1];

      $price_to_floor = (floor($price_to/100))*100;
      $price_from_floor = (floor($price_from/100))*100;

      if ( $correction && $show_two_way) {
        $price_correction[] = $price_to_floor;
        $price_correction[] = $price_from_floor;
      }

      if ( $correction && ! $show_two_way ) {
        $price_correction[] = $price_to_floor;
      }

    }
  }

  if ( $correction ) {
    return $price_correction;
  } else {
    return $price_total;
  }

};

function hours($km, $time_type) {
  if ( $time_type ) {
    $hours = ceil($km/60);
  } else {
    $hours = ceil( ceil($km/60) / 24 );
  }

  return $hours;
};