$(document).ready(function () {
    function startNumber(reg) {
        return reg.startNumber != null ? reg.startNumber : '';
    }

    function yn(val) {
        return val == true ? 'Ja' : 'Nej';
    }

    function paymentColumn(val, registrationId) {
        var confirmButton = $("<td><button id=\"confirm" + registrationId + "\" type='button' >Bekräfta</button></td>");
        confirmButton.click(function (event) {
            var registrationId = event.target.id.replace("confirm", "");
            $("#confirm" + registrationId).attr("disabled", true);
            confirmed(registrationId);
            console.log(event);
        });
        return val === true ? undefined : confirmButton;
    }

    function initTableValues() {
        $.ajax({
            type: "GET",
            url: "/registrations?key="+ getKey(),
            success: function (data) {
                $("#registrationTableBody").empty();
                for (var i = 0; i < data.length; i++) {
                    var reg = data[i];
                    var row = $("<tr>")
                        .append($("<td>" + startNumber(reg) + "</td>"))
                        .append($("<td>" + reg.startGroup + "</td>"))
                        .append($("<td>" + reg.email + "</td>"))
                        .append($("<td>" + (reg.yearOfBirth  || '') + "</td>"))
                        .append($("<td>" + (reg.shirtSize  || '') + "</td>"))
                        .append($("<td>" + (reg.shirtType  || '') + "</td>"))
                        .append($("<td>" + yn(reg.vegetarian) + "</td>"))
                        .append($("<td>" + yn(reg.dinner) + "</td>"))
                        .append($("<td>" + reg.name + "</td>"))
                        .append(paymentColumn(reg.paid, reg.id))
                        .append($("</tr>"));
                    $("#registrationTableBody").append(row);
                }
            }
        });
    }

    function getParameterByName(name) {
        var match = new RegExp('[?&]' + name + '=([^&]*)').exec(window.location.search);
        return match && decodeURIComponent(match[1].replace(/\+/g, ' '));
    }

    function getKey() {
        return getParameterByName("key");
    }

    function confirmed(registrationId) {
        $.ajax({
            type: "PUT",
            url: "/payment-confirmations?registrationId=" + registrationId +"&key="+ getKey(),
            success: function () {
                initTableValues();
            }
        });
    }

    initTableValues();
});