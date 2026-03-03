/* ═══════════════════════════════════════════════════
   Task 7 — Drag & Drop Kanban
   jQuery Features: DOM Manipulation, Event Handling,
                    CSS Manipulation, Effects
   ═══════════════════════════════════════════════════ */

$(document).ready(function () {

    var idCounter = 0;

    // ── Helpers ──
    function timeStamp() {
        var d = new Date();
        var h = d.getHours(), m = d.getMinutes();
        return (h < 10 ? "0" : "") + h + ":" + (m < 10 ? "0" : "") + m;
    }

    function updateCounts() {
        $(".column").each(function () {
            var n = $(this).find(".task-card").length;
            $(this).find(".col-count").text(n);
        });
    }

    function showEmptyState() {
        $(".card-list").each(function () {
            if ($(this).find(".task-card").length === 0 && $(this).find(".empty-col").length === 0) {
                $(this).append('<div class="empty-col">Drop tasks here</div>');
            }
        });
    }

    function removeEmptyState($list) {
        $list.find(".empty-col").remove();
    }

    // ── Add task ──
    function addTask() {
        var title = $.trim($("#taskInput").val());
        if (!title) {
            $("#taskInput").css("border-color", "var(--accent-rose)")
                .animate({ opacity: 0.6 }, 100)
                .animate({ opacity: 1 }, 100);
            return;
        }
        var priority = $("#prioritySelect").val();
        idCounter++;

        var card = $(
            '<div class="task-card" draggable="true" data-id="' + idCounter + '">'
          + '  <div class="card-title">' + $("<span>").text(title).html() + '</div>'
          + '  <div class="card-meta">'
          + '    <span class="priority-tag ' + priority + '">' + priority + '</span>'
          + '    <span class="card-time">' + timeStamp() + '</span>'
          + '  </div>'
          + '  <button class="delete-btn" title="Delete">&times;</button>'
          + '</div>'
        );

        removeEmptyState($("#todoList"));
        $("#todoList").append(card);
        card.hide().fadeIn(300);

        $("#taskInput").val("").css("border-color", "");
        updateCounts();
    }

    $("#addTaskBtn").on("click", addTask);
    $("#taskInput").on("keypress", function (e) {
        if (e.which === 13) addTask();
    });

    // ── Delete task ──
    $(document).on("click", ".delete-btn", function (e) {
        e.stopPropagation();
        var $card = $(this).closest(".task-card");
        $card.animate({ opacity: 0, height: 0, padding: 0, margin: 0 }, 250, function () {
            $card.remove();
            updateCounts();
            showEmptyState();
        });
    });

    // ═══════════════════════════════════════════════
    //  Drag & Drop  (HTML5 drag events via jQuery)
    // ═══════════════════════════════════════════════
    var dragSrcEl = null;

    // ── dragstart ──
    $(document).on("dragstart", ".task-card", function (e) {
        dragSrcEl = this;
        $(this).addClass("dragging");
        e.originalEvent.dataTransfer.effectAllowed = "move";
        e.originalEvent.dataTransfer.setData("text/plain", $(this).data("id"));
    });

    // ── dragend ──
    $(document).on("dragend", ".task-card", function () {
        $(this).removeClass("dragging");
        $(".column").removeClass("drag-over");
        $(".drag-placeholder").remove();
    });

    // ── dragover / dragenter on card-list ──
    $(document).on("dragover", ".card-list", function (e) {
        e.preventDefault();
        e.originalEvent.dataTransfer.dropEffect = "move";

        var $list = $(this);
        $list.closest(".column").addClass("drag-over");

        // Insert placeholder at correct position
        $(".drag-placeholder").remove();
        var $afterEl = getDragAfterElement($list, e.originalEvent.clientY);
        var placeholder = '<div class="drag-placeholder"></div>';
        if ($afterEl == null) {
            $list.append(placeholder);
        } else {
            $afterEl.before(placeholder);
        }
    });

    $(document).on("dragleave", ".card-list", function (e) {
        // Only remove if actually leaving the list
        var rect = this.getBoundingClientRect();
        var x = e.originalEvent.clientX, y = e.originalEvent.clientY;
        if (x < rect.left || x > rect.right || y < rect.top || y > rect.bottom) {
            $(this).closest(".column").removeClass("drag-over");
            $(this).find(".drag-placeholder").remove();
        }
    });

    // ── drop ──
    $(document).on("drop", ".card-list", function (e) {
        e.preventDefault();
        var $list = $(this);
        $list.closest(".column").removeClass("drag-over");

        if (!dragSrcEl) return;

        removeEmptyState($list);
        var $placeholder = $list.find(".drag-placeholder");
        if ($placeholder.length) {
            $placeholder.replaceWith(dragSrcEl);
        } else {
            $list.append(dragSrcEl);
        }

        $(dragSrcEl).removeClass("dragging").hide().fadeIn(200);
        dragSrcEl = null;

        updateCounts();
        showEmptyState();
    });

    // Helper: find element after cursor Y
    function getDragAfterElement($list, y) {
        var closest = null;
        var closestOffset = Number.NEGATIVE_INFINITY;

        $list.children(".task-card").not(".dragging").each(function () {
            var box = this.getBoundingClientRect();
            var offset = y - box.top - box.height / 2;
            if (offset < 0 && offset > closestOffset) {
                closestOffset = offset;
                closest = $(this);
            }
        });
        return closest;
    }

    // ── Seed demo tasks ──
    var demos = [
        { title: "Research jQuery selectors", priority: "low" },
        { title: "Build responsive gallery", priority: "medium" },
        { title: "Fix CORS issue on API call", priority: "high" },
        { title: "Write unit tests", priority: "medium" },
        { title: "Deploy to staging server", priority: "high" }
    ];
    $.each(demos, function (i, d) {
        idCounter++;
        var card = $(
            '<div class="task-card" draggable="true" data-id="' + idCounter + '">'
          + '  <div class="card-title">' + d.title + '</div>'
          + '  <div class="card-meta">'
          + '    <span class="priority-tag ' + d.priority + '">' + d.priority + '</span>'
          + '    <span class="card-time">' + timeStamp() + '</span>'
          + '  </div>'
          + '  <button class="delete-btn" title="Delete">&times;</button>'
          + '</div>'
        );
        if (i < 3) { removeEmptyState($("#todoList")); $("#todoList").append(card); }
        else if (i < 4) { removeEmptyState($("#progressList")); $("#progressList").append(card); }
        else { removeEmptyState($("#doneList")); $("#doneList").append(card); }
    });

    updateCounts();
    showEmptyState();

});
