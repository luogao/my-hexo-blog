$(function () {
    $('body')
        .on('click', '#menu-btn', function (e) {
            if ($(this).hasClass('active')) {
                $('#full-screen-nav')
                    .fadeOut(200, function () {
                        $('#full-screen-nav ul li').hide()
                        $('#full-screen-nav').removeClass('active')
                        $('#menu-btn').removeClass('active')
                    })
            } else {
                $(this).addClass('active')
                $('#full-screen-nav').addClass('active').fadeIn(200, function () {
                    $('#full-screen-nav ul li')
                        .each(function (index) {
                            var el = $(this);
                            setTimeout(function () {
                                el.show()
                            }, index * 200)
                        })
                })
            }

        })
})