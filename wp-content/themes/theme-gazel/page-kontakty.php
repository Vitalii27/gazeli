<?php get_header(); ?>

<?php get_header( 'block' ); ?>

<div class="page-hero" style="background-image:url(<?php the_post_thumbnail_url( 'full' ); ?>);">
    <div class="grid grid--container">
		<?php if ( function_exists('yoast_breadcrumb') ) {yoast_breadcrumb('<div class="b-crumbs">','</div>'); } ?>
        <h1 class="page-title"><?php the_title(); ?></h1>
    </div>
    <!-- .grid-->
</div>
<!-- .page-hero-->

<div class="section section-colored">

    <div class="grid grid--container">
        <div class="row">
            <div class="col col--md-8 col--md-offset-2">
                <div class="text-content">
                    <?php the_content(); ?>
                </div>
                <!-- .text-content-->
            </div>
        </div>
    </div>
	<!-- .grid-->

</div>
<!-- .SECTION-TEXT-->

<div class="s-map">
    <script src="https://api-maps.yandex.ru/2.1/?lang=ru_RU" type="text/javascript"></script>
    <?php
        $coords = explode( ';', SCF::get_option_meta('siteoptions', 'map_coord') );
        $address = SCF::get_option_meta('siteoptions', 'map_address');
    ?>
    <div class="b-map" id="b-map" data-center="<?php echo $coords[0]; ?>" data-mark="<?php echo $coords[1]; ?>" data-address="<?php echo $address; ?>"></div>
</div>
<!-- .section -->

<?php get_footer(); ?>