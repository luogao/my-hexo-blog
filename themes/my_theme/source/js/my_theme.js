$(function () {
    $('body')
        .on('click', '#menu-btn', function (e) {
            if ($(this).hasClass('active')) {
                $('#full-screen-nav ul li')
                    .each(function (index) {
                        var el = $(this);
                        setTimeout(function () {
                            el.hide()
                        }, index * 500)
                    })
                setTimeout(function () {
                    $('#full-screen-nav').removeClass('active')
                    $('#menu-btn').removeClass('active')
                }, 2000);
            } else {
                $('#full-screen-nav').addClass('active')
                $(this).addClass('active')
                setTimeout(function () {
                    $('#full-screen-nav ul li')
                        .each(function (index) {
                            var el = $(this);
                            setTimeout(function () {
                                el.show()
                            }, index * 500)
                        })
                }, 500);
            }

        })
})