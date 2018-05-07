</main>
      <!-- .MAIN-->
	  <footer class="footer" id="contacts" style="background-image:url(<?php echo get_stylesheet_directory_uri(); ?>/assets/img/footer.jpg);">

    		<div class="footer__top text--xs-center">
        		<div class="grid grid--container">
            		<div class="row">
              			<div class="col col--md-6 col--md-offset-3">
                			<div class="f-logotype"><img src="<?php echo get_stylesheet_directory_uri(); ?>/assets/img/logo.png" alt="<?php bloginfo('name'); ?>"></div>
              			</div>
            		</div>
          		</div>
          		<!-- .grid-->
			</div>
			<!-- .footer__top-->

        	<div class="footer__middle">
          		<div class="grid grid--container">
            		<div class="row">

              			<div class="col col--lg-3 col--xs-6">
                			<div class="f-block">
                  				<div class="f-block__title">Контакты</div>
                  				<div class="f-block__body">
                    				<div class="b-worktime b-worktime--inline">
										<svg class="icon icon-clock"><use xlink:href="<?php echo get_stylesheet_directory_uri(); ?>/assets/img/sprite.svg#clock"></use></svg>
										<strong>Режим работы:</strong><br>
										<?php echo SCF::get_option_meta( 'siteoptions', 'site_worktime' ); ?>
                    				</div>
								</div>

                  				<div class="f-block__body">
                    				<div class="b-phones b-phones--inline">
										<strong>Телефон:</strong>
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
                			</div>
                			<!-- .f-block-->
              			</div>
						<!-- .col-->

              			<div class="col col--lg-3 col--xs-6">
                			<div class="f-block">
                  				<div class="f-block__title">Меню</div>
								<div class="f-block__body">
									<?php wp_nav_menu( array(
										'theme_location' => 'footer-menu',
										'container' => false,
										'menu_class' => 'f-nav',
										'menu_id' => '',
									) ); ?>
								</div>
							</div>
							<!-- .f-block-->
						</div>
						<!-- .col-->

              			<div class="col col--lg-3 col--md-6">
                			<div class="f-block">
                  				<div class="f-block__title">О компании</div>
                  				<div class="f-block__body">
                    				<div class="f-about">
                      					<div class="f-about__img" style="background-image:url(<?php echo wp_get_attachment_image_url( SCF::get_option_meta( 'siteoptions', 'footer_about_img' ), 'thumbnail' ); ?>);"></div>
                      					<div class="f-about__body">
                        					<?php echo SCF::get_option_meta( 'siteoptions', 'footer_about_text'); ?>
                        					<div class="f-about__body-footer"><a class="f-about__link" href="#">Подробнее</a></div>
                      					</div>
                    				</div>
                  				</div>
                			</div>
                			<!-- .f-block-->
						</div>
						<!-- .col-->

              			<div class="col col--lg-3 col--md-6">
                			<div class="f-block">
                  				<div class="f-block__title">Обратная связь</div>
                  				<div class="f-block__body">
                    				<form class="b-form f-form" action="#" data-validate>
                      					<input type="text" name="mouse" value="" style="display:none;">
										<input type="hidden" name="page" value="<?php the_title(); ?>">
										<input type="hidden" name="type" value="Подвал">
                      					<div class="b-form__success">Спасибо!<br>Ваша заявка отправлена</div>
                      					<div class="b-form__body">
                        					<div class="b-form__group">
                          						<input class="b-form__control" type="text" name="name" placeholder="Имя" required>
                       						</div>
                        					<div class="b-form__group">
                          						<input class="b-form__control" type="tel" name="tel" placeholder="Телефон" required>
                        					</div>
                        					<div class="b-form__group">
                          						<textarea class="b-form__control b-form__control--textarea" name="msg" placeholder="Сообщение"></textarea>
											</div>
											<div class="b-form__group">
												<label class="checkbox">
												<input class="checkbox__input hidden-input" type="checkbox" name="agreement" required><span class="checkbox__label">
													<svg class="icon icon-check">
													<use xlink:href="<?php echo get_stylesheet_directory_uri(); ?>/assets/img/sprite.svg#check"></use>
													</svg> Согласен с <a href="<?php the_permalink(121); ?>">Политикой конфиденциальности</a></span>
												</label>
											</div>
                        					<div class="b-form__group text--xs-right">
                          						<button class="b-form__button" type="submit">Заказать звонок</button>
                        					</div>
                      					</div>
                    				</form>
                  				</div>
							</div>
							<!-- .f-block-->
						</div>
						<!-- .col-->
					</div>
					<!-- .row-->
				</div>
				<!-- .grid-->
			</div>
			<!-- .footer__middle-->

        	<div class="footer__bottom text--xs-center">
          		<div class="grid grid--container">
					<?php echo SCF::get_option_meta( 'siteoptions', 'copyright' ); ?>
          		</div>
          		<!-- .grid-->
			</div>
			<!-- .footer__bottom-->

		</footer>
		<!-- .FOOTER-->

      	<div class="modal">
        	<div class="modal-inner">
				<a data-modal-close href="javascript:;"><svg class="icon icon-close"><use xlink:href="<?php echo get_stylesheet_directory_uri(); ?>/assets/img/sprite.svg#close"></use></svg></a>
          		<div class="modal-content"></div>
        	</div>
      	</div>
		<!-- .modal-->

      	<div class="hide" id="callback">
        	<div class="b-modal">
          		<div class="b-modal__title">Заказать звонок</div>
          		<form class="b-modal__form b-form" data-validate>
           			<input type="text" name="mouse" value="" style="display:none;">
					<input type="hidden" name="page" value="<?php the_title(); ?>">
					<input type="hidden" name="type" value="Заказ звонка">
					<input type="hidden" name="car" value="">
            		<div class="b-form__success">Спасибо!<br>Ваша заявка отправлена</div>
            		<div class="b-form__body">
              			<div class="b-form__group">
                			<input class="b-form__control" type="text" name="name" placeholder="Ваше имя" required>
              			</div>
              			<div class="b-form__group">
                			<input class="b-form__control" type="tel" name="tel" placeholder="Введите телефон" required>
						</div>
						<div class="b-form__group">
                            <label class="checkbox">
                            	<input class="checkbox__input hidden-input" type="checkbox" name="agreement" required><span class="checkbox__label">
                                <svg class="icon icon-check">
                                  <use xlink:href="<?php echo get_stylesheet_directory_uri(); ?>/assets/img/sprite.svg#check"></use>
                                </svg> Согласен с <a href="<?php the_permalink(121); ?>" target="_blank">Политикой конфиденциальности</a></span>
                            </label>
                        </div>
              			<div class="b-form__group">
                			<button class="button button--round button--base" type="submit">Заказать звонок</button>
              			</div>
            		</div>
          		</form>
        	</div>
      	</div>
		<!-- #callback-->

      	<div class="hide" id="request">
        	<div class="b-modal">
          		<div class="b-modal__title">Оформить заявку</div>
          		<form class="b-modal__form b-form" data-validate>
            		<input type="text" name="mouse" value="" style="display:none;">
					<input type="hidden" name="page" value="<?php the_title(); ?>">
					<input type="hidden" name="type" value="Калькулятор">
            		<input type="hidden" name="calc" value="">
            		<div class="b-form__success">Спасибо!<br>Ваша заявка отправлена</div>
            		<div class="b-form__body">
              			<div class="b-form__group">
                			<input class="b-form__control" type="text" name="name" placeholder="Ваше имя" required>
              			</div>
              			<div class="b-form__group">
                			<input class="b-form__control" type="tel" name="tel" placeholder="Введите телефон" required>
						</div>
						<div class="b-form__group">
                            <label class="checkbox">
                              <input class="checkbox__input hidden-input" type="checkbox" name="agreement" required><span class="checkbox__label">
                                <svg class="icon icon-check">
                                  <use xlink:href="<?php echo get_stylesheet_directory_uri(); ?>/assets/img/sprite.svg#check"></use>
                                </svg> Согласен с <a href="<?php the_permalink(121); ?>" target="_blank">Политикой конфиденциальности</a></span>
                            </label>
                        </div>
              			<div class="b-form__group">
                			<button class="button button--round button--base" type="submit">Отправить</button>
              			</div>
            		</div>
          		</form>
        	</div>
      	</div>
		<!-- #request-->
    </div>
	<!-- .WRAPPER-->

	<script src="https://api-maps.yandex.ru/2.1/?lang=ru_RU"></script>

	<?php wp_footer(); ?>

	<?php echo SCF::get_option_meta( 'sitescripts', 'before_body' ); ?>

	</body>
</html>
