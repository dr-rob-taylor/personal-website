<script>
document.addEventListener('DOMContentLoaded', function () {
  var wrap = document.querySelector('.newsletter-form-wrap');
  if (wrap) initNewsletter(wrap);
});

function initNewsletter(wrap) {
  var form = wrap.querySelector('#newsletter-form');
  if (!form) return;

  var emailInput = wrap.querySelector('#newsletter-email');
  var msgEl = wrap.querySelector('#newsletter-msg');
  var originalHTML = wrap.innerHTML;

  form.addEventListener('submit', function (e) {
    e.preventDefault();

    var email = emailInput.value.trim();
    if (!email) {
      showError('Enter an email address.');
      return;
    }

    // Basic email validation
    var emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
    if (!emailPattern.test(email)) {
      showError('That doesn\'t look like an email address.');
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
          var detail = data.detail || '';
          if (/already/i.test(detail)) {
            throw new Error('That address is already on the list.');
          }
          throw new Error(detail || 'Could not subscribe. Please try again.');
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
    wrap.innerHTML =
      '<div class="newsletter-success">' +
        '<h4>Check your inbox.</h4>' +
        '<p>A confirmation went to <strong>' + escapeHtml(email) + '</strong>. ' +
        'Click the link in it and you’re on the list.</p>' +
        '<a href="#" class="newsletter-reset">Use a different address</a>' +
      '</div>';
    wrap.querySelector('.newsletter-reset').addEventListener('click', function (e) {
      e.preventDefault();
      wrap.innerHTML = originalHTML;
      initNewsletter(wrap);
    });
  }

  function escapeHtml(str) {
    var div = document.createElement('div');
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  }
}
</script>
