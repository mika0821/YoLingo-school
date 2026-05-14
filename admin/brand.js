(function () {
  var loaded = false;

  function markLoaded() {
    if (loaded) return;
    loaded = true;
    document.body.classList.add("yl-cms-loaded");
  }

  function addBrandBadge() {
    if (document.querySelector(".yl-brand-badge")) return;
    var badge = document.createElement("div");
    badge.className = "yl-brand-badge";
    badge.innerHTML = '<img src="/logo.png" alt="YoLingo" /><strong>YoLingo Admin</strong><span>Content manager</span>';
    document.body.appendChild(badge);
  }

  function handleNetlifyIdentity() {
    if (!window.netlifyIdentity) return;

    window.netlifyIdentity.on("init", function (user) {
      var hasInviteToken = window.location.hash.indexOf("invite_token") !== -1;
      var hasRecoveryToken = window.location.hash.indexOf("recovery_token") !== -1;

      if (!user && (hasInviteToken || hasRecoveryToken)) {
        window.netlifyIdentity.open();
      }
    });

    window.netlifyIdentity.on("login", function () {
      document.location.href = "/admin/";
    });
  }

  function registerPreviewStyles() {
    if (!window.CMS) return;
    try {
      window.CMS.registerPreviewStyle("/style.css");
      window.CMS.registerPreviewStyle("/admin/preview.css");
    } catch (error) {
      console.warn("YoLingo preview styles were not registered:", error);
    }
  }

  function init() {
    handleNetlifyIdentity();
    registerPreviewStyles();
    addBrandBadge();

    setTimeout(markLoaded, 1200);
    setTimeout(addBrandBadge, 1800);
    setTimeout(markLoaded, 2500);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
