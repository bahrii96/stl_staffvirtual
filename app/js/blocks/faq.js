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
            let accordionWrapper = $(this).find('.faq');
            accordionWrapper.each(function () {
                let faqItem = $(this).find('.faq__accordion-item .faq__accordion-header');
                faqItem.next().hide();
                faqItem.first().parent().addClass('open');
                faqItem.first().next().show();
                faqItem.click(function (e) {
                    e.preventDefault();
                    if ($(this).parent().hasClass('open')) {
                        $(this).parent().removeClass('open');
                        $(this).next().slideUp();
                    } else {
                        faqItem.parent().removeClass('open');
                        faqItem.next().slideUp();

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
        window.acf.addAction('render_block_preview/type=faq', initializeBlock);
    }

})(jQuery);






