function sendSmtpTest(url) {
    //show indeterminent
    $('#testIndeter').css("visibility", "visible");
    //collect data and submit to server
    var smtpServer = $('#SmtpServer').val();
    var smtpUser = $('#SmtpUser').val();
    var smtpFrom = $('#SmtpFromAddress').val();
    var smtpPass = $('#SmtpPassword').val();
    var smtpPort = $('#SmtpPort').val();
    var smtpUseSsl = $('#SmtpUseSsl').prop('checked');
    var jsonObject = { "Server": smtpServer, "From": smtpFrom, "User": smtpUser, "Pass": smtpPass, "Port": smtpPort, "UseSsl": smtpUseSsl };

    $.ajax({
        url: url,
        type: "POST",
        data: JSON.stringify(jsonObject),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        error: function (response) {
            alert(response.responseText);
            $('#testIndeter').css("visibility", "collapse");
            $('#testResult').text(response);
        },
        success: function (response) {
            $('#testIndeter').css("visibility", "collapse");
            $('#testResult').text(response);
        }
    });

}
