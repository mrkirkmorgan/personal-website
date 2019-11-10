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
$(document).ready(function() 
{
    // Click action handler
    $(".resume-button").click(function(e) {
        // Remove active class from the old button and section (effectively hides them)
        $(".active").removeClass("active");

        // Add active class to the new button and section (effectively displays them) 
        $("#" + e.currentTarget.id + "-section").addClass("active");
        $(this).addClass("active");
    });
})