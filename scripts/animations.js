$(document).on("scroll", function() {
    var pageTop = $(document).scrollTop()

    if(pageTop === 0) {
        $(".arrow").fadeIn("slow");
    } else {
        $(".arrow").fadeOut("slow");
    }
})