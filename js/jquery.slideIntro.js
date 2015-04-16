(function($) {

    $.fn.slideIntro = function(options) {

        var defaults = {
            duration: 0.6,
            easing: 'swing'
        };

        var settings = $.extend(defaults, options || {});

        var intro = $(this),
            introScreen = intro.find('.intro-screen'),
            introBgLeft = intro.find('.intro-bg-left'),
            introBgRight = intro.find('.intro-bg-right');

            introScreenUl = introScreen.find('ul'),
            introBgLeftUl = introBgLeft.find('ul'),
            introBgRightUl = introBgRight.find('ul'),

            introDescription = introScreen.find('.description_content');

        function init() {

            var imgBgWidth = 550;
            var w = ($('body').width() - imgBgWidth) / 2;

            // console.log(w);

            introBgLeft.css({
                // 'right': $('body').width() - (w + imgBgWidth),
                'right': '60%',
                'width': 535
            });

            introBgRight.css({
                'left': '60%',
                // 'left': imgBgWidth + w,
                // 'width': 535 * 3
                'width': 535
            });

            // 设置默认描述
            introDescription.text(introScreenUl.find('li:eq(0)').attr('data-des'));

            introScreen.find('li').click(function() {

                var screenLiwidth = introScreenUl.find('li:eq(0)').width();

                var param = {
                    'left': -screenLiwidth
                };

                introBgRightUl.find('li:eq(0)').addClass('jump').siblings('li').removeClass('jump');

                setTimeout(function() {
                    introBgRightUl.stop().animate(param, 0.1 * 1000, settings.easing, function() {
                        introBgRightUl.append(introBgRightUl.find('li:eq(0)'));
                        introBgRightUl.css('left', 0);

                        introScreenUl.stop().animate(param, 0.2 * 1000, settings.easing, function() {
                            introScreenUl.append(introScreenUl.find('li:eq(0)'));
                            introScreenUl.css('left', 0);

                            // 描述
                            introDescription.text(introScreenUl.find('li:eq(0)').attr('data-des'));

                            // 左边
                            introBgLeftUl.stop().animate(param, settings.duration * 1000, settings.easing, function() {
                                introBgLeftUl.find('li:eq(1)').addClass('jump').siblings('li').removeClass('jump');
                                introBgLeftUl.append(introBgLeftUl.find('li:eq(0)'));
                                introBgLeftUl.css('left', 0);
                            });
                        });
                    });

                }, 500);
            });
        }

        init();
    }

})(jQuery);