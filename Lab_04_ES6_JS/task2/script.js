/* ═══════════════════════════════════════════════════
   Task 2 — Animated Image Gallery
   jQuery Features: Effects & Animations, DOM
                    Manipulation, Chaining
   ═══════════════════════════════════════════════════ */

$(document).ready(function () {

    // ── Data ──
    var captions = [
        { title: "Cosmic Nebula",   desc: "A breathtaking view of interstellar gas and dust illuminated by newborn stars." },
        { title: "Mountain Peaks",  desc: "Snow-capped mountains piercing through the clouds at sunrise." },
        { title: "Ocean Horizon",   desc: "The infinite blue where sky and sea merge into one." },
        { title: "Desert Dunes",    desc: "Golden sand formations sculpted by the eternal desert wind." },
        { title: "Northern Lights", desc: "The mesmerizing aurora borealis dancing across the Arctic sky." },
        { title: "Forest Canopy",   desc: "Sunlight filtering through an ancient old-growth forest." }
    ];

    var $slides   = $(".slide");
    var $thumbs   = $(".thumb");
    var total     = $slides.length;
    var current   = 0;
    var animating = false;
    var autoPlay  = false;
    var autoTimer = null;
    var progressTimer = null;
    var AUTO_INTERVAL = 4000;

    // ── Show slide (Effects & Animations + Chaining) ──
    function goToSlide(index) {
        if (animating || index === current) return;
        animating = true;

        // Crossfade using chaining
        $slides.eq(current)
            .removeClass("active")
            .css("z-index", 1);
        $slides.eq(index)
            .addClass("active")
            .css("z-index", 2);

        // Update caption with fade (Chaining + DOM Manipulation)
        $("#captionTitle, #captionDesc").animate({ opacity: 0 }, 200, function () {
            $("#captionTitle").text(captions[index].title);
            $("#captionDesc").text(captions[index].desc);
            $("#captionTitle, #captionDesc").animate({ opacity: 1 }, 200);
        });

        // Update counter
        $("#currentNum").text(index + 1);

        // Update thumbnails (DOM + CSS Manipulation)
        $thumbs.removeClass("active");
        $thumbs.eq(index).addClass("active");

        // Scroll thumb into view
        var $activeThumb = $thumbs.eq(index);
        var $strip = $("#thumbStrip");
        var scrollPos = $activeThumb.position().left + $strip.scrollLeft() - $strip.width() / 2 + $activeThumb.outerWidth() / 2;
        $strip.animate({ scrollLeft: scrollPos }, 300);

        current = index;
        setTimeout(function () { animating = false; }, 700);

        // Reset auto-play progress
        if (autoPlay) startProgress();
    }

    // ── Navigation ──
    function nextSlide() { goToSlide((current + 1) % total); }
    function prevSlide() { goToSlide((current - 1 + total) % total); }

    // ── Event Handling ──
    $("#nextBtn").on("click", nextSlide);
    $("#prevBtn").on("click", prevSlide);

    $thumbs.on("click", function () {
        goToSlide($(this).data("index"));
    });

    // Keyboard navigation
    $(document).on("keydown", function (e) {
        if (e.key === "ArrowRight") nextSlide();
        else if (e.key === "ArrowLeft") prevSlide();
        else if (e.key === " ") { e.preventDefault(); toggleAutoPlay(); }
    });

    // ── Auto-play with progress bar ──
    function startProgress() {
        clearInterval(progressTimer);
        clearTimeout(autoTimer);
        $("#progressFill").stop().css("width", "0%");
        $("#progressFill").animate({ width: "100%" }, AUTO_INTERVAL, "linear");
        autoTimer = setTimeout(function () {
            nextSlide();
        }, AUTO_INTERVAL);
    }

    function stopProgress() {
        clearInterval(progressTimer);
        clearTimeout(autoTimer);
        $("#progressFill").stop().css("width", "0%");
    }

    function toggleAutoPlay() {
        autoPlay = !autoPlay;
        if (autoPlay) {
            $("#playIcon").hide();
            $("#pauseIcon").show();
            $("#autoLabel").text("Pause");
            startProgress();
        } else {
            $("#playIcon").show();
            $("#pauseIcon").hide();
            $("#autoLabel").text("Auto");
            stopProgress();
        }
    }

    $("#autoPlayBtn").on("click", toggleAutoPlay);

    // Pause on hover
    $(".gallery-main").on("mouseenter", function () {
        if (autoPlay) stopProgress();
    }).on("mouseleave", function () {
        if (autoPlay) startProgress();
    });

    // ── Touch swipe support ──
    var touchStartX = 0;
    $(".gallery-main").on("touchstart", function (e) {
        touchStartX = e.originalEvent.touches[0].clientX;
    }).on("touchend", function (e) {
        var diff = touchStartX - e.originalEvent.changedTouches[0].clientX;
        if (Math.abs(diff) > 50) {
            if (diff > 0) nextSlide();
            else prevSlide();
        }
    });

    // ── Init ──
    $("#totalNum").text(total);
});
