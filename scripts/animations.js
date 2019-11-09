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

    // Hover-in & Hover-out action handler
    $(".resume-button").hover(
        // Hover-in function
        function(e) {
            if(!e.currentTarget.classList.contains('active')) {
                e.currentTarget.children[0].style.transform = "translate(.3rem, .3rem)";
                e.currentTarget.children[1].style.color = "#f7f1e3";
            }
    }, 
        // Hover out function
        function(e) {
            e.currentTarget.children[0].style.transform = "translate(0rem, 0rem)";
            e.currentTarget.children[1].style.color = "#E98074";
    })
})