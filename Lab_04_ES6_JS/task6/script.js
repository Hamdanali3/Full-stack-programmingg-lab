/* ═══════════════════════════════════════════════════
   Task 6 — API Data Fetcher
   jQuery Features: Ajax, DOM Manipulation,
                    Event Handling
   ═══════════════════════════════════════════════════ */

$(document).ready(function () {

    var API = "https://jsonplaceholder.typicode.com";
    var allPosts = [];
    var filtered = [];
    var perPage = 9;
    var currentPage = 1;

    // ── Fetch all posts (Ajax) ──
    function fetchPosts() {
        showSkeletons();
        $.ajax({
            url: API + "/posts",
            method: "GET",
            dataType: "json",
            success: function (data) {
                allPosts = data;
                applyFilters();
            },
            error: function () {
                $("#postGrid").html('<div class="empty-state"><p>Failed to load posts. Try refreshing.</p></div>');
            }
        });
    }

    // ── Skeleton loading ──
    function showSkeletons() {
        var html = "";
        for (var i = 0; i < perPage; i++) {
            html += '<div class="skeleton-card">'
                  + '<div class="skeleton-line w60"></div>'
                  + '<div class="skeleton-line w100"></div>'
                  + '<div class="skeleton-line w80"></div>'
                  + '<div class="skeleton-line w40"></div>'
                  + '</div>';
        }
        $("#postGrid").html(html);
        $("#pagination").empty();
    }

    // ── Filter + Sort ──
    function applyFilters() {
        var query = $("#searchInput").val().toLowerCase().trim();
        var sort  = $("#sortSelect").val();

        filtered = allPosts.filter(function (p) {
            return p.title.toLowerCase().indexOf(query) !== -1
                || p.body.toLowerCase().indexOf(query) !== -1;
        });

        // Sort
        filtered.sort(function (a, b) {
            if (sort === "id-asc")    return a.id - b.id;
            if (sort === "id-desc")   return b.id - a.id;
            if (sort === "title-asc") return a.title.localeCompare(b.title);
            return b.title.localeCompare(a.title);
        });

        currentPage = 1;
        renderPage();
    }

    // ── Render current page ──
    function renderPage() {
        var start = (currentPage - 1) * perPage;
        var page  = filtered.slice(start, start + perPage);

        if (page.length === 0) {
            $("#postGrid").html(
                '<div class="empty-state">'
              + '<svg width="48" height="48" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="24" cy="24" r="20"/><path d="M16 20h0m16 0h0M17 30c2 3 10 3 12 0"/></svg>'
              + '<p>No posts match your search.</p>'
              + '</div>'
            );
            $("#pagination").empty();
            updateStats(0);
            return;
        }

        var html = "";
        $.each(page, function (i, post) {
            html += '<div class="post-card" data-id="' + post.id + '" style="animation-delay:' + (i * 40) + 'ms">'
                  + '<span class="card-id">#' + post.id + ' · User ' + post.userId + '</span>'
                  + '<h3>' + post.title + '</h3>'
                  + '<p>' + post.body + '</p>'
                  + '<span class="read-more">Read more <svg width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M1 7h12m0 0l-4-4m4 4l-4 4"/></svg></span>'
                  + '</div>';
        });
        $("#postGrid").html(html);

        // Stagger fade-in
        $(".post-card").each(function (i) {
            $(this).css("opacity", 0).delay(i * 50).animate({ opacity: 1 }, 300);
        });

        renderPagination();
        updateStats(page.length);
    }

    function updateStats(shown) {
        $("#stats").html("Showing <span>" + shown + "</span> of <span>" + filtered.length + "</span> posts (total <span>" + allPosts.length + "</span>)");
    }

    // ── Pagination ──
    function renderPagination() {
        var total = Math.ceil(filtered.length / perPage);
        if (total <= 1) { $("#pagination").empty(); return; }

        var html = "";
        // Prev
        if (currentPage > 1)
            html += '<button class="page-btn" data-p="' + (currentPage - 1) + '">&laquo;</button>';
        for (var i = 1; i <= total; i++) {
            if (i === 1 || i === total || (i >= currentPage - 2 && i <= currentPage + 2)) {
                html += '<button class="page-btn' + (i === currentPage ? ' active' : '') + '" data-p="' + i + '">' + i + '</button>';
            } else if (i === currentPage - 3 || i === currentPage + 3) {
                html += '<span class="page-btn" style="cursor:default;">…</span>';
            }
        }
        if (currentPage < total)
            html += '<button class="page-btn" data-p="' + (currentPage + 1) + '">&raquo;</button>';

        $("#pagination").html(html);
    }

    // ── Events ──
    var debounce;
    $("#searchInput").on("input", function () {
        clearTimeout(debounce);
        debounce = setTimeout(applyFilters, 300);
    });

    $("#sortSelect").on("change", applyFilters);

    $("#refreshBtn").on("click", function () {
        $(this).find("svg").css("transform", "rotate(360deg)");
        setTimeout(function () { $("#refreshBtn svg").css("transform", ""); }, 500);
        fetchPosts();
    });

    $("#pagination").on("click", ".page-btn[data-p]", function () {
        currentPage = parseInt($(this).data("p"));
        renderPage();
        $("html, body").animate({ scrollTop: 0 }, 250);
    });

    // ── Detail modal (Ajax for comments) ──
    $("#postGrid").on("click", ".post-card", function () {
        var id = $(this).data("id");
        var post = allPosts.find(function (p) { return p.id === id; });
        if (!post) return;

        $("#modalBadge").text("Post #" + post.id);
        $("#modalTitle").text(post.title);
        $("#modalBody").text(post.body);
        $("#modalComments").html('<div class="skeleton-line w80"></div><div class="skeleton-line w60"></div>');
        $("#modal").addClass("open");

        // Fetch comments
        $.getJSON(API + "/posts/" + id + "/comments", function (comments) {
            var ch = "";
            $.each(comments, function (_, c) {
                ch += '<div class="comment-card">'
                    + '<div class="c-name">' + c.name + '</div>'
                    + '<div class="c-email">' + c.email + '</div>'
                    + '<div class="c-body">' + c.body + '</div>'
                    + '</div>';
            });
            $("#modalComments").html(ch || '<p class="text-dim">No comments.</p>');
        });
    });

    $("#modalClose, #modal").on("click", function (e) {
        if (e.target === this) $("#modal").removeClass("open");
    });

    $(document).on("keydown", function (e) {
        if (e.key === "Escape") $("#modal").removeClass("open");
    });

    // ── Init ──
    fetchPosts();

});
