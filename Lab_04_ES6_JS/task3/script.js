/* ═══════════════════════════════════════════════════
   Task 3 — Interactive Form Validation
   jQuery Features: Event Handling, CSS Manipulation,
                    DOM Manipulation
   ═══════════════════════════════════════════════════ */

$(document).ready(function () {

    var currentStep = 1;

    // ── Validation rules ──
    var validators = {
        fname:     function (v) { return $.trim(v).length >= 3; },
        femail:    function (v) { return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v); },
        fphone:    function (v) { return /^\d{11}$/.test(v); },
        fusername: function (v) { return /^[a-zA-Z0-9_]{4,20}$/.test(v); },
        fpass:     function (v) { return v.length >= 8 && /[A-Z]/.test(v) && /[a-z]/.test(v) && /\d/.test(v); },
        fconfirm:  function (v) { return v === $("#fpass").val() && v.length > 0; }
    };

    var step1Fields = ["fname", "femail", "fphone"];
    var step2Fields = ["fusername", "fpass", "fconfirm"];

    // ── Icon helpers ──
    function setIcon(id, valid) {
        var $icon = $("#" + id + "Icon");
        $icon.addClass("show");
        if (valid) {
            $icon.html("&#10004;").css("color", "var(--emerald)");
        } else {
            $icon.html("&#10006;").css("color", "var(--rose)");
        }
    }
    function clearIcon(id) {
        $("#" + id + "Icon").removeClass("show").html("");
    }

    // ── Validate single field (Event Handling + CSS Manipulation) ──
    function validateField(id) {
        var $input = $("#" + id);
        var $err   = $("#" + id + "Err");
        var value  = $input.val();
        var valid  = validators[id](value);

        if (value === "") {
            $input.removeClass("error success");
            $err.slideUp(200);
            clearIcon(id);
            return false;
        }

        if (valid) {
            $input.removeClass("error").addClass("success");
            $err.slideUp(200);
            setIcon(id, true);
        } else {
            $input.removeClass("success").addClass("error");
            $err.slideDown(200);
            setIcon(id, false);
        }
        return valid;
    }

    // ── Blur validation on all fields ──
    $.each(validators, function (id) {
        $("#" + id).on("blur", function () {
            validateField(id);
        });
        $("#" + id).on("input", function () {
            var $this = $(this);
            $this.removeClass("error");
            $("#" + id + "Err").slideUp(150);
            // Live validate if already has success/error
            if ($this.hasClass("success") || $this.hasClass("error")) {
                validateField(id);
            }
        });
    });

    // ── Password strength meter (CSS Manipulation + DOM Manipulation) ──
    $("#fpass").on("input", function () {
        var val = $(this).val();
        var score = 0;

        if (val.length >= 8) score++;
        if (val.length >= 12) score++;
        if (/[A-Z]/.test(val)) score++;
        if (/[a-z]/.test(val)) score++;
        if (/\d/.test(val)) score++;
        if (/[^A-Za-z0-9]/.test(val)) score++;

        var pct = Math.min((score / 6) * 100, 100);
        var color, label;

        if (val.length === 0) {
            pct = 0; label = "Password strength"; color = "transparent";
        } else if (pct <= 30) {
            color = "var(--rose)"; label = "Weak";
        } else if (pct <= 60) {
            color = "var(--amber)"; label = "Fair";
        } else if (pct <= 85) {
            color = "var(--cyan)"; label = "Strong";
        } else {
            color = "var(--emerald)"; label = "Excellent";
        }

        $("#strengthFill").css({ width: pct + "%", background: color });
        $("#strengthLabel").text(label).css("color", color === "transparent" ? "" : color);
    });

    // ── Step navigation (DOM Manipulation) ──
    function goToStep(step) {
        $(".form-step").removeClass("active");
        $(".form-step[data-step='" + step + "']").addClass("active");

        $(".progress-step").each(function () {
            var s = $(this).data("step");
            $(this).removeClass("active done");
            if (s < step) $(this).addClass("done");
            if (s === step) $(this).addClass("active");
        });

        // Animate progress lines
        if (step >= 2) { $("#progLine1").css("width", "100%"); } else { $("#progLine1").css("width", "0%"); }
        if (step >= 3) { $("#progLine2").css("width", "100%"); } else { $("#progLine2").css("width", "0%"); }

        currentStep = step;
    }

    // ── Next button click ──
    $(".next-btn").on("click", function () {
        var nextStep = $(this).data("next");
        var fields = (nextStep === 2) ? step1Fields : step2Fields;
        var allValid = true;

        $.each(fields, function (i, id) {
            if (!validateField(id)) allValid = false;
        });

        if (allValid) goToStep(nextStep);
    });

    // ── Previous button ──
    $(".prev-btn").on("click", function () {
        goToStep($(this).data("prev"));
    });

    // ── Form submit (Event Handling) ──
    $("#regForm").on("submit", function (e) {
        e.preventDefault();

        var allValid = true;
        $.each(step2Fields, function (i, id) {
            if (!validateField(id)) allValid = false;
        });

        if (allValid) {
            // Show success step
            $("#welcomeName").text($.trim($("#fname").val()).split(" ")[0]);
            goToStep(3);
        }
    });

    // ── Reset ──
    $("#resetBtn").on("click", function () {
        $("#regForm")[0].reset();
        $(".input-field").removeClass("error success");
        $(".field-error").hide();
        $(".field-icon").removeClass("show").html("");
        $("#strengthFill").css("width", "0%");
        $("#strengthLabel").text("Password strength").css("color", "");
        goToStep(1);
    });
});
