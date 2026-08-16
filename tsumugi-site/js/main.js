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

  /* ---- お問い合わせフォーム（送信先は未接続。後日フォーム送信サービスやWixのフォーム機能に接続してください）---- */
  var form = document.querySelector("[data-contact-form]");
  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var status = form.querySelector(".form-status");
      if (status) {
        status.textContent = "送信内容を確認しました。担当者より折り返しご連絡いたします。（※現在このフォームはデザイン確認用のため、実際には送信されません。公開前に送信先の接続が必要です。）";
        status.classList.add("is-visible");
      }
      form.reset();
    });
  }
})();
