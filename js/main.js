/* ============================================
   訪問介護つむぎ 公式サイト — 共通スクリプト
   ============================================ */
(function () {
  "use strict";

  /* ---- モバイルメニュー ---- */
  var toggle = document.querySelector(".menu-toggle");
  var mobileNav = document.querySelector(".mobile-nav");

  if (toggle && mobileNav) {
    var closeBtn = mobileNav.querySelector(".mobile-nav-close");
    var links = mobileNav.querySelectorAll("a");

    function openMenu() {
      mobileNav.classList.add("is-open");
      toggle.setAttribute("aria-expanded", "true");
      document.body.style.overflow = "hidden";
    }
    function closeMenu() {
      mobileNav.classList.remove("is-open");
      toggle.setAttribute("aria-expanded", "false");
      document.body.style.overflow = "";
    }

    toggle.addEventListener("click", function () {
      var isOpen = mobileNav.classList.contains("is-open");
      if (isOpen) { closeMenu(); } else { openMenu(); }
    });

    if (closeBtn) closeBtn.addEventListener("click", closeMenu);

    mobileNav.addEventListener("click", function (e) {
      if (e.target === mobileNav) closeMenu();
    });

    links.forEach(function (a) {
      a.addEventListener("click", closeMenu);
    });

    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") closeMenu();
    });
  }

  /* ---- お問い合わせフォーム（Formspreeで送信）---- */
  var form = document.querySelector("[data-contact-form]");
  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var status = form.querySelector(".form-status");
      var endpoint = form.getAttribute("action");
      var submitBtn = form.querySelector(".form-submit");

      if (!endpoint || endpoint.indexOf("YOUR_FORM_ID") !== -1) {
        if (status) {
          status.textContent = "送信先が未設定です。フォーム送信サービス（Formspree等）の接続が必要です。";
          status.classList.add("is-visible");
        }
        return;
      }

      if (submitBtn) { submitBtn.disabled = true; submitBtn.textContent = "送信中…"; }

      fetch(endpoint, {
        method: "POST",
        body: new FormData(form),
        headers: { "Accept": "application/json" }
      }).then(function (response) {
        if (response.ok) {
          if (status) {
            status.textContent = "送信内容を確認しました。担当者より折り返しご連絡いたします。";
            status.classList.add("is-visible");
          }
          form.reset();
        } else {
          if (status) {
            status.textContent = "送信に失敗しました。お手数ですがお電話にてご連絡ください。";
            status.classList.add("is-visible");
          }
        }
      }).catch(function () {
        if (status) {
          status.textContent = "送信に失敗しました。お手数ですがお電話にてご連絡ください。";
          status.classList.add("is-visible");
        }
      }).finally(function () {
        if (submitBtn) { submitBtn.disabled = false; submitBtn.textContent = "お問い合わせ"; }
      });
    });
  }
})();
