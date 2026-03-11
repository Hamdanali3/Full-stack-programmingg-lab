/**
 * HotTub Haven - Form Validation
 * jQuery-based form validation with real-time feedback
 */

$(document).ready(function () {
  "use strict";

  // ========================================
  // VALIDATION HELPERS
  // ========================================
  var patterns = {
    email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    phone: /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/,
    zipCode: /^[0-9]{5}(-[0-9]{4})?$/,
    name: /^[a-zA-Z\s'-]{2,50}$/,
    password: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/,
    cardNumber: /^[0-9]{13,19}$/,
    cvv: /^[0-9]{3,4}$/,
    expiryDate: /^(0[1-9]|1[0-2])\/([0-9]{2})$/,
  };

  function showError(input, message) {
    var group = input.closest(".form-floating, .mb-3, .form-group");
    input.addClass("is-invalid").removeClass("is-valid");
    var feedback = group.find(".invalid-feedback");
    if (feedback.length === 0) {
      group.append('<div class="invalid-feedback">' + message + "</div>");
    } else {
      feedback.text(message);
    }
    feedback.show();
  }

  function showSuccess(input) {
    input.addClass("is-valid").removeClass("is-invalid");
    input
      .closest(".form-floating, .mb-3, .form-group")
      .find(".invalid-feedback")
      .hide();
  }

  function clearValidation(input) {
    input.removeClass("is-valid is-invalid");
    input
      .closest(".form-floating, .mb-3, .form-group")
      .find(".invalid-feedback")
      .hide();
  }

  // ========================================
  // PASSWORD STRENGTH METER
  // ========================================
  function checkPasswordStrength(password) {
    var strength = 0;
    if (password.length >= 8) strength++;
    if (/[a-z]/.test(password)) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/[0-9]/.test(password)) strength++;
    if (/[^a-zA-Z0-9]/.test(password)) strength++;
    return strength;
  }

  $(document).on("input", "#registerPassword, #newPassword", function () {
    var password = $(this).val();
    var strengthBar = $(this)
      .closest(".mb-3, .form-group")
      .find(".strength-bar");
    if (strengthBar.length === 0) return;

    var strength = checkPasswordStrength(password);
    var width, color, label;

    switch (strength) {
      case 0:
      case 1:
        width = "20%";
        color = "#dc3545";
        label = "Very Weak";
        break;
      case 2:
        width = "40%";
        color = "#fd7e14";
        label = "Weak";
        break;
      case 3:
        width = "60%";
        color = "#ffc107";
        label = "Fair";
        break;
      case 4:
        width = "80%";
        color = "#20c997";
        label = "Good";
        break;
      case 5:
        width = "100%";
        color = "#28a745";
        label = "Strong";
        break;
    }

    strengthBar.css({ width: width, background: color });
    var strengthLabel = $(this)
      .closest(".mb-3, .form-group")
      .find(".strength-label");
    if (strengthLabel.length) {
      strengthLabel.text(label).css("color", color);
    }
  });

  // ========================================
  // REAL-TIME FIELD VALIDATION
  // ========================================
  $(document).on("blur", "input[required], select[required], textarea[required]", function () {
    validateField($(this));
  });

  $(document).on("input", ".is-invalid", function () {
    validateField($(this));
  });

  function validateField(input) {
    var val = input.val().trim();
    var type = input.attr("type");
    var id = input.attr("id") || "";
    var name = input.attr("name") || "";

    // Required check
    if (input.prop("required") && val === "") {
      var label =
        input.attr("placeholder") ||
        input
          .closest(".form-floating")
          .find("label")
          .text() ||
        "This field";
      showError(input, label + " is required");
      return false;
    }

    if (val === "") {
      clearValidation(input);
      return true;
    }

    // Email validation
    if (type === "email") {
      if (!patterns.email.test(val)) {
        showError(input, "Please enter a valid email address");
        return false;
      }
    }

    // Phone validation
    if (type === "tel" || name.indexOf("phone") > -1) {
      if (!patterns.phone.test(val.replace(/\s/g, ""))) {
        showError(input, "Please enter a valid phone number");
        return false;
      }
    }

    // Password validation
    if (id === "registerPassword" || id === "newPassword") {
      if (val.length < 8) {
        showError(input, "Password must be at least 8 characters");
        return false;
      }
      if (!patterns.password.test(val)) {
        showError(
          input,
          "Password must contain uppercase, lowercase, and number"
        );
        return false;
      }
    }

    // Confirm password
    if (id === "confirmPassword" || id === "confirmNewPassword") {
      var passwordInput = $("#registerPassword, #newPassword").first();
      if (val !== passwordInput.val()) {
        showError(input, "Passwords do not match");
        return false;
      }
    }

    // Name validation
    if (
      name.indexOf("name") > -1 ||
      id.indexOf("Name") > -1 ||
      id.indexOf("name") > -1
    ) {
      if (type !== "email" && !patterns.name.test(val)) {
        showError(input, "Please enter a valid name (letters only)");
        return false;
      }
    }

    // Zip code
    if (name === "zip" || id.indexOf("zip") > -1 || id.indexOf("postal") > -1) {
      if (!patterns.zipCode.test(val)) {
        showError(input, "Please enter a valid zip code");
        return false;
      }
    }

    // Card number
    if (id === "cardNumber" || name === "cardNumber") {
      var cleanNum = val.replace(/\s/g, "");
      if (!patterns.cardNumber.test(cleanNum)) {
        showError(input, "Please enter a valid card number");
        return false;
      }
    }

    // CVV
    if (id === "cvv" || name === "cvv") {
      if (!patterns.cvv.test(val)) {
        showError(input, "Please enter a valid CVV");
        return false;
      }
    }

    // Expiry date
    if (id === "expiryDate" || name === "expiryDate") {
      if (!patterns.expiryDate.test(val)) {
        showError(input, "Please use MM/YY format");
        return false;
      }
      var parts = val.split("/");
      var month = parseInt(parts[0]);
      var year = parseInt("20" + parts[1]);
      var now = new Date();
      var expiry = new Date(year, month);
      if (expiry < now) {
        showError(input, "Card has expired");
        return false;
      }
    }

    showSuccess(input);
    return true;
  }

  // ========================================
  // FORM SUBMISSIONS
  // ========================================

  // General form validation
  function validateForm(form) {
    var isValid = true;
    form.find("input[required], select[required], textarea[required]").each(
      function () {
        if (!validateField($(this))) {
          isValid = false;
        }
      }
    );
    return isValid;
  }

  // Login Form
  $("#loginForm").on("submit", function (e) {
    e.preventDefault();
    if (!validateForm($(this))) {
      showToast("Please fix the errors in the form", "error");
      return;
    }

    var btn = $(this).find('button[type="submit"]');
    btn.html('<i class="fas fa-spinner fa-spin"></i> Signing In...');
    btn.prop("disabled", true);

    setTimeout(function () {
      showToast("Login successful! Redirecting...", "success");
      setTimeout(function () {
        window.location.href = "my-account.html";
      }, 1200);
    }, 1500);
  });

  // Register Form
  $("#registerForm").on("submit", function (e) {
    e.preventDefault();
    if (!validateForm($(this))) {
      showToast("Please fix the errors in the form", "error");
      return;
    }

    // Terms checkbox
    if (!$("#agreeTerms").is(":checked")) {
      showToast("Please agree to the Terms & Conditions", "error");
      return;
    }

    var btn = $(this).find('button[type="submit"]');
    btn.html('<i class="fas fa-spinner fa-spin"></i> Creating Account...');
    btn.prop("disabled", true);

    setTimeout(function () {
      showToast("Account created successfully!", "success");
      setTimeout(function () {
        window.location.href = "login.html";
      }, 1200);
    }, 1500);
  });

  // Forgot Password Form
  $("#forgotPasswordForm").on("submit", function (e) {
    e.preventDefault();
    if (!validateForm($(this))) {
      showToast("Please enter a valid email", "error");
      return;
    }

    var btn = $(this).find('button[type="submit"]');
    btn.html('<i class="fas fa-spinner fa-spin"></i> Sending...');
    btn.prop("disabled", true);

    setTimeout(function () {
      showToast("Password reset link sent to your email!", "success");
      btn.html("Email Sent");
    }, 1500);
  });

  // Contact Form
  $("#contactForm").on("submit", function (e) {
    e.preventDefault();
    if (!validateForm($(this))) {
      showToast("Please fill in all required fields", "error");
      return;
    }

    var btn = $(this).find('button[type="submit"]');
    btn.html('<i class="fas fa-spinner fa-spin"></i> Sending...');
    btn.prop("disabled", true);

    setTimeout(function () {
      showToast("Message sent successfully! We'll get back to you soon.", "success");
      btn.html('<i class="fas fa-paper-plane"></i> Send Message');
      btn.prop("disabled", false);
      $("#contactForm")[0].reset();
      $("#contactForm")
        .find(".is-valid, .is-invalid")
        .removeClass("is-valid is-invalid");
    }, 1500);
  });

  // Edit Account Form
  $("#editAccountForm").on("submit", function (e) {
    e.preventDefault();
    if (!validateForm($(this))) {
      showToast("Please fix the errors", "error");
      return;
    }

    var btn = $(this).find('button[type="submit"]');
    btn.html('<i class="fas fa-spinner fa-spin"></i> Saving...');
    btn.prop("disabled", true);

    setTimeout(function () {
      showToast("Account updated successfully!", "success");
      btn.html('<i class="fas fa-save"></i> Save Changes');
      btn.prop("disabled", false);
    }, 1200);
  });

  // Address Forms (billing/shipping)
  $("#billingAddressForm, #shippingAddressForm").on("submit", function (e) {
    e.preventDefault();
    if (!validateForm($(this))) {
      showToast("Please fill in all required fields", "error");
      return;
    }

    var btn = $(this).find('button[type="submit"]');
    btn.html('<i class="fas fa-spinner fa-spin"></i> Saving...');
    btn.prop("disabled", true);

    setTimeout(function () {
      showToast("Address saved successfully!", "success");
      btn.html('<i class="fas fa-save"></i> Save Address');
      btn.prop("disabled", false);
    }, 1200);
  });

  // Payment Form
  $("#paymentForm").on("submit", function (e) {
    e.preventDefault();
    if (!validateForm($(this))) {
      showToast("Please fill in all payment details", "error");
      return;
    }

    var btn = $(this).find('button[type="submit"]');
    btn.html('<i class="fas fa-spinner fa-spin"></i> Processing Payment...');
    btn.prop("disabled", true);

    setTimeout(function () {
      showToast("Payment processed successfully!", "success");
      setTimeout(function () {
        window.location.href = "order-summary.html";
      }, 1200);
    }, 2000);
  });

  // ========================================
  // CARD NUMBER FORMATTING
  // ========================================
  $(document).on("input", "#cardNumber", function () {
    var val = $(this)
      .val()
      .replace(/\s/g, "")
      .replace(/[^0-9]/g, "");
    var formatted = val.replace(/(.{4})/g, "$1 ").trim();
    $(this).val(formatted);
  });

  // Expiry date formatting
  $(document).on("input", "#expiryDate", function () {
    var val = $(this)
      .val()
      .replace(/[^0-9]/g, "");
    if (val.length >= 2) {
      val = val.substring(0, 2) + "/" + val.substring(2, 4);
    }
    $(this).val(val);
  });

  // ========================================
  // TOGGLE PASSWORD VISIBILITY
  // ========================================
  $(document).on("click", ".toggle-password", function () {
    var input = $(this).siblings("input");
    var icon = $(this).find("i");
    if (input.attr("type") === "password") {
      input.attr("type", "text");
      icon.removeClass("fa-eye").addClass("fa-eye-slash");
    } else {
      input.attr("type", "password");
      icon.removeClass("fa-eye-slash").addClass("fa-eye");
    }
  });
});
