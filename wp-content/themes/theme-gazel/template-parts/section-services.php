<div class="s-service" id="services">

    <div class="s-service__part">
        <div class="grid grid--container">
            <?php if (is_front_page()) { ?>
                <div class="b-title">Наши услуги</div>
            <?php } ?>

            <div class="prime-services row row--sm-center">

                <?php // если страница Главная
                if (is_front_page()) { ?>
                    <?php $services_tax_2 = get_content_tax('service', 'services', 2, 'ASC', 4); ?>

                    <?php if ($services_tax_2->have_posts()) : $i = 0;
                        while ($services_tax_2->have_posts()) : $services_tax_2->the_post(); ?>

                            <?php if ($i == 2) { ?>
                                <div class="prime-services__spacer"></div>
                            <?php } ?>

                            <div class="prime-services__item">
                                <a class="b-service" href="<?php the_permalink(); ?>">
                                    <div class="b-service__img"
                                         style="background-image:url(<?php echo wp_get_attachment_image_url(SCF::get('service_img'), 'medium'); ?>);"></div>
                                    <div class="b-service__title"><?php echo SCF::get('service_title'); ?></div>
                                </a>
                                <!-- .b-service-->
                            </div>
                            <!-- .prime-services__item-->

                            <?php $i++; endwhile; endif;
                    wp_reset_postdata(); ?>

                <? } else { ?>
                    <?php
                    $services_tax_2 = get_posts(array(
                        'post_type' => 'service',
                        'numberposts' => 4,
                        'orderby' => 'post__in',
                        'include' => '34, 39, 38, 40'
                    ));
                    ?>
                    <div class="service-cards row">
                        <?php foreach ($services_tax_2 as $post) {
                            setup_postdata($post); ?>

                            <div class="col col--lg-3 col--sm-6 col--md-flex">
                                <div class="service-card service-card--thin">
                                    <a href="<?php the_permalink(); ?>">
                                        <div class="service-card__img"
                                             style="background-image:url(<?php echo the_post_thumbnail_url('medium'); ?>);">
                                        </div>
                                        <div class="service-card__body">
                                            <div class="service-card__name"><?php the_title(); ?></div>
                                        </div>
                                        <div class="service-card__footer"><a
                                                    class="service-card__link button button--round button--base"
                                                    href="<?php the_permalink(); ?>">Подробнее</a></div>
                                    </a>
                                </div>
                                <!-- .service-card-->
                            </div>
                            <!-- .col-->

                        <?php }
                        wp_reset_postdata(); ?>
                    </div>
                <?php } ?>

            </div>
            <!-- .prime-services-->
        </div>
        <!-- .grid-->
    </div>
    <!-- .s-service__part-->

    <div class="s-service__part">
        <div class="grid grid--container">
            <div class="b-title">Переезды</div>
            <div class="service-cards row">
                <?php $services_tax_3 = get_content_tax('service', 'services', 3, 'ASC', 3); ?>

                <?php if ($services_tax_3->have_posts()) : while ($services_tax_3->have_posts()) : $services_tax_3->the_post(); ?>

                    <div class="col col--md-4 col--md-flex">
                        <div class="service-card">
                            <a href="<?php the_permalink(); ?>">
                                <div class="service-card__img"
                                     style="background-image:url(<?php echo wp_get_attachment_image_url(SCF::get('service_img'), 'medium'); ?>);">
                                    <div class="service-card__price hexagon"
                                         style="background-image:url(<?php echo get_stylesheet_directory_uri(); ?>/assets/img/icons/icon-service-<?php echo $post->post_name; ?>.png);">
                                        <div class="hexagon__one">
                                            <div class="hexagon__two"></div>
                                        </div>
                                    </div>
                                </div>
                                <div class="service-card__body">
                                    <div class="service-card__name"><?php the_title(); ?></div>
                                </div>
                                <div class="service-card__footer"><a
                                            class="service-card__link button button--round button--base"
                                            href="<?php the_permalink(); ?>">Подробнее</a></div>
                            </a>
                        </div>
                        <!-- .service-card-->
                    </div>
                    <!-- .col-->

                <?php endwhile; endif;
                wp_reset_postdata(); ?>

            </div>
        </div>
        <!-- .grid-->
    </div>
    <!-- .s-service__part-->

    <div class="s-service__promo">Выезд оценщика переезда - бесплатно!</div>

    <div class="s-service__part">
        <div class="grid grid--container">
            <div class="b-title">Погрузочно-разгрузочные работы</div>
            <div class="service-cards row">
                <?php $services_tax_4 = get_content_tax('service', 'services', 4, 'ASC', 3); ?>

                <?php if ($services_tax_4->have_posts()) : while ($services_tax_4->have_posts()) : $services_tax_4->the_post(); ?>

                    <div class="col col--md-4 col--md-flex">
                        <div class="service-card">
                            <a href="<?php the_permalink(); ?>">
                                <div class="service-card__img"
                                     style="background-image:url(<?php echo wp_get_attachment_image_url(SCF::get('service_img'), 'medium'); ?>);">
                                    <div class="service-card__price hexagon"
                                         style="background-image:url(<?php echo get_stylesheet_directory_uri(); ?>/assets/img/icons/icon-service-<?php echo $post->post_name; ?>.png);">
                                        <div class="hexagon__one">
                                            <div class="hexagon__two"></div>
                                        </div>
                                    </div>
                                </div>
                                <div class="service-card__body">
                                    <div class="service-card__name"><?php the_title(); ?></div>
                                </div>
                                <div class="service-card__footer"><a
                                            class="service-card__link button button--round button--base"
                                            href="<?php the_permalink(); ?>">Подробнее</a></div>
                            </a>
                        </div>
                        <!-- .service-card-->
                    </div>
                    <!-- .col-->

                <?php endwhile; endif;
                wp_reset_postdata(); ?>

            </div>

            <?php if (have_rows('gallery_elem')): ?>
                <div class="car-slider">
                    <div class="b-title">Автомобили для грузоперевозок</div>
                    <div class="car-slider__body">

                        <?php while (have_rows('gallery_elem')): the_row(); ?>
                            <div class="car-slider__elem">
                                <?php if (get_sub_field('gallery_image')): ?>
                                <div class="car-slider__img-block">
                                    <img class="car-slider__img"
                                         src="<?php the_sub_field('gallery_image') ?>"
                                         alt="img">
                                </div>
                                <?php endif; ?>
                                <?php if (get_sub_field('gallery_name')): ?>
                                <div class="car-slider__name"><?php the_sub_field('gallery_name') ?></div>
                                <?php endif; ?>
                                <?php the_sub_field('gallery_desc') ?>
                                <a class="car-slider__link service-card__link button button--round button--base"
                                   href="http://perevozki-na-gazeli/avtopark">Подробнее</a>
                            </div>



                        <?php endwhile; ?>

                    </div>
                </div>
            <?php endif; ?>
        </div>


        <!-- .grid-->
    </div>

    <!-- .s-service__part-->

</div>
<!-- .SECTION-SERVICE-->