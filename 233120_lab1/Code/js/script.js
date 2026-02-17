/* =============================================
   MULTI-STEP MEMBERSHIP FORM - JAVASCRIPT
   ============================================= */

$(document).ready(function () {
  // ---- Current step tracking ----
  let currentStep = 1;
  const totalSteps = 4;

  // ---- Initialize jQuery UI Datepicker ----
  $("#dob").datepicker({
    dateFormat: "mm/dd/yy",
    changeMonth: true,
    changeYear: true,
    yearRange: "1940:2010",
    maxDate: "-16y",
    showAnim: "fadeIn",
  });

  // ---- Photo Preview ----
  $("#photo").on("change", function () {
    const file = this.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = function (e) {
        $("#photoPreview").html(
          '<img src="' + e.target.result + '" alt="Preview">'
        );
      };
      reader.readAsDataURL(file);
    }
  });

  // ---- Password Strength Meter ----
  $("#password").on("input", function () {
    const val = $(this).val();
    const $bar = $(".password-strength .bar");
    const $text = $(".strength-text");

    $bar.removeClass("weak medium strong");
    $text.removeClass("weak medium strong");

    if (val.length === 0) {
      $bar.css("width", "0%");
      $text.text("");
      return;
    }

    let strength = 0;
    if (val.length >= 6) strength++;
    if (val.length >= 10) strength++;
    if (/[A-Z]/.test(val)) strength++;
    if (/[0-9]/.test(val)) strength++;
    if (/[^A-Za-z0-9]/.test(val)) strength++;

    if (strength <= 2) {
      $bar.addClass("weak");
      $text.addClass("weak").text("Weak password");
    } else if (strength <= 3) {
      $bar.addClass("medium");
      $text.addClass("medium").text("Medium strength");
    } else {
      $bar.addClass("strong");
      $text.addClass("strong").text("Strong password");
    }
  });

  // ---- Plan Card Selection ----
  $(".plan-card").on("click", function () {
    $(".plan-card").removeClass("selected");
    $(this).addClass("selected");
    $(this).find('input[type="radio"]').prop("checked", true);
  });

  // ---- Step Navigation: Next ----
  $(".btn-next").on("click", function () {
    if (validateStep(currentStep)) {
      goToStep(currentStep + 1);
    }
  });

  // ---- Step Navigation: Previous ----
  $(".btn-prev").on("click", function () {
    goToStep(currentStep - 1);
  });

  // ---- Submit ----
  $(".btn-submit").on("click", function (e) {
    e.preventDefault();
    if (validateStep(currentStep)) {
      // Show success screen
      $(".form-step").removeClass("active");
      $(".form-body").hide();
      $(".form-footer").hide();
      $(".step-indicator").hide();
      $(".success-screen").addClass("active");
    }
  });

  // ---- Reset / Go Home ----
  $(".btn-home").on("click", function () {
    // Reset Form
    $("#membershipForm")[0].reset();
    $(".plan-card").removeClass("selected");
    $("#photoPreview").html('<i class="bi bi-person-fill"></i>');
    $(".password-strength .bar").removeClass("weak medium strong");
    $(".strength-text").text("");
    $(".form-control").removeClass("is-invalid");
    $(".invalid-feedback").text("");

    // Show form again
    $(".success-screen").removeClass("active");
    $(".form-body").show();
    $(".form-footer").show();
    $(".step-indicator").show();
    goToStep(1);
  });

  // ========================
  // GO TO STEP FUNCTION
  // ========================
  function goToStep(step) {
    if (step < 1 || step > totalSteps) return;

    // If going to review step, populate summary
    if (step === 4) {
      populateSummary();
    }

    // Hide all steps, show target
    $(".form-step").removeClass("active");
    $("#step" + step).addClass("active");

    // Update step indicator
    $(".step-indicator .step").each(function (index) {
      const stepNum = index + 1;
      $(this).removeClass("active completed");
      if (stepNum < step) {
        $(this).addClass("completed");
      } else if (stepNum === step) {
        $(this).addClass("active");
      }
    });

    // Update connector lines
    $(".step-line").each(function (index) {
      if (index < step - 1) {
        $(this).addClass("active");
      } else {
        $(this).removeClass("active");
      }
    });

    // Update buttons visibility
    if (step === 1) {
      $(".btn-prev").hide();
    } else {
      $(".btn-prev").show();
    }

    if (step === totalSteps) {
      $(".btn-next").hide();
      $(".btn-submit").show();
    } else {
      $(".btn-next").show();
      $(".btn-submit").hide();
    }

    currentStep = step;

    // Scroll to top of form
    $("html, body").animate(
      {
        scrollTop: $(".form-card").offset().top - 20,
      },
      300
    );
  }

  // ========================
  // VALIDATION FUNCTION
  // ========================
  function validateStep(step) {
    let isValid = true;

    // Clear previous errors in this step
    $("#step" + step)
      .find(".form-control, .form-select")
      .removeClass("is-invalid");
    $("#step" + step)
      .find(".invalid-feedback")
      .text("");

    if (step === 1) {
      // --- Personal Information ---
      const firstName = $("#firstName").val().trim();
      const lastName = $("#lastName").val().trim();
      const dob = $("#dob").val().trim();
      const gender = $('input[name="gender"]:checked').val();

      if (!firstName) {
        showError("#firstName", "First name is required.");
        isValid = false;
      }
      if (!lastName) {
        showError("#lastName", "Last name is required.");
        isValid = false;
      }
      if (!dob) {
        showError("#dob", "Date of birth is required.");
        isValid = false;
      }
      if (!gender) {
        // Highlight gender section
        $(".gender-group").css("border", "2px solid var(--accent)").css("border-radius", "10px").css("padding", "5px");
        isValid = false;
      } else {
        $(".gender-group").css("border", "none").css("padding", "0");
      }
    } else if (step === 2) {
      // --- Contact & Account ---
      const email = $("#email").val().trim();
      const phone = $("#phone").val().trim();
      const address = $("#address").val().trim();
      const city = $("#city").val().trim();
      const password = $("#password").val();
      const confirmPass = $("#confirmPassword").val();

      if (!email) {
        showError("#email", "Email address is required.");
        isValid = false;
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        showError("#email", "Please enter a valid email address.");
        isValid = false;
      }

      if (!phone) {
        showError("#phone", "Phone number is required.");
        isValid = false;
      } else if (!/^[\d\s\-\+\(\)]{7,15}$/.test(phone)) {
        showError("#phone", "Please enter a valid phone number.");
        isValid = false;
      }

      if (!address) {
        showError("#address", "Address is required.");
        isValid = false;
      }

      if (!city) {
        showError("#city", "City is required.");
        isValid = false;
      }

      if (!password) {
        showError("#password", "Password is required.");
        isValid = false;
      } else if (password.length < 6) {
        showError("#password", "Password must be at least 6 characters.");
        isValid = false;
      }

      if (!confirmPass) {
        showError("#confirmPassword", "Please confirm your password.");
        isValid = false;
      } else if (password !== confirmPass) {
        showError("#confirmPassword", "Passwords do not match.");
        isValid = false;
      }
    } else if (step === 3) {
      // --- Membership Plan ---
      const plan = $('input[name="plan"]:checked').val();
      const terms = $("#terms").is(":checked");

      if (!plan) {
        alert("Please select a membership plan to continue.");
        isValid = false;
      }

      if (!terms) {
        $("#terms").addClass("is-invalid");
        isValid = false;
      }
    }

    return isValid;
  }

  function showError(selector, message) {
    $(selector).addClass("is-invalid");
    $(selector).siblings(".invalid-feedback").text(message);
    // for input groups
    $(selector).closest(".input-group").siblings(".invalid-feedback").text(message);
    if ($(selector).closest(".input-group").length) {
      $(selector).addClass("is-invalid");
    }
  }

  // ========================
  // POPULATE SUMMARY
  // ========================
  function populateSummary() {
    $("#sumName").text(
      $("#firstName").val().trim() + " " + $("#lastName").val().trim()
    );
    $("#sumDob").text($("#dob").val() || "Not provided");
    $("#sumGender").text(
      $('input[name="gender"]:checked').val() || "Not selected"
    );
    $("#sumEmail").text($("#email").val().trim());
    $("#sumPhone").text($("#phone").val().trim());
    $("#sumAddress").text(
      $("#address").val().trim() + ", " + $("#city").val().trim()
    );

    const selectedPlan = $('input[name="plan"]:checked');
    if (selectedPlan.length) {
      const planCard = selectedPlan.closest(".plan-card");
      const planName = planCard.find(".plan-name").text();
      const planPrice = planCard.find(".plan-price").text().trim();
      $("#sumPlan").text(planName + " — " + planPrice);
    }
  }

  // ---- Initialize: Show step 1, hide prev & submit ----
  goToStep(1);
});
