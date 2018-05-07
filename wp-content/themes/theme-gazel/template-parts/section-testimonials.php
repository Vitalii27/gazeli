<div class="s-testimonials">
    <div class="grid grid--container">
        <div class="s-testimonials__body">

            <div class="line-circle s-testimonials__decor"></div>

            <div class="b-title text--sm-right">Благодарности клиентов</div>


            <div class="testimonials-slider">
                <div class="testimonials-slider__body">
                    <?php $testimonials = get_content( 'testimonial', 5, '', 'ASC' ); ?>

                    <?php if ( $testimonials->have_posts() ) : while ( $testimonials->have_posts() ) : $testimonials->the_post(); ?>

                    <div class="testimonial">
                        <div class="row">
                            <div class="col col--xl-7 col--lg-6 col--sm-align-center">
                                <div class="testimonial__text">
                                    <?php the_content(); ?>
                                </div>
                            </div>
                            <div class="col col--xl-3 col--lg-4 col--xs-8 text--xs-right col--xs-align-center">
                                <div class="testimonial__person">
                                    <div class="testimonial__name"><?php the_title(); ?></div>
                                    <div class="testimonial__position"><?php echo SCF::get('testimonial_position'); ?></div>
                                </div>
                            </div>
                            <div class="col col--xl-2 col--lg-2 col--xs-4 text--xs-right col--lg-align-top col--xs-align-center">
                                <div class="testimonial__pic hexagon" style="background-image:url(<?php the_post_thumbnail_url( 'thumbnail' ); ?>);">
                                    <div class="hexagon__one"><div class="hexagon__two"></div></div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <!-- .testimonial-->

                    <?php endwhile; endif; wp_reset_postdata(); ?>

                </div>
            </div>
            <!-- .testimonials-slider-->
        </div>
        <!-- .s-testimonials__body-->
    </div>
    <!-- .grid-->
</div>
<!-- .SECTION-TESTIMONIALS-->