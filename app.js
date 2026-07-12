'use strict';

/**
 * Poker Mate v9.0.0 bootstrap.
 * Business logic lives under ./js.
 */
function showFatalBootError(error) {
  console.error('Poker Mate boot failed:', error);
  const panel = document.createElement('section');
  panel.className = 'fatal-boot-panel';
  panel.innerHTML = `
    <strong>アプリの起動に失敗しました</strong>
    <p>${esc(error?.message || String(error))}</p>
    <button type="button" onclick="location.reload()">再読み込み</button>
  `;
  document.body.appendChild(panel);
}

function bootPokerMate() {
  try {
    function renderAll(){
      renderHome();renderSessions();renderVenues();renderRangeGrid();renderOdds();renderRaiseOdds();renderDraw();renderPower();renderHands();renderBankroll();renderSettings();
      setVenueView(uiState.venueView||'list',false);
      setMoreView(uiState.moreView||'review',false);
      setTool(uiState.lastTool==='raise'?'odds':(uiState.lastTool||'odds'),false);
    }
    applyUiPreferences();populateFirebaseConfigForm();renderAuthState({configured:firebaseConfigIsComplete(loadFirebaseConfig()),user:null});updateTopbarContext('home');
    document.getElementById('sessionDate').value=today();document.getElementById('handDate').value=today();document.getElementById('bankrollTransactionDate').value=today();document.getElementById('chipTransactionDate').value=today();
    document.getElementById('equityHeroMode').value=uiState.equityHeroMode||'fixed';document.getElementById('equityVillainMode').value=uiState.equityVillainMode||'random';buildPnHandPicker();initializeSmartNumberInputs();initializeCollapsibleSections();resetSessionForm();renderAll();renderVisualCards();renderBackupStatus();
    window.PokerMateRuntime.phase = 'ready';
    window.PokerMateRuntime.readyAt = Date.now();
    document.documentElement.dataset.appBoot = 'ready';

    window.PokerMateDebug = Object.freeze({
      version: APP_VERSION,
      schemaVersion: DATA_SCHEMA_VERSION,
      modules: ["00-runtime.js", "10-config.js", "20-state.js", "30-shell.js", "40-sessions.js", "50-ranges.js", "60-tools.js", "70-review-bankroll.js", "80-components.js", "90-data.js"],
      audit: () => auditStateData(state),
      getStateSnapshot: () => JSON.parse(JSON.stringify(state)),
      getUiStateSnapshot: () => JSON.parse(JSON.stringify(uiState)),
      renderAll,
      runtime: window.PokerMateRuntime
    });
  } catch (error) {
    recordPokerMateRuntimeError('bootstrap', error);
    window.PokerMateRuntime.phase = 'failed';
    showFatalBootError(error);
  }
}

bootPokerMate();
