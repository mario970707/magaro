
/******************************************
    File Name: custom.js
*******************************************/
"use strict";

window.initTemplate = function () {

    // ===== WOW animation =====
    if (typeof WOW !== 'undefined') {
        new WOW({ live: false }).init();
    }

    // ===== Loader =====
    $(window).on('load', function () {
        $(".bg_load").fadeOut("slow");
    });



    // ===== Counter =====
    $('.counter-count').each(function () {
        $(this).prop('Counter', 0).animate({
            Counter: $(this).text()
        }, {
            duration: 5000,
            easing: 'swing',
            step: function (now) {
                $(this).text(Math.ceil(now));
            }
        });
    });

    // ===== Progress bar =====
    $('.progress .progress-bar').each(function () {
        $(this).css("width", $(this).attr("aria-valuenow") + "%");
    });

    // ===== Case studies filter =====
    $(".filter-button").off('click').on('click', function () {
        const value = $(this).attr('data-filter');

        if (value === "all") {
            $('.filter').show(1000);
        } else {
            $(".filter").not('.' + value).hide(3000);
            $('.filter').filter('.' + value).show(3000);
        }

        $(".filter-button").removeClass("active");
        $(this).addClass("active");
    });

    // ===== Slider (Revolution) =====
    if (typeof jQuery !== 'undefined' && $("#rev_slider_4_1").length) {
        const tpj = jQuery;

        if (tpj("#rev_slider_4_1").revolution !== undefined) {
            tpj("#rev_slider_4_1").show().revolution({
                sliderType: "standard",
                sliderLayout: "fullwidth",
                delay: 7000,
                parallax: {
                    type: "scroll",
                    origo: "slidercenter",
                    speed: 1000,
                    levels: [5,10,15,20,25,30,35,40,45,50],
                    disable_onmobile: "on"
                  },

                  

                navigation: {
                    arrows: {
                        enable: true,
                        onHoverStop: false
                    },
                    onHoverStop: false,
                    bullets: {
                        enable: true,
                        style: "metis",
                        direction: "horizontal",
                        h_align: "center",
                        v_align: "bottom",
                        v_offset: 30,
                        space: 5,
                        tmp:
                          '<span class="tp-bullet-img-wrap">' +
                            '<span class="tp-bullet-image"></span>' +
                          '</span>'
                      }
                },
                responsiveLevels: [1240, 1024, 778, 480],
                gridwidth: [1240, 1024, 778, 480],
                gridheight: [700, 700, 500, 400]
                // responsiveLevels: [1920, 1240, 1024, 778, 480],
                // gridwidth:       [1920, 1240, 1024, 778, 480],
                // gridheight:      [1080, 698, 576, 438, 270]

            });
        }
    }


    // ===== Header fixed on scroll =====
    $(window).off('scroll').on('scroll', function () {
        if ($(window).scrollTop() >= 300) {
            $('.header_fixed_on_scroll').addClass('fixed-header');
        } else {
            $('.header_fixed_on_scroll').removeClass('fixed-header');
        }
    });
};

// ===== Google Map (se deja global si se usa inline) =====
window.myMap = function () {
    const mapProp = {
        center: new google.maps.LatLng(40.712775, -74.005973),
        zoom: 18,
    };
    new google.maps.Map(document.getElementById("googleMap"), mapProp);
};
