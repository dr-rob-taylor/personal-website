<script>
document.addEventListener('DOMContentLoaded', function () {
  var form = document.getElementById('newsletter-form');
  if (!form) return;

  var emailInput = document.getElementById('newsletter-email');
  var msgEl = document.getElementById('newsletter-msg');

  form.addEventListener('submit', function (e) {
    e.preventDefault();

    var email = emailInput.value.trim();
    if (!email) return;

    // Basic email validation
    var emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      showError('Please enter a valid email address.');
      return;
    }

    // TODO: Replace with your Buttondown API endpoint
    // Example: https://api.buttondown.email/v1/subscribers
    var BUTTONDOWN_ENDPOINT = '';

    if (!BUTTONDOWN_ENDPOINT) {
      // Placeholder: show success state for now
      showSuccess(email);
      return;
    }

    // Disable form while submitting
    emailInput.disabled = true;
    form.querySelector('button').disabled = true;

    fetch(BUTTONDOWN_ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: email, tags: ['website'] })
    })
    .then(function (res) {
      if (res.ok || res.status === 201) {
        showSuccess(email);
      } else {
        return res.json().then(function (data) {
          throw new Error(data.detail || 'Something went wrong.');
        });
      }
    })
    .catch(function (err) {
      showError(err.message || 'Could not subscribe. Please try again.');
      emailInput.disabled = false;
      form.querySelector('button').disabled = false;
    });
  });

  function showError(message) {
    emailInput.classList.add('has-error');
    msgEl.className = 'newsletter-msg newsletter-error';
    msgEl.textContent = message;

    emailInput.addEventListener('input', function handler() {
      emailInput.classList.remove('has-error');
      msgEl.textContent = '';
      msgEl.className = 'newsletter-msg';
      emailInput.removeEventListener('input', handler);
    });
  }

  function showSuccess(email) {
    var wrap = form.closest('.newsletter-form-wrap');
    wrap.innerHTML =
      '<div class="newsletter-success">' +
        '<h4>You\'re in.</h4>' +
        '<p>A confirmation email is on its way to <strong>' + escapeHtml(email) + '</strong>. ' +
        'Click the link inside to confirm your subscription.</p>' +
      '</div>';
  }

  function escapeHtml(str) {
    var div = document.createElement('div');
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  }
});
</script>
