/* ═══════════════════════════════════════════════════
   Task 4 — Tabbed Content with Smooth Scroll
   jQuery Features: DOM Manipulation, Effects &
                    Animations, Event Handling
   ═══════════════════════════════════════════════════ */

$(document).ready(function () {

    var $nav       = $("#tabsNav");
    var $buttons   = $(".tab-btn");
    var $indicator = $("#tabIndicator");

    // ── Move indicator to active tab (CSS Manipulation) ──
    function moveIndicator($btn) {
        var left  = $btn.position().left;
        var width = $btn.outerWidth();
        $indicator.css({ left: left + "px", width: width + "px" });
    }

    // Initialize indicator position
    moveIndicator($buttons.filter(".active"));

    // ── Tab switching (Event Handling + DOM Manipulation + Effects) ──
    $buttons.on("click", function () {
        var $this  = $(this);
        var target = $this.data("tab");

        if ($this.hasClass("active")) return;

        // Update active tab
        $buttons.removeClass("active");
        $this.addClass("active");

        // Animate indicator
        moveIndicator($this);

        // Switch pane with animation
        var $currentPane = $(".tab-pane.active");
        var $nextPane    = $("#pane-" + target);

        $currentPane.fadeOut(200, function () {
            $(this).removeClass("active");
            $nextPane.addClass("active").hide().fadeIn(300);
        });

        // Smooth scroll to tabs container
        $("html, body").animate({
            scrollTop: $(".tabs-container").offset().top - 30
        }, 400);
    });

    // ── Keyboard navigation (Event Handling) ──
    $nav.on("keydown", ".tab-btn", function (e) {
        var $tabs = $buttons;
        var idx   = $tabs.index(this);

        if (e.key === "ArrowRight") {
            e.preventDefault();
            var next = (idx + 1) % $tabs.length;
            $tabs.eq(next).focus().trigger("click");
        } else if (e.key === "ArrowLeft") {
            e.preventDefault();
            var prev = (idx - 1 + $tabs.length) % $tabs.length;
            $tabs.eq(prev).focus().trigger("click");
        }
    });

    // ── FAQ accordion (Event Handling + Effects) ──
    $(".faq-q").on("click", function () {
        var $item = $(this).closest(".faq-item");
        var isOpen = $item.hasClass("open");

        // Close all
        $(".faq-item").removeClass("open");
        $(".faq-a").slideUp(250);

        if (!isOpen) {
            $item.addClass("open");
            $item.find(".faq-a").slideDown(300);
        }
    });

    // ── Recalculate indicator on window resize ──
    $(window).on("resize", function () {
        moveIndicator($buttons.filter(".active"));
    });
});
