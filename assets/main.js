function typeform(id, formId) {
  return $("<iframe>", {
    src: "https://blackdoor.typeform.com/to/" + formId + window.location.search,
    id:  id,
    width: "100%",
    height: "100%",
    frameborder: 0
  });
};

$(document).ready(function(){
  typeform("typeform-full", "jfPC2R")
    .appendTo("#typeform-container");
});
