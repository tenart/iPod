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

        var offset = {
            x: parseFloat($("#cw_outer").css("left")),
            y: parseFloat($("#cw_outer").css("top"))
        }

        $("#cw_touch").css("opacity", 1);
        $("#cw_touch").css("margin-left", (ev.center.x - offset.x) + "px");
        $("#cw_touch").css("margin-top", (ev.center.y - offset.y) + "px");

        if( ev.isFinal ) {
            $("#cw_touch").css("opacity", 0);
        }
    });

})