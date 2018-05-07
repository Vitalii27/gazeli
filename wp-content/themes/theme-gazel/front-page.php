
<?php
/**
* Template Name: Home
*
* @link https://developer.wordpress.org/themes/basics/template-hierarchy/
*
* @package Daisy
*/

  get_header(); ?>
<?php get_template_part( 'template-parts/section', 'hero' ); ?>

<?php get_template_part( 'template-parts/section', 'calc' ); ?>

<?php get_template_part( 'template-parts/section', 'services' ); ?>

<div class="s-about" id="about">

    <div class="grid grid--container">
        <div class="s-about__body">
            <span class="line-circle s-about__decor"></span>
            <div class="s-about__item row">
                <div class="col col--lg-2">
                    <div class="b-title">О нас</div>
                </div>
                <div class="col col--lg-10">
                    <div class="s-about__content">
                        <div class="text-content">
                            <?php echo SCF::get_option_meta( 'siteoptions', 'front_about_one' ); ?>
                        </div>
                    </div>
                </div>
            </div>
            <!-- .s-about__item-->

            <div class="s-about__item row">
                <div class="col col--xs-12">
                    <div class="s-about__content">
                        <div class="text-content">
                            <?php echo SCF::get_option_meta( 'siteoptions', 'front_about_two' ); ?>
                            <?php get_template_part( 'template-parts/part', 'block-advantage' ); ?>
                        </div>

                    </div>
                    <!-- .s-about__content-->
                </div>
                <!-- .col-->
            </div>
            <!-- .s-about__item-->
        </div>
    </div>
    <!-- .grid-->

</div>
<!-- .SECTION-ABOUT-->

<?php get_template_part( 'template-parts/section', 'workpath' ); ?>

<?php get_template_part( 'template-parts/section', 'clients' ); ?>

<div class="section">
    <div class="grid grid--container">
        <div class="col col--md-10 col--md-offset-1">
            <div class="text-content">
                <?php the_content(); ?>
            </div>
            <!-- .text-content-->
        </div>
    </div>
</div>

<?php get_footer(); ?>