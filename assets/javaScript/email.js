/*--- i learnt this with code institute --*/
function sendMail(contactForm) {
    emailjs.send("gmail", "emal", {
        "from_name": contactForm.name.value,
        "from_email": contactForm.emailaddress.value,
        "project_request": contactForm.projectsummary.value
    })
        .then(
            function (response) {
                alert("SUCCESS", response);
            },
            function (error) {
                alert("FAILED", error);
            }
        )
    return false;
}