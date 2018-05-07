<?php
/**
 * base functions and definitions
 *
 * @link https://developer.wordpress.org/themes/basics/theme-functions/
 *
 * @package base
 */

if ( ! function_exists( 'base_setup' ) ) :
	/**
	 * Sets up theme defaults and registers support for various WordPress features.
	 *
	 * Note that this function is hooked into the after_setup_theme hook, which
	 * runs before the init hook. The init hook is too late for some features, such
	 * as indicating support for post thumbnails.
	 */
	function base_setup() {

		// Add default posts and comments RSS feed links to head.
		add_theme_support( 'automatic-feed-links' );

		/*
		 * Let WordPress manage the document title.
		 * By adding theme support, we declare that this theme does not use a
		 * hard-coded <title> tag in the document head, and expect WordPress to
		 * provide it for us.
		 */
		add_theme_support( 'title-tag' );

		/*
		 * Enable support for Post Thumbnails on posts and pages.
		 *
		 * @link https://developer.wordpress.org/themes/functionality/featured-images-post-thumbnails/
		 */
		add_theme_support( 'post-thumbnails' );

		// This theme uses wp_nav_menu() in one location.
		register_nav_menus( array(
			'menu-1' => 'Primary',
			'footer-menu' => 'Footer',
			'error-menu' => 'Page 404'
		) );

		/*
		 * Switch default core markup for search form, comment form, and comments
		 * to output valid HTML5.
		 */
		add_theme_support( 'html5', array(
			'search-form',
			'comment-form',
			'comment-list',
			'gallery',
			'caption',
		) );

		// Add theme support for selective refresh for widgets.
		add_theme_support( 'customize-selective-refresh-widgets' );

		/**
		 * Add support for core custom logo.
		 *
		 * @link https://codex.wordpress.org/Theme_Logo
		 */
		add_theme_support( 'custom-logo', array(
			'height'      => 250,
			'width'       => 250,
			'flex-width'  => true,
			'flex-height' => true,
		) );
	}
endif;
add_action( 'after_setup_theme', 'base_setup' );


/**
 * Register widget area.
 *
 * @link https://developer.wordpress.org/themes/functionality/sidebars/#registering-a-sidebar
 */
function base_widgets_init() {
	register_sidebar( array(
		'name'          => esc_html__( 'Sidebar', 'base' ),
		'id'            => 'sidebar-1',
		'description'   => esc_html__( 'Add widgets here.', 'base' ),
		'before_widget' => '<section id="%1$s" class="widget %2$s">',
		'after_widget'  => '</section>',
		'before_title'  => '<h2 class="widget-title">',
		'after_title'   => '</h2>',
	) );
}
add_action( 'widgets_init', 'base_widgets_init' );


/**
 * Enqueue scripts and styles.
 */
function base_scripts() {

	wp_enqueue_style( 'fonts-css', get_stylesheet_directory_uri() . '/assets/fonts/fonts.css' );
	wp_enqueue_style( 'lib-css', get_stylesheet_directory_uri() . '/assets/css/libs.min.css' );
	wp_enqueue_style( 'app-css', get_stylesheet_directory_uri() . '/assets/css/app.css' );
//	wp_enqueue_style( 'slick-css', get_stylesheet_directory_uri() . '/assets/js/slick/slick.css' );
//	wp_enqueue_style( 'slick-theme', get_stylesheet_directory_uri() . '/assets/js/slick/slick-theme.css' );
	wp_enqueue_style( 'app-css', get_stylesheet_directory_uri() . '/assets/css/app.css' );

	// удаляем стандартный jquery
    wp_deregister_script( 'jquery' );
//    wp_enqueue_script('jquery', 'http://code.jquery.com/jquery-1.12.0.min.js', null, false, false);
    wp_enqueue_script( 'slick-js', get_stylesheet_directory_uri() . '/assets/js/slick/slick.js', array('jquery'), false, true);
//    wp_enqueue_script('slick-js', get_template_directory_uri() . '/assets/vendors/slick/slick.js', array('jquery'), false, true);


    wp_enqueue_script( 'lib-js', get_stylesheet_directory_uri() . '/assets/js/libs.min.js', array(), null, true );
	wp_enqueue_script( 'app-js', get_stylesheet_directory_uri() . '/assets/js/app.js', array(), null, true );
//	wp_enqueue_script( 'jquery-app', get_stylesheet_directory_uri() . '/assets/js/jquery-app.js', array(), null, true );



	if ( is_singular() && comments_open() && get_option( 'thread_comments' ) ) {
		wp_enqueue_script( 'comment-reply' );
	}
}
add_action( 'wp_enqueue_scripts', 'base_scripts' );
require get_template_directory() . '/inc/option-page.php';

/**
 * Отключаем уведомления об обновлении плагинов и тем
 *
  * Отключить автообновления ядра:
  * Вставить эту строку в wp-config.php
  * define( 'AUTOMATIC_UPDATER_DISABLED', true );
 */
function remove_core_updates(){
    global $wp_version;return(object) array('last_checked'=> time(),'version_checked'=> $wp_version,);
}
// add_filter('pre_site_transient_update_core','remove_core_updates');
// add_filter('pre_site_transient_update_plugins','remove_core_updates');
// add_filter('pre_site_transient_update_themes','remove_core_updates');


/**
 * Custom template tags for this theme.
 */
require get_template_directory() . '/inc/template-tags.php';


/**
 * Functions which enhance the theme by hooking into WordPress.
 */
require get_template_directory() . '/inc/template-functions.php';


/**
 * Customizer additions.
 */
require get_template_directory() . '/inc/customizer.php';

/**
 * Custom Admin styles
 */
require get_template_directory() . '/inc/admin-styles.php';