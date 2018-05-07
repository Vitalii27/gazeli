<?php
/**
    Template Name: Страница Услуг
    Template Post Type: page
*/
?>

<?php get_header(); ?>
<?php get_header( 'block' ); ?>

<div class="page-hero" style="background-image:url(<?php the_post_thumbnail_url( 'full' ); ?>);">
    <div class="grid grid--container">
        <?php if ( function_exists('yoast_breadcrumb') ) {yoast_breadcrumb('<div class="b-crumbs">','</div>'); } ?>
        <div class="page-title"><?php the_title(); ?></div>
    </div>
    <!-- .grid-->
</div>
<!-- .page-hero-->

<?php get_template_part( 'template-parts/section', 'services' ); ?>

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

<?php get_footer(); ?>