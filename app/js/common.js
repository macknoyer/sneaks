$(function() {


var catalogFilter = {
    initialized: false,
    init: function () {

        if (!$(".filter").length)
            return false;

        this.initialized = true;
        this.doubleRange();

    },
   doubleRange: function () {
        var obj = this;

        $(".filterRange").each(function () {
            var sliderBox = $(this).find(".filterRangeBox");
            var min = parseFloat($(this).find(".filterRangeStart").attr("data-start"));
            var max = parseFloat($(this).find(".filterRangeFinish").attr("data-end"));
            var val1 = parseFloat($(this).find(".filterRangeStart").attr("data-val-min"));
            var val2 = parseFloat($(this).find(".filterRangeFinish").attr("data-val-max"));
            var step = parseFloat($(this).attr("data-step"));

            sliderBox.slider({
                range: true,
                min: min,
                max: max,
                step: step,
                values: [val1, val2],
                slide: function (event, ui) {
                    $(this).closest(".filterRange").find(".filterRangeStart").val(ui.values[0]);
                    $(this).closest(".filterRange").find(".filterRangeFinish").val(ui.values[1]);
                },
                change: function () {
                    /* if (typeof lecSidebarFilter != "undefined") {
                     lecSidebarFilter.send('N');
                     }*/
                    var el = $(this).closest(".filterRange").find(".filterRangeFinish");
                    obj.getFilterCounter(el);
                    clearTimeout(window.filterResultPopupTimer);
                    window.lastFilterEl = this;
                    lecShowFilterResult();
                }
            });

            $(this).find("input").change(function () {
                var left = parseInt($(this).parents(".filterRange").find(".filterRangeStart").val());
                var right = parseInt($(this).parents(".filterRange").find(".filterRangeFinish").val());
                var nowLeft = parseInt(sliderBox.slider('values', 0));
                var nowRight = parseInt(sliderBox.slider('values', 1));
                if (left > nowRight) {
                    left = nowRight;
                    $(this).parents(".filterRange").find(".filterRangeStart").val(left);
                }
                if (left < min) {
                    left = min;
                    $(this).parents(".filterRange").find(".filterRangeStart").val(left);
                }
                if (right < nowLeft) {
                    right = nowLeft;
                    $(this).parents(".filterRange").find(".filterRangeFinish").val(right);
                }
                if (right > max) {
                    right = max;
                    $(this).parents(".filterRange").find(".filterRangeFinish").val(right);
                }
                sliderBox.slider('values', 0, left);
                sliderBox.slider('values', 1, right);
            });

        });
    }
};
var catalogNew = {
    init: function () {
        this.hoverEl();
    },

    hoverEl: function () {
        // $("body").on("mouseenter", ".catalog_item:not(.init)", function () {
        //     $(this).addClass("init").find(".lazyImg").trigger("unveil");
        // });
        $("body").on("mouseleave", ".catalog_item", function () {
            if($(this).find(".catalogNewItemPreviewsList").length) {
                $(this)
                    .find(".catalogNewItemPreviewsList .active")
                    .removeClass("active");
                var newSrc = $(this)
                    .find(".catalogNewItemPreviewsList a:first")
                    .attr("data-img");
                $(this)
                    .find(".catalogNewItemPreviewsList a:first")
                    .addClass("active");
                $(this)
                    .find(".catalog_item-img img")
                    .attr("src", newSrc);
            }
        });

        $("body").on("mouseenter", ".catalogNewItemPreviewsList a", function () {
            var newSrc = $(this).attr("data-img");
            $(this)
                .addClass("init")
                .closest(".catalog_item")
                .find(".catalogNewItemPreviewsList .active")
                .removeClass("active");

            $(this)
                .addClass("active")
                .closest(".catalog_item")
                .find(".catalog_item-img img")
                .attr("src", newSrc);
        });

    }
};

    $(document).ready(function() {
    catalogFilter.init();
    catalogNew.init();
    $('.select').select2();
    $(".banner_index_top").owlCarousel({
        items:1,
        dots: true,
        autoplay: true
    });
});
    $('ul.recomend_tabs').on('click', 'li:not(.active)', function() {
    $(this).addClass('active').siblings().removeClass('active').parents().find('.tabs__content').removeClass('active').eq($(this).index()).addClass('active');
        });
    $('.header_bottom-menu li').mouseover(function () {
        $(this).addClass('active');
        $(this).find('.header_bottom-menu_slide').slideDown();
    });
    $('.header_bottom-menu li').mouseleave(function () {
        $(this).removeClass('active');
        $(this).find('.header_bottom-menu_slide').slideUp();
    });
});
