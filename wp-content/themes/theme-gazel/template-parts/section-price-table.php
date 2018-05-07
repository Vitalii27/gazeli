<?php $cars = get_content( 'carpark', 20, '', 'ASC' ); ?>

<div class="section">
    <div class="grid grid--container">

        <h2 class="b-title text--xs-center">Цена перевозки грузов на газели по Москве</h2>

        <div class="table">
            <table>
                <thead>
                    <tr>
                        <td rowspan="2">Тип автотранспорта</td>
                        <td rowspan="2" class="short">Объём кузова (м <sup>3</sup>)</td>
                        <td colspan="3">Габариты кузова (м)</td>
                        <td rowspan="2" class="short accent">Стоимость 1 часа работ (руб.)</td>
                        <td rowspan="2" class="short">Минимальное время работ (смена) + 1 час подачи</td>
                        <td colspan="2" class="short">Минимальная стоимость заказа<sup>*</sup> (руб.)</td>
                        <td rowspan="2" class="short accent">Стоимость 1км пробега за МКАД<sup>**</sup> (руб.)</td>
                    </tr>
                    <tr>
                        <td class="short">Длина</td>
                        <td class="short">Ширина</td>
                        <td class="short">Высота</td>
                        <td class="short">По Москве</td>
                        <td class="short">По Москве с пропуском в ТТК</td>
                    </tr>
                </thead>
                <tbody>
                    <?php if ( $cars->have_posts() ) : while ( $cars->have_posts() ) : $cars->the_post(); ?>
                    <tr>
                        <td><strong><?php the_title(); ?></strong></td>
                        <td><?php echo SCF::get('car_size'); ?></td>
                        <td><?php echo SCF::get('car_lenght'); ?></td>
                        <td><?php echo SCF::get('car_width'); ?></td>
                        <td><?php echo SCF::get('car_height'); ?></td>
                        <td><strong><?php echo SCF::get('price_hour'); ?></strong></td>
                        <td><?php echo SCF::get('min_worktime'); ?></td>
                        <td><strong><?php $price = SCF::get('price_hour') * SCF::get('min_worktime'); echo $price; ?></strong></td>
                        <td><?php $ttk = $price + SCF::get('price_hour'); echo $ttk; ?></td>
                        <td><strong>17</strong></td>
                    </tr>
                    <?php endwhile; endif; wp_reset_postdata(); ?>
                </tbody>
            </table>
        </div>
        <!-- .table -->

        <div class="table-note">
            <p><sup>*</sup> Минимальная стоимость заказа – это фиксированная минимальная цена перевозки по г. Москва.
            <p><sup>**</sup> Стоимость пробега за МКАД рассчитывается в обе стороны.</p>
        </div>

        <h3 class="b-title text--xs-center">Стоимость услуг грузчиков</h3>

        <div class="table">
            <table>
                <thead>
                    <tr>
                        <td>Услуги</td>
                        <td>Стоимость 1 часа работ за человека (руб.)</td>
                        <td>Минимальное время работ (час)</td>
                        <td>Минимальная стоимость заказа<sup>*</sup> (руб.)</td>
                    </tr>
                </thead>
                <tbody>
                    <?php $person_services = SCF::get_option_meta( 'siteoptions', 'person_services' ); ?>
                    <?php foreach ($person_services as $service) { $values = explode(';', $service['person_service']); ?>
                        <tr>
                        <?php foreach ($values as $value) { ?>
                            <td><?php echo $value; ?></td>
                        <?php } ?>
                        </tr>
                    <?php } ?>
                </tbody>
            </table>
        </div>

    </div>
</div>