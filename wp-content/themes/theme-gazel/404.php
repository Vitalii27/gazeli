<?php get_header(); ?>

<?php get_header( 'block' ); ?>

<section class="s-error">
	<div class="grid grid--container">
		<?php if ( function_exists('yoast_breadcrumb') ) {yoast_breadcrumb('<div class="b-crumbs">','</div>'); } ?>

		<h1 class="s-error__title">404</h1>

		<div class="text-content">
			<p><strong>Страница на которую вы пытались перейти не существует</strong></p>
			<p>Возможно один из этих разделов вам подойдет?</p>
			<?php wp_nav_menu( array(
				'theme_location' => 'menu-1',
				'container' => false,
				'menu_class' => '',
                'menu_id' => '',
		    ) ); ?>
		</div>
	</div>
	<!-- .grid -->
</section>

<?php get_footer(); ?>