/*!
 * Start Bootstrap - Freelancer Bootstrap Theme (http://startbootstrap.com)
 * Code licensed under the Apache License v2.0.
 * For details, see http://www.apache.org/licenses/LICENSE-2.0.
 */

// jQuery for page scrolling feature - requires jQuery Easing plugin
$(function() {
    $('.page-scroll a').bind('click', function(event) {
        var $anchor = $(this);
        $('html, body').stop().animate({
            scrollTop: $($anchor.attr('href')).offset().top
        }, 1500, 'easeInOutExpo');
        event.preventDefault();
    });
});

// Floating label headings for the contact form
$(function() {
    $("body").on("input propertychange", ".floating-label-form-group", function(e) {
        $(this).toggleClass("floating-label-form-group-with-value", !! $(e.target).val());
    }).on("focus", ".floating-label-form-group", function() {
        $(this).addClass("floating-label-form-group-with-focus");
    }).on("blur", ".floating-label-form-group", function() {
        $(this).removeClass("floating-label-form-group-with-focus");
    });
});

// Highlight the top nav as scrolling occurs
$('body').scrollspy({
    target: '.navbar-fixed-top'
})

// Closes the Responsive Menu on Menu Item Click
$('.navbar-collapse ul li a').click(function() {
    $('.navbar-toggle:visible').click();
});

$('div[data-dismiss="modal"]').on('click', function () {
    window.history.pushState({}, '', '/');
});

$('a.post-link').on('click', function () {
    var url = $(this).data('url');
    var id = $(this).attr('href').substr('#postModal-'.length);

    window.history.pushState({}, '', url);

    // Remove all #disqus_thread divs.
    $('div#disqus_thread').remove();
    $('div#disqus_thread_'+ id).append('<div id="disqus_thread"></div>');

    DISQUS.reset({
        reload: true,
        config: function () {
            this.page.identifier = url;
            this.page.url = window.location.origin +'/'+ url;
        }
    });
});

window.onload = function () {
    var hash = window.location.pathname;
    var url = '/' + hash.replace(/\/$/, '').replace(/^\//, '') + '/';

    if ($('a[data-url="'+url+'"]').length) {
        $('a[data-url="'+url+'"]').first().click();
    } else {
        //window.history.pushState({}, '', '/');
    }
};