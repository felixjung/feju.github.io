$(function() {
  $('.jcarousel')
    .jcarousel({
        // Core configuration goes here
    })
    .jcarouselAutoscroll({
      interval: 3000,
      target: '+=1',
      autostart: true
    })
  ;
});
(function($) {
  $(function() {
    $('.jcarousel')
      .jcarousel({
        animation: {
          duration: 600,
          easing: 'ease'
        },
        transitions: 'transforms3d',
        wrap: 'circular'
      })
      .jcarouselAutoscroll({
        interval: 3000,
        target: '+=1',
        autostart: true
      });

    $('.jcarousel-pagination')
      .on('jcarouselpagination:active', 'a', function() {
        $(this).addClass('active');
      })
      .on('jcarouselpagination:inactive', 'a', function() {
        $(this).removeClass('active');
      })
      .on('click', function(e) {
        e.preventDefault();
      })
      .jcarouselPagination({
        perPage: 1,
        item: function(page) {
            return '<a href="#' + page + '"></a>';
        }
      });
  });
})(jQuery);
