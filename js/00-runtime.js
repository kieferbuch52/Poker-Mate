'use strict';

window.PokerMateRuntime = {
  version: '9.0.0',
  phase: 'loading',
  errors: [],
  startedAt: Date.now()
};

function recordPokerMateRuntimeError(kind, value) {
  const message = value?.message || String(value || 'Unknown error');
  window.PokerMateRuntime.errors.push({
    kind,
    message,
    stack: value?.stack || '',
    at: new Date().toISOString()
  });
  document.documentElement.dataset.appBoot = 'error';
}

window.addEventListener('error', event => {
  recordPokerMateRuntimeError('error', event.error || event.message);
});

window.addEventListener('unhandledrejection', event => {
  recordPokerMateRuntimeError('unhandledrejection', event.reason);
});

document.documentElement.dataset.appBoot = 'loading';
