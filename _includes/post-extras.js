<script>
// Runs after toc-layout.js (see _quarto.yml's include-after-body order),
// so .post-body-prose already exists by the time this executes.
function initPostExtras() {
  var prose = document.querySelector('.post-body-prose');
  var h1 = document.querySelector('.quarto-title h1.title');
  var dateMeta = document.querySelector('meta[name="dcterms.date"]');
  if (!prose || !h1 || !dateMeta || prose.dataset.citeAdded) return;
  prose.dataset.citeAdded = 'true';

  var year = dateMeta.content.slice(0, 4);
  var title = h1.textContent.trim();
  var citation = 'Taylor, R. (' + year + '). ' + title + '. robtaylor.co.nz';

  var box = document.createElement('div');
  box.className = 'post-cite-box';

  var citeCol = document.createElement('div');
  var label = document.createElement('span');
  label.className = 'post-cite-label';
  label.textContent = 'Cite this post';
  var text = document.createElement('span');
  text.className = 'post-cite-text';
  text.textContent = citation;
  citeCol.appendChild(label);
  citeCol.appendChild(text);

  var actions = document.createElement('div');
  actions.className = 'post-cite-actions';

  var copyBtn = document.createElement('button');
  copyBtn.type = 'button';
  copyBtn.className = 'post-cite-btn';
  copyBtn.textContent = 'Copy';

  var shareBtn = document.createElement('button');
  shareBtn.type = 'button';
  shareBtn.className = 'post-cite-btn post-cite-btn-accent';
  shareBtn.textContent = 'Share';

  actions.appendChild(copyBtn);
  actions.appendChild(shareBtn);
  box.appendChild(citeCol);
  box.appendChild(actions);
  prose.appendChild(box);

  function flash(btn, message) {
    var original = btn.textContent;
    btn.textContent = message;
    btn.disabled = true;
    setTimeout(function () {
      btn.textContent = original;
      btn.disabled = false;
    }, 1800);
  }

  copyBtn.addEventListener('click', function () {
    navigator.clipboard.writeText(citation).then(function () {
      flash(copyBtn, 'Copied');
    }, function () {
      flash(copyBtn, 'Copy failed');
    });
  });

  shareBtn.addEventListener('click', function () {
    var url = location.href;
    if (navigator.share) {
      navigator.share({ title: title, url: url }).catch(function () {});
    } else {
      navigator.clipboard.writeText(url).then(function () {
        flash(shareBtn, 'Link copied');
      }, function () {
        flash(shareBtn, 'Copy failed');
      });
    }
  });
}
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initPostExtras);
} else {
  initPostExtras();
}
</script>
