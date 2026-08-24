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

  // The form posts directly to Buttondown's public embed-subscribe
  // endpoint (target="popupwindow" in the markup) — no API key involved,
  // and no fetch(): Buttondown's own guidance is to let the browser
  // follow the real response, since some signups need to see a CAPTCHA
  // or an "already subscribed" message that a background request can't
  // surface. We only intercept invalid input; a valid email is left to
  // submit normally, opening Buttondown's response in the popup window.
  form.addEventListener('submit', function (e) {
    var email = emailInput.value.trim();
    if (!email) {
      e.preventDefault();
      showError('Enter an email address.');
      return;
    }

    var emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
    if (!emailPattern.test(email)) {
      e.preventDefault();
      showError('That doesn\'t look like an email address.');
      return;
    }

    window.open('https://buttondown.com/rob-taylor', 'popupwindow');
    showPending();
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

  function showPending() {
    emailInput.classList.remove('has-error');
    msgEl.className = 'newsletter-msg newsletter-pending';
    msgEl.textContent = 'Finish up in the popup window that just opened.';
  }
}
</script>
