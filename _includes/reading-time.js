<script>
document.addEventListener('DOMContentLoaded', function () {
  var meta = document.querySelector('.quarto-title-meta');
  var main = document.getElementById('quarto-document-content');
  if (!meta || !main) return;

  var header = main.querySelector('#title-block-header');
  var words = main.textContent || '';
  if (header) words = words.slice((header.textContent || '').length);
  var count = words.trim().split(/\s+/).filter(Boolean).length;
  if (!count) return;

  // Technical/maths prose reads slower than general text — 100wpm rather
  // than the usual ~200-238wpm reading-time default.
  var minutes = Math.max(1, Math.round(count / 100));

  var block = document.createElement('div');
  block.innerHTML =
    '<div class="quarto-title-meta-heading">Reading time</div>' +
    '<div class="quarto-title-meta-contents"><p>' + minutes + ' min</p></div>';
  meta.appendChild(block);
});
</script>
