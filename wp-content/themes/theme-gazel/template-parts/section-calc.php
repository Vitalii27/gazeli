<?php $cars = get_content('carpark', 10, '', 'ASC'); ?>
<?php $tabs = array(
    array('name' => 'Перевозки по Москве', 'control' => 'calc-moscow'),
    array('name' => 'Перевозки по Московской области', 'control' => 'calc-obl'),
    array('name' => 'Перевозки по России', 'control' => 'calc-russia')
); ?>

<?php
$title = SCF::get('calc_title');
if ($title == NULL) {
    $title = 'Узнать стоимость перевозки';
}

$active = SCF::get('calc_tab');
if ($active == NULL) {
    $active = 0;
}
?>

    <div class="s-calc" id="calc"
         style="background-image:url(<?php echo get_stylesheet_directory_uri(); ?>/assets/img/calc.jpg);">
        <div class="grid grid--container">
            <div class="s-calc__body">
                <span class="lines-circle s-calc__decor"></span>

                <h3 class="b-title text--xs-center"><?php echo $title; ?></h3>

                <div class="b-subtitle">Выберите нужный автомобиль, введите адреса погрузки и разгрузки, при
                    необходимости вставьте нужное время работ и необходимое количество грузчиков
                </div>

                <div class="b-calc" id="calc-tabs">
                    <div class="b-calc-tabs">
                        <?php $i = 0;
                        foreach ($tabs as $tab) { ?>
                            <?php if ($i == (int)$active) { ?>
                                <div class="b-calc-tabs__item active"
                                     data-tab-control="<?php echo $tab['control']; ?>"><?php echo $tab['name']; ?></div>
                            <?php } else { ?>
                                <div class="b-calc-tabs__item"
                                     data-tab-control="<?php echo $tab['control']; ?>"><?php echo $tab['name']; ?></div>
                            <?php } ?>
                            <?php $i++;
                        } ?>
                    </div>
                    <!-- .b-calc-tabs-->

                    <form class="b-calc-form" id="calc-moscow" action="#" data-tab="calc-moscow">

                        <input type="hidden" name="tab" value="По Москве">
                        <input type="hidden" name="price" value="0">

                        <div class="b-calc__section">
                            <div class="b-calc__group row">

                                <div class="col col--sm-3">
                                    <div class="b-calc-name">Выберите автомобиль:</div>
                                </div>

                                <div class="col col--xl-9 col--lg-9">
                                    <div class="calc-slider">
                                        <div class="calc-slider__body">

                                            <?php if ($cars->have_posts()) : while ($cars->have_posts()) : $cars->the_post(); ?>

                                                <label class="b-calc-radio">
                                                    <a class="b-calc-radio__help"
                                                       href="#carmodal<?php echo $post->ID; ?>" data-modal-open>
                                                        <svg class="icon icon-question">
                                                            <use xlink:href="<?php echo get_stylesheet_directory_uri(); ?>/assets/img/sprite.svg#question"></use>
                                                        </svg>
                                                    </a>
                                                    <input class="b-calc-radio__input" type="radio" name="type"
                                                           value="<?php the_title(); ?>"
                                                           data-calc="<?php echo SCF::get('car_price'); ?>">
                                                    <span class="b-calc-radio__img"
                                                          style="background-image:url(<?php echo wp_get_attachment_image_url(SCF::get('car_calc_img'), 'thumbnail'); ?>);"></span>
                                                    <span class="b-calc-radio__label"><?php the_title(); ?></span>
                                                    <!-- <span class="b-calc-radio__note">(<?php //echo SCF::get( 'car_price' ); ?> руб. - 4 часа. Далее 600 руб /час)</span> -->
                                                </label>

                                            <?php endwhile; endif;
                                            wp_reset_postdata(); ?>

                                        </div>
                                    </div>
                                </div>
                            </div>
                            <!-- .b-calc__group-->

                            <div class="b-calc__group row row--xs-center">
                                <div class="col col--sm-6 col--md-3">
                                    <div class="b-calc-name">Укажите время:</div>
                                </div>
                                <div class="col col--sm-6 col--md-4 col--lg-3">
                                    <select class="b-calc-select" name="time">
                                        <?php for ($i = 0; $i < 5; $i++) { ?>

                                            <?php if ($i == 0) { ?>
                                                <option value="<?php echo $i + 4; ?>" data-calc="0"
                                                        selected><?php echo $i + 4; ?> часа
                                                </option>
                                            <?php } else { ?>
                                                <option value="<?php echo $i + 4; ?>"
                                                        data-calc="<?php echo $i * 600; ?>"><?php echo $i + 4; ?> часов
                                                </option>
                                            <?php } ?>

                                        <?php }; ?>
                                    </select>
                                </div>
                                <div class="col col--md-5 col--lg-6">
                                    <div class="b-calc__note">Минимальное время заказа машины - 4 часа</div>
                                </div>
                            </div>
                            <!-- .b-calc__group-->
                        </div>
                        <!-- .b-calc__section-->

                        <div class="b-calc__section">
                            <div class="b-calc__group row">
                                <div class="col col--lg-3 col--sm-7">
                                    <div class="b-calc-name">Грузчики<span class="b-calc-name__note">(на стоимость не влияет отсутствие грузовых лифтов):</span>
                                    </div>
                                </div>
                                <div class="col col--lg-3 col--sm-5">
                                    <label class="b-calc-radio">
                                        <input class="b-calc-radio__input" type="radio" name="person" value="1"
                                               data-calc="1">
                                        <span class="b-calc-radio__label">Да</span>
                                    </label>
                                    <label class="b-calc-radio">
                                        <input class="b-calc-radio__input" type="radio" name="person" value="0" checked
                                               data-calc="0">
                                        <span class="b-calc-radio__label">Нет</span>
                                    </label>
                                </div>
                                <div class="col col--lg-6 calc-person">
                                    <div class="row">
                                        <div class="col col--lg-6 col--sm-7">
                                            <div class="b-calc-name">Количество грузчиков:</div>
                                        </div>
                                        <div class="col col--lg-6 col--sm-5">
                                            <select class="b-calc-select" name="person-items">
                                                <?php for ($i = 1; $i < 6; $i++) { ?>

                                                    <?php if ($i == 1) { ?>
                                                        <option value="<?php echo $i; ?>"
                                                                data-calc="<?php echo $i * 350; ?>"
                                                                selected><?php echo $i; ?> человек
                                                        </option>
                                                    <?php } else if ($i > 4) { ?>
                                                        <option value="<?php echo $i; ?>"
                                                                data-calc="<?php echo $i * 350; ?>"><?php echo $i; ?>
                                                            человек
                                                        </option>
                                                    <?php } else { ?>
                                                        <option value="<?php echo $i; ?>"
                                                                data-calc="<?php echo $i * 350; ?>"><?php echo $i; ?>
                                                            человека
                                                        </option>
                                                    <?php } ?>
                                                <?php }; ?>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <!-- .b-calc__group-->
                        </div>
                        <!-- .b-calc__section-->

                        <div class="b-calc__section">
                            <div class="b-calc__group row">
                                <div class="col col--sm-5">
                                    <label class="b-calc-checkbox">
                                        <input class="b-calc-checkbox__input" type="checkbox" name="ttk"
                                               value="Нужен въезд в ТТК" data-calc="600">
                                        <span class="b-calc-checkbox__checkbox"><svg class="icon icon-check"><use
                                                        xlink:href="<?php echo get_stylesheet_directory_uri(); ?>/assets/img/sprite.svg#check"></use></svg></span>
                                        <span class="b-calc-checkbox__label">Нужен въезд в ТТК?</span>
                                    </label>
                                </div>
                                <div class="col col--sm-7">
                                    <label class="b-calc-checkbox">
                                        <input class="b-calc-checkbox__input" type="checkbox" name="ring"
                                               value="Нужен въезд в садовое кольцо" data-calc="600">
                                        <span class="b-calc-checkbox__checkbox"><svg class="icon icon-check"><use
                                                        xlink:href="<?php echo get_stylesheet_directory_uri(); ?>/assets/img/sprite.svg#check"></use></svg></span>
                                        <span class="b-calc-checkbox__label">Нужен въезд в садовое кольцо?</span>
                                    </label>
                                </div>
                            </div>
                            <!-- .b-calc__group-->
                        </div>
                        <!-- .b-calc__section-->

                        <div class="b-calc__footer">

                            <p><strong>Предварительная сумма заказа:</strong> <span class="b-calc__total"><span
                                            class="calc-total">0</span> <span class="cur">&#8381;</span> *</span> <span
                                        class="b-calc__control button button--base calc-control" data-calc-total="0">Расчитать</span>
                            </p>

                            <div class="row row--xs-center">
                                <div class="col col--lg-3 col--md-5 col--sm-5">
                                    <a class="b-calc__button button button--round button--white calc-button"
                                       href="javascript:;" data-calc="calc-moscow">Оформить заказ</a>
                                </div>
                            </div>
                        </div>
                        <!-- .b-calc__footer-->
                    </form>
                    <!-- .b-calc-form-->

                    <form class="b-calc-form" id="calc-obl" action="javascript:;" data-tab="calc-obl"
                          data-calc="Московская область">

                        <input type="hidden" name="length-price" value="34">
                        <input type="hidden" name="km" value="0">
                        <input type="hidden" name="tab" value="По Московской области">
                        <input type="hidden" name="price" value="">

                        <div class="b-calc__section">
                            <div class="b-calc__group row">
                                <div class="col col--sm-3">
                                    <div class="b-calc-name">Выберите автомобиль:</div>
                                </div>
                                <div class="col col--xl-9 col--lg-9">
                                    <div class="calc-slider">
                                        <div class="calc-slider__body">

                                            <?php if ($cars->have_posts()) : while ($cars->have_posts()) : $cars->the_post(); ?>

                                                <label class="b-calc-radio">
                                                    <a class="b-calc-radio__help"
                                                       href="#carmodal<?php echo $post->ID; ?>" data-modal-open>
                                                        <svg class="icon icon-question">
                                                            <use xlink:href="<?php echo get_stylesheet_directory_uri(); ?>/assets/img/sprite.svg#question"></use>
                                                        </svg>
                                                    </a>
                                                    <input class="b-calc-radio__input" type="radio" name="type"
                                                           value="<?php the_title(); ?>"
                                                           data-calc="<?php echo SCF::get('car_price'); ?>">
                                                    <span class="b-calc-radio__img"
                                                          style="background-image:url(<?php echo wp_get_attachment_image_url(SCF::get('car_calc_img'), 'thumbnail'); ?>);"></span>
                                                    <span class="b-calc-radio__label"><?php the_title(); ?></span>
                                                </label>

                                            <?php endwhile; endif;
                                            wp_reset_postdata(); ?>

                                        </div>
                                    </div>
                                </div>
                            </div>
                            <!-- .b-calc__group-->

                            <div class="b-calc__group row row--xs-center">
                                <div class="col col--sm-6 col--md-3">
                                    <div class="b-calc-name">Укажите время:</div>
                                </div>
                                <div class="col col--sm-6 col--md-4 col--lg-3">
                                    <select class="b-calc-select" name="time">
                                        <?php for ($i = 0; $i < 5; $i++) { ?>

                                            <?php if ($i == 0) { ?>
                                                <option value="<?php echo $i + 4; ?>" data-calc="0"
                                                        selected><?php echo $i + 4; ?> часа
                                                </option>
                                            <?php } else { ?>
                                                <option value="<?php echo $i + 4; ?>"
                                                        data-calc="<?php echo $i * 600; ?>"><?php echo $i + 4; ?> часов
                                                </option>
                                            <?php } ?>

                                        <?php }; ?>
                                    </select>
                                </div>
                                <div class="col col--md-5 col--lg-6">
                                    <div class="b-calc__note">Минимальное время заказа машины - 4 часа</div>
                                </div>
                            </div>
                            <!-- .b-calc__group-->
                        </div>
                        <!-- .b-calc__section-->

                        <div class="b-calc__section">
                            <div class="b-calc__group row">
                                <div class="col col--lg-3">
                                    <div class="b-calc-name">Пункт назначения:</div>
                                </div>
                                <div class="col col--lg-1 col--sm-2 text--xs-center">
                                    <span class="b-calc-input-label">откуда</span>
                                </div>
                                <div class="col col--lg-8 col--sm-10">
                                    <label class="b-calc-input b-calc-input--indent">
                                        <svg class="icon icon-close clear-input">
                                            <use xlink:href="<?php echo get_stylesheet_directory_uri(); ?>/assets/img/sprite.svg#close"></use>
                                        </svg>
                                        <input class="b-calc-input__input calc-departure" type="text" name="departure"
                                               placeholder="Москва или введите город МО" value="">
                                        <div class="b-calc-input__error error"></div>
                                    </label>
                                </div>
                                <div class="col col--lg-1 col--lg-offset-3 col--sm-2 text--xs-center">
                                    <span class="b-calc-input-label">куда</span>
                                </div>
                                <div class="col col--lg-8 col--sm-10">
                                    <label class="b-calc-input b-calc-input--indent">
                                        <svg class="icon icon-close clear-input">
                                            <use xlink:href="<?php echo get_stylesheet_directory_uri(); ?>/assets/img/sprite.svg#close"></use>
                                        </svg>
                                        <input class="b-calc-input__input calc-destination" type="text"
                                               name="destination" placeholder="Введите город МО">
                                        <div class="b-calc-input__error error"></div>
                                    </label>
                                </div>
                            </div>
                            <!-- .b-calc__group-->
                            <div class="b-calc__group row row--sm-center">
                                <div class="col col--lg-2 col--md-2 col--sm-3 col--xs-12">
                                    <div class="b-calc-name">Расстояние</div>
                                </div>
                                <div class="col col--lg-3 col--md-3 col--sm-3 col--xs-12">
                                    <label class="b-calc-input">
                                        <span class="b-calc-input__label calc-lenght">0</span>
                                    </label>
                                </div>
                                <div class="col col--lg-7 col--md-6 col--md-offset-0 col--sm-9 col--sm-offset-3">
                                    <div class="b-calc__note">Из Москвы: от МКАД до точки назначения</div>
                                </div>
                            </div>
                            <!-- .b-calc__group-->
                        </div>
                        <!-- .b-calc__section-->

                        <div class="b-calc__section">
                            <div class="b-calc__group row">
                                <div class="col col--lg-3 col--sm-7">
                                    <div class="b-calc-name">Грузчики<span class="b-calc-name__note">(на стоимость не влияет отсутствие грузовых лифтов):</span>
                                    </div>
                                </div>
                                <div class="col col--lg-3 col--sm-5">
                                    <label class="b-calc-radio">
                                        <input class="b-calc-radio__input" type="radio" name="person" value="1"
                                               data-calc="1">
                                        <span class="b-calc-radio__label">Да</span>
                                    </label>
                                    <label class="b-calc-radio">
                                        <input class="b-calc-radio__input" type="radio" name="person" value="0" checked
                                               data-calc="0">
                                        <span class="b-calc-radio__label">Нет</span>
                                    </label>
                                </div>
                                <div class="col col--lg-6 calc-person">
                                    <div class="row">
                                        <div class="col col--lg-6 col--sm-7">
                                            <div class="b-calc-name">Количество грузчиков:</div>
                                        </div>
                                        <div class="col col--lg-6 col--sm-5">
                                            <select class="b-calc-select" name="person-items">
                                                <?php for ($i = 1; $i < 6; $i++) { ?>

                                                    <?php if ($i == 1) { ?>
                                                        <option value="<?php echo $i; ?>"
                                                                data-calc="<?php echo $i * 350; ?>"
                                                                selected><?php echo $i; ?> человек
                                                        </option>
                                                    <?php } else if ($i > 4) { ?>
                                                        <option value="<?php echo $i; ?>"
                                                                data-calc="<?php echo $i * 350; ?>"><?php echo $i; ?>
                                                            человек
                                                        </option>
                                                    <?php } else { ?>
                                                        <option value="<?php echo $i; ?>"
                                                                data-calc="<?php echo $i * 350; ?>"><?php echo $i; ?>
                                                            человека
                                                        </option>
                                                    <?php } ?>
                                                <?php }; ?>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <!-- .b-calc__group-->
                        </div>
                        <!-- .b-calc__section-->

                        <div class="b-calc__footer">

                            <p><strong>Предварительная сумма заказа:</strong> <span class="b-calc__total"><span
                                            class="calc-total">0</span> <span class="cur">&#8381;</span> *</span> <span
                                        class="b-calc__control button button--base calc-control" data-calc-total="0">Расчитать</span>
                            </p>

                            <div class="row row--xs-center">
                                <div class="col col--lg-3 col--md-5 col--sm-5">
                                    <a class="b-calc__button button button--round button--white calc-button"
                                       href="javascript:;" data-calc="calc-obl">Оформить заказ</a>
                                </div>
                            </div>
                        </div>
                        <!-- .b-calc__footer-->
                    </form>
                    <!-- .b-calc-form-->

                    <form class="b-calc-form" id="calc-russia" action="javascript:;" data-tab="calc-russia" data-calc>

                        <input type="hidden" name="length-price" value="34">
                        <input type="hidden" name="km" value="0">
                        <input type="hidden" name="tab" value="По России">
                        <input type="hidden" name="price" value="">

                        <div class="b-calc__section">
                            <div class="b-calc__group row">
                                <div class="col col--sm-3">
                                    <div class="b-calc-name">Выберите автомобиль:</div>
                                </div>
                                <div class="col col--xl-9 col--lg-9">
                                    <div class="calc-slider">
                                        <div class="calc-slider__body">
                                            <?php if ($cars->have_posts()) : while ($cars->have_posts()) : $cars->the_post(); ?>

                                                <label class="b-calc-radio">
                                                    <a class="b-calc-radio__help"
                                                       href="#carmodal<?php echo $post->ID; ?>" data-modal-open>
                                                        <svg class="icon icon-question">
                                                            <use xlink:href="<?php echo get_stylesheet_directory_uri(); ?>/assets/img/sprite.svg#question"></use>
                                                        </svg>
                                                    </a>
                                                    <input class="b-calc-radio__input" type="radio" name="type"
                                                           value="<?php the_title(); ?>"
                                                           data-calc="<?php echo SCF::get('car_price'); ?>">
                                                    <span class="b-calc-radio__img"
                                                          style="background-image:url(<?php echo wp_get_attachment_image_url(SCF::get('car_calc_img'), 'thumbnail'); ?>);"></span>
                                                    <span class="b-calc-radio__label"><?php the_title(); ?></span>
                                                </label>

                                            <?php endwhile; endif;
                                            wp_reset_postdata(); ?>

                                        </div>
                                    </div>
                                </div>
                            </div>
                            <!-- .b-calc__group-->
                        </div>
                        <!-- .b-calc__section-->

                        <div class="b-calc__section">
                            <div class="b-calc__group row">
                                <div class="col col--lg-3">
                                    <div class="b-calc-name">Пункт назначения:</div>
                                </div>
                                <div class="col col--lg-1 col--sm-2 text--xs-center">
                                    <span class="b-calc-input-label">откуда</span>
                                </div>
                                <div class="col col--lg-8 col--sm-10">
                                    <label class="b-calc-input b-calc-input--indent">
                                        <svg class="icon icon-close clear-input">
                                            <use xlink:href="<?php echo get_stylesheet_directory_uri(); ?>/assets/img/sprite.svg#close"></use>
                                        </svg>
                                        <input class="b-calc-input__input calc-departure" type="text" name="departure"
                                               placeholder="Москва или введите город" value="">
                                        <div class="b-calc-input__error error"></div>
                                    </label>
                                </div>
                                <div class="col col--lg-1 col--lg-offset-3 col--sm-2 text--xs-center">
                                    <span class="b-calc-input-label">куда</span>
                                </div>
                                <div class="col col--lg-8 col--sm-10">
                                    <label class="b-calc-input b-calc-input--indent">
                                        <svg class="icon icon-close clear-input">
                                            <use xlink:href="<?php echo get_stylesheet_directory_uri(); ?>/assets/img/sprite.svg#close"></use>
                                        </svg>
                                        <input class="b-calc-input__input calc-destination" type="text"
                                               name="destination" placeholder="Введите город">
                                        <div class="b-calc-input__error error"></div>
                                    </label>
                                </div>
                            </div>
                            <!-- .b-calc__group-->
                            <div class="b-calc__group row row--sm-center">
                                <div class="col col--lg-2 col--md-2 col--sm-3 col--xs-12">
                                    <div class="b-calc-name">Расстояние</div>
                                </div>
                                <div class="col col--lg-3 col--md-3 col--sm-3 col--xs-12">
                                    <label class="b-calc-input">
                                        <span class="b-calc-input__label calc-lenght">0</span>
                                    </label>
                                </div>
                                <div class="col col--lg-7 col--md-6 col--md-offset-0 col--sm-9 col--sm-offset-3">
                                    <div class="b-calc__note">Из Москвы: от МКАД до города</div>
                                </div>
                            </div>
                            <!-- .b-calc__group-->
                        </div>
                        <!-- .b-calc__section-->

                        <div class="b-calc__section">
                            <div class="b-calc__group row">
                                <div class="col col--lg-3 col--sm-7">
                                    <div class="b-calc-name">Грузчики<span class="b-calc-name__note">(на стоимость не влияет отсутствие грузовых лифтов):</span>
                                    </div>
                                </div>
                                <div class="col col--lg-3 col--sm-5">
                                    <label class="b-calc-radio">
                                        <input class="b-calc-radio__input" type="radio" name="person" value="1"
                                               data-calc="1"><span class="b-calc-radio__label">Да</span>
                                    </label>
                                    <label class="b-calc-radio">
                                        <input class="b-calc-radio__input" type="radio" name="person" value="0" checked
                                               data-calc="0"><span class="b-calc-radio__label">Нет</span>
                                    </label>
                                </div>
                                <div class="col col--lg-6 calc-person">
                                    <div class="row">
                                        <div class="col col--lg-6 col--sm-7">
                                            <div class="b-calc-name">Количество грузчиков:</div>
                                        </div>
                                        <div class="col col--lg-6 col--sm-5">
                                            <select class="b-calc-select" name="person-items">
                                                <?php for ($i = 1; $i < 6; $i++) { ?>

                                                    <?php if ($i == 1) { ?>
                                                        <option value="<?php echo $i; ?>"
                                                                data-calc="<?php echo $i * 350; ?>"
                                                                selected><?php echo $i; ?> человек
                                                        </option>
                                                    <?php } else if ($i > 4) { ?>
                                                        <option value="<?php echo $i; ?>"
                                                                data-calc="<?php echo $i * 350; ?>"><?php echo $i; ?>
                                                            человек
                                                        </option>
                                                    <?php } else { ?>
                                                        <option value="<?php echo $i; ?>"
                                                                data-calc="<?php echo $i * 350; ?>"><?php echo $i; ?>
                                                            человека
                                                        </option>
                                                    <?php } ?>
                                                <?php }; ?>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <!-- .b-calc__group-->
                        </div>
                        <!-- .b-calc__section-->

                        <div class="b-calc__footer">

                            <p><strong>Предварительная сумма заказа:</strong> <span class="b-calc__total"><span
                                            class="calc-total">0</span> <span class="cur">&#8381;</span> *</span> <span
                                        class="b-calc__control button button--base calc-control" data-calc-total="0">Расчитать</span>
                            </p>

                            <div class="row row--xs-center">
                                <div class="col col--lg-3 col--md-5 col--sm-5">
                                    <a class="b-calc__button button button--round button--white calc-button"
                                       href="javascript:;" data-calc="calc-russia">Оформить заказ</a>
                                </div>
                                <div class="col col--lg-9 col--md-7 col--sm-7">
                                    <div class="b-calc__note">* - Стоимость срочной доставки отдельным автомобилем</div>
                                    <div class="b-calc__note">* - Стоимость перевозки сборного груза и придворительное
                                        бронирование автомобиля уточняйте у оператора
                                    </div>
                                </div>
                            </div>
                        </div>
                        <!-- .b-calc__footer-->
                    </form>
                    <!-- .b-calc-form-->

                </div>
                <!-- .b-calc-->

            </div>
            <!-- .s-calc__body-->
        </div>
        <!-- .grid-->
        <div class="map" id="map"></div>
    </div>
    <!-- .SECTION-CALC-->

<?php if ($cars->have_posts()) : while ($cars->have_posts()) : $cars->the_post(); ?>
    <div class="hide" id="carmodal<?php echo $post->ID; ?>">
        <div class="b-modal">
            <div class="b-car">
                <div class="b-car__title"><?php the_title(); ?></div>
                <div class="b-car__row row">

                    <div class="col col--lg-3 col--md-6">
                        <div class="b-car__img"
                             style="background-image:url(<?php the_post_thumbnail_url('medium'); ?>);"></div>
                    </div>
                    <!-- .col-->

                    <div class="col col--lg-3 col--md-6">
                        <div class="b-car__size">
                            <div class="car-size"
                                 style="background-image:url(<?php echo get_stylesheet_directory_uri(); ?>/assets/img/icons/car-size.png);">
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
                    </div>
                    <!-- .col-->

                </div>
            </div>
            <!-- .b-car-->
        </div>
        <!-- .b-modal-->
    </div>
    <!-- #carmodal-->
<?php endwhile; endif;
wp_reset_postdata(); ?>