var lazyImg = {
    initialized: false,
    init: function () {

        this.initialized = true;
        
		$("img.lazyImg:not(.lazyInit)").show();
		$("img.lazyImg:not(.lazyInit)").addClass("lazyInit");
		$("img.lazyImg:not(.lazyInit)").unveil(500, function () {
			 $(this).load(function () {
				$(this).addClass("loaded");
			 });
		});
        $(".seasonsItem img:not(.lazyInit)")
            .show()
            .addClass("lazyInit")
            .unveil(500, function () {
                var src = $(this).attr("src");
                $(this).closest(".seasonsItem").css("background-image", "url(" + src + ")");
            });

        $(".newsItemImg img:not(.lazyInit)")
            .show()
            .addClass("lazyInit")
            .unveil(500, function () {
                var src = $(this).attr("src");
                $(this).closest(".newsItemImg").css("background-image", "url(" + src + ")");
            });

    }
};

$(document).ready(function () {
    lazyImg.init();
});