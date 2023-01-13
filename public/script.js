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

const toggleNav = () => {
  $("#nav").toggleClass("-top-full");
  $("#nav").toggleClass("top-full");
};
$("#togleNav").click(toggleNav);

const toggleFilter = () => {
  $("#filter").toggleClass("max-h-0");
  $("#filter").toggleClass("max-h-100");
};
$("#toggleFilter").click(() => {
  toggleFilter();
  $("#toggleFilter").html(
    $("#toggleFilter").text() == "Hide" ? "Filter" : "Hide"
  );
});
