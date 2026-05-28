const state = {
  activeCategory: 'all',
  activeLevel: 'all',
  query: '',
};

const dom = {
  searchInput: null,
  categoryButtons: [],
  levelButtons: [],
  commandCards: [],
  sections: [],
  resultCount: null,
  emptyState: null,
};

document.addEventListener('DOMContentLoaded', bootstrapApp);

async function bootstrapApp() {
  await loadLibraryMarkup();
  initializeApp();
}

async function loadLibraryMarkup() {
  const host = document.getElementById('app-main');
  if (!host) {
    return;
  }

  const response = await fetch('assets/partials/library-main.html');
  host.innerHTML = await response.text();
}

function initializeApp() {
  dom.searchInput = document.getElementById('search');
  dom.categoryButtons = [...document.querySelectorAll('.cat-btn')];
  dom.levelButtons = [...document.querySelectorAll('.lvl')];
  dom.commandCards = [...document.querySelectorAll('.cmd-card')];
  dom.sections = [...document.querySelectorAll('.cat-sec')];
  dom.resultCount = document.getElementById('rc');
  dom.emptyState = document.getElementById('empty');

  if (dom.searchInput) {
    dom.searchInput.addEventListener('input', handleSearchInput);
  }

  document.addEventListener('keydown', handleGlobalShortcuts);
  filterCommands();
}

function handleSearchInput(event) {
  state.query = event.target.value.toLowerCase().trim();
  if (state.query) {
    state.activeCategory = 'all';
    syncCategoryButtons('all');
  }
  filterCommands();
}

function handleGlobalShortcuts(event) {
  if (event.key === '/' && document.activeElement.tagName !== 'INPUT') {
    event.preventDefault();
    dom.searchInput?.focus();
  }
}

function setCategory(category, button) {
  state.activeCategory = category;
  syncCategoryButtons(category);
  filterCommands();
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function syncCategoryButtons(category) {
  dom.categoryButtons.forEach((button) => {
    button.classList.toggle('active', button.dataset.cat === category);
  });
}

function setLevel(level, button) {
  state.activeLevel = level;
  dom.levelButtons.forEach((levelButton) => levelButton.classList.remove('active'));
  button.classList.add('active');
  filterCommands();
}

function filterCommands() {
  let visibleCount = 0;

  dom.commandCards.forEach((card) => {
    const matchesCategory = state.activeCategory === 'all' || card.dataset.category === state.activeCategory;
    const matchesLevel = state.activeLevel === 'all' || (card.dataset.levels || '').split(',').includes(state.activeLevel);
    const searchableText = (card.textContent || '').toLowerCase();
    const searchableTags = (card.dataset.tags || '').toLowerCase();
    const matchesQuery = !state.query || searchableText.includes(state.query) || searchableTags.includes(state.query);
    const isVisible = matchesCategory && matchesLevel && matchesQuery;

    card.style.display = isVisible ? '' : 'none';
    if (isVisible) {
      visibleCount += 1;
    }
  });

  dom.sections.forEach((section) => {
    const hasVisibleCard = [...section.querySelectorAll('.cmd-card')].some((card) => card.style.display !== 'none');
    section.style.display = hasVisibleCard ? '' : 'none';
  });

  if (dom.emptyState) {
    dom.emptyState.style.display = visibleCount === 0 ? 'block' : 'none';
  }

  if (dom.resultCount) {
    dom.resultCount.textContent = visibleCount;
  }
}

function toggleAcc(button) {
  const body = button.nextElementSibling;
  const icon = button.querySelector('.aic');
  const isOpen = body.style.maxHeight && body.style.maxHeight !== '0px';

  body.style.maxHeight = isOpen ? '0px' : `${body.scrollHeight}px`;
  body.style.opacity = isOpen ? '0' : '1';
  button.setAttribute('aria-expanded', String(!isOpen));

  if (icon) {
    icon.style.transform = isOpen ? 'rotate(0deg)' : 'rotate(180deg)';
  }
}

function switchTab(tabId, groupId) {
  const group = document.getElementById(groupId);
  if (!group) {
    return;
  }

  group.querySelectorAll('.tab-p').forEach((panel) => panel.classList.remove('active'));
  group.querySelectorAll('.tab-t').forEach((tab) => tab.classList.remove('active'));

  const panel = group.querySelector(`#p-${tabId}`);
  const tab = group.querySelector(`[data-tab="${tabId}"]`);

  if (panel) {
    panel.classList.add('active');
  }

  if (tab) {
    tab.classList.add('active');
  }
}

function copyCmd(button, text) {
  const command = text.replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&amp;/g, '&').replace(/&#39;/g, "'");
  navigator.clipboard.writeText(command).then(() => {
    const previousLabel = button.innerHTML;
    button.innerHTML = '✓';
    button.style.color = 'var(--pr)';
    button.style.borderColor = 'var(--pr)';

    setTimeout(() => {
      button.innerHTML = previousLabel;
      button.style.color = '';
      button.style.borderColor = '';
    }, 1800);
  });
}

window.setCategory = setCategory;
window.setLevel = setLevel;
window.toggleAcc = toggleAcc;
window.switchTab = switchTab;
window.copyCmd = copyCmd;
