$(document).ready(function(){
    $('#location').selectmenu();
    $( ".controlgroup" ).controlgroup();
    $( ".controlgroup-vertical" ).controlgroup({"direction": "vertical"});

    let responseArr = [];

    let currentTab = 0;

    showTab(currentTab);

    function showTab(n){
        $('.nextBtn').prop('disabled',true).css('cursor','not-allowed').removeClass('nextBtn_hover'); 

        var x = $('.question');
        var y = $('.response');
        //alert(x.eq(0).html());
        var value = Math.round((100 / (x.length+1)) * (n+1));

        $( "#progressbar" ).progressbar({value: value});
        $(".progress-label").text(value+"%");

        if(n !== 0){
            x.eq(n-1).css('display','none');
            y.eq(n-1).css('display','none');
        }
        x.eq(n).css('display','block');
        y.eq(n).css('display','block');

        if(x.length == n+1){
            $('.nextBtn').attr('value','Finish');
        }
        if(x.length+1 == n+1){
            $('.nextBtn').attr('value','Home');
            $('#last-page').css('display','block');
            $('.nextBtn').prop('disabled',false).css('cursor','pointer').addClass('nextBtn_hover');
        }
    }


    $.getJSON('/data/cities.json',function(data){
        //console.log(data);
        $.each(data, function(index, item){
            //console.log(item.name)
            var nameLower = item.name.toLowerCase();
            //console.log(typeof(name));
            $('#location').append("<option value='"+nameLower+"'>"+item.name+"</option>");
        });
    });

    $('#location').on('selectmenuchange',function(){
        //alert($(this).val());
        $('.nextBtn').prop('disabled',false).css('cursor','pointer').addClass('nextBtn_hover'); 
    });

    $('#birthday, input:radio[name="gender"], input:radio[name="days"]').on('change',function(){
        $('.nextBtn').prop('disabled',false).css('cursor','pointer').addClass('nextBtn_hover');
    });

    $('#height, #weight').on('keypress',function(){
        if(($('#height').val().length !== 0) && ($('#weight').val().length !== 0)){
            $('.nextBtn').prop('disabled',false).css('cursor','pointer').addClass('nextBtn_hover');
        }
        if(($('#height').val().length === 0) || ($('#weight').val().length === 0)){
            $('.nextBtn').prop('disabled',true).css('cursor','not-allowed').removeClass('nextBtn_hover'); 
        }
    });

    

    $('input.exercises').click(function(){
        //alert($('input.exercises:checked').length);
        if($('input.exercises:checked').length > 3){
            $(this).prop('checked','');
            alert("Please choose up to 3.");
        }
        if(($('input.exercises:checked').length <= 3) && ($('input.exercises:checked').length >= 1)){
            $('.nextBtn').prop('disabled',false).css('cursor','pointer').addClass('nextBtn_hover');
        }
        if($('input.exercises:checked').length === 0){
            $('.nextBtn').prop('disabled',true).css('cursor','not-allowed').removeClass('nextBtn_hover'); 
        }
    });

    $(document).on('keypress', function(e) {
        //alert($('.nextBtn').prop('disabled'));
        if(e.keyCode==13){
            if($('.nextBtn').prop('disabled') == false){
                $('.nextBtn').click();
            }else{
                alert("Please respond to the question.");
            }
        }
    });
 
    $('.nextBtn').click(function(){
        currentTab = currentTab+1;
        
        if($('.question').length > currentTab){
            showTab(currentTab);
        }
        if($('.question').length === currentTab){
            responseArr = $('#form-response').serializeArray();
            //console.log(responseArr);
            $('#form-response').submit(function(e){
                e.preventDefault();
            });
            showTab(currentTab);
        }
        if($('.question').length < currentTab){
            window.open("", '_self');
        }
        
    });

});