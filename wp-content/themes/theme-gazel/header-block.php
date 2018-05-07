<header class="header" id="headroom">

    <div class="menu-icon" id="menu-toggle"><span></span><span></span><span></span></div>

    <div class="header__top">
        <div class="grid grid--container">
            <div class="row row--xs-center">
                <div class="col col--xl-3 col--lg-2 col--md-5 col--sm-5 col--xs-3 text--xs-center text--lg-left">
                    <div class="b-logotype" itemscope itemtype="http://schema.org/Organization">
                        <?php the_custom_logo(); ?>
                        <?php echo SCF::get_option_meta( 'sitescripts', 'schema' ); ?>
                    </div>
                </div>

                <div class="col col--lg-3 col--xs-1">
                    <div class="b-worktime b-worktime--block">
                        <svg class="icon icon-clock"><use xlink:href="<?php echo get_stylesheet_directory_uri(); ?>/assets/img/sprite.svg#clock"></use></svg>
                        Режим работы:<br><?php echo SCF::get_option_meta( 'siteoptions', 'site_worktime' ); ?>
                    </div>
                </div>

                <div class="col col--xl-2 col--lg-3 col--md-6 col--sm-6 col--xs-7">
                    <div class="b-phones b-phones--block">

                        <?php $phones = SCF::get_option_meta('siteoptions', 'site_phones' ); ?>

                        <?php if ( $phones[0]['phone'] ) { ?>
                            <div class="b-phones__item">
                                <svg class="icon icon-phone"><use xlink:href="<?php echo get_stylesheet_directory_uri(); ?>/assets/img/sprite.svg#phone"></use></svg>
                                <?php phone_link( $phones[0]['phone'] ); ?>
                            </div>
                        <?php } ?>

                        <?php if ( $phones[1]['phone'] ) { ?>
                            <div class="b-phones__item">
                                <svg class="icon icon-whatsapp"><use xlink:href="<?php echo get_stylesheet_directory_uri(); ?>/assets/img/sprite.svg#whatsapp"></use></svg>
                                <svg class="icon icon-viber"><use xlink:href="<?php echo get_stylesheet_directory_uri(); ?>/assets/img/sprite.svg#viber"></use></svg>
                                <?php phone_link( $phones[1]['phone'] ); ?>
                            </div>
                        <?php } ?>

                    </div>
                </div>

                <div class="col col--lg-4 col--sm-12 col--xs-12 text--xs-center col--lg-right">
                    <a class="button button--round button--base h-button" href="#callback" data-modal-open>Заказать звонок</a>
                </div>

                <!-- <div class="col col--lg-2 col--sm-6 col--xs-5 text--xs-center text--lg-right">
                    <a class="button button--round button--base h-button" id="btn-regions" href="#">Регионы</a>
                    <div class="b-regions" id="b-regions">
                        <ul class="regions-list">
                            <li><a href="#">Московская область</a></li>
                            <li><a href="#">Владимирская область</a></li>
                            <li><a href="#">Тверская область</a></li>
                            <li><a href="#">Московская область</a></li>
                            <li><a href="#">Владимирская область</a></li>
                            <li><a href="#">Тверская область</a></li>
                        </ul>
                    </div>
                </div> -->

            </div>
        </div>
        <!-- .grid-->
    </div>
    <!-- .header__top-->

    <div class="header__menu">
        <div class="grid grid--container">
            <?php wp_nav_menu( array(
				'theme_location' => 'menu-1',
				'container' => false,
				'menu_class' => 'main-nav',
                'menu_id' => 'menu',
		    ) ); ?>
        </div>
        <!-- .grid-->
    </div>
    <!-- .header__menu-->

</header>
<!-- .HEADER-->