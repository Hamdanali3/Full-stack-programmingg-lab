/**
 * HotTub Haven - Main JavaScript
 * Handles: Animations, UI interactions, page transitions, cart, quantity controls
 */

$(document).ready(function () {
  "use strict";

  // ========================================
  // PRELOADER
  // ========================================
  $(window).on("load", function () {
    $(".preloader").addClass("hide");
    setTimeout(function () {
      $(".preloader").remove();
    }, 600);
  });

  // Fallback: hide preloader after 3s
  setTimeout(function () {
    $(".preloader").addClass("hide");
  }, 3000);

  // ========================================
  // NAVBAR SCROLL EFFECT
  // ========================================
  $(window).on("scroll", function () {
    if ($(this).scrollTop() > 60) {
      $(".navbar").addClass("scrolled");
    } else {
      $(".navbar").removeClass("scrolled");
    }

    // Back to top button
    if ($(this).scrollTop() > 400) {
      $(".back-to-top").addClass("show");
    } else {
      $(".back-to-top").removeClass("show");
    }
  });

  // Back to top click
  $(".back-to-top").on("click", function () {
    $("html, body").animate({ scrollTop: 0 }, 600);
  });

  // ========================================
  // SCROLL ANIMATIONS (Intersection Observer)
  // ========================================
  var animElements = document.querySelectorAll(
    ".fade-in, .slide-in-left, .slide-in-right, .scale-in"
  );

  if ("IntersectionObserver" in window) {
    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
    );

    animElements.forEach(function (el) {
      observer.observe(el);
    });
  } else {
    // Fallback for older browsers
    animElements.forEach(function (el) {
      el.classList.add("visible");
    });
  }

  // ========================================
  // SMOOTH SCROLL FOR ANCHOR LINKS
  // ========================================
  $('a[href^="#"]').on("click", function (e) {
    var target = $(this.getAttribute("href"));
    if (target.length) {
      e.preventDefault();
      $("html, body").animate({ scrollTop: target.offset().top - 80 }, 600);
    }
  });

  // ========================================
  // QUANTITY CONTROLS
  // ========================================
  $(document).on("click", ".qty-minus, .qty-plus", function () {
    var input = $(this).siblings("input, .qty-input");
    if (input.length === 0) {
      input = $(this).parent().find("input");
    }
    var val = parseInt(input.val()) || 1;

    if ($(this).hasClass("qty-minus")) {
      if (val > 1) val--;
    } else {
      if (val < 99) val++;
    }

    input.val(val).trigger("change");
  });

  // ========================================
  // CART REMOVE ITEM
  // ========================================
  $(document).on("click", ".remove-btn", function () {
    var row = $(this).closest("tr");
    row.fadeOut(400, function () {
      $(this).remove();
      updateCartSummary();
    });
    showToast("Item removed from cart", "info");
  });

  // ========================================
  // ADD TO CART
  // ========================================
  $(document).on("click", ".add-to-cart-btn", function (e) {
    e.preventDefault();
    var btn = $(this);
    var originalText = btn.html();

    btn.html('<i class="fas fa-spinner fa-spin"></i> Adding...');
    btn.prop("disabled", true);

    setTimeout(function () {
      btn.html('<i class="fas fa-check"></i> Added!');
      btn.addClass("btn-success").removeClass("btn-primary-custom");
      showToast("Product added to cart!", "success");

      // Update cart count
      var cartCount = $(".cart-count");
      if (cartCount.length) {
        var count = parseInt(cartCount.text()) || 0;
        cartCount.text(count + 1);
      }

      setTimeout(function () {
        btn.html(originalText);
        btn
          .removeClass("btn-success")
          .addClass("btn-primary-custom");
        btn.prop("disabled", false);
      }, 1500);
    }, 800);
  });

  // ========================================
  // WISHLIST TOGGLE
  // ========================================
  $(document).on("click", ".wishlist-btn", function () {
    $(this).toggleClass("active");
    if ($(this).hasClass("active")) {
      showToast("Added to wishlist!", "success");
    } else {
      showToast("Removed from wishlist", "info");
    }
  });

  // ========================================
  // PRODUCT THUMBNAIL GALLERY
  // ========================================
  $(".thumb-images .thumb").on("click", function () {
    $(".thumb-images .thumb").removeClass("active");
    $(this).addClass("active");
    var imgSrc = $(this).find("img").attr("src");
    $(".main-image img").fadeOut(200, function () {
      $(this).attr("src", imgSrc).fadeIn(200);
    });
  });

  // ========================================
  // PAYMENT METHOD TOGGLE
  // ========================================
  $(".method-option").on("click", function () {
    $(".method-option").removeClass("active");
    $(this).addClass("active");
  });

  // ========================================
  // COLOR SWATCH SELECTOR
  // ========================================
  $(".color-swatch").on("click", function () {
    $(".color-swatch").removeClass("active");
    $(this).addClass("active");
  });

  // ========================================
  // PRODUCT TABS
  // ========================================
  $(".product-tabs .nav-link").on("click", function (e) {
    e.preventDefault();
    $(this).tab("show");
  });

  // ========================================
  // TOAST NOTIFICATION SYSTEM
  // ========================================
  window.showToast = function (message, type) {
    type = type || "info";
    var iconClass;
    switch (type) {
      case "success":
        iconClass = "fas fa-check-circle";
        break;
      case "error":
        iconClass = "fas fa-exclamation-circle";
        break;
      default:
        iconClass = "fas fa-info-circle";
    }

    var toastContainer = $(".toast-container");
    if (!toastContainer.length) {
      $("body").append('<div class="toast-container"></div>');
      toastContainer = $(".toast-container");
    }

    var toast = $(
      '<div class="custom-toast ' +
        type +
        '">' +
        '<i class="toast-icon ' +
        iconClass +
        '"></i>' +
        '<span class="toast-message">' +
        $("<span>").text(message).html() +
        "</span>" +
        "</div>"
    );

    toastContainer.append(toast);

    setTimeout(function () {
      toast.addClass("show");
    }, 50);

    setTimeout(function () {
      toast.removeClass("show");
      setTimeout(function () {
        toast.remove();
      }, 400);
    }, 3000);
  };

  // ========================================
  // CART SUMMARY UPDATE
  // ========================================
  function updateCartSummary() {
    var total = 0;
    $(".cart-table tbody tr").each(function () {
      var priceText = $(this).find(".item-price").text().replace(/[^0-9.]/g, "");
      var qty = parseInt($(this).find(".qty-input").val()) || 1;
      var price = parseFloat(priceText) || 0;
      total += price * qty;
    });

    $(".subtotal-amount").text("$" + total.toFixed(2));
    var shipping = total > 0 ? 15.0 : 0;
    $(".shipping-amount").text("$" + shipping.toFixed(2));
    $(".total-amount").text("$" + (total + shipping).toFixed(2));
  }

  // Update on quantity change
  $(document).on("change", ".qty-input", function () {
    updateCartSummary();
  });

  // ========================================
  // SEARCH TOGGLE (Mobile)
  // ========================================
  $(".search-toggle").on("click", function () {
    $(".search-box").toggleClass("active");
  });

  // ========================================
  // COUPON CODE APPLICATION
  // ========================================
  $(".apply-coupon-btn").on("click", function () {
    var couponInput = $(".coupon-input");
    var code = couponInput.val().trim();

    if (code.length === 0) {
      showToast("Please enter a coupon code", "error");
      return;
    }

    var btn = $(this);
    btn.html('<i class="fas fa-spinner fa-spin"></i>');
    btn.prop("disabled", true);

    setTimeout(function () {
      showToast("Coupon applied successfully!", "success");
      btn.html("Applied");
      btn.prop("disabled", false);
    }, 1000);
  });

  // ========================================
  // COUNTER ANIMATION (Stats)
  // ========================================
  function animateCounter(element, target) {
    var current = 0;
    var step = Math.ceil(target / 60);
    var timer = setInterval(function () {
      current += step;
      if (current >= target) {
        current = target;
        clearInterval(timer);
      }
      element.textContent = current.toLocaleString() + "+";
    }, 30);
  }

  var counterElements = document.querySelectorAll("[data-count]");
  if (counterElements.length && "IntersectionObserver" in window) {
    var counterObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            var target = parseInt(entry.target.getAttribute("data-count"));
            animateCounter(entry.target, target);
            counterObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.5 }
    );

    counterElements.forEach(function (el) {
      counterObserver.observe(el);
    });
  }

  // ========================================
  // NEWSLETTER FORM
  // ========================================
  $(".newsletter-form").on("submit", function (e) {
    e.preventDefault();
    var emailInput = $(this).find('input[type="email"]');
    var email = emailInput.val().trim();
    var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      showToast("Please enter a valid email address", "error");
      return;
    }

    showToast("Thank you for subscribing!", "success");
    emailInput.val("");
  });

  // ========================================
  // PRINT ORDER
  // ========================================
  $(".print-order-btn").on("click", function () {
    window.print();
  });
});
