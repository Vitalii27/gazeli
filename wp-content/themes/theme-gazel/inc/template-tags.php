<?php
/**
 * Custom template tags for this theme
 *
 * Eventually, some of the functionality here could be replaced by core features.
 *
 * @package base
 */

function phone_link( $phoneNum, $className = '' ) {
	$clearNum = preg_replace('/[^0-9]/', '', $phoneNum);
	echo '<a href="tel:+'. $clearNum .'" class="'. $className .'">'. $phoneNum .'</a>';
};

function email_link( $email, $className = '') {
	echo '<a href="mailto:'. $email .'" class="'. $className .'">'. $email .'</a>';
};