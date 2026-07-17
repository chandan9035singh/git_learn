"use strict";

const commandData = [
  { category: "basics", command: "git --version", description: "Confirm that Git is installed and print the version on your machine.", example: "git --version", keywords: "install setup check version" },
  { category: "basics", command: "git config --global user.name \"Your Name\"", description: "Set the author name saved on every commit you create.", example: "git config --global user.name \"Ava Patel\"", keywords: "setup identity username author" },
  { category: "basics", command: "git config --global user.email \"you@example.com\"", description: "Set the email connected to your commits and GitHub account.", example: "git config --global user.email \"ava@example.com\"", keywords: "setup identity email author github" },
  { category: "basics", command: "git config --global init.defaultBranch main", description: "Use main as the initial branch name in repositories you create later.", example: "git config --global init.defaultBranch main", keywords: "setup config default branch main" },
  { category: "basics", command: "git config --list --show-origin", description: "Inspect active settings and the configuration file each value came from.", example: "git config --list --show-origin", keywords: "setup diagnose configuration identity origin" },
  { category: "basics", command: "git help <command>", description: "Open Git's detailed manual for a command when you need every option.", example: "git help status", keywords: "documentation manual help options learn" },
  { category: "basics", command: "git init", description: "Turn the current folder into a new local Git repository.", example: "mkdir my-project\ncd my-project\ngit init", keywords: "start create repository new" },
  { category: "basics", command: "git status", description: "See your branch plus changed, staged, and untracked files.", example: "git status --short", keywords: "check changes staged untracked working tree" },
  { category: "basics", command: "git add <file>", description: "Add a file's current changes to the staging area for the next commit.", example: "git add index.html", keywords: "stage prepare track file" },
  { category: "basics", command: "git add .", description: "Stage all changes under the current folder for the next commit.", example: "git add .\ngit status", keywords: "stage all changes prepare", warning: "Review git status or git diff --staged before committing." },
  { category: "basics", command: "git add -p", description: "Review and stage one change hunk at a time for a focused commit.", example: "git add -p", keywords: "stage partial patch hunk selective review" },
  { category: "basics", command: "git commit -m \"message\"", description: "Save a staged snapshot with a short explanation of why it changed.", example: "git commit -m \"Add responsive navigation\"", keywords: "save snapshot history message" },
  { category: "basics", command: "git clone <url>", description: "Download a repository, its branches, and its full history.", example: "git clone https://github.com/user/project.git", keywords: "download copy github repository remote" },
  { category: "basics", command: "git rm --cached <file>", description: "Stop tracking a file but keep the local copy on your machine.", example: "git rm --cached .env", keywords: "untrack keep file gitignore secret cached", warning: "If the file contained a real secret, rotate the secret; removing it does not erase old commits." },
  { category: "basics", command: "git check-ignore -v <file>", description: "Find the exact .gitignore rule that is ignoring a file.", example: "git check-ignore -v .env", keywords: "gitignore ignored file diagnose rule" },
  { category: "branches", command: "git branch", description: "List local branches and show which one is currently checked out.", example: "git branch --all", keywords: "list branches current" },
  { category: "branches", command: "git switch -c <branch>", description: "Create a new branch from your current commit and switch to it.", example: "git switch -c feature/navbar", keywords: "create branch checkout new" },
  { category: "branches", command: "git switch <branch>", description: "Move your working tree and HEAD to an existing branch.", example: "git switch main", keywords: "change branch checkout move" },
  { category: "branches", command: "git merge <branch>", description: "Bring another branch's commits into your current branch.", example: "git switch main\ngit merge feature/navbar", keywords: "combine branches integrate" },
  { category: "branches", command: "git branch -d <branch>", description: "Delete a local branch only after Git confirms it is fully merged.", example: "git branch -d feature/navbar", keywords: "delete branch cleanup merged" },
  { category: "branches", command: "git rebase <base>", description: "Replay your branch commits on a new base for a linear history.", example: "git switch feature/navbar\ngit rebase main", keywords: "rewrite linear update branch", warning: "Avoid rebasing commits other people already use." },
  { category: "branches", command: "git cherry-pick <commit>", description: "Apply one specific existing commit on top of your current branch.", example: "git cherry-pick a1b2c3d", keywords: "copy commit branch apply" },
  { category: "branches", command: "git merge --abort", description: "Cancel an unfinished merge and return to the pre-merge state.", example: "git merge --abort", keywords: "cancel conflict merge recover abort" },
  { category: "branches", command: "git rebase --continue", description: "Continue a paused rebase after you resolve and stage its conflicts.", example: "git add resolved-file.js\ngit rebase --continue", keywords: "conflict rebase resolve continue" },
  { category: "branches", command: "git rebase --abort", description: "Cancel a rebase and restore the branch state from before it began.", example: "git rebase --abort", keywords: "cancel conflict rebase recover abort" },
  { category: "remote", command: "git remote -v", description: "List connected remote names and their fetch and push URLs.", example: "git remote -v", keywords: "github url origin check remotes" },
  { category: "remote", command: "git remote add origin <url>", description: "Connect your local repository to a remote named origin.", example: "git remote add origin https://github.com/user/project.git", keywords: "connect github origin url" },
  { category: "remote", command: "git remote set-url origin <url>", description: "Correct or replace the URL of an existing origin remote.", example: "git remote set-url origin https://github.com/user/project.git", keywords: "change fix remote origin already exists url" },
  { category: "remote", command: "git fetch origin", description: "Download remote history without changing your working files.", example: "git fetch origin\ngit log main..origin/main", keywords: "download update safe remote history" },
  { category: "remote", command: "git fetch --prune", description: "Fetch updates and remove stale remote-tracking branch names.", example: "git fetch origin --prune", keywords: "remote deleted branch cleanup update" },
  { category: "remote", command: "git pull --ff-only", description: "Update only when Git can fast-forward, refusing an unexpected merge.", example: "git pull --ff-only origin main", keywords: "safe update sync remote beginner fast forward" },
  { category: "remote", command: "git pull --rebase", description: "Fetch remote commits, then replay your local commits on top.", example: "git pull --rebase origin main", keywords: "download update sync remote rejected" },
  { category: "remote", command: "git push -u origin <branch>", description: "Publish a branch and remember its upstream for future pushes.", example: "git push -u origin feature/navbar", keywords: "upload publish github upstream" },
  { category: "remote", command: "git push", description: "Upload new local commits to the tracked remote branch.", example: "git push", keywords: "upload publish sync github" },
  { category: "remote", command: "git remote rename origin upstream", description: "Rename a configured remote without changing its URL.", example: "git remote rename origin upstream", keywords: "rename remote fork upstream origin" },
  { category: "remote", command: "gh pr create", description: "Open a GitHub pull request from your pushed branch using GitHub CLI.", example: "gh pr create --fill", keywords: "github cli pull request open collaboration" },
  { category: "remote", command: "gh pr checkout <number>", description: "Check out a pull request locally with the GitHub CLI.", example: "gh pr checkout 42", keywords: "github cli review pull request" },
  { category: "remote", command: "git push --force-with-lease", description: "Update a rewritten remote branch only if nobody else changed it since your fetch.", example: "git fetch origin\ngit push --force-with-lease", keywords: "force safer rewrite remote rebase", warning: "Still rewrites remote history. Use only on your own branch after coordinating." },
  { category: "inspect", command: "git log --oneline --graph --all", description: "View a compact branch graph of commits from every local reference.", example: "git log --oneline --graph --decorate --all", keywords: "history commits graph inspect" },
  { category: "inspect", command: "git diff", description: "Compare unstaged working-tree changes with the staging area.", example: "git diff", keywords: "compare changes review unstaged" },
  { category: "inspect", command: "git diff --staged", description: "Review exactly what will be included in your next commit.", example: "git diff --staged", keywords: "compare changes review staged cached" },
  { category: "inspect", command: "git show <commit>", description: "Display a commit's metadata, message, and exact patch.", example: "git show a1b2c3d", keywords: "inspect commit changes patch" },
  { category: "inspect", command: "git blame <file>", description: "Show the last commit and author for each line of a file.", example: "git blame -L 10,25 app.js", keywords: "author history line inspect" },
  { category: "inspect", command: "git tag -a <tag> -m <message>", description: "Create an annotated label for a release or important commit.", example: "git tag -a v1.0.0 -m \"First release\"", keywords: "release version label history" },
  { category: "inspect", command: "git bisect start", description: "Begin a binary search through history to find the commit that introduced a bug.", example: "git bisect start\ngit bisect bad\ngit bisect good v1.0.0", keywords: "debug bug find commit binary search advanced" },
  { category: "undo", command: "git restore <file>", description: "Discard unstaged changes in a file and restore its last committed form.", example: "git restore index.html", keywords: "undo discard working file changes", warning: "This permanently discards that file's unstaged changes." },
  { category: "undo", command: "git restore --staged <file>", description: "Remove a file from staging while keeping your working changes.", example: "git restore --staged secrets.env", keywords: "unstage undo add keep changes" },
  { category: "undo", command: "git commit --amend", description: "Replace the latest local commit with updated content or message.", example: "git add forgotten-file.js\ngit commit --amend --no-edit", keywords: "fix last commit message add forgotten", warning: "Avoid amending a commit that teammates already pulled." },
  { category: "undo", command: "git revert <commit>", description: "Create a new commit that safely reverses an earlier commit.", example: "git revert a1b2c3d", keywords: "undo public shared safe commit reverse" },
  { category: "undo", command: "git reset --soft HEAD~1", description: "Remove the latest local commit but keep all its changes staged.", example: "git reset --soft HEAD~1", keywords: "undo local commit keep staged", warning: "Use only on local history that has not been shared." },
  { category: "undo", command: "git stash push -m <message>", description: "Temporarily shelve tracked changes so you can switch tasks cleanly.", example: "git stash push -u -m \"WIP navbar\"", keywords: "save temporary work switch include untracked" },
  { category: "undo", command: "git stash pop", description: "Reapply the newest stash and remove it from the stash list if successful.", example: "git stash list\ngit stash pop", keywords: "restore temporary work apply" },
  { category: "undo", command: "git stash list", description: "List saved work-in-progress entries without changing your files.", example: "git stash list", keywords: "inspect temporary saved work stash" },
  { category: "undo", command: "git reflog", description: "Find recent HEAD positions and rescue commits after resets or rebases.", example: "git reflog\ngit branch rescue a1b2c3d", keywords: "recover lost commit history reset rescue" }
];

const categoryLabels = { basics: "Basics", branches: "Branches", remote: "Remote", inspect: "Inspect", undo: "Undo" };
const categoryColors = { basics: "var(--primary)", branches: "var(--purple)", remote: "var(--cyan)", inspect: "var(--green)", undo: "var(--orange)" };

const fixData = [
  { id: "not-repository", icon: ".G", color: "var(--primary)", title: "Not a Git repository", subtitle: "Find or initialize the project", severity: "safe", error: "fatal: not a git repository (or any of the parent directories): .git", summary: "You are outside a repository, or this folder has not intentionally been initialized yet.", code: "# If the repository already exists, enter its folder\ncd path/to/project\ngit status\n\n# If this is a brand-new project instead\ngit init", why: "Git searches the current folder and its parents for a .git database. Changing folders or deliberately initializing provides one.", warning: "Do not run git init randomly inside a repository's subfolder; first confirm where your project root should be.", keywords: "fatal not a git repository dot git init folder directory" },
  { id: "identity-unknown", icon: "ID", color: "var(--cyan)", title: "Author identity unknown", subtitle: "Configure your commit author", severity: "safe", error: "Author identity unknown\nfatal: unable to auto-detect email address", summary: "Tell Git the human name and email it should record on new commits.", code: "git config --global user.name \"Your Name\"\ngit config --global user.email \"you@example.com\"\n\n# Verify where the values came from\ngit config --list --show-origin", why: "Every commit stores author metadata. These settings supply it; the name does not have to equal your GitHub username.", keywords: "author identity unknown email config unable auto detect" },
  { id: "refspec-main", icon: "RF", color: "var(--orange)", title: "src refspec main does not match any", subtitle: "Create the first commit or check the branch", severity: "safe", error: "error: src refspec main does not match any\nerror: failed to push some refs", summary: "Usually the repository has no commit yet, or your current branch has a different name.", code: "git status\ngit branch --show-current\n\n# If there is no commit yet\ngit add .\ngit commit -m \"Initial commit\"\n\n# Standardize the branch name, then publish\ngit branch -M main\ngit push -u origin main", why: "A branch reference becomes pushable after a commit exists. Renaming ensures the local name matches main.", keywords: "src refspec main does not match any failed push first commit branch master" },
  { id: "origin-exists", icon: "OR", color: "var(--purple)", title: "Remote origin already exists", subtitle: "Inspect it, then correct the URL", severity: "safe", error: "error: remote origin already exists.", summary: "A remote named origin is already configured. Update it instead of adding a duplicate.", code: "git remote -v\n\n# If the displayed URL is wrong\ngit remote set-url origin <correct-repository-url>\ngit remote -v", why: "Remote names must be unique. set-url preserves the origin name while safely changing its destination.", keywords: "remote origin already exists add url set change" },
  { id: "ssh-denied", icon: "SSH", color: "var(--red)", title: "Permission denied (publickey)", subtitle: "Fix GitHub SSH authentication", severity: "careful", error: "git@github.com: Permission denied (publickey).\nfatal: Could not read from remote repository.", summary: "Confirm the remote uses SSH, test which GitHub account your key authenticates, and add the correct key if needed.", code: "git remote -v\nssh -T git@github.com\n\n# GitHub CLI can guide authentication\ngh auth login", why: "The repository URL asks for SSH authentication, but GitHub did not accept a key from your SSH agent.", warning: "Never paste a private SSH key, password, or access token into a remote URL or commit.", keywords: "permission denied publickey ssh github authentication could not read remote" },
  { id: "repo-not-found", icon: "404", color: "var(--red)", title: "Repository not found", subtitle: "Check URL and account access", severity: "safe", error: "remote: Repository not found.\nfatal: repository '<url>' not found", summary: "The URL may be misspelled, renamed, private, or unavailable to your authenticated account.", code: "git remote -v\n# Correct a wrong URL if needed\ngit remote set-url origin <correct-repository-url>\n\n# Check GitHub CLI authentication\ngh auth status", why: "GitHub returns the same message for some missing repositories and repositories your current account cannot access.", keywords: "repository not found 404 remote private access auth url" },
  { id: "unfinished-operation", icon: "…", color: "var(--orange)", title: "A merge or rebase is still in progress", subtitle: "Continue it or abort it cleanly", severity: "careful", error: "fatal: It seems that there is already a rebase-merge directory", summary: "Git is waiting for you to finish or cancel an earlier history operation before starting another.", code: "git status\n\n# After resolving and staging conflicts\ngit rebase --continue\n# Or return to the state before it began\ngit rebase --abort\n\n# For an unfinished merge instead\ngit merge --abort", why: "Git stores operation state inside .git so it can safely continue or roll back the multi-step action.", warning: "Use git status to identify the active operation. Do not manually delete Git's state files while an operation is recoverable.", keywords: "already rebase merge in progress continue abort unfinished directory" },
  { id: "wrong-branch", icon: "BR", color: "var(--primary)", title: "I committed on the wrong branch", subtitle: "Move a local commit safely", severity: "careful", error: "The commit belongs on feature/login, not main.", summary: "Create the intended branch at your current commit, then move the original branch back one commit.", code: "# While still on the wrong branch\ngit branch feature/login\n\n# Move main back but keep files unchanged\ngit reset --hard HEAD~1\n\n# Continue on the correct branch\ngit switch feature/login", why: "The new branch keeps a pointer to the commit before main moves back.", warning: "Only reset if the mistaken commit is local and not pushed. If pushed, use git revert instead.", keywords: "wrong branch commit main reset" },
  { id: "undo-pushed", icon: "RV", color: "var(--green)", title: "I need to undo a pushed commit", subtitle: "Reverse shared history", severity: "safe", error: "A bad commit is already on the shared remote branch.", summary: "Add a new inverse commit. This preserves the history teammates may already have.", code: "git log --oneline\ngit revert <bad-commit-id>\ngit push", why: "Revert does not rewrite shared history; it records the correction transparently.", keywords: "undo pushed commit shared revert remote" },
  { id: "push-rejected", icon: "↑!", color: "var(--orange)", title: "Push rejected: non-fast-forward", subtitle: "Remote has newer commits", severity: "safe", error: "! [rejected] main -> main (non-fast-forward)", summary: "Bring the remote commits into your local branch first, then push again.", code: "git pull --rebase origin main\n# Resolve conflicts if Git pauses\ngit push origin main", why: "Rebase places your local work after the newer remote commits, producing a fast-forward push.", keywords: "push rejected non fast forward fetch first remote newer" },
  { id: "merge-conflict", icon: "<>", color: "var(--red)", title: "I have a merge conflict", subtitle: "Resolve both versions", severity: "careful", error: "CONFLICT (content): Merge conflict in src/app.js\nAutomatic merge failed; fix conflicts and then commit.", summary: "Open each conflicted file, choose the correct content, delete conflict markers, then stage the resolution.", code: "git status\n# Edit files containing <<<<<<<, =======, >>>>>>>\ngit add src/app.js\ngit commit        # finish a merge\n# or: git rebase --continue", why: "Staging a resolved file tells Git that you reviewed and settled that conflict.", warning: "Run tests before completing the merge. Use git merge --abort to return to the pre-merge state.", keywords: "conflict merge markers both modified rebase continue" },
  { id: "unstage", icon: "−", color: "var(--cyan)", title: "I staged the wrong file", subtitle: "Keep the edits, undo git add", severity: "safe", error: "Changes to be committed:\n  modified: secrets.env", summary: "Remove the file from the staging area without touching its contents.", code: "git restore --staged secrets.env\ngit status", why: "The working copy stays exactly as it is; only the next-commit selection changes.", keywords: "unstage wrong file git add keep changes staged" },
  { id: "discard", icon: "↶", color: "var(--orange)", title: "Discard changes in one file", subtitle: "Restore the committed version", severity: "careful", error: "modified: index.html\n# These edits are not needed.", summary: "Restore one tracked file to its last committed state.", code: "git diff index.html\n# After reviewing the diff:\ngit restore index.html", why: "Restore replaces the working copy from the index, leaving other files alone.", warning: "Uncommitted edits in that file cannot normally be recovered afterward.", keywords: "discard undo file changes restore modified" },
  { id: "amend-message", icon: "Aa", color: "var(--purple)", title: "Fix my last commit message", subtitle: "Amend unpublished history", severity: "careful", error: "commit 8fa2...\n    udpate navabr", summary: "Replace the latest commit message while keeping its snapshot.", code: "git commit --amend -m \"Update navbar\"", why: "Amend creates a replacement commit with a new ID and corrected message.", warning: "If you already pushed the old commit, prefer leaving it or coordinate before rewriting it.", keywords: "fix typo last commit message amend" },
  { id: "forgot-file", icon: "+1", color: "var(--primary)", title: "I forgot a file in my last commit", subtitle: "Add it without another commit", severity: "careful", error: "The latest local commit is correct, but one file is missing.", summary: "Stage the forgotten file, then amend the commit without changing its message.", code: "git add forgotten-file.js\ngit commit --amend --no-edit", why: "The replacement commit contains both the original snapshot and the newly staged file.", warning: "Do this before pushing, because amend changes the commit ID.", keywords: "forgot file last commit amend add no edit" },
  { id: "detached-head", icon: "HD", color: "var(--purple)", title: "I am in detached HEAD state", subtitle: "Keep work on a real branch", severity: "safe", error: "You are in 'detached HEAD' state.", summary: "If you made useful commits here, immediately create a branch pointing to them.", code: "git switch -c rescue/my-work\n# Your commits now have a branch name", why: "Detached HEAD is safe for looking around, but a branch keeps new commits easy to find.", keywords: "detached head checkout commit rescue branch" },
  { id: "lost-commit", icon: "?", color: "var(--green)", title: "A commit looks lost after reset", subtitle: "Find it with reflog", severity: "safe", error: "The branch moved and my recent commit disappeared from git log.", summary: "Use the local reference log to find the old commit ID, then create a rescue branch.", code: "git reflog\n# Find the entry before the reset, then:\ngit branch rescue-work <commit-id>\ngit switch rescue-work", why: "Git usually retains unreachable objects for a while; reflog records where HEAD recently pointed.", keywords: "lost commit reset recover reflog rescue disappeared" },
  { id: "untracked-overwrite", icon: "UF", color: "var(--orange)", title: "Untracked files would be overwritten", subtitle: "Protect local files before switching", severity: "careful", error: "The following untracked working tree files would be overwritten by checkout", summary: "Move, commit, or stash the untracked files before changing branches.", code: "git status\n# Option A: keep them in Git\ngit add . && git commit -m \"Save local work\"\n# Option B: temporarily stash them\ngit stash push -u -m \"WIP before switch\"", why: "The -u flag includes untracked files, which a normal stash omits.", warning: "Do not use git clean until you have reviewed exactly what it would delete with git clean -n.", keywords: "untracked files overwritten checkout switch stash include" },
  { id: "unrelated-histories", icon: "∞", color: "var(--red)", title: "Refusing to merge unrelated histories", subtitle: "Two repositories started separately", severity: "careful", error: "fatal: refusing to merge unrelated histories", summary: "Confirm that the local and remote repositories truly should be combined, then explicitly allow the merge.", code: "git pull origin main --allow-unrelated-histories\n# Resolve any conflicts, then commit", why: "Git sees no common ancestor; the flag acknowledges that you intentionally want one combined history.", warning: "First verify the remote URL with git remote -v. This error often means the wrong repositories were connected.", keywords: "fatal refusing merge unrelated histories pull remote" }
];

const quizData = [
  { topic: "FOUNDATIONS", question: "You edited three files but want only index.html in the next commit. What should you run?", options: ["git add .", "git add index.html", "git commit index.html", "git push index.html"], answer: 1, explanation: "git add index.html stages only that file. A commit records what is staged." },
  { topic: "BRANCHES", question: "Which command creates a new branch and switches to it in one step?", options: ["git branch feature", "git checkout main", "git switch -c feature", "git merge feature"], answer: 2, explanation: "git switch -c feature creates the branch at HEAD and immediately checks it out." },
  { topic: "COLLABORATION", question: "Your push is rejected because the remote has new commits. What is the safest next move?", options: ["Force push immediately", "Delete the remote", "Pull/rebase, resolve, then push", "Reset --hard origin/main"], answer: 2, explanation: "Integrate the remote commits first. Force pushing could erase somebody else's work." },
  { topic: "RECOVERY", question: "A bad commit is already shared with your team. Which undo method preserves public history?", options: ["git reset --hard HEAD~1", "git revert <commit>", "Delete the .git folder", "git commit --amend"], answer: 1, explanation: "git revert adds an inverse commit, so teammates' existing history stays valid." },
  { topic: "GITHUB", question: "What does a pull request do?", options: ["Downloads Git", "Deletes a branch locally", "Proposes changes for discussion and review", "Automatically fixes every conflict"], answer: 2, explanation: "A pull request is a GitHub collaboration object for reviewing and discussing a proposed branch change." }
];

const labSteps = [
  { command: "git init", output: ["Initialized empty Git repository in ~/gitquest/.git/"], explainer: "Git created a hidden .git database. Your files have not been committed yet.", repo: "Repository ready", head: "HEAD → main", working: "1 untracked file", staging: "Empty", history: "No commits", states: ["changed", "", ""] },
  { command: "git add .", output: ["Staged: index.html"], explainer: "git add copied the current version of index.html into the staging area—the exact proposal for your next commit.", repo: "Changes staged", head: "HEAD → main", working: "Clean", staging: "1 file staged", history: "No commits", states: ["", "active", ""] },
  { command: "git commit -m \"first commit\"", output: ["[main (root-commit) a1b2c3d] first commit", " 1 file changed, 42 insertions(+)"], explainer: "Your first commit saved the staged snapshot in history. HEAD and main now point to commit a1b2c3d.", repo: "Working tree clean", head: "HEAD → main", working: "Clean", staging: "Empty", history: "1 commit", states: ["", "", "active"], graph: "first" },
  { command: "git switch -c feature/navbar", output: ["Switched to a new branch 'feature/navbar'"], explainer: "The new branch starts at the same commit as main. HEAD now points to feature/navbar, so new commits will move that branch.", repo: "On feature/navbar", head: "HEAD → feature/navbar", working: "1 modified file", staging: "Empty", history: "1 commit", states: ["changed", "", "active"], graph: "branch" },
  { command: "git add .", output: ["Staged: index.html (navbar changes)"], explainer: "The navbar edits are staged on your feature branch. main is still unchanged.", repo: "Changes staged", head: "HEAD → feature/navbar", working: "Clean", staging: "1 file staged", history: "1 commit", states: ["", "active", "active"] },
  { command: "git commit -m \"build navbar\"", output: ["[feature/navbar d4e5f6a] build navbar", " 1 file changed, 18 insertions(+)"], explainer: "A second commit moved feature/navbar ahead. main stays at your first commit until you merge.", repo: "Working tree clean", head: "HEAD → feature/navbar", working: "Clean", staging: "Empty", history: "2 commits", states: ["", "", "active"], graph: "feature" },
  { command: "git switch main", output: ["Switched to branch 'main'"], explainer: "Your files now match main again. The feature commit is safe and remains reachable through feature/navbar.", repo: "On main", head: "HEAD → main", working: "Clean", staging: "Empty", history: "1 on main", states: ["", "", "active"], graph: "back-main" },
  { command: "git merge feature/navbar", output: ["Updating a1b2c3d..d4e5f6a", "Fast-forward", " index.html | 18 ++++++++++++++++++"], explainer: "Because main had not moved, Git performed a fast-forward: main now points to the same commit as feature/navbar.", repo: "Merge complete", head: "HEAD → main", working: "Clean", staging: "Empty", history: "2 commits", states: ["", "", "active"], graph: "merge" }
];

const icons = {
  copy: '<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="8" y="8" width="12" height="12" rx="2"></rect><path d="M16 8V6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h2"></path></svg>',
  warning: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 3 2.5 20h19L12 3Z"></path><path d="M12 9v4M12 17h.01"></path></svg>',
  chevron: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="m9 18 6-6-6-6"></path></svg>'
};

const $ = (selector, scope = document) => scope.querySelector(selector);
const $$ = (selector, scope = document) => [...scope.querySelectorAll(selector)];

function escapeHTML(value) {
  const element = document.createElement("div");
  element.textContent = value;
  return element.innerHTML;
}

function showToast(message = "Copied to clipboard") {
  const toast = $("#toast");
  $("span", toast).textContent = message;
  toast.classList.add("is-visible");
  clearTimeout(showToast.timer);
  showToast.timer = setTimeout(() => toast.classList.remove("is-visible"), 2200);
}

async function copyText(text, successMessage) {
  try {
    await navigator.clipboard.writeText(text);
  } catch {
    const textArea = document.createElement("textarea");
    textArea.value = text;
    textArea.style.position = "fixed";
    textArea.style.opacity = "0";
    document.body.appendChild(textArea);
    textArea.select();
    document.execCommand("copy");
    textArea.remove();
  }
  showToast(successMessage);
}

// Theme, navigation, and section tracking
const storedTheme = localStorage.getItem("gitquest-theme");
const preferredLight = window.matchMedia("(prefers-color-scheme: light)").matches;
document.documentElement.dataset.theme = storedTheme || (preferredLight ? "light" : "dark");

function syncThemeButton() {
  const isLight = document.documentElement.dataset.theme === "light";
  $("#themeToggle").setAttribute("aria-label", `Switch to ${isLight ? "dark" : "light"} theme`);
  document.querySelector('meta[name="theme-color"]').content = isLight ? "#f6f7fc" : "#080b16";
}
syncThemeButton();

$("#themeToggle").addEventListener("click", () => {
  const next = document.documentElement.dataset.theme === "light" ? "dark" : "light";
  document.documentElement.dataset.theme = next;
  localStorage.setItem("gitquest-theme", next);
  syncThemeButton();
});

$("#menuButton").addEventListener("click", () => {
  const open = $("#menuButton").getAttribute("aria-expanded") === "true";
  $("#menuButton").setAttribute("aria-expanded", String(!open));
  $("#menuButton").setAttribute("aria-label", open ? "Open navigation" : "Close navigation");
  $("#navLinks").classList.toggle("is-open", !open);
});

$$('.nav__links a').forEach(link => link.addEventListener("click", () => {
  $("#navLinks").classList.remove("is-open");
  $("#menuButton").setAttribute("aria-expanded", "false");
}));

window.addEventListener("scroll", () => $(".site-header").classList.toggle("is-scrolled", window.scrollY > 16), { passive: true });

const sectionObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      $$('.nav__links a').forEach(link => link.classList.toggle("is-active", link.getAttribute("href") === `#${entry.target.id}`));
    }
  });
}, { rootMargin: "-40% 0px -52%", threshold: 0 });
$$('main section[id]').forEach(section => sectionObserver.observe(section));

// Reveal animations
const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("is-visible");
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: .11, rootMargin: "0px 0px -30px" });
$$('.reveal').forEach(element => revealObserver.observe(element));

const workflowObserver = new IntersectionObserver(entries => {
  if (entries[0].isIntersecting) entries[0].target.classList.add("is-visible");
}, { threshold: .3 });
workflowObserver.observe($(".workflow-track"));

// Animated hero terminal
const heroTerminalFrames = [
  { command: "git status", output: "On branch main<br><span>nothing to commit, working tree clean</span>" },
  { command: "git switch -c feature", output: "Switched to a new branch<br><span>'feature'</span>" },
  { command: "git add .", output: "Changes staged<br><span>ready for your next commit</span>" },
  { command: "git commit -m \"Ship it\"", output: "[feature c84a1f] Ship it<br><span>3 files changed</span>" },
  { command: "git push -u origin feature", output: "Branch 'feature' set up<br><span>ready for pull request ✓</span>" }
];
let heroFrame = 0;
let charIndex = 0;
let typingBack = false;
function typeHeroCommand() {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  const frame = heroTerminalFrames[heroFrame];
  const target = $("#typingCommand");
  if (!typingBack && charIndex <= frame.command.length) {
    target.textContent = frame.command.slice(0, charIndex++);
    setTimeout(typeHeroCommand, 55);
  } else if (!typingBack) {
    $("#typingOutput").innerHTML = frame.output;
    typingBack = true;
    setTimeout(typeHeroCommand, 1900);
  } else if (charIndex > 0) {
    target.textContent = frame.command.slice(0, --charIndex);
    setTimeout(typeHeroCommand, 22);
  } else {
    typingBack = false;
    heroFrame = (heroFrame + 1) % heroTerminalFrames.length;
    setTimeout(typeHeroCommand, 350);
  }
}
setTimeout(typeHeroCommand, 1200);

// Learning progress
let completedStages = JSON.parse(localStorage.getItem("gitquest-stages") || "[]");
function updateProgress() {
  $$('.path-card').forEach(card => {
    const complete = completedStages.includes(card.dataset.stage);
    card.classList.toggle("is-complete", complete);
    $(".stage-check", card).setAttribute("aria-pressed", String(complete));
  });
  const percentage = completedStages.length * 20;
  $("#progressBar").style.width = `${percentage}%`;
  $("#progressLabel").textContent = `${percentage}%`;
  $("#progressDetail").textContent = `${completedStages.length} of 5 stages complete`;
}
$$('.stage-check').forEach(button => button.addEventListener("click", event => {
  event.stopPropagation();
  const stage = button.closest(".path-card").dataset.stage;
  completedStages = completedStages.includes(stage) ? completedStages.filter(item => item !== stage) : [...completedStages, stage];
  localStorage.setItem("gitquest-stages", JSON.stringify(completedStages));
  updateProgress();
  showToast(completedStages.includes(stage) ? "Stage marked complete" : "Stage marked incomplete");
}));
updateProgress();

// Command center
let activeCommandFilter = "all";
let commandLimit = 12;
function commandCardTemplate(item, index) {
  const safeCommand = escapeHTML(item.command);
  const exampleLines = escapeHTML(item.example).replace(/\n/g, "<br>").replace(/(&lt;[^&]+&gt;)/g, "<b>$1</b>");
  return `<article class="command-card" style="--category-color:${categoryColors[item.category]};animation-delay:${Math.min(index * 25, 200)}ms">
    <div class="command-card__top">
      <span class="command-card__category">${categoryLabels[item.category]}</span>
      <button class="copy-button" type="button" data-copy="${encodeURIComponent(item.example)}" aria-label="Copy ${safeCommand}">${icons.copy}</button>
    </div>
    <h3><span class="command-dollar">$</span>${safeCommand}</h3>
    <p>${escapeHTML(item.description)}</p>
    <div class="command-example">${exampleLines}</div>
    ${item.warning ? `<div class="command-warning">${icons.warning}<span>${escapeHTML(item.warning)}</span></div>` : ""}
  </article>`;
}

function filteredCommands() {
  const query = $("#commandSearch").value.trim().toLowerCase();
  return commandData.filter(item => {
    const categoryMatch = activeCommandFilter === "all" || item.category === activeCommandFilter;
    const haystack = `${item.command} ${item.description} ${item.example} ${item.keywords}`.toLowerCase();
    return categoryMatch && haystack.includes(query);
  });
}

function renderCommands() {
  const filtered = filteredCommands();
  const visible = filtered.slice(0, commandLimit);
  $("#commandGrid").innerHTML = visible.map(commandCardTemplate).join("");
  $("#commandEmpty").hidden = filtered.length !== 0;
  $("#commandResultCount").textContent = filtered.length === commandData.length ? `Showing ${Math.min(commandLimit, filtered.length)} of ${filtered.length} commands` : `${filtered.length} command${filtered.length === 1 ? "" : "s"} found`;
  $("#loadMoreCommands").hidden = visible.length >= filtered.length;
  $$('.copy-button[data-copy]', $("#commandGrid")).forEach(button => button.addEventListener("click", () => copyText(decodeURIComponent(button.dataset.copy), "Command copied")));
}

$$('.filter-chip').forEach(button => button.addEventListener("click", () => {
  activeCommandFilter = button.dataset.filter;
  commandLimit = 12;
  $$('.filter-chip').forEach(chip => {
    const active = chip === button;
    chip.classList.toggle("is-active", active);
    chip.setAttribute("aria-pressed", String(active));
  });
  renderCommands();
}));

$("#commandSearch").addEventListener("input", () => { commandLimit = 50; renderCommands(); });
$("#loadMoreCommands").addEventListener("click", () => { commandLimit += 12; renderCommands(); });
document.addEventListener("keydown", event => {
  if (event.key === "/" && !["INPUT", "TEXTAREA"].includes(document.activeElement.tagName)) {
    event.preventDefault();
    $("#commandSearch").focus();
  }
});

$$('[data-command-filter]').forEach(link => link.addEventListener("click", () => {
  const target = $(`.filter-chip[data-filter="${link.dataset.commandFilter}"]`);
  if (target) target.click();
}));

$("#copyCheatSheet").addEventListener("click", () => {
  const starter = commandData.filter(item => ["git status", "git add <file>", "git commit -m \"message\"", "git switch -c <branch>", "git pull --rebase", "git push -u origin <branch>", "git log --oneline --graph --all", "git restore --staged <file>", "git revert <commit>"].includes(item.command));
  copyText(starter.map(item => `${item.command}\n# ${item.description}`).join("\n\n"), "Starter cheat sheet copied");
});

$("#heroCommandCount").textContent = `${commandData.length}`;
renderCommands();

// Git playground
let labIndex = 0;
function renderLabButtons() {
  $("#labActions").innerHTML = labSteps.map((step, index) => `<button class="lab-command-button ${index === labIndex ? "is-next" : ""} ${index < labIndex ? "is-done" : ""}" type="button" data-step="${index}" ${index !== labIndex ? "disabled" : ""}>${escapeHTML(step.command)}</button>`).join("");
  $$('.lab-command-button', $("#labActions")).forEach(button => button.addEventListener("click", () => runLabStep(Number(button.dataset.step))));
}

function updateTreeState(id, text, stateClass) {
  const element = $(id);
  $("small", element).textContent = text;
  element.classList.remove("is-active", "is-changed");
  if (stateClass) element.classList.add(`is-${stateClass}`);
}

function renderLabGraph(mode) {
  const nodes = [];
  const lines = [];
  if (["first", "branch", "feature", "back-main", "merge"].includes(mode)) {
    nodes.push({ x: 22, y: 56, label: "first commit", id: "a1b2c3d", type: "main", branch: mode === "first" ? "main • HEAD" : (mode === "back-main" ? "main • HEAD" : "main") });
  }
  if (["feature", "back-main", "merge"].includes(mode)) {
    lines.push('<path class="graph-feature-line" d="M106 151 C175 151 195 90 266 90"></path>');
    nodes.push({ x: 56, y: 34, label: "build navbar", id: "d4e5f6a", type: "feature", branch: mode === "feature" ? "feature/navbar • HEAD" : (mode === "merge" ? "main • feature/navbar • HEAD" : "feature/navbar") });
  }
  if (nodes.length > 1 && mode === "merge") nodes[1].type = "merge";
  $("#labGraphLines").innerHTML = lines.join("");
  $("#labGraphNodes").innerHTML = nodes.map(node => `<div class="graph-node graph-node--${node.type}" style="left:${node.x}%;top:${node.y}%"><span class="graph-node__branch">${node.branch}</span><span class="graph-node__dot"></span><span class="graph-node__label">${node.label}<small>${node.id}</small></span></div>`).join("");
  $("#graphEmpty").hidden = nodes.length > 0;
}

function runLabStep(index) {
  if (index !== labIndex) return;
  const step = labSteps[index];
  const output = $("#labOutput");
  output.insertAdjacentHTML("beforeend", `<p class="lab-command"><span>$</span> ${escapeHTML(step.command)}</p>${step.output.map((line, lineIndex) => `<p class="${lineIndex ? "lab-info" : "lab-success"}">${escapeHTML(line)}</p>`).join("")}`);
  output.scrollTop = output.scrollHeight;
  $("#repoState").innerHTML = `<i></i> ${step.repo}`;
  $("#repoState").classList.add("is-ready");
  $("#headState").textContent = step.head;
  updateTreeState("#workingState", step.working, step.states[0]);
  updateTreeState("#stagingState", step.staging, step.states[1]);
  updateTreeState("#historyState", step.history, step.states[2]);
  $("#labExplainer").innerHTML = `<span>What just happened?</span><p>${escapeHTML(step.explainer)}</p>`;
  if (step.graph) renderLabGraph(step.graph);
  labIndex += 1;
  $("#labStep").textContent = labIndex >= labSteps.length ? "Lab complete ✓" : `Step ${labIndex + 1} of ${labSteps.length}`;
  $("#labSuggestion").textContent = labIndex >= labSteps.length ? "Nice work — branch merged!" : labSteps[labIndex].command;
  renderLabButtons();
  if (labIndex >= labSteps.length) showToast("Playground complete — great work!");
}

function resetLab() {
  labIndex = 0;
  $("#labOutput").innerHTML = '<p class="lab-welcome"># Your project folder is ready. Initialize Git to begin.</p>';
  $("#repoState").innerHTML = "<i></i> Not initialized";
  $("#repoState").classList.remove("is-ready");
  $("#headState").textContent = "HEAD → —";
  updateTreeState("#workingState", "Clean", "");
  updateTreeState("#stagingState", "Empty", "");
  updateTreeState("#historyState", "No commits", "");
  $("#labStep").textContent = `Step 1 of ${labSteps.length}`;
  $("#labSuggestion").textContent = labSteps[0].command;
  $("#labExplainer").innerHTML = '<span>What just happened?</span><p>Git has not started tracking this folder yet. <code>git init</code> creates a hidden <code>.git</code> database for its history.</p>';
  renderLabGraph();
  renderLabButtons();
}
$("#resetLab").addEventListener("click", resetLab);
resetLab();

// Rescue center
let activeFixId = fixData[0].id;
function renderFixDetail(item) {
  const codeHtml = escapeHTML(item.code).replace(/^#(.*)$/gm, '<span class="comment">#$1</span>').replace(/^(git .*)$/gm, '<span class="cmd">$1</span>');
  $("#fixDetail").innerHTML = `<div class="fix-detail__meta"><span class="severity severity--${item.severity}">${item.severity === "safe" ? "Safe approach" : "Use with care"}</span><span>• ${item.subtitle}</span></div>
    <h3>${item.title}</h3><p class="fix-detail__summary">${item.summary}</p>
    <h4>What you might see</h4><div class="error-box">${escapeHTML(item.error).replace(/\n/g, "<br>")}</div>
    <h4>Safe recovery steps</h4><div class="solution-code">${codeHtml}<button class="copy-button" type="button" aria-label="Copy recovery commands">${icons.copy}</button></div>
    <div class="fix-detail__why"><strong>Why this works:</strong> ${item.why}</div>
    ${item.warning ? `<div class="danger-note">${icons.warning}<span>${item.warning}</span></div>` : ""}`;
  $(".solution-code .copy-button", $("#fixDetail")).addEventListener("click", () => copyText(item.code.replace(/^#.*$/gm, "").replace(/\n{2,}/g, "\n").trim(), "Recovery steps copied"));
}

function renderFixes() {
  const query = $("#fixSearch").value.trim().toLowerCase();
  const filtered = fixData.filter(item => `${item.title} ${item.subtitle} ${item.error} ${item.keywords}`.toLowerCase().includes(query));
  if (!filtered.some(item => item.id === activeFixId)) activeFixId = filtered[0]?.id;
  $("#fixList").innerHTML = filtered.map(item => `<button class="fix-tab ${item.id === activeFixId ? "is-active" : ""}" style="--fix-color:${item.color}" type="button" role="tab" aria-selected="${item.id === activeFixId}" data-fix="${item.id}"><span class="fix-tab__icon">${item.icon}</span><span class="fix-tab__text"><strong>${item.title}</strong><small>${item.subtitle}</small></span>${icons.chevron}</button>`).join("");
  $("#fixEmpty").hidden = filtered.length > 0;
  $(".fix-layout").hidden = filtered.length === 0;
  $$('.fix-tab').forEach(button => button.addEventListener("click", () => {
    activeFixId = button.dataset.fix;
    renderFixes();
  }));
  const active = fixData.find(item => item.id === activeFixId);
  if (active) renderFixDetail(active);
}
$("#fixSearch").addEventListener("input", renderFixes);
$("#heroFixCount").textContent = fixData.length;
renderFixes();

// Quiz
let quizIndex = 0;
let quizScore = 0;
let answered = false;
const bestScore = Number(localStorage.getItem("gitquest-best-score"));
$("#bestScore").textContent = bestScore ? `${bestScore}/5` : "—";

function renderQuiz() {
  const item = quizData[quizIndex];
  answered = false;
  $("#quizCounter").textContent = `Question ${quizIndex + 1} of ${quizData.length}`;
  $("#quizTopic").textContent = item.topic;
  $("#quizProgress").style.width = `${((quizIndex + 1) / quizData.length) * 100}%`;
  $("#quizQuestion").textContent = item.question;
  $("#quizOptions").innerHTML = item.options.map((option, index) => `<button class="quiz-option" type="button" data-answer="${index}"><span class="quiz-option__letter">${String.fromCharCode(65 + index)}</span><span>${option}</span></button>`).join("");
  $("#quizFeedback").hidden = true;
  $("#quizNext").disabled = true;
  $("#quizNext").innerHTML = quizIndex === quizData.length - 1 ? "See my score <span>→</span>" : "Next question <span>→</span>";
  $$('.quiz-option').forEach(button => button.addEventListener("click", () => answerQuiz(Number(button.dataset.answer))));
}

function answerQuiz(selected) {
  if (answered) return;
  answered = true;
  const item = quizData[quizIndex];
  const correct = selected === item.answer;
  if (correct) quizScore += 1;
  $$('.quiz-option').forEach((button, index) => {
    button.disabled = true;
    if (index === item.answer) button.classList.add("is-correct");
    if (index === selected && !correct) button.classList.add("is-wrong");
  });
  const feedback = $("#quizFeedback");
  feedback.style.setProperty("--feedback-color", correct ? "var(--green)" : "var(--orange)");
  feedback.innerHTML = `<strong>${correct ? "Correct." : "Not quite."}</strong> ${item.explanation}`;
  feedback.hidden = false;
  $("#quizLiveScore").textContent = `Score: ${quizScore}`;
  $("#quizNext").disabled = false;
}

function showQuizResult() {
  const percentage = quizScore * 20;
  const messages = quizScore === 5 ? ["Perfect merge!", "You made every call with confidence."] : quizScore >= 3 ? ["Solid foundation", "You are ready to practise these workflows in a real repository."] : ["Good first commit", "Review the command center and rescue recipes, then try again."];
  const previousBest = Number(localStorage.getItem("gitquest-best-score")) || 0;
  if (quizScore > previousBest) localStorage.setItem("gitquest-best-score", String(quizScore));
  $("#bestScore").textContent = `${Math.max(quizScore, previousBest)}/5`;
  $("#quizCard").innerHTML = `<div class="quiz-result"><div class="quiz-result__ring" style="--score:${percentage}%"><strong>${quizScore}/5</strong></div><h3>${messages[0]}</h3><p>${messages[1]}</p><button class="button button--primary" id="quizRestart" type="button">Try the quiz again ↻</button></div>`;
  $("#quizRestart").addEventListener("click", restartQuiz);
}

$("#quizNext").addEventListener("click", () => {
  if (!answered) return;
  if (quizIndex === quizData.length - 1) showQuizResult();
  else { quizIndex += 1; renderQuiz(); }
});

function restartQuiz() {
  quizIndex = 0;
  quizScore = 0;
  $("#quizCard").innerHTML = `<div class="quiz-card__top"><span id="quizCounter"></span><span id="quizTopic"></span></div><div class="quiz-progress"><span id="quizProgress"></span></div><h3 id="quizQuestion"></h3><div class="quiz-options" id="quizOptions"></div><div class="quiz-feedback" id="quizFeedback" hidden></div><div class="quiz-card__footer"><span id="quizLiveScore">Score: 0</span><button class="button button--primary" id="quizNext" type="button" disabled>Next question <span>→</span></button></div>`;
  $("#quizNext").addEventListener("click", () => {
    if (!answered) return;
    if (quizIndex === quizData.length - 1) showQuizResult();
    else { quizIndex += 1; renderQuiz(); }
  });
  renderQuiz();
}
renderQuiz();
