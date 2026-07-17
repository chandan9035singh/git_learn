(function conflictArenaModule() {
  "use strict";

  const STORAGE_KEY = "gitquest-conflict-arena-completed-v1";
  const MARKER_PATTERN = /(^|\n)\s*(?:<{7}|={7}|>{7})(?:\s|$)/;

  const scenarios = [
    {
      id: "same-line-merge",
      title: "Same-line merge",
      badge: "Merge",
      difficulty: "Beginner",
      operation: "Merging feature/retry-policy into main",
      file: "src/api.js",
      summary: "Both branches changed the same object literal. Keep the useful intent from both sides, then continue the merge.",
      semantics: {
        base: "The common ancestor before either branch changed the request policy.",
        ours: "main, the branch currently checked out when git merge was run.",
        theirs: "feature/retry-policy, the branch being merged into main."
      },
      base: "export const requestOptions = {\n  timeout: 3000,\n  retries: 1\n};",
      ours: "export const requestOptions = {\n  timeout: 5000,\n  retries: 1\n};",
      theirs: "export const requestOptions = {\n  timeout: 3000,\n  retries: 3\n};",
      conflict: "<<<<<<< HEAD\nexport const requestOptions = { timeout: 5000, retries: 1 };\n=======\nexport const requestOptions = { timeout: 3000, retries: 3 };\n>>>>>>> feature/retry-policy",
      starter: "<<<<<<< HEAD\nexport const requestOptions = { timeout: 5000, retries: 1 };\n=======\nexport const requestOptions = { timeout: 3000, retries: 3 };\n>>>>>>> feature/retry-policy",
      solution: "export const requestOptions = {\n  timeout: 5000,\n  retries: 3\n};",
      required: ["timeout: 5000", "retries: 3"],
      statusCommand: "git status",
      inspectCommand: "git diff --cc -- src/api.js",
      testCommand: "npm test -- src/api.test.js",
      stageCommand: "git add -- src/api.js",
      continueCommand: "git merge --continue",
      continueLabel: "Continue the merge",
      verifyCommand: "git log --graph --oneline -5",
      abortCommand: "git merge --abort",
      abortNote: "This restores the pre-merge state when Git can do so safely.",
      outcomes: {
        status: "Git reports both modified: src/api.js and confirms that a merge is in progress.",
        inspect: "The combined diff reveals the timeout change from main and the retry change from the feature branch.",
        test: "The targeted request-policy tests pass with the combined timeout and retry behavior.",
        stage: "src/api.js is staged, which tells Git this path is resolved.",
        continued: "The merge completes with the resolved request policy.",
        verify: "The graph contains the merge result and both branch histories remain reachable."
      },
      hints: [
        "Remove all three marker lines: <<<<<<<, =======, and >>>>>>>.",
        "The larger timeout came from main; the higher retry count came from the feature branch.",
        "A valid resolution can keep timeout: 5000 and retries: 3 in one object."
      ],
      verification: "Confirm the app still handles timeouts correctly and that the history contains the intended merge."
    },
    {
      id: "add-add",
      title: "Add/add conflict",
      badge: "Merge",
      difficulty: "Beginner",
      operation: "Merging feature/docs into main",
      file: "docs/development.md",
      summary: "Both branches created a file at the same path. Build one document that preserves both valid workflows.",
      semantics: {
        base: "No file existed at this path in the common ancestor.",
        ours: "The development guide added on the currently checked-out main branch.",
        theirs: "A different guide added on feature/docs."
      },
      base: "(file did not exist)",
      ours: "# Local development\n\nRun `npm run dev` for hot reload.",
      theirs: "# Development server\n\nRun `npm start` to test the production server.",
      conflict: "<<<<<<< HEAD\n# Local development\n\nRun `npm run dev` for hot reload.\n=======\n# Development server\n\nRun `npm start` to test the production server.\n>>>>>>> feature/docs",
      starter: "<<<<<<< HEAD\n# Local development\n\nRun `npm run dev` for hot reload.\n=======\n# Development server\n\nRun `npm start` to test the production server.\n>>>>>>> feature/docs",
      solution: "# Local development\n\n- Run `npm run dev` for hot reload.\n- Run `npm start` to test the production server.",
      required: ["npm run dev", "npm start"],
      statusCommand: "git status",
      inspectCommand: "git diff --cc -- docs/development.md",
      testCommand: "npm run docs:check -- docs/development.md",
      stageCommand: "git add -- docs/development.md",
      continueCommand: "git merge --continue",
      continueLabel: "Continue the merge",
      verifyCommand: "git show --stat --oneline HEAD",
      abortCommand: "git merge --abort",
      abortNote: "Abort the whole merge if the team is not ready to decide how the two guides should be combined.",
      outcomes: {
        status: "Git reports both added: docs/development.md.",
        inspect: "The combined diff shows two independent additions at one path and no base version.",
        test: "The documentation check passes and recognizes both development commands.",
        stage: "The combined guide is staged as the selected resolution.",
        continued: "The merge completes with one development guide.",
        verify: "The merge commit includes docs/development.md and both commands are present."
      },
      hints: [
        "There is no base document to restore; both files are new.",
        "Choose a single heading and explain when each command is useful.",
        "The final document must retain both npm run dev and npm start."
      ],
      verification: "Render the Markdown and try both documented scripts before sharing the merge."
    },
    {
      id: "modify-delete",
      title: "Modify/delete conflict",
      badge: "Merge",
      difficulty: "Intermediate",
      operation: "Merging release/v2 into refactor/config",
      file: "src/legacy-api.js",
      summary: "The current branch deleted a file that the incoming branch updated. For this exercise, keep the v2 compatibility module and mark it deprecated.",
      semantics: {
        base: "The v1 compatibility module in the common ancestor.",
        ours: "refactor/config deleted the legacy module on the current branch.",
        theirs: "release/v2 updated that same module to the v2 endpoint."
      },
      base: "export const API_URL = \"/api/v1\";",
      ours: "(deleted on refactor/config)",
      theirs: "export const API_URL = \"/api/v2\";",
      conflict: "deleted by us: src/legacy-api.js\n\nGit leaves the incoming file in the working tree for you to inspect. This conflict does not use inline marker lines.",
      starter: "export const API_URL = \"/api/v2\";",
      solution: "/** @deprecated Use src/api-client.js for new code. */\nexport const API_URL = \"/api/v2\";",
      required: ["@deprecated", "/api/v2"],
      statusCommand: "git status",
      inspectCommand: "git diff --name-status --diff-filter=U",
      testCommand: "npm test -- src/legacy-api.test.js",
      stageCommand: "git add -- src/legacy-api.js",
      continueCommand: "git merge --continue",
      continueLabel: "Continue the merge",
      verifyCommand: "git show --name-status --oneline HEAD",
      abortCommand: "git merge --abort",
      abortNote: "Abort returns to the state before this merge; it does not choose deletion or retention for you.",
      outcomes: {
        status: "Git reports deleted by us: src/legacy-api.js.",
        inspect: "The unmerged-path list confirms a modify/delete decision, not a same-line text conflict.",
        test: "The compatibility test passes against the retained v2 endpoint and deprecation contract.",
        stage: "Adding the retained file records the deliberate keep-file decision.",
        continued: "The merge completes with the compatibility module retained.",
        verify: "The resulting commit keeps the v2 module and its deprecation notice."
      },
      hints: [
        "Modify/delete conflicts often have no <<<<<<< markers.",
        "The exercise decision is to retain the incoming v2 file, not delete it.",
        "Add a @deprecated notice while keeping the /api/v2 endpoint."
      ],
      verification: "Run compatibility tests and confirm no active import depends on behavior removed during the refactor."
    },
    {
      id: "rebase-conflict",
      title: "Rebase conflict",
      badge: "Rebase",
      difficulty: "Advanced",
      operation: "Rebasing feature/email-normalization onto main",
      file: "src/user.js",
      summary: "A topic commit is being replayed on newer main. Combine main's validation with the replayed normalization change.",
      semantics: {
        base: "The parent of the topic commit currently being replayed.",
        ours: "During rebase, ours is the updated upstream (main), not your topic branch.",
        theirs: "During rebase, theirs is the topic commit Git is replaying. This is the common rebase surprise."
      },
      base: "export function prepareEmail(value) {\n  return value.trim();\n}",
      ours: "export function prepareEmail(value) {\n  return validateEmail(value.trim());\n}",
      theirs: "export function prepareEmail(value) {\n  return normalizeEmail(value);\n}",
      conflict: "<<<<<<< HEAD\n  return validateEmail(value.trim());\n=======\n  return normalizeEmail(value);\n>>>>>>> 7ac91de (normalize user email)",
      starter: "export function prepareEmail(value) {\n<<<<<<< HEAD\n  return validateEmail(value.trim());\n=======\n  return normalizeEmail(value);\n>>>>>>> 7ac91de (normalize user email)\n}",
      solution: "export function prepareEmail(value) {\n  return validateEmail(normalizeEmail(value));\n}",
      required: ["validateEmail", "normalizeEmail"],
      statusCommand: "git status",
      inspectCommand: "git diff --cc -- src/user.js",
      testCommand: "npm test -- src/user.test.js",
      stageCommand: "git add -- src/user.js",
      continueCommand: "git rebase --continue",
      continueLabel: "Continue replaying commits",
      verifyCommand: "git log --graph --oneline --decorate -6",
      abortCommand: "git rebase --abort",
      abortNote: "Abort restores the branch to where it pointed before the rebase began.",
      outcomes: {
        status: "Git identifies an interactive or regular rebase in progress and names the commit being replayed.",
        inspect: "The combined diff separates upstream validation from the replayed normalization change.",
        test: "The focused user tests pass: input is normalized before it is validated.",
        stage: "The resolved user module is staged for this replayed commit.",
        continued: "Rebase records the resolved commit and moves to the next commit, or finishes if none remain.",
        verify: "The feature commits now sit on main and the old commit IDs have been replaced."
      },
      hints: [
        "Do not assume ours means your feature branch during a rebase.",
        "Normalization should happen before validation in this exercise.",
        "The final return statement should call both normalizeEmail and validateEmail."
      ],
      verification: "Run email validation tests, inspect the rewritten history, and force-push only with team agreement and --force-with-lease when required."
    },
    {
      id: "stash-pop",
      title: "Stash-pop conflict",
      badge: "Stash",
      difficulty: "Intermediate",
      operation: "Applying stash@{0} onto current main with git stash pop",
      file: "src/banner.js",
      summary: "Current work and stashed work changed the same banner. Preserve both the accessibility label and the stashed announcement.",
      semantics: {
        base: "The file version recorded when the stash was created.",
        ours: "The current working-tree version receiving the stash.",
        theirs: "The stashed changes being applied."
      },
      base: "export const banner = { text: \"Welcome\" };",
      ours: "export const banner = { text: \"Welcome\", ariaLabel: \"Site announcement\" };",
      theirs: "export const banner = { text: \"Version 2 is live\" };",
      conflict: "<<<<<<< Updated upstream\nexport const banner = { text: \"Welcome\", ariaLabel: \"Site announcement\" };\n=======\nexport const banner = { text: \"Version 2 is live\" };\n>>>>>>> Stashed changes",
      starter: "<<<<<<< Updated upstream\nexport const banner = { text: \"Welcome\", ariaLabel: \"Site announcement\" };\n=======\nexport const banner = { text: \"Version 2 is live\" };\n>>>>>>> Stashed changes",
      solution: "export const banner = {\n  text: \"Version 2 is live\",\n  ariaLabel: \"Site announcement\"\n};",
      required: ["Version 2 is live", "ariaLabel"],
      statusCommand: "git status",
      inspectCommand: "git diff --cc -- src/banner.js",
      testCommand: "npm test -- src/banner.test.js",
      stageCommand: "git add -- src/banner.js",
      continueCommand: "git status --short",
      continueLabel: "Finish resolution (stash has no --continue)",
      verifyCommand: "git stash list",
      abortCommand: "",
      abortNote: "git stash pop has no --abort command. A conflicted pop normally keeps the stash entry. Inspect your work before selectively restoring anything.",
      outcomes: {
        status: "Git reports src/banner.js as unmerged after the stash application.",
        inspect: "The combined diff shows the current accessibility label and the stashed announcement text.",
        test: "The banner test passes with the announcement text and accessible label intact.",
        stage: "The resolved banner is staged; there is no stash --continue command.",
        continued: "A short status check confirms the conflict is gone after staging.",
        verify: "The stash list confirms the conflicted pop retained stash@{0} as a recovery copy."
      },
      hints: [
        "Updated upstream is the current working-tree side in this stash conflict.",
        "Keep the stashed Version 2 announcement and the current ariaLabel.",
        "After resolving and staging, verify that the stash entry still exists before dropping it manually."
      ],
      verification: "Render the banner, test it with a screen reader, and keep the stash until you have verified the resolution."
    },
    {
      id: "rename-delete",
      title: "Rename/delete conflict",
      badge: "Merge",
      difficulty: "Advanced",
      operation: "Merging cleanup/docs into feature/setup-guide",
      file: "docs/setup.md",
      summary: "The current branch renamed a guide while the incoming branch deleted its old path. For this exercise, deliberately keep the renamed guide.",
      semantics: {
        base: "docs/install.md before either branch changed it.",
        ours: "feature/setup-guide renamed docs/install.md to docs/setup.md.",
        theirs: "cleanup/docs deleted docs/install.md because the old instructions were obsolete."
      },
      base: "# Install\n\nRun `npm install`.",
      ours: "# Setup\n\nRun `npm install`, then `npm run verify`.",
      theirs: "(docs/install.md deleted on cleanup/docs)",
      conflict: "renamed by us: docs/install.md -> docs/setup.md\ndeleted by them: docs/install.md\n\nThis is a file-state decision, so inline marker lines may not appear.",
      starter: "# Setup\n\nRun `npm install`.",
      solution: "# Install and setup\n\nRun `npm install`, then `npm run verify`.",
      required: ["Install and setup", "npm run verify"],
      statusCommand: "git status",
      inspectCommand: "git diff --summary --diff-filter=U",
      testCommand: "npm run docs:check -- docs/setup.md",
      stageCommand: "git add -A -- docs/install.md docs/setup.md",
      continueCommand: "git merge --continue",
      continueLabel: "Continue the merge",
      verifyCommand: "git show --name-status --find-renames HEAD",
      abortCommand: "git merge --abort",
      abortNote: "Abort leaves the rename on the current branch untouched and cancels only this merge attempt.",
      outcomes: {
        status: "Git reports the competing rename/delete file states.",
        inspect: "The summary connects the old path, new path, and incoming deletion.",
        test: "The documentation check passes for the retained path, heading, and verification command.",
        stage: "Both scoped paths are added to the index, recording the keep-renamed-file decision.",
        continued: "The merge completes with docs/setup.md retained.",
        verify: "The name-status view confirms the intended path and no duplicate install guide remains."
      },
      hints: [
        "This conflict is about whether a path should exist, not just which lines to keep.",
        "The exercise chooses to retain docs/setup.md; a real team should confirm that product decision.",
        "Use one current heading and include the npm run verify step."
      ],
      verification: "Search for links to docs/install.md, update them to docs/setup.md, and render the retained guide."
    }
  ];

  function withoutJavaScriptComments(value) {
    return value
      .replace(/\/\*[\s\S]*?\*\//g, "")
      .replace(/(^|\s)\/\/.*$/gm, "$1");
  }

  function withoutHtmlComments(value) {
    return value.replace(/<!--[\s\S]*?-->/g, "");
  }

  const structuralValidators = {
    "same-line-merge": (value) => {
      const code = withoutJavaScriptComments(value);
      const isObjectAssignment = /export\s+const\s+requestOptions\s*=\s*\{[\s\S]*\}\s*;?\s*$/.test(code);
      const hasTimeout = /\btimeout\s*:\s*5000\b/.test(code);
      const hasRetries = /\bretries\s*:\s*3\b/.test(code);
      return isObjectAssignment && hasTimeout && hasRetries
        ? ""
        : "Create a real exported requestOptions object with timeout 5000 and retries 3; comments alone are not executable code.";
    },
    "add-add": (value) => {
      const document = withoutHtmlComments(value);
      const hasHeading = /^#{1,6}\s+\S.*$/m.test(document);
      const hasBothCommands = /npm\s+run\s+dev/i.test(document) && /npm\s+start/i.test(document);
      return hasHeading && hasBothCommands
        ? ""
        : "Write one Markdown guide with a heading and usable instructions for both development commands.";
    },
    "modify-delete": (value) => {
      const code = withoutJavaScriptComments(value);
      const keepsModule = /export\s+const\s+API_URL\s*=\s*["']\/api\/v2["']\s*;?/.test(code);
      const hasDeprecationNotice = /\/\*[\s\S]*@deprecated[\s\S]*\*\//i.test(value) || /\/\/[^\n]*@deprecated/i.test(value);
      return keepsModule && hasDeprecationNotice
        ? ""
        : "Retain an executable API_URL export for /api/v2 and add @deprecated in a code comment.";
    },
    "rebase-conflict": (value) => {
      const code = withoutJavaScriptComments(value);
      const composesBehavior = /export\s+function\s+prepareEmail\s*\(\s*value\s*\)\s*\{[\s\S]*return\s+validateEmail\s*\(\s*normalizeEmail\s*\(\s*value\s*\)\s*\)\s*;?[\s\S]*\}/.test(code);
      return composesBehavior
        ? ""
        : "Implement prepareEmail so normalizeEmail(value) is passed into validateEmail; listing the function names is not enough.";
    },
    "stash-pop": (value) => {
      const code = withoutJavaScriptComments(value);
      const isBannerObject = /export\s+const\s+banner\s*=\s*\{[\s\S]*\}\s*;?\s*$/.test(code);
      const hasText = /\btext\s*:\s*["']Version 2 is live["']/.test(code);
      const hasLabel = /\bariaLabel\s*:\s*["']Site announcement["']/.test(code);
      return isBannerObject && hasText && hasLabel
        ? ""
        : "Create an exported banner object containing the announcement text and the Site announcement ariaLabel.";
    },
    "rename-delete": (value) => {
      const document = withoutHtmlComments(value);
      const hasHeading = /^#{1,6}\s+.*install and setup.*$/im.test(document);
      const hasCommands = /npm\s+install/i.test(document) && /npm\s+run\s+verify/i.test(document);
      return hasHeading && hasCommands
        ? ""
        : "Keep a real Markdown setup guide with an Install and setup heading plus both install and verify commands.";
    }
  };

  function escapeArenaHTML(value) {
    return String(value)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }

  function readCompleted() {
    try {
      const parsed = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
      const validIds = new Set(scenarios.map((scenario) => scenario.id));
      return new Set(Array.isArray(parsed) ? parsed.filter((id) => validIds.has(id)) : []);
    } catch (_error) {
      return new Set();
    }
  }

  function writeCompleted(completed) {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify([...completed]));
    } catch (_error) {
      // Completion remains available for this session when storage is unavailable.
    }
  }

  function mountConflictArena() {
    const app = document.getElementById("conflictArenaApp");
    if (!app || app.dataset.conflictArenaMounted === "true") return;
    app.dataset.conflictArenaMounted = "true";

    const completed = readCompleted();
    writeCompleted(completed);
    const scenarioStates = new Map();
    let activeId = scenarios[0].id;

    scenarios.forEach((scenario) => {
      scenarioStates.set(scenario.id, {
        step: 0,
        resolution: scenario.starter,
        hintsShown: 0,
        validationMessage: "",
        logs: []
      });
    });

    app.innerHTML = `
      <section class="conflict-arena" aria-labelledby="conflictArenaTitle">
        <div class="conflict-arena__overview">
          <div>
            <span class="section-heading__eyebrow">Safe repository simulator</span>
            <h3 id="conflictArenaTitle">Conflict Arena</h3>
            <p>Diagnose the operation, understand each side, resolve one path, test the behavior, stage it, continue correctly, and verify the result.</p>
          </div>
          <div class="conflict-arena__mastery" role="progressbar" aria-label="Conflict scenarios completed" aria-valuemin="0" aria-valuemax="${scenarios.length}" aria-valuenow="${completed.size}">
            <strong data-arena-complete-count>${completed.size}/${scenarios.length}</strong>
            <span>scenarios mastered</span>
          </div>
        </div>
        <div class="conflict-arena__layout">
          <nav class="conflict-arena__scenario-nav" aria-label="Conflict scenarios">
            <div data-arena-nav></div>
          </nav>
          <div class="conflict-arena__panel" data-arena-panel></div>
        </div>
        <p class="sr-only" data-arena-live role="status" aria-live="polite" aria-atomic="true"></p>
      </section>`;

    const nav = app.querySelector("[data-arena-nav]");
    const panel = app.querySelector("[data-arena-panel]");
    const live = app.querySelector("[data-arena-live]");

    function activeScenario() {
      return scenarios.find((scenario) => scenario.id === activeId) || scenarios[0];
    }

    function activeState() {
      return scenarioStates.get(activeId);
    }

    function announce(message) {
      live.textContent = "";
      window.requestAnimationFrame(() => {
        live.textContent = message;
      });
    }

    function emitSkill(action, extraDetail) {
      app.dispatchEvent(new CustomEvent("gitquest:skill", {
        bubbles: true,
        detail: {
          skill: "conflict-resolution",
          action,
          scenarioId: activeId,
          completed: [...completed],
          totalScenarios: scenarios.length,
          ...extraDetail
        }
      }));
    }

    function stepsFor(scenario) {
      return [
        { id: "status", label: "Identify the operation", command: scenario.statusCommand, outcome: scenario.outcomes.status },
        { id: "inspect", label: "Inspect the unmerged path", command: scenario.inspectCommand, outcome: scenario.outcomes.inspect },
        { id: "resolve", label: "Resolve the file", command: `Edit ${scenario.file} and remove conflict markers`, outcome: "The working-tree file now expresses one deliberate, testable result.", manual: true },
        { id: "test", label: "Test the resolved behavior", command: scenario.testCommand, outcome: scenario.outcomes.test, simulatedTest: true },
        { id: "stage", label: "Mark the path resolved", command: scenario.stageCommand, outcome: scenario.outcomes.stage },
        { id: "continue", label: scenario.continueLabel, command: scenario.continueCommand, outcome: scenario.outcomes.continued },
        { id: "verify", label: "Verify history and state", command: scenario.verifyCommand, outcome: scenario.outcomes.verify }
      ];
    }

    function renderNav() {
      nav.innerHTML = `<ol class="conflict-arena__scenario-list">${scenarios.map((scenario, index) => {
        const isActive = scenario.id === activeId;
        const isComplete = completed.has(scenario.id);
        return `<li>
          <button class="conflict-arena__scenario-button${isActive ? " is-active" : ""}${isComplete ? " is-complete" : ""}" type="button" data-arena-scenario="${escapeArenaHTML(scenario.id)}" aria-pressed="${isActive}">
            <span class="conflict-arena__scenario-number">${String(index + 1).padStart(2, "0")}</span>
            <span><strong>${escapeArenaHTML(scenario.title)}</strong><small>${escapeArenaHTML(scenario.badge)} · ${escapeArenaHTML(scenario.difficulty)}</small></span>
            <span class="conflict-arena__scenario-state"><span class="sr-only">${isComplete ? "Completed" : "Not completed"}</span><span aria-hidden="true">${isComplete ? "✓" : "→"}</span></span>
          </button>
        </li>`;
      }).join("")}</ol>`;
    }

    function codePane(label, meaning, code, modifier) {
      return `<article class="conflict-arena__version conflict-arena__version--${modifier}">
        <header><strong>${escapeArenaHTML(label)}</strong><span>${escapeArenaHTML(meaning)}</span></header>
        <pre tabindex="0"><code>${escapeArenaHTML(code)}</code></pre>
      </article>`;
    }

    function renderPanel(focusSelector) {
      const scenario = activeScenario();
      const state = activeState();
      const steps = stepsFor(scenario);
      const completedSteps = Math.min(state.step, steps.length);
      const progressPercent = Math.round((completedSteps / steps.length) * 100);
      const shownHints = scenario.hints.slice(0, state.hintsShown);
      const finished = state.step >= steps.length;

      panel.innerHTML = `
        <article class="conflict-arena__challenge" aria-labelledby="arenaScenarioTitle">
          <header class="conflict-arena__challenge-header">
            <div>
              <span class="lesson-label">${escapeArenaHTML(scenario.badge)} conflict · ${escapeArenaHTML(scenario.difficulty)}</span>
              <h4 id="arenaScenarioTitle" tabindex="-1">${escapeArenaHTML(scenario.title)}</h4>
              <p>${escapeArenaHTML(scenario.summary)}</p>
            </div>
            <span class="conflict-arena__completion-badge">${completed.has(scenario.id) ? "Mastered ✓" : `${completedSteps}/${steps.length} steps`}</span>
          </header>

          <div class="conflict-arena__operation" role="note">
            <strong>Operation in progress</strong>
            <code>${escapeArenaHTML(scenario.operation)}</code>
            <span>Unmerged path: <code>${escapeArenaHTML(scenario.file)}</code></span>
          </div>

          <section class="conflict-arena__semantics" aria-labelledby="arenaVersionsTitle">
            <div class="conflict-arena__subheading">
              <div><span>01</span><h5 id="arenaVersionsTitle">Understand base, ours, and theirs</h5></div>
              <p>These labels depend on the active Git operation.</p>
            </div>
            <div class="conflict-arena__versions">
              ${codePane("Base", scenario.semantics.base, scenario.base, "base")}
              ${codePane("Ours", scenario.semantics.ours, scenario.ours, "ours")}
              ${codePane("Theirs", scenario.semantics.theirs, scenario.theirs, "theirs")}
            </div>
          </section>

          <section class="conflict-arena__file-state" aria-labelledby="arenaFileStateTitle">
            <div class="conflict-arena__subheading">
              <div><span>02</span><h5 id="arenaFileStateTitle">Read the conflict state</h5></div>
            </div>
            <pre tabindex="0"><code>${escapeArenaHTML(scenario.conflict)}</code></pre>
          </section>

          <section class="conflict-arena__resolution" aria-labelledby="arenaResolutionTitle">
            <div class="conflict-arena__subheading">
              <div><span>03</span><h5 id="arenaResolutionTitle">Create the resolved file</h5></div>
              <span data-arena-character-count>${state.resolution.length} characters</span>
            </div>
            <label for="arenaResolution">Resolved contents of ${escapeArenaHTML(scenario.file)}</label>
            <textarea id="arenaResolution" data-arena-resolution spellcheck="false" aria-describedby="arenaResolutionHelp arenaValidation" rows="11">${escapeArenaHTML(state.resolution)}</textarea>
            <p id="arenaResolutionHelp">Remove markers and make one intentional result. Git cannot decide the product behavior for you.</p>
            <p id="arenaValidation" class="conflict-arena__validation${state.validationMessage ? " is-visible" : ""}" role="status">${escapeArenaHTML(state.validationMessage)}</p>
          </section>

          <section class="conflict-arena__workflow" aria-labelledby="arenaWorkflowTitle">
            <div class="conflict-arena__subheading">
              <div><span>04</span><h5 id="arenaWorkflowTitle">Resolve with a safe sequence</h5></div>
              <label class="conflict-arena__step-progress"><span class="sr-only">Current scenario progress: ${progressPercent}%</span><progress max="${steps.length}" value="${completedSteps}">${progressPercent}%</progress></label>
            </div>
            <ol class="conflict-arena__steps">${steps.map((step, index) => {
              const isDone = index < state.step;
              const isCurrent = index === state.step;
              return `<li class="${isDone ? "is-complete" : ""}${isCurrent ? " is-current" : ""}">
                <span class="conflict-arena__step-index">${isDone ? "✓" : index + 1}</span>
                <div><strong>${escapeArenaHTML(step.label)}</strong><code>${escapeArenaHTML(step.command)}</code>${isDone ? `<small>${escapeArenaHTML(step.outcome)}</small>` : ""}</div>
                <button class="button ${isCurrent ? "button--primary" : "button--ghost"}" type="button" data-arena-step="${index}" ${isCurrent ? "" : "disabled"}>${step.manual ? "Validate resolution" : step.simulatedTest ? "Run simulated test" : "Run safely"}</button>
              </li>`;
            }).join("")}</ol>
          </section>

          <section class="conflict-arena__hints" aria-labelledby="arenaHintsTitle">
            <div class="conflict-arena__subheading">
              <div><span>?</span><h5 id="arenaHintsTitle">Hints when you need them</h5></div>
            </div>
            ${shownHints.length ? `<ol>${shownHints.map((hint) => `<li>${escapeArenaHTML(hint)}</li>`).join("")}</ol>` : `<p>No hints revealed yet. Try reading the operation and the three versions first.</p>`}
            <div class="conflict-arena__hint-actions">
              <button class="button button--ghost" type="button" data-arena-action="hint" ${state.hintsShown >= scenario.hints.length ? "disabled" : ""}>${state.hintsShown ? "Show next hint" : "Show a hint"}</button>
              <button class="button button--ghost" type="button" data-arena-action="solution">Use guided resolution</button>
            </div>
          </section>

          <section class="conflict-arena__verification" aria-labelledby="arenaVerificationTitle">
            <div><span aria-hidden="true">✓</span><div><h5 id="arenaVerificationTitle">Definition of resolved</h5><p>${escapeArenaHTML(scenario.verification)}</p></div></div>
            ${finished ? `<strong class="conflict-arena__success">Scenario complete. The repeatable method is status → inspect → resolve → test → stage → continue → verify.</strong>` : ""}
          </section>

          <footer class="conflict-arena__escape-hatch">
            <div><strong>Need to stop?</strong><p>${escapeArenaHTML(scenario.abortNote)}</p></div>
            <div>
              ${scenario.abortCommand ? `<button class="button button--ghost" type="button" data-arena-action="abort">Simulate ${escapeArenaHTML(scenario.abortCommand)}</button>` : `<button class="button button--ghost" type="button" data-arena-action="no-abort">Why there is no abort</button>`}
              <button class="button button--ghost" type="button" data-arena-action="reset">Reset exercise</button>
            </div>
          </footer>

          <div class="conflict-arena__terminal" aria-labelledby="arenaTerminalTitle">
            <div><strong id="arenaTerminalTitle">Simulation log</strong><span>Nothing runs on your computer</span></div>
            <pre tabindex="0" data-arena-log>${state.logs.length ? state.logs.map((entry) => `$ ${entry.command}\n${entry.output}`).map(escapeArenaHTML).join("\n\n") : "Choose the first safe step to begin."}</pre>
          </div>
        </article>`;

      if (focusSelector) {
        window.requestAnimationFrame(() => panel.querySelector(focusSelector)?.focus());
      }
    }

    function updateMastery() {
      const mastery = app.querySelector(".conflict-arena__mastery");
      const count = app.querySelector("[data-arena-complete-count]");
      mastery?.setAttribute("aria-valuenow", String(completed.size));
      if (count) count.textContent = `${completed.size}/${scenarios.length}`;
    }

    function resetScenario(message) {
      const scenario = activeScenario();
      scenarioStates.set(activeId, {
        step: 0,
        resolution: scenario.starter,
        hintsShown: 0,
        validationMessage: "",
        logs: []
      });
      renderPanel("[data-arena-step='0']");
      announce(message);
      emitSkill("reset", { currentStep: 0 });
    }

    function validateResolution(scenario, value) {
      const normalized = value.trim();
      if (!normalized) return "The resolved file cannot be empty for this exercise.";
      if (MARKER_PATTERN.test(value)) return "Conflict markers remain. Remove <<<<<<<, =======, and >>>>>>> before staging.";
      const missing = scenario.required.filter((fragment) => !value.toLowerCase().includes(fragment.toLowerCase()));
      if (missing.length) return `Keep the required intent: ${missing.join(" and ")}. Open a hint if you are unsure.`;
      const structureError = structuralValidators[scenario.id]?.(value) || "";
      if (structureError) return structureError;
      return "";
    }

    function runStep(index) {
      const scenario = activeScenario();
      const state = activeState();
      const steps = stepsFor(scenario);
      if (index !== state.step || index >= steps.length) return;
      const step = steps[index];

      if (step.manual) {
        const error = validateResolution(scenario, state.resolution);
        if (error) {
          state.validationMessage = error;
          renderPanel("[data-arena-resolution]");
          announce(error);
          return;
        }
        state.validationMessage = "Resolution is marker-free, structurally valid, and preserves the required intent. Run the simulated focused test next.";
      }

      state.logs.push({ command: step.command, output: step.outcome });
      state.step += 1;

      if (state.step >= steps.length) {
        const wasNew = !completed.has(activeId);
        completed.add(activeId);
        writeCompleted(completed);
        renderNav();
        updateMastery();
        emitSkill("completed", { newlyCompleted: wasNew, currentStep: state.step });
        renderPanel("[data-arena-action='reset']");
        announce(`${scenario.title} completed. Verify the result before sharing it.`);
        return;
      }

      emitSkill("progress", { stepId: step.id, currentStep: state.step });
      renderPanel(`[data-arena-step='${state.step}']`);
      announce(`${step.label} complete. ${step.outcome}`);
    }

    app.addEventListener("input", (event) => {
      if (!event.target.matches("[data-arena-resolution]")) return;
      const state = activeState();
      state.resolution = event.target.value;
      state.validationMessage = "";
      const count = panel.querySelector("[data-arena-character-count]");
      if (count) count.textContent = `${state.resolution.length} characters`;
      const validation = panel.querySelector("#arenaValidation");
      if (validation) validation.textContent = "";
    });

    app.addEventListener("click", (event) => {
      const scenarioButton = event.target.closest("[data-arena-scenario]");
      if (scenarioButton) {
        activeId = scenarioButton.dataset.arenaScenario;
        renderNav();
        renderPanel("#arenaScenarioTitle");
        announce(`${activeScenario().title} loaded.`);
        emitSkill("opened", { currentStep: activeState().step });
        return;
      }

      const stepButton = event.target.closest("[data-arena-step]");
      if (stepButton) {
        runStep(Number(stepButton.dataset.arenaStep));
        return;
      }

      const actionButton = event.target.closest("[data-arena-action]");
      if (!actionButton) return;
      const scenario = activeScenario();
      const state = activeState();

      if (actionButton.dataset.arenaAction === "hint") {
        state.hintsShown = Math.min(scenario.hints.length, state.hintsShown + 1);
        const hintFocus = state.hintsShown >= scenario.hints.length
          ? "[data-arena-action='solution']"
          : "[data-arena-action='hint']";
        renderPanel(hintFocus);
        announce(`Hint ${state.hintsShown} of ${scenario.hints.length} revealed.`);
      } else if (actionButton.dataset.arenaAction === "solution") {
        state.resolution = scenario.solution;
        state.validationMessage = "Guided resolution loaded. Read it and make sure you understand the decision before validating it.";
        renderPanel("[data-arena-resolution]");
        announce("Guided resolution loaded into the editor.");
      } else if (actionButton.dataset.arenaAction === "abort") {
        const abortCommand = scenario.abortCommand;
        scenarioStates.set(activeId, {
          step: 0,
          resolution: scenario.starter,
          hintsShown: 0,
          validationMessage: "",
          logs: [{ command: abortCommand, output: "Simulation only: the in-progress operation was aborted and its pre-operation state restored." }]
        });
        renderPanel("[data-arena-step='0']");
        announce(`${abortCommand} simulated. The exercise returned to its starting point.`);
        emitSkill("aborted", { abortCommand, currentStep: 0 });
      } else if (actionButton.dataset.arenaAction === "no-abort") {
        state.validationMessage = scenario.abortNote;
        renderPanel("[data-arena-action='no-abort']");
        announce(scenario.abortNote);
      } else if (actionButton.dataset.arenaAction === "reset") {
        resetScenario(`${scenario.title} reset. No repository was changed.`);
      }
    });

    app.addEventListener("keydown", (event) => {
      const current = event.target.closest("[data-arena-scenario]");
      if (!current || !["ArrowDown", "ArrowUp", "Home", "End"].includes(event.key)) return;
      event.preventDefault();
      const buttons = [...nav.querySelectorAll("[data-arena-scenario]")];
      const currentIndex = buttons.indexOf(current);
      let nextIndex = currentIndex;
      if (event.key === "ArrowDown") nextIndex = (currentIndex + 1) % buttons.length;
      if (event.key === "ArrowUp") nextIndex = (currentIndex - 1 + buttons.length) % buttons.length;
      if (event.key === "Home") nextIndex = 0;
      if (event.key === "End") nextIndex = buttons.length - 1;
      buttons[nextIndex].focus();
    });

    renderNav();
    renderPanel();
    emitSkill("ready", { currentStep: 0 });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", mountConflictArena, { once: true });
  } else {
    mountConflictArena();
  }
})();
