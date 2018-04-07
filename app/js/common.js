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

});
