<?php $promos = SCF::get_option_meta( 'siteoptions', 'promo' ); ?>
<?php if ( $promos ) {
    foreach ( $promos as $promo ) { ?>
    <div class="b-promo">
        <div class="b-promo__title"><?php echo $promo['promo_title']; ?></div>
        <img class="b-promo__img" src="<?php echo wp_get_attachment_image_url( $promo['promo_img'], 'full' ); ?>" alt="<?php echo $promo['promo_title']; ?>">
    </div>


<?php }
} ?>