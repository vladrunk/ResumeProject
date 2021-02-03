$(document).ready(function($) {
    function isMobile() {
        return Boolean(
            navigator.userAgent.match(
                /(iPad)|(iPhone)|(SymbOS)|(iPod)|(Android)|(Windows Phone)|(webOS)/i
            )
        );
    }
    /*======= Easter Egg Profile Image =======*/
    if (!isMobile()) {
        let toasty_sound = new Audio('https://www.realmofdarkness.net/audio/vg/mk/mkg/danforden/toasty.mp3');
        toasty_sound.volume = 0.05;
        let toasty_image = $('.toasty-ee');
        let profile_image = $('.profile-image');
        profile_image.data('count', 0);
        profile_image.on(
            'click',
            function () {
                $(this).data('count', $(this).data('count') + 1);
                if ($(this).data('count') === 3) {
                    $(this).data('count', 0);
                    toasty_image.show();
                    toasty_image.animate({
                        top: '0'
                        }, 300
                    ).animate({
                        top: '-1px'
                        }, 600
                    );
                    toasty_sound.play();
                    toasty_image.animate({
                        top: '-300px'
                        }, 200
                    );
                    toasty_image.hide(1);
                }
            }
        );
    } else {
        $('.profile-image').css('cursor', 'default');
    }

    /*======= I18N Buttons =======*/
    let lang_enable = $('.lang-enable');
    lang_enable.on('click', function () {
        document.cookie = 'lang=' + $(this).data('lang') + '; Max-Age=2592000; Path=/; SameSite=Lax';
        document.location.reload();
    });
    /*======= GitHub Calendar =======*/
    GitHubCalendar(".github-calendar", "vladrunk", { responsive: true });

    /*======= Skillset =======*/
    $('.level-bar-inner').css('width', '0');
    $(window).on('load', function() {
        $('.level-bar-inner').each(function() {
            let itemWidth = $(this).data('level');
            $(this).animate({
                width: itemWidth
            }, 800);
        });
    });
    /*=======  Bootstrap Tooltip for Skillset =======*/
    $('.level-label').tooltip();
});
