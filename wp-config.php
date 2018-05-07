<?php
/**
 * Основные параметры WordPress.
 *
 * Скрипт для создания wp-config.php использует этот файл в процессе
 * установки. Необязательно использовать веб-интерфейс, можно
 * скопировать файл в "wp-config.php" и заполнить значения вручную.
 *
 * Этот файл содержит следующие параметры:
 *
 * * Настройки MySQL
 * * Секретные ключи
 * * Префикс таблиц базы данных
 * * ABSPATH
 *
 * @link https://codex.wordpress.org/Editing_wp-config.php
 *
 * @package WordPress
 */

// ** Параметры MySQL: Эту информацию можно получить у вашего хостинг-провайдера ** //
/** Имя базы данных для WordPress */
define('DB_NAME', 'p395153_p395153f');

/** Имя пользователя MySQL */
define('DB_USER', 'root');

/** Пароль к базе данных MySQL */
define('DB_PASSWORD', '');

/** Имя сервера MySQL */
define('DB_HOST', 'localhost');

/** Кодировка базы данных для создания таблиц. */
define('DB_CHARSET', 'utf8mb4');

/** Схема сопоставления. Не меняйте, если не уверены. */
define('DB_COLLATE', '');

/**#@+
 * Уникальные ключи и соли для аутентификации.
 *
 * Смените значение каждой константы на уникальную фразу.
 * Можно сгенерировать их с помощью {@link https://api.wordpress.org/secret-key/1.1/salt/ сервиса ключей на WordPress.org}
 * Можно изменить их, чтобы сделать существующие файлы cookies недействительными. Пользователям потребуется авторизоваться снова.
 *
 * @since 2.6.0
 */
define('AUTH_KEY',         'r}uik6d^b0%g<h8]s_hMaJZ<[m5Y<XbHj]FCq^4HTukJ]GmWyIme|s}&9oC>cUi:');
define('SECURE_AUTH_KEY',  '|e8dGShoqedrF4]0^Lq&>[PX9PS-U()6Ccv>K5X#j`~8q.OOZ@O1-<NqP+!{Utp@');
define('LOGGED_IN_KEY',    'M3i$T?W[m^l>D]$NJ@qrINYV0j[[<e<8nSBNzSk@$)6O+*W9%Ni|JQ**PylACxUR');
define('NONCE_KEY',        '7s?]lN,@])5AB91&xQI-XOLlY%nlLdBlNU+zO_eS|PNah7c:Ak3aXMIxY;sv1|;k');
define('AUTH_SALT',        'uNBGC% $YGA+D<IHoqA&?&#hn|>N&z:@eDHL:[0wg2N*h?u}FX;95+SGT%VjMGt*');
define('SECURE_AUTH_SALT', '|lTL1~x7^`j>RuBlb(]KbM_7t0:BG6ATaizU;{9!s[C97mZx[<2e&k/L;^,cvzJb');
define('LOGGED_IN_SALT',   'q2)2tWM|m>HFkCa-eW0X+_UoB>aKA#?,V5Y %K}M;Y(uI:cZ8MJpw=7`8B>+%`)W');
define('NONCE_SALT',       'tH^i^8o)us6g@7<T?).N7R^[Jw_@V+Cp-M>GBN2n,s{V/WltkB_!S{G<8!7&n5#P');

/**#@-*/

/**
 * Префикс таблиц в базе данных WordPress.
 *
 * Можно установить несколько сайтов в одну базу данных, если использовать
 * разные префиксы. Пожалуйста, указывайте только цифры, буквы и знак подчеркивания.
 */
$table_prefix  = 'gwp_';

/**
 * Для разработчиков: Режим отладки WordPress.
 *
 * Измените это значение на true, чтобы включить отображение уведомлений при разработке.
 * Разработчикам плагинов и тем настоятельно рекомендуется использовать WP_DEBUG
 * в своём рабочем окружении.
 *
 * Информацию о других отладочных константах можно найти в Кодексе.
 *
 * @link https://codex.wordpress.org/Debugging_in_WordPress
 */
define('WP_DEBUG', false);

/* Это всё, дальше не редактируем. Успехов! */

/** Абсолютный путь к директории WordPress. */
if ( !defined('ABSPATH') )
	define('ABSPATH', dirname(__FILE__) . '/');

/** Инициализирует переменные WordPress и подключает файлы. */
require_once(ABSPATH . 'wp-settings.php');
