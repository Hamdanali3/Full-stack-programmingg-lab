/* ═══════════════════════════════════════════════════
   Task 5 — Chained Style Editor
   jQuery Features: CSS Manipulation, Chaining,
                    Event Handling
   ═══════════════════════════════════════════════════ */

$(document).ready(function () {

    var $block = $("#textBlock");

    // ── Range controls (CSS Manipulation + Chaining) ──
    $("#fontRange").on("input", function () {
        var val = $(this).val();
        $("#fontVal").text(val + "px");
        $block.css("font-size", val + "px").fadeOut(60).fadeIn(60);
    });

    $("#spacingRange").on("input", function () {
        var val = $(this).val();
        $("#spacingVal").text(val + "px");
        $block.css("letter-spacing", val + "px");
    });

    $("#lineRange").on("input", function () {
        var val = ($(this).val() / 10).toFixed(1);
        $("#lineVal").text(val);
        $block.css("line-height", val);
    });

    // ── Color swatches (Event Handling + CSS Manipulation) ──
    $("#textColors").on("click", ".swatch", function () {
        var color = $(this).data("color");
        $("#textColors .swatch").removeClass("active");
        $(this).addClass("active");
        // Chaining: css + animate
        $block
            .css("color", color)
            .animate({ opacity: 0.7 }, 100)
            .animate({ opacity: 1 }, 100);
    });

    $("#bgColors").on("click", ".swatch", function () {
        var color = $(this).data("color");
        $("#bgColors .swatch").removeClass("active");
        $(this).addClass("active");
        $block
            .css("background", color)
            .animate({ opacity: 0.7 }, 100)
            .animate({ opacity: 1 }, 100);
    });

    // ── Toggle buttons (Chaining + CSS Manipulation) ──
    $("#btnBold").on("click", function () {
        $(this).toggleClass("active");
        var isBold = $(this).hasClass("active");
        $block
            .css("font-weight", isBold ? "bold" : "normal")
            .fadeOut(60).fadeIn(60);
    });

    $("#btnItalic").on("click", function () {
        $(this).toggleClass("active");
        $block
            .css("font-style", $(this).hasClass("active") ? "italic" : "normal")
            .fadeOut(60).fadeIn(60);
    });

    $("#btnUnderline").on("click", function () {
        $(this).toggleClass("active");
        $block
            .css("text-decoration", $(this).hasClass("active") ? "underline" : "none")
            .fadeOut(60).fadeIn(60);
    });

    $("#btnUppercase").on("click", function () {
        $(this).toggleClass("active");
        $block
            .css("text-transform", $(this).hasClass("active") ? "uppercase" : "none")
            .fadeOut(60).fadeIn(60);
    });

    $("#btnShadow").on("click", function () {
        $(this).toggleClass("active");
        $block
            .css("text-shadow", $(this).hasClass("active") ? "0 0 20px rgba(99,102,241,0.25), 0 0 40px rgba(139,92,246,0.15)" : "none")
            .fadeOut(60).fadeIn(60);
    });

    // ── Presets (Chaining — multiple .css() calls) ──
    var presets = {
        neon: {
            "font-size": "20px", "color": "#0891b2", "background": "#f0fdfa",
            "letter-spacing": "2px", "line-height": "1.8", "font-weight": "bold",
            "font-style": "normal", "text-decoration": "none", "text-transform": "none",
            "text-shadow": "0 0 10px rgba(8,145,178,0.3), 0 0 30px rgba(8,145,178,0.15)"
        },
        elegant: {
            "font-size": "19px", "color": "#1e293b", "background": "#f5f3ff",
            "letter-spacing": "1px", "line-height": "2.0", "font-weight": "normal",
            "font-style": "italic", "text-decoration": "none", "text-transform": "none",
            "text-shadow": "none"
        },
        retro: {
            "font-size": "22px", "color": "#b45309", "background": "#fffbeb",
            "letter-spacing": "3px", "line-height": "1.6", "font-weight": "bold",
            "font-style": "normal", "text-decoration": "none", "text-transform": "uppercase",
            "text-shadow": "2px 2px 0px rgba(180,83,9,0.15)"
        },
        minimal: {
            "font-size": "15px", "color": "#64748b", "background": "#f8fafc",
            "letter-spacing": "0px", "line-height": "1.8", "font-weight": "normal",
            "font-style": "normal", "text-decoration": "none", "text-transform": "none",
            "text-shadow": "none"
        }
    };

    $(".preset-btn").on("click", function () {
        var name = $(this).data("preset");
        var styles = presets[name];

        // Apply using chaining
        $block
            .css(styles)
            .fadeOut(150)
            .fadeIn(150);

        // Sync UI controls
        var fSize = parseInt(styles["font-size"]);
        $("#fontRange").val(fSize);
        $("#fontVal").text(fSize + "px");

        var lSpacing = parseInt(styles["letter-spacing"]);
        $("#spacingRange").val(lSpacing);
        $("#spacingVal").text(lSpacing + "px");

        var lh = parseFloat(styles["line-height"]) * 10;
        $("#lineRange").val(lh);
        $("#lineVal").text(parseFloat(styles["line-height"]).toFixed(1));

        // Reset toggles
        $(".toggle-btn").removeClass("active");
        if (styles["font-weight"] === "bold") $("#btnBold").addClass("active");
        if (styles["font-style"] === "italic") $("#btnItalic").addClass("active");
        if (styles["text-decoration"] === "underline") $("#btnUnderline").addClass("active");
        if (styles["text-transform"] === "uppercase") $("#btnUppercase").addClass("active");
        if (styles["text-shadow"] !== "none") $("#btnShadow").addClass("active");
    });

    // ── Reset all (Chaining) ──
    $("#resetAll").on("click", function () {
        $block
            .css({
                "font-size": "16px",
                "color": "#1e293b",
                "background": "#f8fafc",
                "letter-spacing": "0px",
                "line-height": "1.7",
                "font-weight": "normal",
                "font-style": "normal",
                "text-decoration": "none",
                "text-transform": "none",
                "text-shadow": "none"
            })
            .fadeOut(200)
            .fadeIn(200);

        // Reset controls
        $("#fontRange").val(16); $("#fontVal").text("16px");
        $("#spacingRange").val(0); $("#spacingVal").text("0px");
        $("#lineRange").val(17); $("#lineVal").text("1.7");
        $(".swatch").removeClass("active");
        $("#textColors .swatch:first").addClass("active");
        $("#bgColors .swatch:first").addClass("active");
        $(".toggle-btn").removeClass("active");
    });
});
