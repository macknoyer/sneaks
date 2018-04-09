$(function() {

	$(document).ready(function() {
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
