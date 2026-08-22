<script>
// include-after-body scripts run very late in the document — on a fast
// or cached load the `load` event (or even DOMContentLoaded) has often
// already fired by the time this executes, so a plain addEventListener
// can silently never run. Run immediately whenever the DOM is already
// parsed, otherwise wait for it — and run as early as possible (not on
// `load`, which waits on images) so the TOC's CSS `visibility: hidden`
// default (see styles.css) is lifted almost immediately, instead of
// showing it in its original spot first and visibly snapping into place.
function initPostLayout() {
  // Quarto stamps an (empty) #title-block-header on every page, even
  // non-article ones like the Writing index — only individual posts get
  // this treatment.
  if (!document.querySelector('#quarto-content.page-layout-article')) return;
  relocateTOC();
  addAllWritingLink();
}
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initPostLayout);
} else {
  initPostLayout();
}

// Quarto's article layout puts the TOC in a page-wide margin column,
// running the full height of the page beside the title. The design has
// it sitting inside the article's own measure instead, starting below
// the hero image, beside the body copy — so move it there once Quarto
// has finished its own setup (scroll-spy etc. keep working since that
// re-queries #TOC live rather than caching a reference to its old spot).
function relocateTOC() {
  var sidebar = document.getElementById('quarto-sidebar');
  var main = document.getElementById('quarto-document-content');
  if (!sidebar || !main || sidebar.dataset.relocated) return;

  var header = main.querySelector('#title-block-header');
  var hero = main.querySelector(':scope > .quarto-figure');
  var insertAfter = hero || header;
  if (!insertAfter) return;

  var columns = document.createElement('div');
  columns.className = 'post-body-columns';
  var prose = document.createElement('div');
  prose.className = 'post-body-prose';

  var node = insertAfter.nextElementSibling;
  while (node) {
    var next = node.nextElementSibling;
    prose.appendChild(node);
    node = next;
  }

  // Prose first in the DOM so it leads on mobile (rails drop below their
  // content there); flex `order` puts the TOC back on the left at
  // desktop widths.
  columns.appendChild(prose);
  columns.appendChild(sidebar);
  insertAfter.insertAdjacentElement('afterend', columns);
  sidebar.dataset.relocated = 'true';
  sidebar.classList.add('post-toc-ready');
}

// Quarto's title block has no built-in "back to index" link — the design
// wants one above the category tags, in the same style as the nav.
function addAllWritingLink() {
  var header = document.getElementById('title-block-header');
  if (!header || header.dataset.breadcrumbAdded) return;

  var link = document.createElement('a');
  link.className = 'all-writing-link';
  link.href = '/blog/';
  link.innerHTML = '<span class="all-writing-rule"></span>All writing';
  header.insertAdjacentElement('afterbegin', link);
  header.dataset.breadcrumbAdded = 'true';
}
</script>
