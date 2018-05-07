<?php

add_action('admin_head', 'my_custom_styles');

function my_custom_styles() {
  echo '
  <style>

  .smart-cf-meta-box-table th { width: 15%; }
  .form-table th { width: 150px; }

  </style>';
};

?>