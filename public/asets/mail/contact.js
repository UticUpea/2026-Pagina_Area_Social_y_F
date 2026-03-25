$(function () {

    $("#contactForm input, #contactForm textarea").on('input', function() {
        $('#success').html('');
    });

    $("#contactForm").on('submit', function (event) {
        event.preventDefault();
        
        var name = $("input#name").val();
        var email = $("input#email").val();
        var subject = $("input#subject").val();
        var message = $("textarea#message").val();
        
        if (!name || !email || !message) {
            $('#success').html("<div class='alert alert-danger'>");
            $('#success > .alert-danger').html("<strong>Por favor completa todos los campos requeridos.</strong>");
            $('#success > .alert-danger').append('</div>');
            return;
        }
        var $this = $("#sendMessageButton");
        $this.prop("disabled", true);

        $.ajax({
            url: "contact.php",
            type: "POST",
            data: {
                name: name,
                email: email,
                subject: subject,
                message: message
            },
            cache: false,
            success: function () {
                $('#success').html("<div class='alert alert-success'>");
                $('#success > .alert-success').html("<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;")
                        .append("</button>");
                $('#success > .alert-success')
                        .append("<strong>Tu mensaje ha sido enviado. </strong>");
                $('#success > .alert-success')
                        .append('</div>');
                $('#contactForm').trigger("reset");
            },
            error: function () {
                $('#success').html("<div class='alert alert-danger'>");
                $('#success > .alert-danger').html("<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;")
                        .append("</button>");
                $('#success > .alert-danger').append($("<strong>").text("Lo sentimos, parece que nuestro servidor de correo no está respondiendo. ¡Por favor intenta más tarde!"));
                $('#success > .alert-danger').append('</div>');
                $('#contactForm').trigger("reset");
            },
            complete: function () {
                setTimeout(function () {
                    $this.prop("disabled", false);
                }, 1000);
            }
        });
    });

    $("a[data-toggle=\"tab\"]").click(function (e) {
        e.preventDefault();
        $(this).tab("show");
    });
});

$('#name').focus(function () {
    $('#success').html('');
});