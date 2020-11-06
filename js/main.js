$(function() {

    var click_sfx = new Howl({
        src: ['assets/click_sfx.mp3']
    });


    $(".menu_item").mouseenter(function() {
        $(".menu_item").removeClass("active");
        $(this).addClass("active");
        click_sfx.play();
    })


    var clickwheel_container = document.getElementById("clickwheel_container");
    var cwHammer = new Hammer(clickwheel_container);
    
    var clickwheel = {
        x: 0,
        y: 0,
        angle: 0,
        direction: "",
        start: 0,
        difference: 0
    }

    cwHammer.get("pan").set({ direction: Hammer.DIRECTION_ALL });
    cwHammer.on("panleft panright panup pandown", function(ev) {

        var center = {
            x: 146,
            y:146
        }

        clickwheel.x = ev.center.x - parseInt($("#cw_outer").css("left"));
        clickwheel.y = ev.center.y - parseInt($("#cw_outer").css("top"));

        var newAngle = parseInt(anglePoints(clickwheel, center)) + 179;

        var overRev = Math.abs((newAngle - clickwheel.angle)) >= 90;

        if( newAngle > clickwheel.angle ) {
            if (!overRev) clickwheel.direction = ">>";
        } else if( newAngle < clickwheel.angle ) {
            if (!overRev) clickwheel.direction = "<<";
        }

        clickwheel.angle = parseInt(anglePoints(clickwheel, center)) + 179;

        $("#cw_touch").css("left", clickwheel.x + "px");
        $("#cw_touch").css("top", clickwheel.y + "px");
        $("#cw_needle").css("transform", "rotate(" + (clickwheel.angle - 179) + "deg)");

        $("#cw_x span").text( clickwheel.x );
        $("#cw_y span").text( clickwheel.y );
        $("#cw_angle span").text( (clickwheel.angle) );
        $("#cw_direction span").text( (clickwheel.direction) );
        
        clickwheel.difference = Math.abs(clickwheel.angle - clickwheel.start);

        $("#cw_extra span").text( clickwheel.difference );
        
        if( clickwheel.difference > 24 && clickwheel.difference <= 336) {
            clickwheel.start = clickwheel.angle;
            click_sfx.play();
        }

    });

    cwHammer.on("panstart", function(ev) {
        $("#cw_touch").css("opacity", 1);
        $("#cw_needle").css("opacity", 1);


        var center = {
            x: 146,
            y:146
        }

        clickwheel.x = ev.center.x - parseInt($("#cw_outer").css("left"));
        clickwheel.y = ev.center.y - parseInt($("#cw_outer").css("top"));

        clickwheel.angle = parseInt(anglePoints(clickwheel, center)) + 179;
        clickwheel.start = clickwheel.angle;
        clickwheel.difference = Math.abs(clickwheel.angle - clickwheel.start);

        $("#cw_extra span").text( clickwheel.difference );
    })

    cwHammer.on("panend pancancel", function(ev) {
        $("#cw_touch").css("opacity", 0);
        $("#cw_needle").css("opacity", 0);
        clickwheel.direction = "-";
        $("#cw_direction span").text( (clickwheel.direction) );
    })

})

function anglePoints(p1, p2) {
    return Math.atan2(p2.y - p1.y, p2.x - p1.x) * 180 / Math.PI;
}