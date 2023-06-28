(function ($) {

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
    var initializeBlock = function ($block) {

        $($block).each(function (index) {
            let accordionWrapper = $(this).find('.process');
            accordionWrapper.each(function () {
                let accItem = $(this).find('.accordion_item .accordion_item--toggle');
                accItem.next().hide();
                accItem.first().parent().addClass('open');
                accItem.first().next().show();
                accItem.click(function (e) {
                    e.preventDefault();
                    if ($(this).parent().hasClass('open')) {
                        $(this).parent().removeClass('open');
                        $(this).next().slideUp();
                    } else {
                        accItem.parent().removeClass('open');
                        accItem.next().slideUp();

                        $(this).parent().addClass('open');
                        $(this).next().slideDown();
                    }
                });
            });
        });

    }

    // Initialize each block on page load (front end).
    $(document).ready(function () {
        initializeBlock($(this));
    });

    // Initialize dynamic block preview (editor).
    if (window.acf) {
        window.acf.addAction('render_block_preview/type=process-section', initializeBlock);
    }

})(jQuery);






