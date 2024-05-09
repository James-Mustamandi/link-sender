// background.js
chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    if (request.action === "sendEmail") {
      fetch('https://api.emailjs.com/api/v1.0/email/send', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          service_id: 'your_service_id',
          template_id: 'your_template_id',
          user_id: 'your_user_id',
          template_params: request.templateParams
        })
      })
      .then(response => response.json())
      .then(data => sendResponse({status: 'Success', data: data}))
      .catch(error => sendResponse({status: 'Error', error: error}));
      return true;  // Keeps the message channel open for the response
    }
  }
);
