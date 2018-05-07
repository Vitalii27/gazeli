<!doctype html>
<html <?php language_attributes(); ?>>
<head>
	<meta charset="<?php bloginfo( 'charset' ); ?>">
    <meta name="author" content="https://vk.com/tishukn">
	<meta http-equiv="X-UA-Compatible" content="IE=edge">
	<meta name="viewport" content="width=device-width,initial-scale=1">
	<link rel="profile" href="http://gmpg.org/xfn/11">
	<meta name="SKYPE_TOOLBAR" content="SKYPE_TOOLBAR_PARSER_COMPATIBLE">
    <meta name="format-detection" content="telephone=no">

	<?php wp_head(); ?>

	<?php echo SCF::get_option_meta( 'sitescripts', 'before_head' ); ?>
</head>

<body <?php body_class(); ?>>

	<!--[if lte IE 9]>
		<p class="browsehappy">Вы используете <strong>устаревший</strong> браузер. Пожалуйста <a href="http://browsehappy.com/" target="_blank">обновите ваш браузер</a> чтобы воспользоваться всем функционалом сайта.</p>
	<![endif]-->

	<?php echo SCF::get_option_meta( 'sitescripts', 'after_body' ); ?>

	<div class="wrapper">
      <main class="main">