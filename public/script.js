const togglePassword = () => {
  if ($("#password").attr("type") === "password") {
    $("#password").attr("type", "text");
  } else if ($("#password").attr("type") === "text") {
    $("#password").attr("type", "password");
  }
};

$("#showPassword").change(() => {
  togglePassword();
});

var navActive = false;
const toggleNav = () => {
  $("#nav").toggleClass("-top-full");
  $("#nav").toggleClass("top-full");
};
$("#togleNav").click(toggleNav);
