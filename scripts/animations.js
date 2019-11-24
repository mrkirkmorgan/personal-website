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

    $(".comment-button").click(function(e) {
        $(".dissappear-box").slideToggle();
    });

    // Handles the submission of "Leave a Comment" form
    $("#submit-button").on("click", function(e) {
        e.preventDefault();
        var data = {Sender : $("#email-box").val(), Message: $("#message-box").val()};

        if ($("#subject-box").val().length == 0) {
            $.ajax({
                url: "//formspree.io/mvooeglp/", 
                method: "POST",
                data: data,
                dataType: "json",
            }).done(() => {
                    $(".dissappear-box").slideToggle();
                    $(".comment-button").fadeTo("fast", 0);
                    $(".success-msg").fadeIn("slow");
                    setTimeout(() => {
                        $(".comment-button").fadeTo("slow",1);
                        $(".success-msg").fadeOut("fast");
                    }, 7000);
                    $("#email-box").val("");
                    $("#message-box").val("");
            }).fail(() => {
                    alert('This request failed, please try again.')
            });
            return false;
        }
    });
})