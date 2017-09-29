function typeform(id, domain, formId) {
  return $("<iframe>", {
    src: "https://" + domain + ".typeform.com/to/" + formId + window.location.search,
    id:  id,
    width: "100%",
    height: "100%",
    frameborder: 0
  });
};
