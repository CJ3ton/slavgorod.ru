const pForm = document.querySelector('.priem__form');
const inputs = document.querySelectorAll('input');

inputs.forEach(item => {
    item.addEventListener('change', () => {
        sendEnable();
    });
});

$.validator.addMethod("maxsize", function (value, element, param) {
    if (this.optional(element)) {
        return true;
    }

    if ($(element).attr("type") === "file") {
        if (element.files && element.files.length) {
            for (var i = 0; i < element.files.length; i++) {
                if (element.files[i].size > param) {
                    return false;
                }
            }
        }
    }

    return true;
}, $.validator.format("File size must not exceed {0} bytes each."));

validateForm(pForm);

$('#attachment').change(function () {
    console.log('changed!');
    $(pForm).validate();
    sendEnable();
});

function validateForm(form) {
    $(form).validate({
        ignore: [],
        rules: {
            fio: {
                required: true,
                minlength: 2
            },
            tel: {
                required: true
            },
            adr_index: {
                digits: true,
                minlength: 6
            },
            email: {
                required: true,
                email: true
            },
            vopros: {
                required: true
            },
            g_response: {
                required: true
            },
            uploadfile: {
                required: false,
                accept: "image/*,video/*,audio/*,text/plain,application/pdf,application/msword,application/powerpoint,application/rtf,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,application/vnd.ms-powerpoint,application/vnd.openxmlformats-officedocument.presentationml.presentation",
                maxsize: 5120000
            }
        },
        messages: {
            fio: {
                required: "Пожалуйста, введите свое имя!",
                minlength: jQuery.validator.format("Введите не менее {0} символов!")
            },
            tel: {
                required: "Пожалуйста, введите свой номер телефона"
            },
            email: {
                required: "Пожалуйста, введите свой email!",
                email: "Ваш email должен соответствовать формату name@domain.com"
            },
            adr_index: {
                digits: "Только цифры!",
                required: "Пожалуйста, введите почтовый индекс!",
                minlength: "Введите 6 цифр!"
            },
            adr_punkt: {
                required: "Пожалуйста, введите название населенного пункта!"
            },
            adr_dom: {
                number: true,
                required: "Пожалуйста, введите адрес (улица, дом, квартира)!"
            },
            vopros: {
                required: "Пожалуйста, введите текст обращения!"
            },
            g_response: {
                required: ""
            },
            uploadfile: {
                accept: "Недопустимый тип файла!",
                maxsize: "Слишком большой файл!"
            }
        }

    });
}

function sendEnable() {
    if ($(pForm).valid()) {
        $('#send').removeAttr("disabled");
    }
    else
    {
        $('#send').attr("disabled", "");
    }
}

function sendDisable() {
    if (!($(pForm).valid())) {
        $('#send').attr("disabled", "");
    }
}

function correctCaptcha() {
    var isCaptchaValid;
    isCaptchaValid = false;
    response = grecaptcha.getResponse();
    $.ajax({
        url: "/mailer/checkCaptcha.php",
        type: "POST",
        async: false,
        data: {
            Response: response
        },
        success: function (resp) {
            if (resp === "true") {
                isCaptchaValid = true;
                $('.g-response').attr("value", "correct");
                setTimeout(recaptchaReset, 60 * 1000);
                sendEnable();
            } else {
                grecaptcha.reset();
            }
        }
    });
    return isCaptchaValid;
}

function recaptchaReset() {
    $('.g-response').html('');
    $('.g-response').attr("value", "");
    sendDisable();
}

function messageReset() {
    $('.status').html('');
}

$('input[name=tel]').mask("+7 (999) 999-99-99"); // Mask for phone input field

// ***AJAX mail sender*** //
$(pForm).submit(function (e) {
    e.preventDefault();
    if ($(this).valid()) {
        $('.status').html('Отправка...');
        let fData = new FormData($(this).get(0));
        $.ajax({
            type: "POST",
            url: "/mailer/smart.php",
            contentType: false,
            processData: false,
            data: fData
        }).done(function (response) {
            if (response == 'success') {
                $(this).find('input').val("");
                $('form').trigger('reset');
                grecaptcha.reset();
                recaptchaReset();
                $('#send').attr("disabled", "");
                $('.status').removeClass('error');
                $('.status').addClass('success');
                $('.status').html('Ваше обращение успешно отправлено!');
                setTimeout(messageReset, 5 * 1000);
            } else {
                console.log(response);
                switch (response) {
                    case 'err_bigfile':
                        err_text = 'Слишком большой файл!';
                        break;
                    case 'err_filetype':
                        err_text = 'Недопустимый тип файла!';
                        break;
                    case 'err_send':
                        err_text = 'Ошибка сервера!';
                        break;
                    default:
                        err_text = 'Неизвестная ошибка!';
                }
                let err_desc = `Ошибка! ${err_text}`;
                $('.status').removeClass('success');
                $('.status').addClass('error');
                $('.status').html(err_desc);
                setTimeout(messageReset, 5 * 1000);
            }
        });
    } else {
        alert('Заполните, пожалуйста, все поля и подтвердите, что Вы - не робот!');
    }
    return false;
});