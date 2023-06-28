
(function($){

  /**
   * initializeBlock
   *
   * Adds custom JavaScript to the block HTML.
   *
   * @date    15/4/19
   * @since   1.0.0
   *
   * @param   object $block The block jQuery element.
   * @param   object attributes The block attributes (only available when editing).
   * @return  void
   */
  var initializeBlock = function( $block ) {
    if (document.querySelector(".popup-video")) {
      $(document).ready(function () {
        $(".popup-video").fancybox({
          maxWidth: 800,
          maxHeight: 600,
          fitToView: false,
          width: "70%",
          height: "70%",
          autoSize: false,
          closeClick: false,
          openEffect: "none",
          closeEffect: "none",
        });
      });
    }
  }

  // Initialize each block on page load (front end).
  $(document).ready(function(){
    initializeBlock( $(this) );
  });

  // Initialize dynamic block preview (editor).
  if( window.acf ) {
    window.acf.addAction( 'render_block_preview/type=video-section', initializeBlock );
  }

})(jQuery);




