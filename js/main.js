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

        var touch = {
            x: ev.center.x - parseInt($("#cw_outer").css("left")),
            y: ev.center.y - parseInt($("#cw_outer").css("top"))
        }

        var center = {
            x: 146,
            y:146
        }

        var angle = parseInt(angleDeg(touch, center));

        $("#cw_touch").css("opacity", 1);
        $("#cw_needle").css("opacity", 1);

        $("#cw_touch").css("left", (touch.x) + "px");
        $("#cw_touch").css("top", (touch.y) + "px");
        $("#cw_needle").css("transform", "rotate(" + angle + "deg)");

        $("#cw_x span").text( (touch.x) + "px" );
        $("#cw_y span").text( (touch.y) + "px" );
        $("#cw_angle span").text( angle );

        if( ev.isFinal ) {
            $("#cw_touch").css("opacity", 0);
            $("#cw_needle").css("opacity", 0);
        }
    });

})

function angleDeg(p1, p2) {
    return Math.atan2(p2.y - p1.y, p2.x - p1.x) * 180 / Math.PI;
}