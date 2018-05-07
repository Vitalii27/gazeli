<div class="page-hero page-hero--big" style="background-image:url(<?php the_post_thumbnail_url( 'full' ); ?>);">

    <div class="grid grid--container">
        <?php if ( function_exists('yoast_breadcrumb') ) {yoast_breadcrumb('<div class="b-crumbs">','</div>'); } ?>

        <h1 class="page-title">Автопарк</h1>
    </div>
    <!-- .grid-->

</div>
<!-- .page-hero-->

<?php $tabs = array(
    array( 'name' => 'Все машины до 1.5 тонн', 'control' => 'all' ),
    array( 'name' => 'Обычная', 'control' => 'ordinary' ),
    array( 'name' => 'Удлиненная', 'control' => 'long' ),
    array( 'name' => 'Газель Евротент', 'control' => 'euro' )
); ?>

<div class="s-park">
    <div class="grid grid--container">
        <div class="b-par" id="car-tabs">
            <ul class="b-park__tabs park-tabs">
                <?php $i = 0; foreach ( $tabs as $tab ) { ?>
                    <?php if ( $i == 0 ) { ?>
                        <li class="park-tabs__item active" data-tab-control data-filter="<?php echo $tab['control']; ?>"><?php echo $tab['name']; ?></li>
                    <?php } else { ?>
                        <li class="park-tabs__item" data-tab-control data-filter="<?php echo $tab['control']; ?>"><?php echo $tab['name']; ?></li>
                    <?php } ?>
                <?php $i++; } ?>
            </ul>

            <?php $cars = get_content( 'carpark', 20, '', 'ASC' ); ?>

            <?php if ( $cars->have_posts() ) : while ( $cars->have_posts() ) : $cars->the_post(); ?>
                <?php $types=''; foreach ( SCF::get('car_type') as $type ) {
                    $types .= $type.' ';
                } ?>

            <div class="b-car all <?php echo $types; ?>" data-tab>
                <div class="b-car__title"><?php the_title(); ?></div>
                <div class="b-car__row row">

                    <div class="col col--lg-3 col--md-6">
                        <div class="b-car__img">
                            <?php echo get_the_post_thumbnail( null, 'medium' ); ?>
                            <!-- <img src="<?php the_post_thumbnail_url( 'medium' ); ?>" alt=""> -->
                        </div>
                    </div>
                    <!-- .col-->

                    <div class="col col--lg-3 col--md-6">
                        <div class="b-car__size">
                            <div class="car-size" style="background-image:url(<?php echo get_stylesheet_directory_uri(); ?>/assets/img/icons/car-size.png);">
                                <div class="car-size__lenght"><?php echo SCF::get('car_lenght'); ?>м</div>
                                <div class="car-size__width"><?php echo SCF::get('car_width'); ?>м</div>
                                <div class="car-size__height"><?php echo SCF::get('car_height'); ?>м</div>
                            </div>
                        </div>
                    </div>
                    <!-- .col-->

                    <div class="col col--lg-3 col--md-6">
                        <div class="b-car__subtitle">Характеристики автомобиля:</div>
                        <div class="b-car__table table-car">
                            <div class="table-car__row">
                                <div class="table-car__name">Длина</div>
                                <div class="table-car__spacer"></div>
                                <div class="table-car__value"><?php echo SCF::get('car_lenght'); ?>м</div>
                            </div>
                            <div class="table-car__row">
                                <div class="table-car__name">Ширина</div>
                                <div class="table-car__spacer"></div>
                                <div class="table-car__value"><?php echo SCF::get('car_width'); ?>м</div>
                            </div>
                            <div class="table-car__row">
                                <div class="table-car__name">Высота</div>
                                <div class="table-car__spacer"></div>
                                <div class="table-car__value"><?php echo SCF::get('car_height'); ?>м</div>
                            </div>
                            <div class="table-car__row">
                                <div class="table-car__name">Объем</div>
                                <div class="table-car__spacer"></div>
                                <div class="table-car__value"><?php echo SCF::get('car_size'); ?>м<sup>3</sup></div>
                            </div>
                            <div class="table-car__row">
                                <div class="table-car__name">Грузоподъемность</div>
                                <div class="table-car__spacer"></div>
                                <div class="table-car__value"><?php echo SCF::get('car_weight'); ?>кг</div>
                            </div>
                            <div class="table-car__row">
                                <div class="table-car__name">Вместимость</div>
                                <div class="table-car__spacer"></div>
                                <div class="table-car__value"><?php echo SCF::get('car_content'); ?> европаллет</div>
                            </div>
                            <div class="table-car__row">
                                <div class="table-car__name">Вид загрузки</div>
                                <div class="table-car__spacer"></div>
                                <div class="table-car__value"><?php echo SCF::get('car_load'); ?></div>
                            </div>
                            <div class="table-car__row">
                                <div class="table-car__name">Кол-во пассажирских мест</div>
                                <div class="table-car__spacer"></div>
                                <div class="table-car__value"><?php echo SCF::get('car_person'); ?></div>
                            </div>
                        </div>
                    </div>
                    <!-- .col-->

                    <div class="col col--lg-3 col--md-6">
                        <div class="b-car__subtitle">Дополнительная информация:</div>
                        <div class="b-car__content text-content">
                            <?php the_content(); ?>
                        </div>
                        <a class="button button--round button--base b-car__button js-car-order" href="javascript:;" data-car="<?php the_title(); ?>">Заказать</a>
                    </div>
                    <!-- .col-->

                </div>
            </div>
            <!-- .b-car-->

            <?php endwhile; endif; wp_reset_postdata(); ?>

        </div>
        <!-- .b-park-->

    </div>
    <!-- .grid-->

</div>
<!-- .SECTION-PARK-->

<?php get_template_part( 'template-parts/section', 'calc' ); ?>

<div class="section">

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

<?php get_template_part( 'template-parts/section', 'workpath' ); ?>