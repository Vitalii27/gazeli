<?php get_header(); ?>

<?php get_header( 'block' ); ?>

<?php if ( $post->ID == '82' ) {
	get_template_part( 'template-parts/content', 'carpark' );
} else { ?>

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

<?php if ( $post->ID == 79 ) {
	// Страница "О нас"
	get_template_part( 'template-parts/content', 'onas' );
} ?>

<?php get_template_part( 'template-parts/section', 'workpath' ); ?>

<!-- <div class="s-promo s-promo--thin">
	<?php //get_template_part( 'template-parts/part', 'block-promo' ); ?>
</div> -->

<?php } ?>

<?php get_footer(); ?>