document.addEventListener('DOMContentLoaded', function () {
  var form = document.getElementById('emailForm');
  form.addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent the form from submitting normally.
    sendEmail();
  });
});






function sendEmail() {
  console.log("Function has been called");
  event.preventDefault(); // Just to be safe, prevent any default form submission.
  const userName = document.getElementById('userName').value;
  const toEmail = document.getElementById('toEmail').value;
  const message = document.getElementById('message').value;
  const link = document.getElementById('url').value;

  let emails = toEmail.split(',').map(email => email.trim());

  emails.forEach(async (email) => {
    const url = 'https://api.mailjet.com/v3.1/send';
    const options = {
      method: 'POST',
      headers: {
        'Authorization': 'Basic ' + btoa('958d5f2bacda51268b8a14465e377ffc:e9f7e68faa2d041c03f0584a32e23dae'),
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        "Messages": [{
          "From": {
            "Email": "when2meetlinksender@gmail.com@",
            "Name": userName
          },
          "To": [{
            "Email": email,
            "Name": ""
          }],
          "Subject": `When2Meet Event Invite by ${userName}`,
          "TextPart": message + " " + link,
          "HTMLPart": `<p>${message + " " + link}</p>`
        }]
      })
    };

    try {
      const response = await fetch(url, options);
      const jsonResponse = await response.json();
      console.log('Email sent:', jsonResponse);
    } catch (error) {
      console.error('Failed to send email', error);
    }
  });
}
