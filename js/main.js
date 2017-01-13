$(document).ready(function () {
    function submitRegistration(event) {
        event.preventDefault();
        var nameElement = $("#name");
        var emailElement = $("#email");
        if (!nameElement[0].checkValidity()) {
            nameElement.addClass('error');
            return false;
        }
        if (!emailElement[0].checkValidity()) {
            emailElement.addClass('error');
            return false;
        }
        $(this).attr("disabled", true);
        var name = nameElement.val();
        var email = emailElement.val();
        var yearOfBirth = $("#yearofbirth").val();
        var child = $('[name="child"]:checked').val() === 'child';
        var startGroup = child ? 'barngreider' : $('[name="startGroup"]:checked').val();
        var shirtType = child ? undefined : $('[name="shirtType"]:checked').val();
        var shirtSize = child ? undefined : $('[name="shirtSize"]:checked').val();
        var vegetarian = child ? undefined : $('[name="vegetarian"]:checked').val() === "true";
        var dinner = child ? undefined : $('[name="dinner"]:checked').val() || false;
        $.ajax({
            type: "POST",
            url: "/registrations",
            contentType: "application/json",
            data: JSON.stringify({
                name: name,
                email: email,
                yearOfBirth: yearOfBirth,
                startGroup: startGroup,
                shirtType: shirtType,
                shirtSize: shirtSize,
                vegetarian: vegetarian,
                dinner: dinner
            }),
            dataType: "json",
            success: function () {
                window.location.href = "/pay.html";
                console.log("success");
            }
        });
        return false;
    }
    $(".register-button").click(submitRegistration);
    $("#child_adult").click(function() {
        $("#adultSection").show();
    });
    $("#child_child").click(function() {
        $("#adultSection").hide();
    });

    $("#shirtTypeQuestionMark").click(function() {
        $("#modalInfoText").toggle();
    });
});