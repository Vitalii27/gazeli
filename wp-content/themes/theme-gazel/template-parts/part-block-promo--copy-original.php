<div class="grid grid--container">
    <div class="row">
        <div class="col col--lg-8 col--lg-offset-2">

            <?php $promos = SCF::get_option_meta( 'siteoptions', 'promo' ); ?>
            <?php if ( $promos ) {
                foreach ( $promos as $promo ) { ?>

            <div class="b-promo">
                <div class="row row--md-center">
                    <div class="b-promo__left col col--md-8">
                        <div class="b-promo__title">Акция</div>
                        <div class="b-promo__name"><?php echo $promo['promo_title']; ?></div>
                        <div class="b-promo__text">
                            <?php echo $promo['promo_msg']; ?>
                        </div>
                    </div>
                    <!-- .b-promo__left-->

                    <div class="b-promo__right col col--md-4">
                        <div class="b-promo-form">
                            <div class="b-promo-form__title">Оставьте заявку</div>
                            <div class="b-promo-form__name">И получите ответ прямо сейчас!</div>
                            <form class="b-form" data-validate>
                                <input type="text" name="mouse" value="" style="display:none;">
                                <input type="hidden" name="page" value="<?php the_title(); ?>">
                                <input type="hidden" name="type" value="Акция - <?php echo $promo['promo_title']; ?>">
                                <div class="b-form__success">Спасибо!<br>Ваша заявка отправлена</div>
                                <div class="b-form__body">
                                    <div class="b-form__group">
                                        <input class="b-form__control input-bordered" type="text" name="name" placeholder="Ваше имя" required>
                                    </div>
                                    <div class="b-form__group">
                                        <input class="b-form__control input-bordered" type="tel" name="tel" placeholder="Ваш телефон" required>
                                    </div>
                                    <div class="b-form__group">
                                        <label class="checkbox">
                                        <input class="checkbox__input hidden-input" type="checkbox" name="agreement" required><span class="checkbox__label">
                                            <svg class="icon icon-check">
                                            <use xlink:href="<?php echo get_stylesheet_directory_uri(); ?>/assets/img/sprite.svg#check"></use>
                                            </svg> Согласен с <a href="<?php the_permalink(121); ?>">Пользовательским соглашением</a></span>
                                        </label>
                                    </div>
                                    <div class="b-form__group">
                                        <button class="b-form__button button button--round button--white" type="submit">Отправить</button>
                                    </div>
                                </div>
                            </form>
                            <!-- .b-form-->
                        </div>
                    </div>
                    <!-- .b-promo__right-->
                </div>
                <!-- .row-->
            </div>
            <!-- .b-promo-->

            <?php }
            } ?>

        </div>
        <!-- .col-->
    </div>
    <!-- .row-->
</div>
<!-- .grid-->