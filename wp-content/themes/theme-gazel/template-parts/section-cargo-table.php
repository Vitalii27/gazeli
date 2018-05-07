<?php $table = explode(',',SCF::get('cargo_price'));
   $table_title = SCF::get('cargo_price_title');
   $table_note = SCF::get('cargo_price_note'); ?>

<div class="grid grid--container">
   <?php if ( $table_title ) { ?>
     <h3 class="b-title text--xs-center"><?php echo $table_title; ?></h3>
   <?php } ?>

   <div class="table">
      <table>
         <thead>
            <tr>
               <td>Из Москвы в</td>
               <td>Время в пути (дни)</td>
               <td>до 1м<sup>3</sup>/до 100кг</td>
               <td>до 2м<sup>3</sup>/до 200кг</td>
               <td>до 3м<sup>3</sup>/до 300кг</td>
               <td>до 4м<sup>3</sup>/до 400кг</td>
               <td>до 5м<sup>3</sup>/до 500кг</td>
               <td>до 6м<sup>3</sup>/до 600кг</td>
               <td>до 7м<sup>3</sup>/до 700кг</td>
               <td>до 8м<sup>3</sup>/до 800кг</td>
            </tr>
         </thead>
         <tbody>
            <tr>
            <?php foreach ($table as $td) { ?>
               <td><?php echo $td; ?></td>
            <?php } ?>
            </tr>
         </tbody>
      </table>
      <?php if ( $table_note ) { ?>
      <div class="table-note">
         <p><?php echo wpautop( $table_note,$br = true ); ?></p>
      </div>
      <?php } ?>
   </div>
</div>
<!-- .grid -->
