(function () {
  var loaded = false;

  function markLoaded() {
    if (loaded) return;
    loaded = true;
    document.body.classList.add("yl-cms-loaded");
  }

  function addBrandTag() {
    if (document.getElementById("yl-admin-brand-tag")) return;

    var tag = document.createElement("div");
    tag.id = "yl-admin-brand-tag";
    tag.innerHTML = '<img src="/logo.png" alt="" aria-hidden="true" /><span>YoLingo Admin</span>';
    document.body.appendChild(tag);
  }

  function handleNetlifyIdentity() {
    if (!window.netlifyIdentity) return;

    window.netlifyIdentity.on("init", function (user) {
      var hash = window.location.hash || "";
      var hasInviteToken = hash.indexOf("invite_token") !== -1;
      var hasRecoveryToken = hash.indexOf("recovery_token") !== -1;

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

    // Hide the loading card quickly so the CMS fields are always visible.
    setTimeout(markLoaded, 650);
    setTimeout(markLoaded, 1400);
    setTimeout(addBrandTag, 1800);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
