<?php

/*
 *  Отправка писем
 */
function mail_handler() {
  // проверяем nonce код, если проверка не пройдена прерываем обработку
  check_ajax_referer( 'myajax-nonce', 'nonce_code' );

  // разбираем строку data из ajax
  $data = $_POST;
  // parse_str($_POST['data'], $data);

  // Заголовки
  $headers = array(
    'content-type: text/html',
    'From: PerevozkiNaGazeli <info@perevozki-na-gazeli.com>',
  );

  // отправляем на email, указанный в опциях сайта
  $to = SCF::get_option_meta( 'siteoptions', 'site_order_email' );

  // проверяем на робота
  if ( !empty( $data['mouse'] ) ) {
    wp_send_json_error( 'Вы - робот!' );
  }

  // Тема письма
  $sbj = 'Новая заявка';

  // Сообщение
  if ( isset( $data['page'] ) && !empty( $data['page'] ) ) {
    $msg .= '<br><strong>Страница</strong>: '. sanitize_text_field( $data['page'] ) .'<br>';
  }

  if ( isset( $data['type'] ) && !empty( $data['type'] ) ) {
    $msg .= '<br><strong>Блок</strong>: '. sanitize_text_field( $data['type'] ) .'<br>';
  }

  if ( isset( $data['name'] ) && !empty( $data['name'] ) ) {
    $msg .= '<br><strong>Имя</strong>: '. sanitize_text_field( $data['name'] ) .'<br>';
  }

  if ( isset( $data['tel'] ) && !empty( $data['tel'] ) ) {
    $msg .= '<br><strong>Телефон</strong>: '. sanitize_text_field( $data['tel'] ) .'<br>';
  }

  if ( isset( $data['email'] ) && !empty( $data['email'] ) ) {
    $msg .= '<br><strong>E-mail</strong>: '. sanitize_text_field( $data['email'] ) .'<br>';
  }

  if ( isset( $data['msg'] ) && !empty( $data['msg'] ) ) {
    $msg .= '<br><strong>Сообщение</strong>: '. sanitize_text_field( $data['msg'] ) .'<br>';
  }

  if ( isset( $data['car'] ) && !empty( $data['car'] ) ) {
    $msg .= '<br><strong>Тип машины</strong>: '. sanitize_text_field( $data['car'] ) .'<br>';
  }

  if ( isset( $data['calc'] ) && !empty( $data['calc'] ) ) {
    parse_str($data['calc'], $calc);

    $msg .= '<br><b>Калькулятор:</b>';
    if ( isset( $calc['tab'] ) && !empty( $calc['tab'] ) ) {
      $msg .= '<br>'. sanitize_text_field( $calc['tab'] );
    }

    if ( isset( $calc['type'] ) && !empty( $calc['type'] ) ) {
      $msg .= '<br><strong>Тип машины</strong>: '. sanitize_text_field( $calc['type'] );
    }
    if ( isset( $calc['time'] ) && !empty( $calc['time'] ) ) {
      $msg .= '<br><strong>Время аренды, часов</strong>: '. sanitize_text_field( $calc['time'] );
    }
    if ( isset( $calc['person'] ) && $calc['person'] > 0 ) {
      $msg .= '<br><strong>Грузчики</strong>: '.$calc['person-items'];
    }
    if ( isset( $calc['ttk'] ) && $calc['ttk'] > 0 ) {
      $msg .= '<br><strong>Въезд в ТТК</strong>: Да';
    }
    if ( isset( $calc['ring'] ) && $calc['ring'] > 0 ) {
      $msg .= '<br><strong>Въезд в Садовое кольцо</strong>: Да';
    }
    if ( isset( $calc['departure'] ) && !empty( $calc['departure'] ) ) {
      $msg .= '<br><strong>Город (откуда)</strong>: '. sanitize_text_field( $calc['departure'] );
    }
    if ( isset( $calc['destination'] ) && !empty( $calc['destination'] ) ) {
      $msg .= '<br><strong>Город (куда)</strong>: '. sanitize_text_field( $calc['destination'] );
    }
    if ( isset( $calc['km'] ) && !empty( $calc['km'] ) > 0 ) {
      $msg .= '<br><strong>Километраж</strong>: '. sanitize_text_field( $calc['km'] );
    }
    if ( isset( $calc['price'] ) && !empty( $calc['price'] ) > 0 ) {
      $msg .= '<br><strong>Стоимость</strong>: '. sanitize_text_field( $calc['price'] );
    }

  }

  // если форма с файлом
  $attachments = '';
  $file = '';
  $file_limit = 2 * ( 1024 * 1024 ); // 2 mb

  if ( !empty( $_FILES['file'] ) ) {

    if ( $_FILES['file']['size'] < $file_limit ) {
      $filename = basename($_FILES['file']['name']);
      $ext = pathinfo($filename, PATHINFO_EXTENSION);
      $new_name = 'attach-file.'.$ext;
      move_uploaded_file( $_FILES["file"]["tmp_name"], WP_CONTENT_DIR .'/uploads/tmp/'.$new_name );
      $file = WP_CONTENT_DIR ."/uploads/tmp/".$new_name;
      $attachments = array( $file );
    } else {
      wp_send_json_error( 'Файл больше 2 мб.' );
    }

  }

  // Отправка
  $mail = wp_mail( $to, $sbj, $msg, $headers, $attachments );

  if ( $mail ) {
    unlink( $file );
    wp_send_json_success();
  } else {
    wp_send_json_error();
  }

  // не забываем завершать PHP
  wp_die();
};

?>