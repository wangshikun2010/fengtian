(function($) {
    $.fn.slideDevelopBox = function(options) {

        // 默认参数
        var defaults = {
            direction: 'left', //left,top
            duration: 0.6, //unit:seconds
            easing: 'swing', //swing,linear
            delay: 3, //unit:seconds
            startIndex: 0,
            width: null,
            height: null
        };

        var settings = $.extend(defaults, options || {});

        // 计算相关数据
        var wrapper = $(this),
            ul = wrapper.children('ul.items'),
            nums = wrapper.find('.nums'),
            lis = ul.find('li'),
            firstPic = lis.first().find('img');

        var li_num = lis.size(),
            li_height = 0,
            li_width = 0;

        //定义滚动顺序:ASC/DESC
        var order_by = 'ASC';

        //初始化
        var init = function() {
                if (!wrapper.size()) return false;

                // 手动设定值优先
                li_height = settings.height ? settings.height : lis.first().height();
                li_width = settings.width ? settings.width : lis.first().width();

                wrapper.css({
                    width: li_width + 'px',
                    height: (li_height + 50) + 'px'
                });
                lis.css({
                    width: li_width + 'px',
                    height: li_height + 'px'
                });

                // 判断方向
                if (settings.direction == 'left') {
                    ul.css('width', li_num * li_width + 'px');
                } else {
                    ul.css('height', li_num * li_height + 'px');
                }
                ul.find('li:eq(' + settings.startIndex + ')').addClass('active');

                nums.find('li').each(function(index) {
                    $(this).hover(function() {
                        // console.log(this);
                        ul.find('li:eq('+index+')').addClass('active').siblings('li').removeClass('active');

                        stop();
                        start(true);
                    }, function() {
                        wrapper.attr('timeid', window.setTimeout(start, settings.delay * 1000));
                    });
                });

            }

        //开始轮播
        var start = function(type) {
            var active = ul.find('li.active'),
                active_a = active.find('a'),
                index = active.index();

            // 判断方向
            if (settings.direction == 'left') {
                var offset = index * li_width * -1;
                param = {
                    'left': offset + 'px'
                };
            } else {
                var offset = index * li_height * -1;
                param = {
                    'top': offset + 'px'
                };
            }

            nums.find('li:eq(' + index + ')').addClass('checked').siblings().removeClass('checked');

            ul.stop().animate(param, settings.duration * 1000, settings.easing, function() {
                active.removeClass('active');
                if (order_by == 'ASC') {
                    if (active.next().size()) {
                        active.next().addClass('active');
                    } else {
                        order_by = 'DESC';
                        active.prev().addClass('active');
                    }
                } else if (order_by == 'DESC') {
                    if (active.prev().size()) {
                        active.prev().addClass('active');
                    } else {
                        order_by = 'ASC';
                        active.next().addClass('active');
                    }
                }
            });

            if (!type) {
                wrapper.attr('timeid', window.setTimeout(start, settings.delay * 1000));
            }

        };

        // 停止轮播
        var stop = function() {
            window.clearTimeout(wrapper.attr('timeid'));
        };

        // 鼠标经过事件
        wrapper.find('.items').hover(function() {
            stop();
        }, function() {
            wrapper.attr('timeid', window.setTimeout(start, settings.delay * 1000));
        });

        // 首张图片加载完毕后执行初始化
        var imgLoader = new Image();
        imgLoader.onload = function() {
            init();
        }
        imgLoader.src = firstPic.attr('src');

        // 方法导出
        $.fn.slideDevelopBox.start = start;
        $.fn.slideDevelopBox.stop = stop;

    };
})(jQuery);