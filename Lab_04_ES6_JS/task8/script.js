/* ═══════════════════════════════════════════════════
   Task 8 — Interactive Quiz
   jQuery Features: DOM Manipulation, Event Handling,
                    Effects & Animations, CSS Manipulation
   ═══════════════════════════════════════════════════ */

$(document).ready(function () {

    // ── Question bank ──
    var questions = [
        {
            q: "Which keyword declares a block-scoped variable that can be reassigned?",
            opts: ["var", "let", "const", "static"],
            ans: 1,
            explain: "'let' declares a block-scoped variable that can be reassigned, unlike 'const'."
        },
        {
            q: "What does '===' check in JavaScript?",
            opts: ["Value only", "Type only", "Value and type", "Reference only"],
            ans: 2,
            explain: "'===' is the strict equality operator that checks both value and type without coercion."
        },
        {
            q: "Which array method returns a new array with elements that pass a test?",
            opts: [".map()", ".filter()", ".reduce()", ".forEach()"],
            ans: 1,
            explain: ".filter() creates a new array with all elements that pass the provided callback test."
        },
        {
            q: "What is the output of: typeof null?",
            opts: ["'null'", "'undefined'", "'object'", "'boolean'"],
            ans: 2,
            explain: "This is a well-known JavaScript bug — typeof null returns 'object' due to legacy reasons."
        },
        {
            q: "Which method converts a JSON string into a JavaScript object?",
            opts: ["JSON.stringify()", "JSON.parse()", "JSON.convert()", "JSON.toObject()"],
            ans: 1,
            explain: "JSON.parse() parses a JSON string and constructs the JavaScript value or object."
        },
        {
            q: "What does the 'this' keyword refer to inside an arrow function?",
            opts: ["The function itself", "The global object", "The enclosing lexical scope", "undefined"],
            ans: 2,
            explain: "Arrow functions do not have their own 'this'; they inherit it from the enclosing lexical scope."
        },
        {
            q: "Which ES6 feature allows extracting values from arrays or objects into variables?",
            opts: ["Spread operator", "Destructuring", "Template literals", "Rest parameters"],
            ans: 1,
            explain: "Destructuring assignment unpacks values from arrays or properties from objects into distinct variables."
        },
        {
            q: "What does Promise.all() return if one promise rejects?",
            opts: ["All resolved values", "The first resolved", "A rejected promise", "undefined"],
            ans: 2,
            explain: "Promise.all() short-circuits: if any promise rejects, the whole Promise.all rejects with that reason."
        },
        {
            q: "Which jQuery method is used to make an AJAX GET request?",
            opts: ["$.post()", "$.ajax()", "$.get()", "$.fetch()"],
            ans: 2,
            explain: "$.get() is the shorthand jQuery method for making HTTP GET requests."
        },
        {
            q: "What is the event delegation pattern in jQuery?",
            opts: [
                "Binding events to each child",
                "Binding events on a parent for children",
                "Removing events from elements",
                "Triggering events programmatically"
            ],
            ans: 1,
            explain: "Event delegation binds a handler on a parent element and uses event bubbling to handle child events."
        }
    ];

    var currentQ = 0;
    var score = 0;
    var timePerQ = 15;
    var timer = null;
    var timeLeft = 0;
    var answered = false;
    var results = [];
    var totalTime = 0;

    var letters = ["A", "B", "C", "D"];

    // ── Difficulty ──
    $(".diff-btn").on("click", function () {
        $(".diff-btn").removeClass("active");
        $(this).addClass("active");
        timePerQ = parseInt($(this).data("time"));
    });

    // ── Start ──
    $("#startBtn").on("click", function () {
        currentQ = 0; score = 0; results = []; totalTime = 0;
        shuffleArray(questions);
        $("#startScreen").fadeOut(250, function () {
            $("#quizScreen").fadeIn(300);
            loadQuestion();
        });
    });

    // ── Load question ──
    function loadQuestion() {
        answered = false;
        var q = questions[currentQ];

        $("#qNum").text("Question " + (currentQ + 1) + " / " + questions.length);
        $("#scoreLive").text(score);
        $("#progressFill").css("width", ((currentQ) / questions.length * 100) + "%");

        $("#questionText").text(q.q);

        var html = "";
        q.opts.forEach(function (opt, i) {
            html += '<button class="option-btn" data-idx="' + i + '">'
                  + '<span class="opt-letter">' + letters[i] + '</span>'
                  + '<span>' + opt + '</span>'
                  + '</button>';
        });
        $("#options").html(html);
        $("#feedback").hide().removeClass("correct-fb wrong-fb");
        $("#nextBtn").hide();

        // Animate in
        $("#questionCard").css("opacity", 0).animate({ opacity: 1 }, 300);

        startTimer();
    }

    // ── Timer ──
    function startTimer() {
        timeLeft = timePerQ;
        $("#timerText").text(timeLeft);
        $("#timerFill").css("width", "100%").removeClass("warn danger");

        clearInterval(timer);
        timer = setInterval(function () {
            timeLeft--;
            $("#timerText").text(timeLeft);
            var pct = (timeLeft / timePerQ * 100);
            $("#timerFill").css("width", pct + "%");

            if (pct <= 30) $("#timerFill").addClass("danger").removeClass("warn");
            else if (pct <= 55) $("#timerFill").addClass("warn").removeClass("danger");

            if (timeLeft <= 0) {
                clearInterval(timer);
                if (!answered) handleAnswer(-1); // timeout
            }
        }, 1000);
    }

    // ── Answer ──
    $("#options").on("click", ".option-btn", function () {
        if (answered) return;
        var idx = parseInt($(this).data("idx"));
        handleAnswer(idx);
    });

    function handleAnswer(chosen) {
        answered = true;
        clearInterval(timer);

        var q = questions[currentQ];
        var correct = q.ans;
        var timeTaken = timePerQ - timeLeft;
        totalTime += timeTaken;

        // Mark all disabled
        $(".option-btn").addClass("disabled");

        // Mark correct
        $(".option-btn[data-idx='" + correct + "']").addClass("correct");

        var isCorrect = chosen === correct;
        if (isCorrect) {
            score++;
            $("#scoreLive").text(score);
            $("#feedback").html("✅ Correct! " + q.explain).addClass("correct-fb").slideDown(200);
        } else {
            if (chosen >= 0) {
                $(".option-btn[data-idx='" + chosen + "']").addClass("wrong");
            }
            var msg = chosen < 0 ? "⏰ Time's up! " : "❌ Wrong! ";
            $("#feedback").html(msg + q.explain).addClass("wrong-fb").slideDown(200);
        }

        results.push({
            question: q.q,
            chosen: chosen >= 0 ? q.opts[chosen] : "(no answer)",
            correct: q.opts[correct],
            isCorrect: isCorrect,
            time: timeTaken
        });

        // Show next or finish
        if (currentQ < questions.length - 1) {
            $("#nextBtn").text("Next Question →").fadeIn(200);
        } else {
            $("#nextBtn").text("See Results →").fadeIn(200);
        }
    }

    // ── Next / Finish ──
    $("#nextBtn").on("click", function () {
        currentQ++;
        if (currentQ < questions.length) {
            loadQuestion();
        } else {
            showResults();
        }
    });

    // ── Results ──
    function showResults() {
        clearInterval(timer);
        var pct = Math.round(score / questions.length * 100);
        var avg = (totalTime / questions.length).toFixed(1);

        var icon, title, sub;
        if (pct >= 80) { icon = "🏆"; title = "Excellent!"; sub = "You really know your JavaScript!"; }
        else if (pct >= 50) { icon = "👍"; title = "Good Job!"; sub = "Solid knowledge, keep learning!"; }
        else { icon = "📚"; title = "Keep Studying!"; sub = "Review the topics and try again."; }

        $("#resultIcon").text(icon);
        $("#resultTitle").text(title);
        $("#resultSub").text(sub);
        $("#rCorrect").text(score);
        $("#rWrong").text(questions.length - score);
        $("#rScore").text(pct + "%");
        $("#rTime").text(avg + "s");

        // Review cards
        var rh = "";
        results.forEach(function (r, i) {
            var status = r.isCorrect
                ? '<span class="green">✓ ' + r.correct + '</span>'
                : '<span class="red">✗ ' + r.chosen + '</span> → <span class="green">' + r.correct + '</span>';
            rh += '<div class="review-card" style="animation-delay:' + (i * 60) + 'ms;">'
                + '<div class="rq"><span class="rq-num">' + (i + 1) + '.</span> ' + r.question + '</div>'
                + '<div class="ra">' + status + ' &nbsp;(' + r.time + 's)</div>'
                + '</div>';
        });
        $("#reviewList").html(rh);

        // Update progress bar to 100%
        $("#progressFill").css("width", "100%");

        $("#quizScreen").fadeOut(250, function () {
            $("#resultScreen").fadeIn(350);
        });
    }

    // ── Retry ──
    $("#retryBtn").on("click", function () {
        $("#resultScreen").fadeOut(250, function () {
            $("#startScreen").fadeIn(300);
        });
    });

    // ── Keyboard shortcuts ──
    $(document).on("keydown", function (e) {
        if ($("#quizScreen").is(":visible") && !answered) {
            var map = { "1": 0, "2": 1, "3": 2, "4": 3, a: 0, b: 1, c: 2, d: 3 };
            var key = e.key.toLowerCase();
            if (key in map) {
                $(".option-btn[data-idx='" + map[key] + "']").trigger("click");
            }
        }
        if (e.key === "Enter" && $("#nextBtn").is(":visible")) {
            $("#nextBtn").trigger("click");
        }
    });

    // ── Util ──
    function shuffleArray(arr) {
        for (var i = arr.length - 1; i > 0; i--) {
            var j = Math.floor(Math.random() * (i + 1));
            var temp = arr[i]; arr[i] = arr[j]; arr[j] = temp;
        }
    }

});
