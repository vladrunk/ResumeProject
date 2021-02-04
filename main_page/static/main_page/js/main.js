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
(function(){
  'use strict';

  class Menu {
    constructor(settings) {
      this.menuNode = settings.menuNode;
      this.state = false;
      this.menuStateTextNode = settings.menuStateTextNode || this.menuNode.querySelector('.mobile-menu__screen-reader');
      this.menuOpenedText = settings.menuOpenedText || 'Open menu';
      this.menuClosedText = settings.menuClosedText || 'Close menu';
    }

    changeState(state) {
      return this.state = !state;
    }

    changeStateText(state, node) {
      let text = (state !== true) ? this.menuOpenedText : this.menuClosedText;

      node.textContent = text;
      return text;
    }

    toggleMenuState(className) {

      let state;

      if (typeof className !== 'string' || className.length === 0) {
        return console.log('you did not give the class for the toggleState function');
      }

      state = this.changeState(this.state);

      this.changeStateText(state, this.menuStateTextNode);
      this.menuNode.classList.toggle(className);

      return state;
    }
  }

  const jsMenuNode = document.querySelector('.mobile-menu');
  const demoMenu = new Menu ({
    menuNode: jsMenuNode
  });

  function callMenuToggle(event) {
    demoMenu.toggleMenuState('mobile-menu_activated');
  }

  jsMenuNode.querySelector('.mobile-menu__toggle').addEventListener('click', callMenuToggle);
})();