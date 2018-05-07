<?php
    $cars = get_content( 'carpark', 20, '', 'ASC' );
    $table = SCF::get('pricetable');
    $post_type = $post->post_type;
    $km_price_value = SCF::get_option_meta( 'siteoptions', 'km_price' );
    $term = get_the_terms($post->ID,'regions');
?>

<div class="grid grid--container">
    <?php $i = 0; foreach ($table as $item) { ?>
        <?php if ( !empty($item['price_table']) ) { ?>

        <?php $cities = explode(';', $item['price_table'] ); ?>
        <?php $method = $item['price_table_path']; ?>
        <?php $correction = $item['correction']; ?>
        <?php $show_two_way = $item['show_two_way']; ?>
        <?php $time_type = $item['time_type'];
        if ( $time_type ) { $tm_type = '(час)'; } else { $tm_type = '(дней)'; } ?>

        <?php if ( $item['price_table_title'] ) { ?>
        <<?php if ($i==0) { echo 'h2';} else {echo 'h3';} ?> class="b-title text--xs-center"><?php echo $item['price_table_title']; ?></<?php if ($i==0) { echo 'h2';} else {echo 'h3';} ?>>
        <?php } ?>

        <div class="table table--nav">

            <?php if ( $item['price_table_filter'] ) { ?>
            <div class="table-filter">
                <span class="table-filter__title">Быстрый поиск города:</span>
                <input class="table-filter__input" type="text" id="table-filter" data-src="table-filtering">
            </div>
            <?php } ?>

            <table id="table-filtering">
                <?php if ( $show_two_way ) {
                    $rowspan = 3; $colspan = 2; $cars_count = count($cars->posts) * 2;
                } else {
                    $rowspan = 2; $colspan = 0; $cars_count = count($cars->posts);
                } ?>
                <thead>
                    <tr>
                        <td rowspan="<?php echo $rowspan; ?>">Город</td>
                        <td rowspan="<?php echo $rowspan; ?>" class="short">Расстояние от МКАД (км)</td>

                        <?php if ( $post_type == 'region' ) { ?>
                        <td rowspan="<?php echo $rowspan; ?>">Время в пути* (час)</td>
                        <td colspan="<?php echo $cars_count; ?>">Минимальная стоимость перевозки** (руб.)</td>
                        <?php } ?>

                        <?php if ( $post_type == 'service') { ?>
                        <td colspan="<?php echo $cars_count; ?>">Минимальная стоимость перевозки* (руб.)</td>
                        <td rowspan="<?php echo $rowspan; ?>" class="short">Минимальная стоимость погрузочно-разгрузочных работ (руб)</td>
                        <?php } ?>
                    </tr>
                    <tr>
                        <?php if ( $cars->have_posts() ) : while ( $cars->have_posts() ) : $cars->the_post(); ?>
                        <td colspan="<?php echo $colspan; ?>" ><?php the_title(); ?></td>
                        <?php endwhile; endif; wp_reset_postdata(); ?>
                    </tr>
                    <?php if ( $show_two_way) { ?>
                    <tr>
                        <?php if ( $cars->have_posts() ) : while ( $cars->have_posts() ) : $cars->the_post(); ?>
                        <td class="accent">Из Москвы</td><td>В Москву</td>
                        <?php endwhile; endif; wp_reset_postdata(); ?>
                    </tr>
                    <?php } ?>
                </thead>
                <tbody>
                    <?php
                    foreach ($cities as $city) {
                    $city_data = explode(',',$city);
                    // city_data[0] - название города; city_data[1] - км
                    ?>

                    <tr class="filter">
                        <td class="filter-label"><?php echo $city_data[0]; ?></td>
                        <td><?php echo $city_data[1]; ?></td>

                        <?php if ( $post_type == 'region') {
                            // время поездки (часы)
                            $hours = ceil($city_data[1]/60);
                        ?>
                        <td><?php echo '~'.$hours; ?></td>
                        <?php } ?>

                        <?php if ( $cars->have_posts() ) : while ( $cars->have_posts() ) : $cars->the_post(); ?>
                            <?php $price = price($post->ID, $city_data[1], $method, $correction, $term[0]->term_id, $show_two_way); ?>
                            <?php $i = 0; foreach ($price as $value) { ?>
                                <td><?php if ($i==0) { echo '<strong>'.$value.'</strong>';} else {echo $value;} ?></td>
                            <?php $i++; } ?>
                        <?php endwhile; endif; wp_reset_postdata(); ?>

                        <?php if ( $post_type == 'service') { ?>
                        <td>от 1400</td>
                        <?php } ?>
                    </tr>

                    <?php } ?>
                </tbody>
            </table>
        </div>
        <!-- .table -->
        <div class="table-note">
            <p><?php echo wpautop( $item['price_table_note'],$br = true ); ?></p>
        </div>
        <?php } ?>
    <?php $i++; } ?>

</div>
<!-- .grid -->