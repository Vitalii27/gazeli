<div class="page-hero page-hero--padding" style="background-image:url(<?php the_post_thumbnail_url('full'); ?>);">
    <div class="grid grid--container">

        <div class="text--xs-center">
            <h1 class="b-title b-title--big" itemprop="name"><?php the_title(); ?></h1>
            <div class="b-hero-title"><span class="b-hero-title__top">Честные перевозки</span><span class="b-hero-title__bottom"><strong>без скрытых</strong> наценок и тарифов <!-- <strong>1.5 млн</strong> --></span></div>
        </div>

        <div class="row">
            <div class="col col--lg-8 col--lg-offset-2">
                <div class="workpath">
                    <div class="row">
                        <div class="col col--md-4 col--sm-4 col--xs-6">
                            <div class="workpath__item">
                                <svg class="icon icon-timer workpath__icon"><use xlink:href="<?php echo get_stylesheet_directory_uri(); ?>/assets/img/sprite.svg#timer"></use></svg>
                                <div class="workpath__title">Перевозка</div>
                                <p>Без посредников</p>
                            </div>
                        </div>
                        <!-- .col-->

                        <div class="col col--md-4 col--sm-4 col--xs-6">
                            <div class="workpath__item">
                                <svg class="icon icon-car workpath__icon"><use xlink:href="<?php echo get_stylesheet_directory_uri(); ?>/assets/img/sprite.svg#car"></use></svg>
                                <div class="workpath__title">Более 10 лет</div>
                                <p>на рынке грузоперевозок</p>
                            </div>
                        </div>
                        <!-- .col-->

                        <div class="col col--md-4 col--sm-4 col--xs-12">
                            <div class="workpath__item">
                                <svg class="icon icon-calendar workpath__icon"><use xlink:href="<?php echo get_stylesheet_directory_uri(); ?>/assets/img/sprite.svg#calendar"></use></svg>
                                <div class="workpath__title">Мы работаем</div>
                                <p>без выходных</p>
                            </div>
                        </div>
                        <!-- .col-->
                    </div>
                    <!-- .row-->
                </div>
                <!-- .workpath-->
            </div>
        </div>

        <div class="row">
            <div class="col col--sm-12 text--xs-center"><a class="button button--round button--white" href="#callback" data-modal-open>Заказать газель</a></div>
        </div>
        <!-- .row-->

    </div>
    <!-- .grid-->

</div>
<!-- .page-hero-->