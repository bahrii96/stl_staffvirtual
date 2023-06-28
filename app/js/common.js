$(document).ready(function () {

    DesktopNavigation();

    MobileNavigation();

}, jQuery);

$(window).on('resize', function (e) {
    if (window.matchMedia("(min-width: 769px)").matches) {
        $('#mobile_navigation').removeClass('is-opened');
        $('body').removeClass('mobile_nav-opened');
        $('.header_navigation-toggle').removeClass('is-active');
    }
});


function DesktopNavigation() {
    var offcanvasNav = $('#offcanvas__navigation');
    var offcanvasTrigger = $('.offcanvas-toggle a');

    offcanvasTrigger.click(function (e) {
        e.preventDefault();
        offcanvasNav.toggleClass('is-opened');
    });

    $(document).mouseup(function (e) {
        if (!offcanvasNav.is(e.target) && offcanvasNav.has(e.target).length === 0 && !offcanvasTrigger.is(e.target)) {
            offcanvasNav.removeClass('is-opened');
        }
    });


    $(document).keyup(function (e) {
        if (e.key === "Escape") { // escape key maps to keycode `27`
            offcanvasNav.removeClass('is-opened');
        }
    });
}

function MobileNavigation() {

    var mobNavTrigger = $('.header_navigation-toggle');
    var mobNavigation = $('#mobile_navigation');
    var mobNavChildTrigger = mobNavigation.find('.menu-item-has-children > a');
    var mobNavChildNav = mobNavigation.find('.menu-item-has-children .sub-menu');

    mobNavTrigger.click(function (e) {
        e.preventDefault();

        if ($(this).hasClass('is-active')) {
            $('body').removeClass('mobile_nav-opened');
            $(this).removeClass('is-active');
            mobNavigation.removeClass('is-opened');
        } else {
            $('body').addClass('mobile_nav-opened');
            $(this).addClass('is-active');
            mobNavigation.addClass('is-opened');
        }
    });

    mobNavChildTrigger.click(function (e) {
        e.preventDefault();

        if ($(this).hasClass('is-active')) {
            $(this).removeClass('is-active');
            $(this).parent().find('.sub-menu').slideUp();
        } else {
            mobNavChildTrigger.removeClass('is-active');
            mobNavChildNav.slideUp();

            $(this).addClass('is-active');
            $(this).parent().find('.sub-menu').slideDown();
        }
    });

    $(document).mouseup(function (e) {
        if (!mobNavigation.is(e.target) && mobNavigation.has(e.target).length === 0 && !mobNavTrigger.is(e.target) && mobNavTrigger.has(e.target).length === 0) {
            mobNavigation.removeClass('is-opened');
            $('body').removeClass('mobile_nav-opened');
            mobNavTrigger.removeClass('is-active');
        }
    });
}

// else {
//     $('#mobile_navigation').removeClass('is-opened');
//     $('body').removeClass('mobile_nav-opened');
//     $('.header_navigation-toggle').removeClass('is-active');
// }
// }


function accordionInit(accordion) {
    let accordionWrapper = $(accordion);
    if (accordionWrapper.length) {
        let accItem = accordionWrapper.find('.accordion_item .accordion_item--toggle');
        accItem.next().hide();
        accItem.click(function (e) {
            e.preventDefault();
            $(this).parent().toggleClass('active');
            $(this).next().slideToggle();
        });
    }
}