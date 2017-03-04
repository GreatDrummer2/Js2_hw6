(function($){
 $(function(){
  $('.Birth').datepicker({
    showAnim:'slide',
    dateFormat:'yy-mm-dd',
    monthNames:["Январь","Февраль","Март","Апрель","Май","Июнь","Июль","Август","Сентябрь","Октябрь","Ноябрь","Декабрь"],
    dayNamesMin :["Вс","Пн","Вт","Ср","Чт","Пт","Сб"],
    firstDay:1,
    prevText:'Пред',
    nextText:'Cлед',
    //????????shortYearCutoff:99,
    changeYear: true,
  });

   var probar = $('#progressbar');
    var prolab = $('#progressLabel');

    probar.progressbar({
      value:false,
      change: function(){
        prolab.text(probar.progressbar('value').toFixed(2) + '%');
      },
      complete:function(){
        prolab.text('Yeah!!!');
      }
    });

    function progress(){
      var lvl = probar.progressbar('value') || 0;
      if(lvl < 80){
        probar.progressbar('value', lvl + 14.28);
      }
      else if(lvl > 80){
        probar.progressbar('value', lvl + 14.32);
      }
    }

    $(':text').focusout(function(){
      $(this).val();
      if($(this).val()){
        progress();
      }
    });


  $("div.wrapper > input[type='submit']").on('click',function(){
    var arr = $(":text").map(function(item){
      return this.value;
    });
    var obj ={
      username:'',
      password:'',
      email:'',
      gender:'',
      credit_card:'',
      bio:'',
      birth:'',
    }
    var counter = 0;
    for(var key in obj){
        obj[key] = arr[counter];
        counter++;
    }

    var callBack =  function(data){
      $(':text').removeClass('green').removeClass('red');
      if(data.result){
        $(':text').addClass('green');
      }
      else{
        Object.keys(data.error).map(function(key){
          if(key == 'Credit Card'){ key = 'CreditCard'};
            /*$('.CreditCardd').dialog();
            $('.CreditCard').addClass('red');

            $('div.CreditCardd').text(data.error[key]);*/
            $('.' + key + 'd').dialog();
            $('.ui-dialog-title').text('Error');
            //$('.' + key).addClass('red');
            $('.' + key).effect("bounce", "slow" );/////?????????????
            if( key == 'CreditCard'){
              $('div.' + key +'d').text(data.error['Credit Card']);
            }
            else{
              $('div.' + key +'d').text(data.error[key]);
            }
        });
      }
    }


    $.post('validator.php',obj,callBack,'json');
  });
 })
})(jQuery);
