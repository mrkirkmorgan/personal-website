// Ensures that the bobbing arrow disappears when the user isn't at the top of the page
$(document).on("scroll", function() {
    var pageTop = $(document).scrollTop()

    if(pageTop === 0) {
        $(".arrow").fadeIn("slow");
    } else {
        $(".arrow").fadeOut("slow");
    }
})

// Adds listeners to the outer-halo buttons so the active state can be switched on click
$(document).ready(function() {
    $(".outer-halo").click(function(e) {
        $(".active").removeClass("active");
        $(this).addClass("active");
    });
})