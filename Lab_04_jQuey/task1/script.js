/* ═══════════════════════════════════════════════════
   Task 1 — Dynamic List Manager
   jQuery Features: DOM Manipulation, Event Handling,
                    CSS Manipulation
   ═══════════════════════════════════════════════════ */

$(document).ready(function () {

    // ── State ──
    var itemId = 0;
    var currentFilter = "all";

    // ── Helper: format time ──
    function timeNow() {
        var d = new Date();
        var h = d.getHours();
        var m = String(d.getMinutes()).padStart(2, "0");
        var ampm = h >= 12 ? "PM" : "AM";
        h = h % 12 || 12;
        return h + ":" + m + " " + ampm;
    }

    // ── Update counter stats (DOM Manipulation) ──
    function updateStats() {
        var total = $(".list-item").length;
        var done  = $(".list-item.completed").length;
        var active = total - done;
        $("#totalCount").text(total);
        $("#activeCount").text(active);
        $("#doneCount").text(done);

        // Show/hide empty state
        if (total === 0) {
            $("#emptyState").fadeIn(300);
        } else {
            $("#emptyState").hide();
        }
    }

    // ── Apply filter & search (DOM + CSS Manipulation) ──
    function applyFilterAndSearch() {
        var query = $.trim($("#searchInput").val().toLowerCase());

        $(".list-item").each(function () {
            var $item = $(this);
            var text  = $item.find(".item-text").text().toLowerCase();
            var isCompleted = $item.hasClass("completed");

            var matchSearch = query === "" || text.indexOf(query) > -1;
            var matchFilter = currentFilter === "all" ||
                              (currentFilter === "completed" && isCompleted) ||
                              (currentFilter === "active" && !isCompleted);

            if (matchSearch && matchFilter) {
                $item.slideDown(200);
            } else {
                $item.slideUp(200);
            }
        });
    }

    // ── Add item (DOM Manipulation + Event Handling) ──
    function addItem() {
        var value = $.trim($("#itemInput").val());
        if (value === "") {
            $("#itemInput").addClass("error").focus();
            return;
        }
        $("#itemInput").removeClass("error");

        var priority = $("#prioritySelect").val();
        itemId++;

        var $item = $(
            '<div class="list-item priority-' + priority + '" data-id="' + itemId + '">' +
                '<div class="item-check">' +
                    '<svg viewBox="0 0 24 24"><path d="M5 13l4 4L19 7"/></svg>' +
                '</div>' +
                '<span class="item-text"></span>' +
                '<span class="item-priority ' + priority + '">' + priority + '</span>' +
                '<span class="item-time">' + timeNow() + '</span>' +
                '<button class="item-delete" title="Delete">' +
                    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">' +
                        '<path d="M18 6L6 18M6 6l12 12"/>' +
                    '</svg>' +
                '</button>' +
            '</div>'
        );

        $item.find(".item-text").text(value);
        $item.hide();
        $("#emptyState").hide();
        $("#listArea").prepend($item);
        $item.slideDown(350);

        // Clear input
        $("#itemInput").val("").focus();
        updateStats();
        applyFilterAndSearch();
    }

    // ── Event: Add button click ──
    $("#addBtn").on("click", addItem);

    // ── Event: Enter key on input ──
    $("#itemInput").on("keypress", function (e) {
        if (e.which === 13) addItem();
    });

    // ── Event: Remove error on typing ──
    $("#itemInput").on("input", function () {
        $(this).removeClass("error");
    });

    // ── Event: Toggle complete (Event Handling + CSS Manipulation) ──
    $("#listArea").on("click", ".item-check", function () {
        var $check = $(this);
        var $li = $check.closest(".list-item");

        $check.toggleClass("checked");
        $li.toggleClass("completed");

        // Animate position change
        $li.css("opacity", "0.5");
        setTimeout(function () {
            $li.css("opacity", "1");
        }, 200);

        updateStats();
        applyFilterAndSearch();
    });

    // ── Event: Delete item ──
    $("#listArea").on("click", ".item-delete", function () {
        var $li = $(this).closest(".list-item");
        $li.css({
            "transform": "translateX(40px)",
            "opacity": "0"
        });
        setTimeout(function () {
            $li.slideUp(250, function () {
                $(this).remove();
                updateStats();
            });
        }, 200);
    });

    // ── Event: Filter buttons ──
    $(".filter-btn").on("click", function () {
        $(".filter-btn").removeClass("active");
        $(this).addClass("active");
        currentFilter = $(this).data("filter");
        applyFilterAndSearch();
    });

    // ── Event: Search input ──
    $("#searchInput").on("input", function () {
        applyFilterAndSearch();
    });

    // ── Event: Clear done items ──
    $("#clearDone").on("click", function () {
        $(".list-item.completed").each(function (i) {
            var $el = $(this);
            setTimeout(function () {
                $el.slideUp(250, function () {
                    $(this).remove();
                    updateStats();
                });
            }, i * 80);
        });
    });

    // ── Event: Hover CSS manipulation via jQuery ──
    $("#listArea").on("mouseenter", ".list-item", function () {
        $(this).css("box-shadow", "0 4px 20px rgba(99,102,241,0.08)");
    }).on("mouseleave", ".list-item", function () {
        $(this).css("box-shadow", "none");
    });

    // ── Initialize ──
    updateStats();
});
