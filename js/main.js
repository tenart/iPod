$(function() {

    var click_sfx = new Howl({
        src: ['assets/click_sfx.mp3']
    });


    $(".menu_item").mouseenter(function() {
        $(".menu_item").removeClass("active");
        $(this).addClass("active");
        click_sfx.play();
    })


    var clickwheel = document.getElementById("clickwheel_container");
    var cw = new Hammer(clickwheel);

    cw.get("pan").set({ direction: Hammer.DIRECTION_ALL });

    cw.on("panleft panright panup pandown tap press", function(ev) {
        console.log( ev.center.x );

        $("#cw_touch").css("left", ev.center.x + "px");
        $("#cw_touch").css("top", ev.center.y + "px")
    });

})