<?php get_header(); ?>

<?php get_header( 'block' ); ?>

<div itemscope itemtype="http://schema.org/Service">

    <?php get_template_part( 'template-parts/section', 'hero-single-service' ); ?>

    <?php //$tax = get_the_terms( $post->ID, 'services' ); var_dump($tax[0]->term_id); ?>

    <div class="section">

        <div class="grid grid--container">
            <div class="col col--xs-12">
                <div class="text-content" itemprop="description">
                        <?php the_content(); ?>
                </div>
                <!-- .text-content-->
            </div>
        </div>
        <!-- .grid-->

    </div>
    <!-- .SECTION-TEXT-->
</div>

<?php if ( $post->ID == '34' ) { ?>
    <?php get_template_part('template-parts/section', 'price-table'); ?>
<?php } ?>

<?php if ( SCF::get('price_table') ) { ?>
    <?php get_template_part('template-parts/section', 'price-table-km'); ?>
<?php } ?>

<?php if ( SCF::get('cargo_price') ) {
    get_template_part('template-parts/section', 'cargo-table');
} ?>

<?php get_template_part('template-parts/section','svg-map'); ?>

<?php if ( SCF::get( 'service_calc' ) ) { ?>
    <?php get_template_part( 'template-parts/section', 'calc' ); ?>
<?php } ?>


<?php get_template_part( 'template-parts/section', 'advantage' ); ?>

<?php get_template_part( 'template-parts/section', 'clients' ); ?>

<?php if ( SCF::get( 'second_text' ) ) { ?>
    <div class="section section--padding-top">
        <div class="grid grid--container">
            <div class="col col--md-10 col--md-offset-1">
                <div class="text-content">
                    <?php echo SCF::get( 'second_text' ); ?>
                </div>
                <!-- .text-content-->
            </div>
        </div>
    </div>
<?php } ?>

<?php get_footer(); ?>