(function () {
  "use strict";

  function bootTypedGitSimulator() {
    const mount = document.getElementById("terminalSimulatorApp");
    if (!mount || mount.dataset.simulatorReady === "true") return;
    mount.dataset.simulatorReady = "true";

    const hasOwn = (object, key) => Object.prototype.hasOwnProperty.call(object, key);
    const emptySnapshot = () => Object.create(null);
    const cloneSnapshot = snapshot => Object.assign(emptySnapshot(), snapshot || {});
    const valuesMatch = (left, right) => left === right;
    const shortId = id => id || "unborn";

    const emittedMilestones = new Set();

    function createState() {
      return {
        initialized: false,
        defaultBranch: "main",
        head: null,
        working: emptySnapshot(),
        index: emptySnapshot(),
        branches: emptySnapshot(),
        commits: [],
        sequence: 0,
        reflog: [],
        merge: null,
        remote: {
          origin: null,
          branches: emptySnapshot(),
          tracking: emptySnapshot(),
          upstreams: emptySnapshot()
        },
        history: [],
        historyCursor: 0,
        missionIndex: 0,
        metrics: {
          edits: 0,
          editedBranches: new Set(),
          stagedBranches: new Set(),
          featureCommits: 0,
          merges: 0,
          pushes: 0
        }
      };
    }

    let state = createState();

    mount.innerHTML = `
      <div class="terminal-simulator">
        <header class="terminal-simulator__header">
          <div>
            <span class="terminal-simulator__eyebrow">Browser-only practice repository</span>
            <h3>Type Git. Watch every state change.</h3>
            <p>No command touches your computer, files, GitHub account, or network.</p>
          </div>
          <span class="terminal-simulator__repo-status" id="gqsRepoStatus" role="status" aria-live="polite">Not initialized</span>
        </header>

        <div class="terminal-simulator__layout">
          <section class="terminal-simulator__console" aria-labelledby="gqsConsoleTitle">
            <div class="terminal-simulator__mission" id="gqsMissionCard">
              <div class="terminal-simulator__mission-copy">
                <span id="gqsMissionCount">Mission 1</span>
                <h4 id="gqsMissionTitle">Initialize a repository</h4>
                <p id="gqsMissionText">Create Git's local database and name the first branch main.</p>
              </div>
              <button class="terminal-simulator__suggestion" id="gqsMissionCommand" type="button">
                <span>Put in terminal</span>
                <code>git init -b main</code>
              </button>
            </div>

            <div class="terminal-simulator__screen" id="gqsTerminalLog" role="log" aria-live="polite" aria-relevant="additions" aria-label="Simulated terminal output" tabindex="0"></div>

            <form class="terminal-simulator__form" id="gqsTerminalForm">
              <label class="terminal-simulator__input-label" for="gqsTerminalInput">Git command</label>
              <div class="terminal-simulator__input-row">
                <span class="terminal-simulator__prompt" aria-hidden="true">$</span>
                <input id="gqsTerminalInput" type="text" maxlength="600" autocomplete="off" autocapitalize="off" spellcheck="false" aria-describedby="gqsTerminalHint" placeholder="Type help or git init -b main">
                <button type="submit">Run</button>
              </div>
              <p id="gqsTerminalHint">Use ↑ and ↓ for command history. Ctrl + L clears the terminal. Start with <code>help</code>.</p>
            </form>

            <div class="terminal-simulator__tools" aria-label="Simulator controls">
              <button id="gqsClearTerminal" type="button">Clear output</button>
              <button id="gqsResetSimulator" type="button">Reset simulated repository</button>
            </div>
          </section>

          <aside class="terminal-simulator__inspector" aria-label="Simulated repository state">
            <div class="terminal-simulator__mission-progress">
              <div>
                <span>Guided path</span>
                <strong id="gqsMissionProgressText">0 of 12 complete</strong>
              </div>
              <div class="terminal-simulator__progress-track" aria-hidden="true"><span id="gqsMissionProgressBar"></span></div>
              <ol id="gqsMissionList" aria-label="Simulator missions"></ol>
              <p id="gqsMissionAnnouncement" role="status" aria-live="polite"></p>
            </div>

            <div class="terminal-simulator__state-grid">
              <section class="terminal-simulator__state-card">
                <h4>Working tree</h4>
                <p>Files you are currently editing</p>
                <ul id="gqsWorkingState"></ul>
              </section>
              <section class="terminal-simulator__state-card">
                <h4>Staging area</h4>
                <p>The proposed next snapshot</p>
                <ul id="gqsIndexState"></ul>
              </section>
              <section class="terminal-simulator__state-card">
                <h4>Commits</h4>
                <p>Saved, immutable snapshots</p>
                <ul id="gqsCommitState"></ul>
              </section>
              <section class="terminal-simulator__state-card">
                <h4>HEAD &amp; branches</h4>
                <p>Movable names pointing to commits</p>
                <ul id="gqsBranchState"></ul>
              </section>
              <section class="terminal-simulator__state-card">
                <h4>Remote</h4>
                <p>Published branch pointers</p>
                <ul id="gqsRemoteState"></ul>
              </section>
            </div>
          </aside>
        </div>
      </div>`;

    const elements = {
      repoStatus: mount.querySelector("#gqsRepoStatus"),
      log: mount.querySelector("#gqsTerminalLog"),
      form: mount.querySelector("#gqsTerminalForm"),
      input: mount.querySelector("#gqsTerminalInput"),
      clear: mount.querySelector("#gqsClearTerminal"),
      reset: mount.querySelector("#gqsResetSimulator"),
      missionCard: mount.querySelector("#gqsMissionCard"),
      missionCount: mount.querySelector("#gqsMissionCount"),
      missionTitle: mount.querySelector("#gqsMissionTitle"),
      missionText: mount.querySelector("#gqsMissionText"),
      missionCommand: mount.querySelector("#gqsMissionCommand"),
      missionCommandCode: mount.querySelector("#gqsMissionCommand code"),
      missionProgressText: mount.querySelector("#gqsMissionProgressText"),
      missionProgressBar: mount.querySelector("#gqsMissionProgressBar"),
      missionList: mount.querySelector("#gqsMissionList"),
      missionAnnouncement: mount.querySelector("#gqsMissionAnnouncement"),
      working: mount.querySelector("#gqsWorkingState"),
      index: mount.querySelector("#gqsIndexState"),
      commits: mount.querySelector("#gqsCommitState"),
      branches: mount.querySelector("#gqsBranchState"),
      remote: mount.querySelector("#gqsRemoteState")
    };

    const missions = [
      {
        id: "initialize",
        title: "Initialize a repository",
        text: "Create Git's local database and name the first branch main.",
        command: "git init -b main",
        complete: current => current.initialized
      },
      {
        id: "edit-first-file",
        title: "Create a working-tree change",
        text: "Use the simulator's edit helper to create a README in the working tree.",
        command: "edit README.md \"My first Git project\"",
        complete: current => Object.keys(current.working).length > 0
      },
      {
        id: "stage-first-file",
        title: "Stage the README",
        text: "Copy the file's current content into Git's staging area.",
        command: "git add README.md",
        complete: current => current.metrics.stagedBranches.size > 0
      },
      {
        id: "first-commit",
        title: "Record the first snapshot",
        text: "Commit exactly what is staged with a meaningful message.",
        command: "git commit -m \"Create README\"",
        complete: current => current.commits.length > 0
      },
      {
        id: "create-branch",
        title: "Create a feature branch",
        text: "Create a movable branch pointer and switch HEAD to it.",
        command: "git switch -c feature/welcome",
        complete: current => Object.keys(current.branches).length > 1 && current.head !== current.defaultBranch
      },
      {
        id: "edit-feature",
        title: "Develop on the feature branch",
        text: "Change the README while HEAD points at your feature branch.",
        command: "edit README.md \"Welcome to my Git project\"",
        complete: current => Array.from(current.metrics.editedBranches).some(branch => branch && branch !== current.defaultBranch)
      },
      {
        id: "stage-feature",
        title: "Stage the feature",
        text: "Reviewable commits start by staging the intended snapshot.",
        command: "git add README.md",
        complete: current => Array.from(current.metrics.stagedBranches).some(branch => branch && branch !== current.defaultBranch)
      },
      {
        id: "commit-feature",
        title: "Commit the feature",
        text: "Save the staged feature snapshot on its own branch.",
        command: "git commit -m \"Improve welcome message\"",
        complete: current => current.metrics.featureCommits > 0
      },
      {
        id: "return-main",
        title: "Return to main",
        text: "Move HEAD and the working tree back to the receiving branch.",
        command: current => `git switch ${current.defaultBranch}`,
        complete: current => current.metrics.featureCommits > 0 && current.head === current.defaultBranch
      },
      {
        id: "merge-feature",
        title: "Integrate the feature",
        text: "Merge the feature history into main. Git will fast-forward when it can.",
        command: current => `git merge ${suggestedFeatureBranch(current)}`,
        complete: current => current.metrics.merges > 0
      },
      {
        id: "connect-remote",
        title: "Connect a remote",
        text: "Add a safe, simulated origin URL. No network request is made.",
        command: "git remote add origin https://github.com/you/project.git",
        complete: current => Boolean(current.remote.origin)
      },
      {
        id: "publish-main",
        title: "Publish and set upstream",
        text: "Push main and remember origin/main as its upstream branch.",
        command: current => `git push -u origin ${current.defaultBranch}`,
        complete: current => current.remote.branches[current.defaultBranch] === current.branches[current.defaultBranch]
          && current.remote.upstreams[current.defaultBranch] === `origin/${current.defaultBranch}`
      }
    ];

    function suggestedFeatureBranch(current) {
      const names = Object.keys(current.branches).filter(name => name !== current.defaultBranch);
      return names[names.length - 1] || "feature/welcome";
    }

    function missionCommand(mission) {
      return typeof mission.command === "function" ? mission.command(state) : mission.command;
    }

    function emitSkill(mission, completed) {
      if (emittedMilestones.has(mission.id)) return;
      emittedMilestones.add(mission.id);
      mount.dispatchEvent(new CustomEvent("gitquest:skill", {
        bubbles: true,
        detail: {
          id: `simulator:${mission.id}`,
          skill: mission.title,
          source: "typed-git-simulator",
          completed,
          total: missions.length
        }
      }));
    }

    function advanceMissions() {
      let newestCompleted = null;
      while (state.missionIndex < missions.length && missions[state.missionIndex].complete(state)) {
        newestCompleted = missions[state.missionIndex];
        state.missionIndex += 1;
        emitSkill(newestCompleted, state.missionIndex);
      }
      if (newestCompleted) {
        elements.missionAnnouncement.textContent = state.missionIndex === missions.length
          ? "All simulator missions complete. You built and published a branch workflow."
          : `${newestCompleted.title} complete. Next: ${missions[state.missionIndex].title}.`;
      }
      renderMissions();
    }

    function renderMissions() {
      const completeCount = state.missionIndex;
      elements.missionProgressText.textContent = `${completeCount} of ${missions.length} complete`;
      elements.missionProgressBar.style.width = `${(completeCount / missions.length) * 100}%`;
      elements.missionList.replaceChildren();

      missions.forEach((mission, index) => {
        const item = document.createElement("li");
        const marker = document.createElement("span");
        const label = document.createElement("span");
        marker.textContent = index < completeCount ? "✓" : String(index + 1);
        label.textContent = mission.title;
        item.className = index < completeCount ? "is-complete" : index === completeCount ? "is-current" : "";
        if (index === completeCount) item.setAttribute("aria-current", "step");
        item.append(marker, label);
        elements.missionList.append(item);
      });

      if (completeCount >= missions.length) {
        elements.missionCard.classList.add("is-complete");
        elements.missionCount.textContent = "Path complete";
        elements.missionTitle.textContent = "You shipped the simulated repository";
        elements.missionText.textContent = "Explore freely: make another branch, inspect diffs, or type help to review every supported command.";
        elements.missionCommand.hidden = true;
        return;
      }

      const active = missions[completeCount];
      elements.missionCard.classList.remove("is-complete");
      elements.missionCount.textContent = `Mission ${completeCount + 1} of ${missions.length}`;
      elements.missionTitle.textContent = active.title;
      elements.missionText.textContent = active.text;
      elements.missionCommandCode.textContent = missionCommand(active);
      elements.missionCommand.hidden = false;
    }

    function appendTerminal(command, output, tone) {
      const entry = document.createElement("article");
      entry.className = `terminal-simulator__entry terminal-simulator__entry--${tone || "normal"}`;

      if (command !== null) {
        const prompt = document.createElement("div");
        const symbol = document.createElement("span");
        const commandText = document.createElement("code");
        prompt.className = "terminal-simulator__echo";
        symbol.setAttribute("aria-hidden", "true");
        symbol.textContent = "$";
        commandText.textContent = command;
        prompt.append(symbol, commandText);
        entry.append(prompt);
      }

      if (output) {
        const outputBlock = document.createElement("pre");
        outputBlock.textContent = output;
        entry.append(outputBlock);
      }

      elements.log.append(entry);
      window.requestAnimationFrame(() => {
        elements.log.scrollTop = elements.log.scrollHeight;
      });
    }

    function appendSystem(output, tone) {
      appendTerminal(null, output, tone || "info");
    }

    function clearTerminal(announce) {
      elements.log.replaceChildren();
      if (announce) appendSystem("Terminal output cleared. The simulated repository state is unchanged.", "info");
    }

    function result(output, tone) {
      return { output: output || "", tone: tone || "normal" };
    }

    function error(message) {
      return result(message, "error");
    }

    function success(message) {
      return result(message, "success");
    }

    function tokenize(command) {
      const tokens = [];
      let current = "";
      let quote = null;
      let escaping = false;
      let tokenStarted = false;

      for (let index = 0; index < command.length; index += 1) {
        const character = command[index];
        if (escaping) {
          current += character;
          escaping = false;
          tokenStarted = true;
          continue;
        }
        if (character === "\\") {
          const next = command[index + 1];
          const escapesOutsideQuotes = !quote && Boolean(next) && /[\s'"\\]/.test(next);
          if (quote === "'" || (quote === '"' && next !== '"' && next !== "\\") || (!quote && !escapesOutsideQuotes)) {
            current += character;
          } else {
            escaping = true;
          }
          tokenStarted = true;
          continue;
        }
        if (quote) {
          if (character === quote) quote = null;
          else current += character;
          tokenStarted = true;
          continue;
        }
        if (character === '"' || character === "'") {
          quote = character;
          tokenStarted = true;
          continue;
        }
        if (/\s/.test(character)) {
          if (tokenStarted) {
            tokens.push(current);
            current = "";
            tokenStarted = false;
          }
          continue;
        }
        current += character;
        tokenStarted = true;
      }

      if (escaping) current += "\\";
      if (quote) return { error: "Unclosed quote. Close the quote and run the command again." };
      if (tokenStarted) tokens.push(current);
      return { tokens };
    }

    function normalizedPath(rawPath) {
      const value = String(rawPath || "").trim().replace(/\\/g, "/");
      if (!value) return { error: "A file path is required." };
      if (value.length > 180) return { error: "That path is too long for this simulator." };
      if (/^(?:[A-Za-z]:\/|\/|~\/)/.test(value)) return { error: "Use a path inside the simulated repository, such as src/app.js." };
      if (value.includes("\0") || /(^|\/)\.\.?(\/|$)/.test(value)) return { error: "Paths cannot contain . or .. segments." };
      if (value === ".git" || value.startsWith(".git/")) return { error: "The simulator protects Git's internal .git directory." };
      return { value: value.replace(/\/{2,}/g, "/") };
    }

    function validBranchName(name) {
      if (!name || name.length > 100 || name === "@") return false;
      if (/\s|[~^:?*\[\\]|\.\.|\/\/|@\{|(?:^|\/)\.|\.lock(?:\/|$)|[\/.]$/.test(name)) return false;
      return /^[A-Za-z0-9][A-Za-z0-9._/-]*$/.test(name);
    }

    function requireRepository() {
      return state.initialized ? null : error("fatal: not a git repository (or any parent directory): .git\nHint: start with git init -b main");
    }

    function currentCommitId(branch) {
      const name = branch || state.head;
      return name && hasOwn(state.branches, name) ? state.branches[name] : null;
    }

    function findCommit(id) {
      return state.commits.find(commit => commit.id === id) || null;
    }

    function headSnapshot() {
      const commit = findCommit(currentCommitId());
      return commit ? commit.snapshot : emptySnapshot();
    }

    function snapshotKeys(...snapshots) {
      return Array.from(new Set(snapshots.flatMap(snapshot => Object.keys(snapshot || {})))).sort();
    }

    function snapshotEquals(left, right) {
      const keys = snapshotKeys(left, right);
      return keys.every(path => hasOwn(left, path) === hasOwn(right, path) && left[path] === right[path]);
    }

    function changesForState() {
      const head = headSnapshot();
      return snapshotKeys(head, state.index, state.working).map(path => {
        const inHead = hasOwn(head, path);
        const inIndex = hasOwn(state.index, path);
        const inWorking = hasOwn(state.working, path);
        const staged = inHead !== inIndex || (inHead && inIndex && !valuesMatch(head[path], state.index[path]));
        const unstaged = inIndex !== inWorking || (inIndex && inWorking && !valuesMatch(state.index[path], state.working[path]));
        const untracked = !inHead && !inIndex && inWorking;
        const conflicted = Boolean(state.merge && state.merge.conflicts.has(path));
        return { path, inHead, inIndex, inWorking, staged, unstaged, untracked, conflicted };
      });
    }

    function stagedLabel(change) {
      if (!change.inHead && change.inIndex) return "new file";
      if (change.inHead && !change.inIndex) return "deleted";
      return "modified";
    }

    function workingLabel(change) {
      if (!change.inIndex && change.inWorking) return "untracked";
      if (change.inIndex && !change.inWorking) return "deleted";
      return "modified";
    }

    function shortStatus(change) {
      if (change.conflicted) return "UU";
      if (change.untracked) return "??";
      let left = " ";
      let right = " ";
      if (change.staged) left = !change.inHead ? "A" : !change.inIndex ? "D" : "M";
      if (change.unstaged) right = !change.inWorking ? "D" : "M";
      return `${left}${right}`;
    }

    function handleStatus(tokens) {
      const missing = requireRepository();
      if (missing) return missing;
      const supported = new Set(["--short", "-s", "--porcelain"]);
      const options = tokens.slice(2);
      if (options.some(option => !supported.has(option))) return error(`error: unsupported status option '${options.find(option => !supported.has(option))}'`);
      const changes = changesForState();
      const short = options.some(option => supported.has(option));

      if (short) {
        const lines = changes.filter(change => change.staged || change.unstaged || change.untracked || change.conflicted)
          .map(change => `${shortStatus(change)} ${change.path}`);
        return result(lines.join("\n"));
      }

      const lines = [`On branch ${state.head}`];
      if (!currentCommitId()) lines.push("No commits yet");
      if (state.merge) lines.push(`You are currently merging branch '${state.merge.target}'.`);

      const conflicts = changes.filter(change => change.conflicted);
      const staged = changes.filter(change => change.staged && !change.conflicted);
      const unstaged = changes.filter(change => change.unstaged && !change.untracked && !change.conflicted);
      const untracked = changes.filter(change => change.untracked);

      if (conflicts.length) {
        lines.push("", "Unmerged paths:", "  (fix conflicts and run git add <file>)");
        conflicts.forEach(change => lines.push(`        both modified:   ${change.path}`));
      }
      if (staged.length) {
        lines.push("", "Changes to be committed:", "  (use \"git restore --staged <file>...\" to unstage)");
        staged.forEach(change => lines.push(`        ${stagedLabel(change)}:   ${change.path}`));
      }
      if (unstaged.length) {
        lines.push("", "Changes not staged for commit:", "  (use \"git add <file>...\" to update what will be committed)");
        unstaged.forEach(change => lines.push(`        ${workingLabel(change)}:   ${change.path}`));
      }
      if (untracked.length) {
        lines.push("", "Untracked files:", "  (use \"git add <file>...\" to include in what will be committed)");
        untracked.forEach(change => lines.push(`        ${change.path}`));
      }
      if (state.merge && !conflicts.length) {
        lines.push("", "All conflicts fixed but you are still merging.", "  (use \"git merge --continue\" to conclude the merge)");
      } else if (!conflicts.length && !staged.length && !unstaged.length && !untracked.length) {
        lines.push("", "nothing to commit, working tree clean");
      } else if (!staged.length && (unstaged.length || untracked.length) && !conflicts.length) {
        lines.push("", "no changes added to commit (use \"git add\" to track or stage files)");
      }
      return result(lines.join("\n"));
    }

    function lcsOperations(before, after) {
      if (before.length * after.length > 12000) {
        return [
          ...before.map(line => ({ type: "delete", line })),
          ...after.map(line => ({ type: "add", line }))
        ];
      }
      const table = Array.from({ length: before.length + 1 }, () => new Uint16Array(after.length + 1));
      for (let oldIndex = before.length - 1; oldIndex >= 0; oldIndex -= 1) {
        for (let newIndex = after.length - 1; newIndex >= 0; newIndex -= 1) {
          table[oldIndex][newIndex] = before[oldIndex] === after[newIndex]
            ? table[oldIndex + 1][newIndex + 1] + 1
            : Math.max(table[oldIndex + 1][newIndex], table[oldIndex][newIndex + 1]);
        }
      }
      const operations = [];
      let oldIndex = 0;
      let newIndex = 0;
      while (oldIndex < before.length || newIndex < after.length) {
        if (oldIndex < before.length && newIndex < after.length && before[oldIndex] === after[newIndex]) {
          operations.push({ type: "equal", line: before[oldIndex] });
          oldIndex += 1;
          newIndex += 1;
        } else if (newIndex < after.length && (oldIndex >= before.length || table[oldIndex][newIndex + 1] >= table[oldIndex + 1][newIndex])) {
          operations.push({ type: "add", line: after[newIndex] });
          newIndex += 1;
        } else {
          operations.push({ type: "delete", line: before[oldIndex] });
          oldIndex += 1;
        }
      }
      return operations;
    }

    function contentLines(content) {
      if (content === undefined) return [];
      const normalized = content.replace(/\r\n/g, "\n");
      const lines = normalized.split("\n");
      if (lines[lines.length - 1] === "") lines.pop();
      return lines;
    }

    function patchForPath(path, before, after) {
      if (before === after) return "";
      const beforeLines = contentLines(before);
      const afterLines = contentLines(after);
      const oldName = before === undefined ? "/dev/null" : `a/${path}`;
      const newName = after === undefined ? "/dev/null" : `b/${path}`;
      const oldStart = beforeLines.length ? 1 : 0;
      const newStart = afterLines.length ? 1 : 0;
      const lines = [
        `diff --git a/${path} b/${path}`,
        `--- ${oldName}`,
        `+++ ${newName}`,
        `@@ -${oldStart},${beforeLines.length} +${newStart},${afterLines.length} @@`
      ];
      lcsOperations(beforeLines, afterLines).forEach(operation => {
        const prefix = operation.type === "add" ? "+" : operation.type === "delete" ? "-" : " ";
        lines.push(prefix + operation.line);
      });
      return lines.join("\n");
    }

    function handleDiff(tokens) {
      const missing = requireRepository();
      if (missing) return missing;
      const options = tokens.slice(2);
      const staged = options.includes("--staged") || options.includes("--cached");
      const unsupported = options.find(option => option.startsWith("-") && !["--staged", "--cached", "--"].includes(option));
      if (unsupported) return error(`error: unsupported diff option '${unsupported}'`);
      const pathTokens = options.filter(option => !["--staged", "--cached", "--"].includes(option));
      if (pathTokens.length > 1) return error("This simulator compares one optional path at a time: git diff [--staged] [<path>]");
      const pathToken = pathTokens[0];
      let path = null;
      if (pathToken) {
        const checked = normalizedPath(pathToken);
        if (checked.error) return error(checked.error);
        path = checked.value;
      }
      const before = staged ? headSnapshot() : state.index;
      const after = staged ? state.index : state.working;
      const availablePaths = staged ? snapshotKeys(before, after) : Object.keys(before).sort();
      const paths = path ? (staged || hasOwn(before, path) ? [path] : []) : availablePaths;
      const patches = paths.map(file => patchForPath(file, before[file], after[file])).filter(Boolean);
      return result(patches.join("\n"));
    }

    function handleEdit(tokens) {
      if (tokens.length < 2) return error("usage: edit <path> [\"replacement text\"]");
      const checked = normalizedPath(tokens[1]);
      if (checked.error) return error(checked.error);
      const path = checked.value;
      const suppliedText = tokens.slice(2).join(" ");
      let content;
      if (suppliedText) {
        content = suppliedText.replace(/\\n/g, "\n").replace(/\\t/g, "\t");
        if (!content.endsWith("\n")) content += "\n";
      } else if (hasOwn(state.working, path)) {
        content = `${state.working[path]}Updated ${path} on ${state.head || "the working tree"} (edit ${state.metrics.edits + 1}).\n`;
      } else {
        const baseName = path.split("/").pop();
        content = `# ${baseName}\nCreated in GitQuest on ${state.head || "the working tree"}.\n`;
      }
      if (content.length > 8000) return error("The simulated file is limited to 8,000 characters.");
      const unchanged = hasOwn(state.working, path) && state.working[path] === content;
      state.working[path] = content;
      if (!unchanged) {
        state.metrics.edits += 1;
        state.metrics.editedBranches.add(state.head);
      }
      return success(unchanged ? `${path} already contains that text; no working-tree change was created.` : `Saved ${path} in the simulated working tree.`);
    }

    function handleInit(tokens) {
      if (tokens.length > 4) return error("usage: git init [-b <branch-name>]");
      let branch = "main";
      if (tokens.length > 2) {
        if (tokens[2] !== "-b" || !tokens[3]) return error("usage: git init [-b <branch-name>]");
        branch = tokens[3];
      }
      if (!validBranchName(branch)) return error(`fatal: invalid initial branch name '${branch}'`);
      if (state.initialized) return success("Reinitialized existing Git repository in /gitquest/.git/");
      state.initialized = true;
      state.defaultBranch = branch;
      state.head = branch;
      state.branches[branch] = null;
      return success(`Initialized empty Git repository in /gitquest/.git/\nInitial branch: ${branch}`);
    }

    function handleAdd(tokens) {
      const missing = requireRepository();
      if (missing) return missing;
      const requested = tokens.slice(2).filter(token => token !== "--");
      if (!requested.length) return error("Nothing specified, nothing added.\nHint: try git add <path> or git add .");
      const staged = [];

      if (requested.includes(".")) {
        state.index = cloneSnapshot(state.working);
        staged.push(...Object.keys(state.working));
        if (state.merge) state.merge.conflicts.clear();
      } else {
        for (const rawPath of requested) {
          if (rawPath.startsWith("-")) return error(`error: unsupported add option '${rawPath}'`);
          const checked = normalizedPath(rawPath);
          if (checked.error) return error(checked.error);
          const path = checked.value;
          if (!hasOwn(state.working, path)) return error(`fatal: pathspec '${path}' did not match any files`);
          state.index[path] = state.working[path];
          if (state.merge) state.merge.conflicts.delete(path);
          staged.push(path);
        }
      }
      state.metrics.stagedBranches.add(state.head);
      return success(staged.length ? `Staged ${staged.length} path${staged.length === 1 ? "" : "s"}: ${staged.join(", ")}` : "Staging area updated.");
    }

    function hashCommit(seed) {
      let hash = 2166136261;
      for (let index = 0; index < seed.length; index += 1) {
        hash ^= seed.charCodeAt(index);
        hash = Math.imul(hash, 16777619);
      }
      return (hash >>> 0).toString(16).padStart(8, "0").slice(0, 7);
    }

    function createCommit(message, parents) {
      state.sequence += 1;
      const parentIds = parents || (currentCommitId() ? [currentCommitId()] : []);
      const serialized = Object.keys(state.index).sort().map(path => `${path}:${state.index[path]}`).join("|");
      let id = hashCommit(`${state.sequence}|${message}|${parentIds.join(",")}|${serialized}`);
      while (findCommit(id)) id = hashCommit(`${id}|${state.sequence}`);
      const commit = {
        id,
        message,
        parents: parentIds.slice(),
        snapshot: cloneSnapshot(state.index),
        sequence: state.sequence,
        branch: state.head
      };
      state.commits.push(commit);
      state.branches[state.head] = id;
      state.reflog.push({ id, action: parentIds.length > 1 ? `merge: ${message}` : `commit: ${message}` });
      if (state.head !== state.defaultBranch) state.metrics.featureCommits += 1;
      return commit;
    }

    function handleCommit(tokens) {
      const missing = requireRepository();
      if (missing) return missing;
      if (state.merge && state.merge.conflicts.size) {
        return error("error: Committing is not possible because you have unmerged files.\nHint: edit each conflict, then run git add <file> before committing.");
      }
      const messageIndex = tokens.indexOf("-m", 2);
      if (messageIndex === -1 || !tokens[messageIndex + 1]) return error("usage: git commit -m \"meaningful message\"");
      if (messageIndex !== 2) return error("usage: git commit -m \"meaningful message\"");
      if (tokens.length !== messageIndex + 2) return error("error: put a multi-word commit message inside quotes");
      const message = tokens[messageIndex + 1].trim();
      if (!message) return error("error: empty commit message is not allowed");
      const currentHead = headSnapshot();
      if (!state.merge && snapshotEquals(currentHead, state.index)) return result(`On branch ${state.head}\nnothing to commit, working tree ${snapshotEquals(state.index, state.working) ? "clean" : "has unstaged changes"}`);

      let parents;
      if (state.merge) parents = [state.merge.oursId, state.merge.theirsId].filter(Boolean);
      const commit = createCommit(message, parents);
      const wasMerge = Boolean(state.merge);
      state.merge = null;
      if (wasMerge) state.metrics.merges += 1;
      const changedCount = changesForCommit(commit).length;
      return success(`[${state.head} ${commit.id}] ${message}\n ${changedCount} file${changedCount === 1 ? "" : "s"} changed`);
    }

    function changesForCommit(commit) {
      const parent = commit.parents.length ? findCommit(commit.parents[0]) : null;
      const before = parent ? parent.snapshot : emptySnapshot();
      return snapshotKeys(before, commit.snapshot).filter(path => before[path] !== commit.snapshot[path] || hasOwn(before, path) !== hasOwn(commit.snapshot, path));
    }

    function aheadBehind(localId, upstreamId) {
      const local = reachableIds(localId);
      const upstream = reachableIds(upstreamId);
      let ahead = 0;
      let behind = 0;
      local.forEach(id => { if (!upstream.has(id)) ahead += 1; });
      upstream.forEach(id => { if (!local.has(id)) behind += 1; });
      return { ahead, behind };
    }

    function handleBranch(tokens) {
      const missing = requireRepository();
      if (missing) return missing;
      const args = tokens.slice(2);
      if (!args.length || (args.length === 1 && args[0] === "-vv")) {
        const verbose = args[0] === "-vv";
        const lines = Object.keys(state.branches).sort().map(name => {
          const id = state.branches[name];
          let tracking = "";
          const upstream = state.remote.upstreams[name];
          if (verbose && upstream) {
            const upstreamBranch = upstream.startsWith("origin/") ? upstream.slice("origin/".length) : upstream;
            const upstreamId = state.remote.tracking[upstreamBranch] || null;
            const counts = aheadBehind(id, upstreamId);
            const movement = counts.ahead || counts.behind ? `: ahead ${counts.ahead}, behind ${counts.behind}` : "";
            tracking = ` [${upstream}${movement}]`;
          }
          const message = id ? (findCommit(id)?.message || "") : "no commits yet";
          return `${name === state.head ? "*" : " "} ${name} ${shortId(id)}${tracking}${verbose ? ` ${message}` : ""}`;
        });
        return result(lines.join("\n"));
      }
      if (args.length !== 1 || args[0].startsWith("-")) return error("usage: git branch [-vv] [<new-branch>]");
      const name = args[0];
      if (!validBranchName(name)) return error(`fatal: '${name}' is not a valid branch name`);
      if (hasOwn(state.branches, name)) return error(`fatal: a branch named '${name}' already exists`);
      const startPoint = currentCommitId();
      if (!startPoint) return error(`fatal: not a valid object name: '${state.head}'\nHint: create the first commit before branching.`);
      state.branches[name] = startPoint;
      return success(`Created branch '${name}' at ${shortId(startPoint)}. HEAD remains on ${state.head}.`);
    }

    function snapshotsMatchAtPath(left, right, path) {
      return hasOwn(left, path) === hasOwn(right, path) && (!hasOwn(left, path) || valuesMatch(left[path], right[path]));
    }

    function switchWouldOverwrite(targetSnapshot) {
      const currentSnapshot = headSnapshot();
      return changesForState().some((change) => {
        if (!change.staged && !change.unstaged && !change.untracked && !change.conflicted) return false;
        if (change.conflicted) return true;
        if (change.untracked) return hasOwn(targetSnapshot, change.path);
        return !snapshotsMatchAtPath(currentSnapshot, targetSnapshot, change.path);
      });
    }

    function applyBranchSnapshotPreservingChanges(targetSnapshot, localChanges) {
      const nextIndex = cloneSnapshot(targetSnapshot);
      const nextWorking = cloneSnapshot(targetSnapshot);

      localChanges.forEach((change) => {
        if (hasOwn(state.index, change.path)) nextIndex[change.path] = state.index[change.path];
        else delete nextIndex[change.path];
        if (hasOwn(state.working, change.path)) nextWorking[change.path] = state.working[change.path];
        else delete nextWorking[change.path];
      });

      state.index = nextIndex;
      state.working = nextWorking;
    }

    function handleSwitch(tokens) {
      const missing = requireRepository();
      if (missing) return missing;
      const args = tokens.slice(2);
      let create = false;
      let name;
      if (args[0] === "-c") {
        create = true;
        name = args[1];
        if (args.length !== 2) return error("usage: git switch -c <new-branch>");
      } else {
        name = args[0];
        if (args.length !== 1) return error("usage: git switch <branch>\n   or: git switch -c <new-branch>");
      }
      if (!validBranchName(name)) return error(`fatal: invalid reference: ${name || ""}`);
      if (state.merge) return error("fatal: cannot switch branch while a merge is in progress\nHint: resolve and commit the merge, or run git merge --abort.");
      if (create) {
        if (hasOwn(state.branches, name)) return error(`fatal: a branch named '${name}' already exists`);
        if (!currentCommitId()) return error("fatal: You are on a branch yet to be born\nHint: create the first commit before branching.");
        state.branches[name] = currentCommitId();
      } else if (!hasOwn(state.branches, name)) {
        return error(`fatal: invalid reference: ${name}`);
      }
      const targetId = currentCommitId(name);
      const target = findCommit(targetId);
      const targetSnapshot = target ? target.snapshot : emptySnapshot();
      const localChanges = changesForState().filter(change => change.staged || change.unstaged || change.untracked);
      if (!create && switchWouldOverwrite(targetSnapshot)) {
        return error("error: Your local changes would be overwritten by checkout.\nHint: commit or stash the overlapping changes before switching branches.");
      }
      const from = state.head;
      state.head = name;
      if (!create) applyBranchSnapshotPreservingChanges(targetSnapshot, localChanges);
      if (currentCommitId()) state.reflog.push({ id: currentCommitId(), action: `checkout: moving from ${from} to ${name}` });
      return success(create ? `Switched to a new branch '${name}'` : `Switched to branch '${name}'`);
    }

    function reachableIds(startId) {
      const visited = new Set();
      const pending = startId ? [startId] : [];
      while (pending.length) {
        const id = pending.pop();
        if (!id || visited.has(id)) continue;
        visited.add(id);
        const commit = findCommit(id);
        if (commit) pending.push(...commit.parents);
      }
      return visited;
    }

    function isAncestor(ancestorId, descendantId) {
      if (!ancestorId) return true;
      return reachableIds(descendantId).has(ancestorId);
    }

    function mergeBase(leftId, rightId) {
      const left = reachableIds(leftId);
      const shared = state.commits.filter(commit => left.has(commit.id) && reachableIds(rightId).has(commit.id));
      shared.sort((a, b) => b.sequence - a.sequence);
      return shared[0] || null;
    }

    function applyPath(snapshot, path, value) {
      if (value === undefined) delete snapshot[path];
      else snapshot[path] = value;
    }

    function mergeSnapshots(base, ours, theirs, targetName) {
      const working = emptySnapshot();
      const index = emptySnapshot();
      const conflicts = new Set();
      snapshotKeys(base, ours, theirs).forEach(path => {
        const baseValue = base[path];
        const ourValue = ours[path];
        const theirValue = theirs[path];
        let resolved;
        if (ourValue === theirValue) resolved = ourValue;
        else if (ourValue === baseValue) resolved = theirValue;
        else if (theirValue === baseValue) resolved = ourValue;
        else {
          conflicts.add(path);
          const oursText = ourValue === undefined ? "" : ourValue.replace(/\n$/, "");
          const theirsText = theirValue === undefined ? "" : theirValue.replace(/\n$/, "");
          const marked = `<<<<<<< HEAD\n${oursText}\n=======\n${theirsText}\n>>>>>>> ${targetName}\n`;
          applyPath(working, path, marked);
          applyPath(index, path, ourValue);
          return;
        }
        applyPath(working, path, resolved);
        applyPath(index, path, resolved);
      });
      return { working, index, conflicts };
    }

    function handleMerge(tokens) {
      const missing = requireRepository();
      if (missing) return missing;
      const args = tokens.slice(2);
      if (args.length === 1 && args[0] === "--abort") {
        if (!state.merge) return error("fatal: There is no merge to abort.");
        state.working = cloneSnapshot(state.merge.preWorking);
        state.index = cloneSnapshot(state.merge.preIndex);
        state.merge = null;
        return success("Merge aborted. Restored the pre-merge working tree and staging area.");
      }
      if (args.length === 1 && args[0] === "--continue") {
        if (!state.merge) return error("fatal: There is no merge in progress.");
        if (state.merge.conflicts.size) return error("error: Committing is not possible because you have unmerged files.\nHint: resolve each conflict and run git add <file> first.");
        const target = state.merge.target;
        const parents = [state.merge.oursId, state.merge.theirsId].filter(Boolean);
        const commit = createCommit(`Merge branch '${target}'`, parents);
        state.merge = null;
        state.metrics.merges += 1;
        return success(`[${state.head} ${commit.id}] Merge branch '${target}'\nMerge completed after the staged resolution.`);
      }
      if (args.length !== 1) return error("usage: git merge <branch>\n   or: git merge --continue\n   or: git merge --abort");
      const target = args[0];
      if (!hasOwn(state.branches, target)) return error(`merge: ${target} - not something we can merge`);
      if (target === state.head) return result("Already up to date.");
      if (state.merge) return error("fatal: You have not concluded your current merge.");
      if (repositoryHasChanges()) return error("error: Your local changes would be overwritten by merge.\nHint: commit your work before merging.");
      const oursId = currentCommitId();
      const theirsId = currentCommitId(target);
      if (!theirsId) return error(`Already up to date. Branch '${target}' has no commits.`);
      if (isAncestor(theirsId, oursId)) return result("Already up to date.");
      if (!oursId || isAncestor(oursId, theirsId)) {
        const beforeSnapshot = oursId ? findCommit(oursId).snapshot : emptySnapshot();
        state.branches[state.head] = theirsId;
        const targetCommit = findCommit(theirsId);
        state.index = cloneSnapshot(targetCommit.snapshot);
        state.working = cloneSnapshot(targetCommit.snapshot);
        state.reflog.push({ id: theirsId, action: `merge ${target}: Fast-forward` });
        state.metrics.merges += 1;
        const changedPaths = snapshotKeys(beforeSnapshot, targetCommit.snapshot).filter(path => beforeSnapshot[path] !== targetCommit.snapshot[path] || hasOwn(beforeSnapshot, path) !== hasOwn(targetCommit.snapshot, path));
        return success(`Updating ${shortId(oursId)}..${theirsId}\nFast-forward\n${changedPaths.length} file(s) changed`);
      }

      const baseCommit = mergeBase(oursId, theirsId);
      const oursCommit = findCommit(oursId);
      const theirsCommit = findCommit(theirsId);
      const merged = mergeSnapshots(baseCommit ? baseCommit.snapshot : emptySnapshot(), oursCommit.snapshot, theirsCommit.snapshot, target);
      state.working = merged.working;
      state.index = merged.index;
      if (merged.conflicts.size) {
        state.merge = {
          target,
          oursId,
          theirsId,
          conflicts: merged.conflicts,
          preWorking: cloneSnapshot(oursCommit.snapshot),
          preIndex: cloneSnapshot(oursCommit.snapshot)
        };
        const paths = Array.from(merged.conflicts);
        return error(`Auto-merging ${paths.join(", ")}\nCONFLICT (content): Merge conflict in ${paths.join(", ")}\nAutomatic merge failed; fix conflicts and then commit the result.\nHint: use edit <path> \"resolved text\", then git add <path>.`);
      }

      state.index = cloneSnapshot(merged.working);
      const message = `Merge branch '${target}'`;
      const commit = createCommit(message, [oursId, theirsId]);
      state.metrics.merges += 1;
      return success(`Merge made by the 'ort' strategy.\n[${state.head} ${commit.id}] ${message}`);
    }

    function decorateCommit(id) {
      const labels = [];
      Object.keys(state.branches).forEach(branch => {
        if (state.branches[branch] === id) labels.push(branch === state.head ? `HEAD -> ${branch}` : branch);
      });
      Object.keys(state.remote.tracking).forEach(branch => {
        if (state.remote.tracking[branch] === id) labels.push(`origin/${branch}`);
      });
      return labels.length ? ` (${labels.join(", ")})` : "";
    }

    function handleLog(tokens) {
      const missing = requireRepository();
      if (missing) return missing;
      const supported = new Set(["--oneline", "--graph", "--all", "--decorate"]);
      const invalid = tokens.slice(2).find(option => !supported.has(option));
      if (invalid) return error(`fatal: unrecognized argument: ${invalid}`);
      const all = tokens.includes("--all");
      const reachable = all
        ? new Set(Object.values(state.branches).filter(Boolean).flatMap(id => Array.from(reachableIds(id))))
        : reachableIds(currentCommitId());
      const commits = state.commits.filter(commit => reachable.has(commit.id)).sort((a, b) => b.sequence - a.sequence);
      if (!commits.length) return error(`fatal: your current branch '${state.head}' does not have any commits yet`);
      const graph = tokens.includes("--graph");
      const lines = [];
      commits.forEach(commit => {
        lines.push(`${graph ? "* " : ""}${commit.id}${decorateCommit(commit.id)} ${commit.message}`);
        if (graph && commit.parents.length > 1) lines.push("|\\");
      });
      return result(lines.join("\n"));
    }

    function handleRemote(tokens) {
      const missing = requireRepository();
      if (missing) return missing;
      const args = tokens.slice(2);
      if (args.length === 1 && args[0] === "-v") {
        if (!state.remote.origin) return result("");
        return result(`origin\t${state.remote.origin} (fetch)\norigin\t${state.remote.origin} (push)`);
      }
      if (args[0] !== "add" || args.length !== 3) return error("usage: git remote add origin <url>\n   or: git remote -v");
      const name = args[1];
      const url = args[2];
      if (name !== "origin") return error("This learning simulator currently models one remote named 'origin'.");
      if (state.remote.origin) return error("error: remote origin already exists.");
      if (url.length > 300 || !/^(?:https?:\/\/|ssh:\/\/|git@)[^\s]+$/.test(url)) {
        return error("fatal: use an HTTPS or SSH repository URL, such as https://github.com/you/project.git");
      }
      state.remote.origin = url;
      return success(`Added remote 'origin' -> ${url}\nNo network request was made by this simulator.`);
    }

    function handleFetch(tokens) {
      const missing = requireRepository();
      if (missing) return missing;
      const args = tokens.slice(2);
      if (args.length > 1 || (args[0] && args[0] !== "origin")) return error("usage: git fetch [origin]");
      if (!state.remote.origin) return error("fatal: 'origin' does not appear to be a git repository\nHint: add it with git remote add origin <url>.");
      const output = [`From ${state.remote.origin}`];
      const names = Object.keys(state.remote.branches);
      if (!names.length) output.push(" * remote repository has no branches yet");
      names.forEach(branch => {
        const before = state.remote.tracking[branch];
        const after = state.remote.branches[branch];
        state.remote.tracking[branch] = after;
        output.push(` ${before ? `${before}..${after}` : "[new branch]"}      ${branch} -> origin/${branch}`);
      });
      return success(output.join("\n"));
    }

    function handlePush(tokens) {
      const missing = requireRepository();
      if (missing) return missing;
      if (!state.remote.origin) return error("fatal: No configured push destination.\nHint: git remote add origin <url>");
      const args = tokens.slice(2);
      let setUpstream = false;
      let remoteName;
      let branch;
      if (!args.length) {
        const upstream = state.remote.upstreams[state.head];
        if (!upstream) return error(`fatal: The current branch ${state.head} has no upstream branch.\nHint: git push -u origin ${state.head}`);
        remoteName = upstream.slice(0, upstream.indexOf("/"));
        branch = upstream.slice(upstream.indexOf("/") + 1);
      } else {
        if (args[0] === "-u" || args[0] === "--set-upstream") {
          setUpstream = true;
          args.shift();
        }
        if (args.length !== 2) return error("usage: git push -u origin <branch>\n   or: git push");
        [remoteName, branch] = args;
      }
      if (remoteName !== "origin") return error(`fatal: '${remoteName}' does not appear to be a git repository`);
      if (!hasOwn(state.branches, branch)) return error(`error: src refspec ${branch} does not match any`);
      const localId = state.branches[branch];
      if (!localId) return error(`error: src refspec ${branch} does not match any\nHint: create a commit before pushing.`);
      const remoteId = state.remote.branches[branch] || null;
      if (remoteId && !isAncestor(remoteId, localId)) {
        return error(`To ${state.remote.origin}\n ! [rejected]        ${branch} -> ${branch} (non-fast-forward)\nerror: failed to push some refs\nHint: run git fetch origin and inspect the histories before integrating.`);
      }
      if (remoteId === localId) {
        if (setUpstream) state.remote.upstreams[branch] = `origin/${branch}`;
        const tracking = setUpstream ? `\nbranch '${branch}' set up to track 'origin/${branch}'.` : "";
        return success(`Everything up-to-date${tracking}`);
      }
      state.remote.branches[branch] = localId;
      state.remote.tracking[branch] = localId;
      if (setUpstream) state.remote.upstreams[branch] = `origin/${branch}`;
      state.metrics.pushes += 1;
      const kind = remoteId ? `${remoteId}..${localId}` : "[new branch]";
      const tracking = setUpstream ? `\nbranch '${branch}' set up to track 'origin/${branch}'.` : "";
      return success(`Enumerating objects: done.\nTo ${state.remote.origin}\n ${kind}      ${branch} -> ${branch}${tracking}`);
    }

    function handleRestore(tokens) {
      const missing = requireRepository();
      if (missing) return missing;
      const args = tokens.slice(2).filter(token => token !== "--");
      if (args[0] !== "--staged" || args.length !== 2) return error("usage: git restore --staged <path>\n   or: git restore --staged .");
      if (!currentCommitId()) return error("fatal: could not resolve HEAD\nHint: before the first commit, real Git uses git rm --cached -- <path> to unstage a new file.");
      const head = headSnapshot();
      if (args[1] === ".") {
        state.index = cloneSnapshot(head);
        return success("Restored the entire staging area from HEAD. Working-tree edits were kept.");
      }
      const checked = normalizedPath(args[1]);
      if (checked.error) return error(checked.error);
      const path = checked.value;
      if (!hasOwn(state.index, path) && !hasOwn(head, path)) return error(`error: pathspec '${path}' did not match any file(s) known to git`);
      if (hasOwn(head, path)) state.index[path] = head[path];
      else delete state.index[path];
      return success(`Unstaged ${path}. Its working-tree content was kept.`);
    }

    function handleReflog(tokens) {
      const missing = requireRepository();
      if (missing) return missing;
      if (tokens.length !== 2) return error("usage: git reflog");
      if (!state.reflog.length) return result("No reflog entries yet. Create a commit or switch between committed branches.");
      return result(state.reflog.slice().reverse().map((entry, index) => `${entry.id} HEAD@{${index}}: ${entry.action}`).join("\n"));
    }

    function helpText() {
      return [
        "GitQuest typed simulator — supported commands",
        "",
        "Workspace",
        "  edit <path> [\"text\"]                create or replace a simulated file",
        "  clear                                 clear terminal output only",
        "  help                                  show this guide",
        "",
        "Start and inspect",
        "  git init -b main                      initialize a repository",
        "  git status [--short]                  inspect all three Git states",
        "  git diff [<path>]                     review unstaged changes",
        "  git diff --staged [<path>]            review staged changes",
        "  git log --oneline --graph --all       inspect commit history",
        "  git reflog                            inspect recent HEAD movements",
        "",
        "Stage and commit",
        "  git add <path> | git add .            update the staging area",
        "  git restore --staged <path>           unstage while keeping the file",
        "  git commit -m \"message\"              record the staged snapshot",
        "",
        "Branches and integration",
        "  git branch [-vv] [<new-branch>]       list or create branches",
        "  git switch <branch>                   switch to an existing branch",
        "  git switch -c <branch>                create and switch",
        "  git merge <branch>                    integrate another branch",
        "  git merge --continue                  finish a fully resolved merge",
        "  git merge --abort                     cancel a conflicted merge",
        "",
        "Remote (simulated; never uses the network)",
        "  git remote add origin <url>           connect origin",
        "  git remote -v                         inspect origin",
        "  git fetch [origin]                    update remote-tracking refs",
        "  git push -u origin <branch>           publish and set upstream",
        "  git push                              publish to the saved upstream",
        "",
        "Tip: paths and messages containing spaces must be quoted."
      ].join("\n");
    }

    function executeCommand(command) {
      const parsed = tokenize(command);
      if (parsed.error) return error(parsed.error);
      const tokens = parsed.tokens;
      if (!tokens.length) return result("");
      const root = tokens[0].toLowerCase();
      if (root === "help") return result(helpText(), "info");
      if (root === "clear") return { clear: true };
      if (root === "edit") return handleEdit(tokens);
      if (root !== "git") return error(`${tokens[0]}: command not found\nType help to see commands available in this simulator.`);
      if (!tokens[1]) return error("usage: git <command> [<args>]\nType help for the supported command list.");
      if (tokens[1] === "--version") return result("git version 2.49.0 (GitQuest simulator)");
      if (tokens[1] === "help") return result(helpText(), "info");

      const handlers = {
        init: handleInit,
        status: handleStatus,
        add: handleAdd,
        diff: handleDiff,
        commit: handleCommit,
        branch: handleBranch,
        switch: handleSwitch,
        log: handleLog,
        merge: handleMerge,
        remote: handleRemote,
        fetch: handleFetch,
        push: handlePush,
        restore: handleRestore,
        reflog: handleReflog
      };
      const handler = handlers[tokens[1]];
      return handler ? handler(tokens) : error(`git: '${tokens[1]}' is not supported in this simulator.\nType help to see the practical command set.`);
    }

    function statusForWorkingFile(path) {
      const change = changesForState().find(item => item.path === path);
      if (!change) return "clean";
      if (change.conflicted) return "conflict";
      if (change.untracked) return "untracked";
      if (change.unstaged) return "modified";
      if (change.staged) return "staged";
      return "clean";
    }

    function stateList(container, items, emptyText) {
      container.replaceChildren();
      if (!items.length) {
        const empty = document.createElement("li");
        empty.className = "is-empty";
        empty.textContent = emptyText;
        container.append(empty);
        return;
      }
      items.forEach(item => {
        const row = document.createElement("li");
        const primary = document.createElement("code");
        const secondary = document.createElement("span");
        row.className = item.className || "";
        primary.textContent = item.primary;
        secondary.textContent = item.secondary;
        row.append(primary, secondary);
        container.append(row);
      });
    }

    function renderRepository() {
      if (!state.initialized) elements.repoStatus.textContent = "Not initialized";
      else elements.repoStatus.textContent = `${state.head} @ ${shortId(currentCommitId())}${state.merge ? " · merging" : ""}`;

      const workingItems = Object.keys(state.working).sort().map(path => {
        const status = statusForWorkingFile(path);
        return { primary: path, secondary: status, className: `is-${status}` };
      });
      stateList(elements.working, workingItems, "No files in the working tree");

      const stagedItems = changesForState().filter(change => change.staged || change.conflicted).map(change => ({
        primary: change.path,
        secondary: change.conflicted ? "unmerged" : stagedLabel(change),
        className: change.conflicted ? "is-conflict" : "is-staged"
      }));
      stateList(elements.index, stagedItems, "Nothing staged");

      const commitItems = state.commits.slice().reverse().slice(0, 6).map(commit => ({
        primary: commit.id,
        secondary: commit.message,
        className: commit.id === currentCommitId() ? "is-head" : ""
      }));
      stateList(elements.commits, commitItems, "No snapshots committed");

      const branchItems = Object.keys(state.branches).sort().map(branch => ({
        primary: `${branch === state.head ? "HEAD → " : ""}${branch}`,
        secondary: shortId(state.branches[branch]),
        className: branch === state.head ? "is-head" : ""
      }));
      stateList(elements.branches, branchItems, state.initialized ? "No branches" : "Initialize Git to create HEAD");

      const remoteItems = [];
      if (state.remote.origin) remoteItems.push({ primary: "origin", secondary: state.remote.origin, className: "is-origin" });
      Object.keys(state.remote.branches).sort().forEach(branch => remoteItems.push({
        primary: `origin/${branch}`,
        secondary: shortId(state.remote.branches[branch]),
        className: "is-remote"
      }));
      stateList(elements.remote, remoteItems, "No remote connected");
    }

    function runInputCommand() {
      const command = elements.input.value.trim();
      if (!command) return;
      state.history.push(command);
      if (state.history.length > 80) state.history.shift();
      state.historyCursor = state.history.length;
      elements.input.value = "";

      const response = executeCommand(command);
      if (response.clear) {
        clearTerminal(false);
      } else {
        appendTerminal(command, response.output, response.tone);
      }
      renderRepository();
      advanceMissions();
    }

    function resetSimulator() {
      state = createState();
      clearTerminal(false);
      appendSystem("Fresh simulator ready. Type help for the command guide, or follow Mission 1.", "info");
      elements.input.value = "";
      elements.missionAnnouncement.textContent = "Simulator reset. No real files were changed.";
      renderRepository();
      renderMissions();
      elements.input.focus();
    }

    elements.form.addEventListener("submit", event => {
      event.preventDefault();
      runInputCommand();
    });

    elements.input.addEventListener("keydown", event => {
      if (event.key === "ArrowUp") {
        event.preventDefault();
        if (!state.history.length) return;
        state.historyCursor = Math.max(0, state.historyCursor - 1);
        elements.input.value = state.history[state.historyCursor];
        elements.input.setSelectionRange(elements.input.value.length, elements.input.value.length);
      } else if (event.key === "ArrowDown") {
        event.preventDefault();
        if (!state.history.length) return;
        state.historyCursor = Math.min(state.history.length, state.historyCursor + 1);
        elements.input.value = state.historyCursor === state.history.length ? "" : state.history[state.historyCursor];
        elements.input.setSelectionRange(elements.input.value.length, elements.input.value.length);
      } else if (event.key.toLowerCase() === "l" && (event.ctrlKey || event.metaKey)) {
        event.preventDefault();
        clearTerminal(true);
      } else if (event.key === "Escape") {
        elements.input.value = "";
      }
    });

    elements.missionCommand.addEventListener("click", () => {
      if (state.missionIndex >= missions.length) return;
      elements.input.value = missionCommand(missions[state.missionIndex]);
      elements.input.focus();
      elements.input.setSelectionRange(elements.input.value.length, elements.input.value.length);
    });

    elements.clear.addEventListener("click", () => {
      clearTerminal(true);
      elements.input.focus();
    });
    elements.reset.addEventListener("click", resetSimulator);

    appendSystem("Welcome to the typed Git simulator. Follow the mission above or type help. Everything here stays inside this browser tab.", "info");
    renderRepository();
    renderMissions();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", bootTypedGitSimulator, { once: true });
  } else {
    bootTypedGitSimulator();
  }
}());
