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
var cardNew = {
    init: function () {

        this.tabs();
        this.moveControls();
        this.reviewFile();
        this.img();
        this.setRating();
        this.formToggle();
        this.size();

    },

    size: function () {
        $("body").on("click", ".cardNewSizeSelectTitle", function () {
            $(".cardNewSizeSelect").toggleClass("active");
        });

        $("body").on("click", ".cardNewSizeSelectEl", function () {
            if ($(this).hasClass("disabled")) {
                return false;
            } else if ( $(this).hasClass("active")) {
                $(".cardNewSizeSelect").removeClass("active");
                return false;
            }

            var index = $(this).index(),
                text = $(this).find("span:eq(0)").text() + " " + $(this).find("span:eq(1)").html();
            $(".cardNewSizeSelectTitle").html(text);
            $(".cardNewSizeSelectEl.active").removeClass("active");
            $(this).addClass("active");
            $(".cardNewSizeSelect option:selected").prop("selected", false);
            $(".cardNewSizeSelect option:eq(" + index + ")").prop("selected", true);
            $(".cardNewSizeSelect").trigger("change");
            $(".cardNewSizeSelect").removeClass("active");
        });

        $(document).click(function (event) {
            if (!$(event.target).closest('.cardNewSizeSelect').length) {
                $('.cardNewSizeSelect').removeClass("active");
            }
        });
    },

    formToggle: function () {
        $("body").on("click", ".cardNewReviewsWriteToggle", function () {
            $(".cardNewReview").toggleClass("active");
        });
    },

    tabs: function () {
        $("body").on("click", ".cardNewTabsHeader span", function () {
            var index = $(this).index();
            $(".cardNewTabsHeader span, .cardNewTabsPanel").removeClass("active");
            $(this).addClass("active");
            $(".cardNewTabsPanel:eq(" + index + ")").addClass("active");
        });
    },

    moveControls: function () {
        var controls = $(".cardNewControls").clone();
        $(".breadCrumbs").append(controls)
        // var controls = $(".cardNewControls").clone();
    },

    reviewFile: function () {
        $("#cardNewReviewFormFile1").change(function () {
            if ($(this).val().lastIndexOf('\\')) {
                var n = $(this).val().lastIndexOf('\\') + 1;
            } else {
                var n = $(this).val().lastIndexOf('/') + 1;
            }

            var fileName = $(this).val().slice(n);

            var clearText = $(".cardNewReviewFormFile label").attr("data-text");

            if (fileName.length < 1) {
                $(".cardNewReviewFormFile label").removeClass("active").html(clearText);
                $(".cardNewReviewFormFile span").show()
            }
            else {
                $(".cardNewReviewFormFile label").addClass("active").html(fileName);
                $(".cardNewReviewFormFile span").hide()
            }

        });
    },

    img: function () {
        $("body").on("click", ".cardNewImgPreviewsList a", function () {
            var href = $(this).attr("href");
            $(".cardNewImgPreviewsList .active").removeClass("active");
            $(this).addClass("active");
            $(".cardNewImgBig img").attr("src", href);
            return false;
        });
    },

    setRating: function () {
        $("body").on("click", ".cardNewReviewSetMarksElSet i", function () {
            var index = $(this).index() + 1;
            $(this).addClass("active");
            $(this).nextAll("i").removeClass("active");
            $(this).prevAll("i").addClass("active");
            $(this)
                .closest(".cardNewReviewSetMarksEl")
                .find(".cardNewReviewSetMarksElVal")
                .val(index);
        });
    }
};

    $(document).ready(function() {
    catalogFilter.init();
    catalogNew.init();
    cardNew.init();
    $('.select').select2();
    $('.select_detail').select2();
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
    $('.filter_block_name').on('click', function() {
        var $filter_block = $(this);
        $filter_block.toggleClass('active');
        $filter_block.next('.filter_block_list').slideToggle();
    });
});
