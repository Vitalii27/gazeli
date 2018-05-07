<div class="section">
    <div class="grid grid--container">

        <div class="text-header-img">
            <div class="text-header-img__pic"><img src="<?php echo wp_get_attachment_image_url( SCF::get('about_img'), 'medium' ); ?>" alt="<?php echo SCF::get('about_title'); ?>"></div>
            <div class="text-header-img__title"><?php echo SCF::get('about_title'); ?></div>
        </div>

        <div class="text-content">
            <div class="text-columns">
            <?php echo SCF::get('about_text_one'); ?>
            </div>
            <!-- .text-columns-->
        </div>
        <!-- .text-content-->
        <div class="section-padding-bottom">
            <?php get_template_part( 'template-parts/part', 'block-advantage' ); ?>
        </div>

        <div class="text-content">
            <?php echo SCF::get('about_text_two'); ?>
        </div>


    </div>
    <!-- .grid-->

</div>
<!-- .SECTION-ABOUT-->