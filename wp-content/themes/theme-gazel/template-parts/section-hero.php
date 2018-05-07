<div class="s-hero" style="background-image:url(<?php the_post_thumbnail_url( 'full' ); ?>);">

    <?php get_header( 'block' ); ?>

    <div class="grid grid--container">
        <div class="s-hero__body">
            <div class="row">

                <div class="col col--lg-7">
                    <div class="b-hero-title"><span class="b-hero-title__top">Гарантия страховки</span><span class="b-hero-title__bottom">перевозимого груза <strong>1.5 млн</strong></span></div>

                    <ul class="b-hero-advantage">
                        <li class="b-hero-advantage__item">
                            <svg class="icon icon-calendar"><use xlink:href="<?php echo get_stylesheet_directory_uri(); ?>/assets/img/sprite.svg#calendar"></use></svg>
                            Более 10 лет на <em>рынке грузоперевозок</em>
                        </li>
                        <li class="b-hero-advantage__item">
                            <svg class="icon icon-car"><use xlink:href="<?php echo get_stylesheet_directory_uri(); ?>/assets/img/sprite.svg#car"></use></svg>
                            Перевозка <em>без посредников</em>
                        </li>
                        <li class="b-hero-advantage__item">
                            <svg class="icon icon-timer"><use xlink:href="<?php echo get_stylesheet_directory_uri(); ?>/assets/img/sprite.svg#timer"></use></svg>
                            <em>Мы работаем</em> без выходных
                        </li>
                    </ul>
                </div>
                <!-- .col-->

                <div class="col col--lg-5 text--sm-right">
                    <div class="b-hero-action">
                        <div class="b-hero-action__inner">
                            <div class="b-hero-action__title"><span class="accent">Закажите газель</span><br>прямо сейчас</div>
                            <div class="b-hero-action__text">И получите <span class="accent">1 час</span> работы грузчика бесплатно!</div>
                            <form class="b-hero-action__form b-form" data-validate>
                                <input type="text" name="mouse" value="" style="display:none;">
                                <input type="hidden" name="page" value="<?php the_title(); ?>">
                                <input type="hidden" name="type" value="Заголовок">
                                <div class="b-form__success">Спасибо!<br>Ваша заявка отправлена</div>
                                <div class="b-form__body">
                                    <div class="b-form__group">
                                        <input class="b-form__control input-bordered" type="text" name="name" placeholder="Ваше имя" required>
                                    </div>
                                    <div class="b-form__group">
                                        <input class="b-form__control input-bordered" type="tel" name="tel" placeholder="Ваш телефон" required>
                                    </div>
                                    <div class="b-form__group">
                                        <input class="b-form__control input-bordered" type="email" name="email" placeholder="E-mail">
                                    </div>
                                    <div class="b-form__group">
                                        <label class="checkbox">
                                        <input class="checkbox__input hidden-input" type="checkbox" name="agreement" required><span class="checkbox__label">
                                            <svg class="icon icon-check">
                                            <use xlink:href="<?php echo get_stylesheet_directory_uri(); ?>/assets/img/sprite.svg#check"></use>
                                            </svg> Согласен с <a href="<?php the_permalink(121); ?>">Политикой конфиденциальности</a></span>
                                        </label>
                                    </div>
                                    <div class="b-form__group">
                                        <button class="button button--round button--white" type="submit">Отправить</button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                    <!-- .b-hero-action-->
                </div>
                <!-- .col-->

            </div>
            <!-- .row-->
        </div>
        <!-- .s-hero__body-->
    </div>
    <!-- .grid-->

    <div class="s-hero__triangle-one"></div><div class="s-hero__triangle-two"></div>
</div>
<!-- .SECTION-HERO-->