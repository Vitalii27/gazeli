<div class="s-clients">

    <div class="lines-circle s-clients__decor"></div>

    <div class="s-clients__top">
        <div class="grid grid--container">
            <div class="row">
                <div class="col col--md-6 col--md-offset-3">
                    <div class="b-title">Свой груз нам уже доверили</div>
                    <p class="b-title-sub">За годы работы мы перевезли огромное количество грузов по всей России.<br>Более 90% наших клиентов оформляют у нас повторные заказы на грузоперевозки!</p>
                </div>
                <!-- .col-->
            </div>
            <!-- .row-->
        </div>
        <!-- .grid-->
    </div>
    <!-- .s-clients__top-->

    <div class="s-clients__bottom">

        <div class="grid grid--container">
            <div class="row">
                <div class="col col--md-12">
                    <div class="b-clients">
                        <?php $clients = SCF::get_option_meta( 'clients', 'clients' ); ?>

                        <?php foreach ( $clients as $client ) { ?>
                            <div class="b-clients__item">
                                <div class="client hexagon" style="background-image:url(<?php echo wp_get_attachment_image_url( $client['client_img'], 'thumbnail' ); ?>);">
                                    <div class="hexagon__one"><div class="hexagon__two"></div></div>
                                </div>
                            </div>
                            <!-- .b-clients__item -->
                        <?php } ?>
                    </div>
                    <!-- .b-clients -->
                </div>
            </div>
        </div>
        <!-- .grid-->

        <?php if ( is_front_page() ) {
            get_template_part( 'template-parts/section', 'testimonials' );
        } ?>

        <?php if ( !is_front_page() ) { ?>
            <?php get_template_part( 'template-parts/section', 'workpath' ); ?>
        <?php } ?>

    </div>
    <!-- .s-clients__bottom-->

</div>
<!-- .SECTION-CLIENTS-->