$(document).ready(function () {

    //
    //  Show and hide sub menu items when user hover
    //

    $('body').on('mouseenter', '.dropdown' , function () {
        $(this).children('.sub-menu').fadeIn();
        $(this).children('a').children('i').removeClass('fa-chevron-down').addClass('fa-chevron-up');
    });

    $('body').on('mouseleave', '.dropdown' , function () {
        $(this).children('.sub-menu').fadeOut();
        $(this).children('a').children('i').removeClass('fa-chevron-up').addClass('fa-chevron-down');
    }); 
    
    //
    // open and close small nav when user click on the button
    //

    $('body').on('click', '#js_small_button', function () {
        $('#js_small_nav').css({
            'right': '0'
        });     
    });

    $('body').on('click', '#js_close_nav', function () {
        $('#js_small_nav').css({
            'right': '-500px'
        });     
    }); 
    
    //
    //  Show and hide small sub menu items when user hover
    //    
    
    $('body').on('click', '.dropdown-small' , function () {
        $(this).children('.sub-menu').slideToggle();
        ($(this).children('span').children('i').hasClass('fa-chevron-down')) 
            ? $(this).children('span').children('i').removeClass('fa-chevron-down').addClass('fa-chevron-up')
            : $(this).children('span').children('i').removeClass('fa-chevron-up').addClass('fa-chevron-down')
    }); 
    
    //
    // Change image effect
    //

    $('body').on('click', '.preview a', function () {
        $(".selected").removeClass("selected");
        $(this).addClass("selected");

        var picture = $(this).data();
        event.preventDefault();
        
        $(".full img").fadeOut(100, function() {
            $(".full img").attr("src", picture.full);
            $(".full").attr("href", picture.full);
            $(".full").attr("title", picture.title);
        }).fadeIn();                        
    });
    
    //
    // Add zoom effect
    //    

    $('body').on('mouseenter', '.full', function () {
        $('.full img').wrap('<span style="display:inline-block"></span>').parent().zoom();
    });    

});