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
  { category: "basics", command: "git status --short", description: "Show a compact two-column code for staged and working-tree state.", example: "git status --short", keywords: "check concise porcelain modified untracked status codes" },
  { category: "basics", command: "git add <file>", description: "Add a file's current changes to the staging area for the next commit.", example: "git add index.html", keywords: "stage prepare track file" },
  { category: "basics", command: "git add .", description: "Stage all changes under the current folder for the next commit.", example: "git add .\ngit status", keywords: "stage all changes prepare", warning: "Review git status or git diff --staged before committing." },
  { category: "basics", command: "git add -p", description: "Review and stage one change hunk at a time for a focused commit.", example: "git add -p", keywords: "stage partial patch hunk selective review" },
  { category: "basics", command: "git commit -m \"message\"", description: "Save a staged snapshot with a short explanation of why it changed.", example: "git commit -m \"Add responsive navigation\"", keywords: "save snapshot history message" },
  { category: "basics", command: "git clone <url>", description: "Download a repository, its branches, and its full history.", example: "git clone https://github.com/user/project.git", keywords: "download copy github repository remote" },
  { category: "basics", command: "git mv <old> <new>", description: "Move or rename a tracked path and stage the resulting change.", example: "git mv old-name.js new-name.js", keywords: "rename move file stage" },
  { category: "basics", command: "git rm <file>", description: "Remove a tracked file from the working tree and stage its deletion.", example: "git rm unused.js", keywords: "delete remove tracked file stage", warning: "This also deletes the working copy. Use --cached when the local file should remain." },
  { category: "basics", command: "git rm --cached <file>", description: "Stop tracking a file but keep the local copy on your machine.", example: "git rm --cached .env", keywords: "untrack keep file gitignore secret cached", warning: "If the file contained a real secret, rotate the secret; removing it does not erase old commits." },
  { category: "basics", command: "git check-ignore -v <file>", description: "Find the exact .gitignore rule that is ignoring a file.", example: "git check-ignore -v .env", keywords: "gitignore ignored file diagnose rule" },
  { category: "branches", command: "git branch", description: "List local branches and show which one is currently checked out.", example: "git branch --all", keywords: "list branches current" },
  { category: "branches", command: "git branch -vv", description: "List local branches with their latest commit and tracked upstream status.", example: "git branch -vv", keywords: "list branches upstream tracking ahead behind remote" },
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
  { category: "remote", command: "git remote show origin", description: "Inspect a remote's branches, tracking configuration, and push/pull status.", example: "git remote show origin", keywords: "github origin inspect upstream tracking remote" },
  { category: "remote", command: "git remote add origin <url>", description: "Connect your local repository to a remote named origin.", example: "git remote add origin https://github.com/user/project.git", keywords: "connect github origin url" },
  { category: "remote", command: "git remote set-url origin <url>", description: "Correct or replace the URL of an existing origin remote.", example: "git remote set-url origin https://github.com/user/project.git", keywords: "change fix remote origin already exists url" },
  { category: "remote", command: "git fetch origin", description: "Download remote history without changing your working files.", example: "git fetch origin\ngit log main..origin/main", keywords: "download update safe remote history" },
  { category: "remote", command: "git fetch --prune", description: "Fetch updates and remove stale remote-tracking branch names.", example: "git fetch origin --prune", keywords: "remote deleted branch cleanup update" },
  { category: "remote", command: "git pull --ff-only", description: "Update only when Git can fast-forward, refusing an unexpected merge.", example: "git pull --ff-only origin main", keywords: "safe update sync remote beginner fast forward" },
  { category: "remote", command: "git pull --rebase", description: "Fetch remote commits, then replay your local commits on top.", example: "git pull --rebase origin main", keywords: "download update sync remote rejected" },
  { category: "remote", command: "git push -u origin <branch>", description: "Publish a branch and remember its upstream for future pushes.", example: "git push -u origin feature/navbar", keywords: "upload publish github upstream" },
  { category: "remote", command: "git push", description: "Upload new local commits to the tracked remote branch.", example: "git push", keywords: "upload publish sync github" },
  { category: "remote", command: "git push origin --delete <branch>", description: "Delete a branch on the remote after its work has been merged or abandoned.", example: "git push origin --delete feature/navbar", keywords: "delete remote branch cleanup github", warning: "Confirm the branch is merged and no teammate still needs it." },
  { category: "remote", command: "git push origin <tag>", description: "Publish one local release tag to the remote repository.", example: "git push origin v1.0.0", keywords: "release tag publish github remote" },
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
  { category: "inspect", command: "git log -S <text> -p", description: "Search history for commits that changed how often a string appears.", example: "git log -S \"calculateTotal\" -p", keywords: "history search code string pickaxe debug" },
  { category: "undo", command: "git restore <file>", description: "Discard unstaged changes so a file matches its staged version (or HEAD when it is not staged).", example: "git restore -- index.html", keywords: "undo discard unstaged working file changes index", warning: "This permanently discards that file's unstaged changes." },
  { category: "undo", command: "git restore --staged <file>", description: "Remove a file from staging while keeping your working changes.", example: "git restore --staged secrets.env", keywords: "unstage undo add keep changes", warning: "Before the first commit, use git rm --cached -- <file> because HEAD does not exist yet." },
  { category: "undo", command: "git commit --amend", description: "Replace the latest local commit with updated content or message.", example: "git add forgotten-file.js\ngit commit --amend --no-edit", keywords: "fix last commit message add forgotten", warning: "Avoid amending a commit that teammates already pulled." },
  { category: "undo", command: "git revert <commit>", description: "Create a new commit that safely reverses an earlier commit.", example: "git revert a1b2c3d", keywords: "undo public shared safe commit reverse" },
  { category: "undo", command: "git reset --soft HEAD~1", description: "Remove the latest local commit but keep all its changes staged.", example: "git reset --soft HEAD~1", keywords: "undo local commit keep staged", warning: "Use only on local history that has not been shared." },
  { category: "undo", command: "git stash push -m <message>", description: "Temporarily shelve tracked changes so you can switch tasks cleanly.", example: "git stash push -u -m \"WIP navbar\"", keywords: "save temporary work switch include untracked" },
  { category: "undo", command: "git stash pop", description: "Reapply the newest stash and remove it from the stash list if successful.", example: "git stash list\ngit stash pop", keywords: "restore temporary work apply" },
  { category: "undo", command: "git stash list", description: "List saved work-in-progress entries without changing your files.", example: "git stash list", keywords: "inspect temporary saved work stash" },
  { category: "undo", command: "git stash show -p \"stash@{0}\"", description: "Review the full patch stored in a stash before applying it.", example: "git stash show -p \"stash@{0}\"", keywords: "inspect temporary saved work patch stash" },
  { category: "undo", command: "git stash apply \"stash@{0}\"", description: "Reapply a selected stash while keeping the stash entry as a backup.", example: "git stash apply \"stash@{0}\"", keywords: "restore temporary work safe keep stash" },
  { category: "undo", command: "git stash drop \"stash@{0}\"", description: "Delete one chosen stash entry after you verify its work is no longer needed.", example: "git stash drop \"stash@{0}\"", keywords: "delete cleanup temporary saved work stash", warning: "Inspect and apply the correct entry before dropping it; stashes are not permanent backups." },
  { category: "undo", command: "git reflog", description: "Find recent HEAD positions and rescue commits after resets or rebases.", example: "git reflog\ngit branch rescue a1b2c3d", keywords: "recover lost commit history reset rescue" }
];

const categoryLabels = { basics: "Basics", branches: "Branches", remote: "Remote", inspect: "Inspect", undo: "Undo" };
const categoryColors = { basics: "var(--primary)", branches: "var(--purple)", remote: "var(--cyan)", inspect: "var(--green)", undo: "var(--orange)" };

const lessonData = {
  "mental-model": {
    number: "Chapter 01", duration: "8 min", title: "How Git actually thinks", lead: "Git is a snapshot database with a staging area—not a mysterious cloud and not just a folder backup. Once the four locations are clear, most commands become predictable.",
    objectives: ["modified, staged, committed", "working tree vs. index", "HEAD and branch pointers", "local vs. remote"], model: true,
    steps: [
      { title: "Edit in the working tree", text: "Your normal project files live here. Saved edits are modified but not yet part of Git history.", command: "git status" },
      { title: "Propose the next snapshot", text: "The index (staging area) holds the exact file versions you want in the next commit.", command: "git add <file>" },
      { title: "Record an immutable snapshot", text: "A commit stores the staged snapshot, author, time, message, and parent commit.", command: "git commit -m \"message\"" },
      { title: "Share selected history", text: "Push transfers commits and updates a branch on a remote; it does not upload random uncommitted edits.", command: "git push" }
    ],
    terminal: "$ git status\n> modified: app.js\n$ git add app.js\n$ git diff --staged\n> + console.log(\"ready\");\n$ git commit -m \"Add startup log\"\n> [main 4fd72ac] Add startup log",
    note: "Git commits are snapshots. Diff is how Git shows the useful line-level difference between two snapshots or states.",
    mission: "Open any practice folder, run git status, and identify which of Git's areas currently contains each change."
  },
  setup: {
    number: "Chapter 02", duration: "10 min", title: "Set up Git and create the right kind of repository", lead: "There are two clean starting paths: initialize an existing local project, or clone an existing remote project. Knowing which path you are on prevents unrelated histories.",
    objectives: ["verify installation", "configure commit identity", "init vs. clone", "make the first commit"],
    steps: [
      { title: "Verify Git", text: "Check that the command is installed before configuring anything.", command: "git --version" },
      { title: "Set commit identity", text: "These values become author metadata. Your user.name is not required to match your GitHub username.", command: "git config --global user.name \"Asha Rao\"" },
      { title: "Choose one starting path", text: "Use init for a local folder. Use clone when the repository already exists on GitHub.", command: "Local folder: git init\nExisting remote: git clone REPOSITORY_URL" },
      { title: "Inspect before committing", text: "Status tells you what Git sees; the first commit gives your branch a real snapshot.", command: "git status" }
    ],
    terminal: "$ git --version\n> git version 2.x.x\n$ git config --global user.name \"Asha Rao\"\n$ git config --global user.email \"asha@example.com\"\n$ git config --global init.defaultBranch main\n# Existing local project\n$ git init\n$ git add README.md\n$ git commit -m \"Initial commit\"",
    note: "Commit identity and GitHub authentication are different. Configuring user.email does not sign you in to GitHub.",
    mission: "Create a practice folder, initialize it, add a README, and confirm that git log shows your first commit."
  },
  daily: {
    number: "Chapter 03", duration: "12 min", title: "Build a deliberate daily commit loop", lead: "Strong Git habits are a review loop: inspect, select, verify, then commit. Small focused commits are easier to review, merge, revert, and understand later.",
    objectives: ["read short status", "review unstaged edits", "stage selectively", "verify the staged snapshot"],
    steps: [
      { title: "Inspect the state", text: "Use short status for a quick map: the left column is staged and the right column is working-tree state.", command: "git status --short" },
      { title: "Review before staging", text: "See exact unstaged lines, then use patch mode when one file contains unrelated edits.", command: "git diff\ngit add -p" },
      { title: "Verify the proposal", text: "The staged diff is the best preview of exactly what the next commit will contain.", command: "git diff --staged" },
      { title: "Commit one idea", text: "Describe why the change exists, then check the graph to confirm where it landed.", command: "git commit -m \"Add form validation\"" }
    ],
    terminal: "$ git status --short\n>  M src/form.js\n> ?? form.test.js\n$ git diff\n$ git add -p src/form.js\n$ git add form.test.js\n$ git diff --staged\n$ git commit -m \"Validate signup form\"\n> [feature/signup 12ab91f] Validate signup form\n$ git log --oneline --graph -5",
    note: "git add . is convenient, but it can stage generated files, secrets, and unrelated edits. Always review status and the staged diff.",
    mission: "Make two unrelated edits, then use git add -p so only one idea enters your next commit."
  },
  ignore: {
    number: "Chapter 04", duration: "9 min", title: "Ignore generated files and protect secrets", lead: ".gitignore keeps untracked noise out of commits. It is a selection rule, not a security system and not a way to erase files that Git already tracks.",
    objectives: ["write ignore patterns", "test matching rules", "untrack safely", "respond to leaked secrets"],
    steps: [
      { title: "Create project rules", text: "Ignore dependencies, build output, local environment files, logs, and editor state.", command: "node_modules/  .env  dist/  *.log" },
      { title: "Understand patterns", text: "A trailing slash targets directories, * matches within one path level, ** crosses directories, and ! re-includes.", command: "*.log  !important.log" },
      { title: "Diagnose an ignored file", text: "Ask Git which file and line supplied the matching ignore rule.", command: "git check-ignore -v .env" },
      { title: "Stop tracking, keep locally", text: "Adding a tracked file to .gitignore is not enough; remove only its index entry, then commit.", command: "git rm --cached .env" }
    ],
    terminal: "# .gitignore\n> node_modules/\n> .env\n> .env.*\n> !.env.example\n> dist/\n> coverage/\n> *.log\n$ git check-ignore -v .env\n> .gitignore:2:.env .env\n$ git rm --cached .env",
    note: "If a real password, token, or private key was committed, rotate or revoke it immediately. Removing the file in a later commit does not remove it from earlier history.",
    mission: "Add a .gitignore, include .env.example, and use git check-ignore -v to prove that .env is ignored."
  },
  branches: {
    number: "Chapter 05", duration: "14 min", title: "Use branches as movable pointers", lead: "A branch is just a name pointing at a commit. HEAD tells Git which branch you are on; committing moves that branch pointer forward.",
    objectives: ["create and switch", "read a commit graph", "fast-forward vs. merge", "resolve conflicts"],
    steps: [
      { title: "Start from updated main", text: "Branch from the commit that should be the base of your work.", command: "git switch main" },
      { title: "Create focused work", text: "The new branch initially points to the same commit; HEAD moves to the new branch.", command: "git switch -c feature/profile" },
      { title: "Integrate intentionally", text: "Switch to the receiving branch, inspect the graph, then merge the finished feature.", command: "git switch main\ngit merge feature/profile" },
      { title: "Resolve human decisions", text: "For conflicts, edit markers, test the result, stage resolved files, and finish the operation.", command: "git add -- resolved-file\ngit commit" }
    ],
    terminal: "$ git switch -c feature/profile\n> Switched to a new branch 'feature/profile'\n$ git add .\n$ git commit -m \"Add profile card\"\n$ git switch main\n$ git merge feature/profile\n> Fast-forward\n$ git branch -d feature/profile",
    note: "Rebase rewrites commit IDs. It is excellent for cleaning your own unpublished branch, but avoid rebasing shared commits other people already use.",
    mission: "Create a feature branch, make one commit, merge it into main, and draw where HEAD and both branch names point."
  },
  remotes: {
    number: "Chapter 06", duration: "13 min", title: "Know what fetch, pull, and push really move", lead: "Remote-tracking names such as origin/main are your last fetched knowledge of another repository. Fetch updates that knowledge; it does not edit your working files.",
    objectives: ["origin and upstream", "remote-tracking branches", "fetch vs. pull", "safe publish flow"],
    steps: [
      { title: "Inspect connections", text: "A remote is a named set of URLs. origin is conventional, not magical.", command: "git remote -v" },
      { title: "Update your remote view", text: "Fetch downloads commits and moves origin/* references without merging your current branch.", command: "git fetch origin --prune" },
      { title: "Compare before integrating", text: "Review changes introduced upstream since the branches diverged before choosing merge, rebase, or a fast-forward-only pull.", command: "git diff HEAD...origin/main" },
      { title: "Publish and track", text: "The -u option connects your local branch to its remote counterpart; later plain push/pull can use it.", command: "git push -u origin feature/profile" }
    ],
    terminal: "$ git fetch origin --prune\n$ git branch -vv\n> * main a81bd20 [origin/main: behind 2]\n$ git log HEAD..origin/main --oneline\n$ git diff --stat HEAD...origin/main\n$ git pull --ff-only\n> Updating a81bd20..7c03e99\n> Fast-forward",
    note: "git pull is fetch plus integration. Use git fetch when you want to inspect first, and --ff-only when you want Git to refuse an unexpected merge commit.",
    mission: "Fetch a repository, compare HEAD with its upstream, and explain what will change before running pull."
  },
  auth: {
    number: "Chapter 07", duration: "11 min", title: "Authenticate to GitHub without exposing credentials", lead: "GitHub must verify who may read or write a repository. HTTPS credential helpers, SSH keys, and GitHub CLI are safe routes; your account password is not used for Git over HTTPS.",
    objectives: ["identity vs. authentication", "HTTPS credential flow", "SSH public keys", "verify the active account"],
    steps: [
      { title: "Choose an HTTPS flow", text: "Git Credential Manager or GitHub CLI can open a browser sign-in and store credentials securely.", command: "gh auth login" },
      { title: "Or create an SSH key pair", text: "Keep the private key on your computer and add only the .pub content to GitHub.", command: "ssh-keygen -t ed25519 -C \"you@example.com\"" },
      { title: "Test the account", text: "The SSH test identifies the GitHub account accepted by your current key configuration.", command: "ssh -T git@github.com" },
      { title: "Check the repository URL", text: "HTTPS and SSH URLs use different authentication paths; confirm which one origin uses.", command: "git remote -v" }
    ],
    terminal: "$ gh auth login\n> Where do you use GitHub? GitHub.com\n> Preferred protocol: HTTPS\n$ gh auth status\n> Logged in to github.com\n# SSH alternative\n$ ssh -T git@github.com\n> Hi username! You've successfully authenticated.",
    note: "Never commit a token, account password, .env file, or private SSH key. If one leaks, revoke it first—then clean history if necessary.",
    mission: "Run gh auth status or ssh -T git@github.com and confirm which account is being used before your next push."
  },
  collaboration: {
    number: "Chapter 08", duration: "15 min", title: "Turn branches into a team conversation", lead: "GitHub adds planning, review, automation, and access rules around Git history. A pull request is a proposal and discussion—not the same operation as git pull.",
    objectives: ["issues and closing keywords", "pull request lifecycle", "reviews and checks", "fork and upstream workflow"],
    steps: [
      { title: "Make the repository welcoming", text: "README explains the project; CONTRIBUTING sets expectations; LICENSE defines use; CODEOWNERS requests reviewers.", command: "README.md  CONTRIBUTING.md  LICENSE" },
      { title: "Connect work to an issue", text: "Use labels, assignees, milestones, and a focused issue. 'Closes #42' in the PR links and closes it when merged.", command: "gh issue create" },
      { title: "Open a reviewable PR", text: "Push a focused branch, explain why it exists, add screenshots/tests, and request review.", command: "gh pr create --fill" },
      { title: "Pass checks and merge", text: "Resolve conversations and required checks; choose merge, squash, or rebase based on team history policy.", command: "gh pr checks\ngh pr merge" }
    ],
    terminal: "$ git switch -c feature/quiz\n$ git push -u origin feature/quiz\n$ gh pr create --fill\n> Creating pull request for feature/quiz into main\n$ gh pr checks\n> test  pass\n> lint  pass\n$ gh pr view --web\n# After merge\n$ git switch main\n$ git pull --ff-only",
    note: "In a fork workflow, origin normally means your fork and upstream means the original project. Fetch upstream before updating your fork's main branch.",
    mission: "Draft a pull request description with purpose, testing steps, screenshots if relevant, and a closing keyword for its issue."
  }
};

const diffRecipeData = [
  { category: "worktree", tag: "unstaged", title: "See edits before git add", description: "Compare the working tree with the staging area. Staged changes are not shown here.", command: "git diff" },
  { category: "worktree", tag: "staged", title: "Preview the next commit", description: "Compare staged content with HEAD. --cached is a synonym for --staged.", command: "git diff --staged" },
  { category: "worktree", tag: "all tracked", title: "See staged and unstaged tracked changes", description: "Compare all tracked working-tree content with the last commit. Untracked files are not included.", command: "git diff HEAD" },
  { category: "worktree", tag: "one file", title: "Inspect one specific path", description: "The double dash clearly separates revisions and options from a file path.", command: "git diff -- src/app.js\ngit diff --staged -- src/app.js" },
  { category: "worktree", tag: "files", title: "List only changed file names", description: "Get a quick inventory without displaying the complete patch.", command: "git diff --name-only\ngit diff --staged --name-only" },
  { category: "worktree", tag: "summary", title: "Show a change-size summary", description: "Display each changed file plus approximate insertion and deletion counts.", command: "git diff --stat" },
  { category: "history", tag: "last commit", title: "Inspect the latest commit's change", description: "Compare the parent of HEAD with HEAD to see what the latest commit introduced.", command: "git diff HEAD~1 HEAD" },
  { category: "history", tag: "commits", title: "Compare any two commits", description: "Diff direction matters: the second revision is treated as the new side.", command: "git diff a1b2c3d d4e5f6a" },
  { category: "history", tag: "single commit", title: "Show one commit as a patch", description: "Inspect one commit's metadata and patch. Replace COMMIT_ID with a reviewed hash; this also works for a repository's first commit.", command: "git show COMMIT_ID" },
  { category: "branches", tag: "branch tips", title: "Compare two local branch tips", description: "See the endpoint difference between main and your local feature branch.", command: "git diff main feature/profile" },
  { category: "branches", tag: "PR view", title: "See changes introduced on a branch", description: "Three dots compare the merge base with the feature tip—similar to a pull request's change set.", command: "git diff main...feature/profile" },
  { category: "branches", tag: "direction", title: "Reverse the comparison direction", description: "Swapping revisions reverses which lines appear added and removed.", command: "git diff feature/profile main" },
  { category: "remote", tag: "incoming", title: "Review GitHub changes before pull", description: "Fetch, then show changes introduced upstream since its shared merge base with your current branch.", command: "git fetch\ngit diff HEAD...origin/main" },
  { category: "remote", tag: "upstream", title: "Compare with the tracked branch", description: "@{u} resolves to the upstream shown by git branch -vv, such as origin/main. Quotes keep it portable across common shells.", command: "git fetch\ngit diff HEAD \"@{u}\"" },
  { category: "remote", tag: "unpushed", title: "See local work not pushed yet", description: "Show changes introduced locally since the shared merge base with your configured upstream.", command: "git diff \"@{u}...HEAD\"" },
  { category: "remote", tag: "remote branches", title: "Compare two GitHub branches", description: "Fetch first so both origin/* names represent the latest server state you know about.", command: "git fetch origin\ngit diff origin/main origin/develop" },
  { category: "review", tag: "words", title: "Highlight word-level changes", description: "Useful for prose, documentation, and lines where a small token changed.", command: "git diff --word-diff" },
  { category: "review", tag: "quality", title: "Check whitespace errors", description: "Warn about conflict markers and whitespace mistakes introduced by your patch.", command: "git diff --check" },
  { category: "review", tag: "conflict", title: "List unresolved conflict files", description: "Filter the name list to paths Git still marks unmerged during a conflict.", command: "git diff --name-only --diff-filter=U" },
  { category: "review", tag: "no repo", title: "Compare two files outside Git", description: "--no-index makes Git's diff engine compare ordinary filesystem paths.", command: "git diff --no-index old.js new.js" }
];

const diffSamples = {
  javascript: {
    filename: "app.js",
    before: `function greet(name) {\n  return "Hello " + name;\n}\n\nconst user = "Maya";\nconsole.log(greet(user));\n`,
    after: `function greet(name, excited = false) {\n  const message = \`Hello, \${name}\`;\n  return excited ? message.toUpperCase() + "!" : message;\n}\n\nconst user = "Maya";\nconsole.log(greet(user, true));\n`
  },
  html: {
    filename: "index.html",
    before: `<header>\n  <h1>My Portfolio</h1>\n  <a href="/work">Work</a>\n</header>\n`,
    after: `<header class="site-header">\n  <a class="logo" href="/">Maya.dev</a>\n  <nav aria-label="Main navigation">\n    <a href="/work">Work</a>\n    <a href="/about">About</a>\n  </nav>\n</header>\n`
  },
  readme: {
    filename: "README.md",
    before: `# Weather App\n\nA small JavaScript weather project.\n\n## Run\nOpen index.html.\n`,
    after: `# Weather App\n\nA responsive weather dashboard built with JavaScript.\n\n## Features\n- City search\n- Five-day forecast\n- Saved locations\n\n## Run locally\nOpen index.html in a modern browser.\n`
  }
};

const fixData = [
  { id: "not-repository", icon: ".G", color: "var(--primary)", title: "Not a Git repository", subtitle: "Find or initialize the project", severity: "safe", error: "fatal: not a git repository (or any of the parent directories): .git", summary: "You are outside a repository, or this folder has not intentionally been initialized yet.", code: "# If the repository already exists, enter its folder\ncd path/to/project\ngit status\n\n# If this is a brand-new project instead\ngit init", why: "Git searches the current folder and its parents for a .git database. Changing folders or deliberately initializing provides one.", warning: "Do not run git init randomly inside a repository's subfolder; first confirm where your project root should be.", keywords: "fatal not a git repository dot git init folder directory" },
  { id: "identity-unknown", icon: "ID", color: "var(--cyan)", title: "Author identity unknown", subtitle: "Configure your commit author", severity: "safe", error: "Author identity unknown\nfatal: unable to auto-detect email address", summary: "Tell Git the human name and email it should record on new commits.", code: "git config --global user.name \"Your Name\"\ngit config --global user.email \"you@example.com\"\n\n# Verify where the values came from\ngit config --list --show-origin", why: "Every commit stores author metadata. These settings supply it; the name does not have to equal your GitHub username.", keywords: "author identity unknown email config unable auto detect" },
  { id: "refspec-main", icon: "RF", color: "var(--orange)", title: "src refspec main does not match any", subtitle: "Create the first commit or check the branch", severity: "careful", error: "error: src refspec main does not match any\nerror: failed to push some refs", summary: "Usually the repository has no commit yet, or you asked Git to push a branch name that does not exist locally.", code: "git status\ngit branch --show-current\ngit log -1 --oneline\n\n# If Git says there are no commits yet, stage intentionally\ngit add -- path/to/file\ngit diff --staged\ngit commit -m \"Initial commit\"\n\n# Publish the current branch without renaming it\ngit push -u origin HEAD\n\n# Or, only if your project requires the name main\ngit branch -M main\ngit push -u origin main", why: "A branch becomes pushable after its first commit. Pushing HEAD avoids guessing its name; renaming is a separate project decision.", warning: "The two publishing routes are alternatives. Review the staged diff before the first commit and do not run both routes blindly.", keywords: "src refspec main does not match any failed push first commit branch master" },
  { id: "origin-exists", icon: "OR", color: "var(--purple)", title: "Remote origin already exists", subtitle: "Inspect it, then correct the URL", severity: "safe", error: "error: remote origin already exists.", summary: "A remote named origin is already configured. Update it instead of adding a duplicate.", code: "git remote -v\n\n# If the displayed URL is wrong, replace REPOSITORY_URL\ngit remote set-url origin REPOSITORY_URL\ngit remote -v", why: "Remote names must be unique. set-url preserves the origin name while safely changing its destination.", keywords: "remote origin already exists add url set change" },
  { id: "ssh-denied", icon: "SSH", color: "var(--red)", title: "Permission denied (publickey)", subtitle: "Fix GitHub SSH authentication", severity: "careful", error: "git@github.com: Permission denied (publickey).\nfatal: Could not read from remote repository.", summary: "Confirm the remote uses SSH, test which GitHub account your key authenticates, and add the correct key if needed.", code: "git remote -v\nssh -T git@github.com\n\n# GitHub CLI can guide authentication\ngh auth login", why: "The repository URL asks for SSH authentication, but GitHub did not accept a key from your SSH agent.", warning: "Never paste a private SSH key, password, or access token into a remote URL or commit.", keywords: "permission denied publickey ssh github authentication could not read remote" },
  { id: "repo-not-found", icon: "404", color: "var(--red)", title: "Repository not found", subtitle: "Check URL and account access", severity: "safe", error: "remote: Repository not found.\nfatal: repository URL not found", summary: "The URL may be misspelled, renamed, private, or unavailable to your authenticated account.", code: "git remote -v\n# Correct a wrong URL if needed; replace REPOSITORY_URL\ngit remote set-url origin REPOSITORY_URL\n\n# Check GitHub CLI authentication\ngh auth status", why: "GitHub returns the same message for some missing repositories and repositories your current account cannot access.", keywords: "repository not found 404 remote private access auth url" },
  { id: "unfinished-operation", icon: "…", color: "var(--orange)", title: "A merge or rebase is still in progress", subtitle: "Continue it or abort it cleanly", severity: "careful", error: "fatal: It seems that there is already a rebase-merge directory", summary: "Git is waiting for you to finish or cancel an earlier history operation before starting another.", code: "git status\n\n# After resolving and staging conflicts\ngit rebase --continue\n# Or return to the state before it began\ngit rebase --abort\n\n# For an unfinished merge instead\ngit merge --abort", why: "Git stores operation state inside .git so it can safely continue or roll back the multi-step action.", warning: "Use git status to identify the active operation. Do not manually delete Git's state files while an operation is recoverable.", keywords: "already rebase merge in progress continue abort unfinished directory" },
  { id: "wrong-branch", icon: "BR", color: "var(--primary)", title: "I committed on the wrong branch", subtitle: "Move a local commit safely", severity: "careful", error: "The commit belongs on feature/login, not main.", summary: "First confirm the worktree is clean, preserve the commit on its intended branch, then move the original local branch back.", code: "git status\n# Continue only when the working tree is clean\ngit switch -c feature/login\ngit switch main\n\n# Move local main back; --keep aborts on unsafe overlap\ngit reset --keep HEAD~1\ngit switch feature/login", why: "The new feature branch preserves a pointer to the commit before main moves. --keep is more protective of uncommitted changes than --hard.", warning: "Do this only when the mistaken commit is local and not pushed. If it was shared, keep history intact and use git revert instead.", keywords: "wrong branch commit main reset keep" },
  { id: "undo-pushed", icon: "RV", color: "var(--green)", title: "I need to undo a pushed commit", subtitle: "Reverse shared history", severity: "safe", error: "A bad commit is already on the shared remote branch.", summary: "Add a new inverse commit. This preserves the history teammates may already have.", code: "git log --oneline\n# Replace BAD_COMMIT_ID with the reviewed ID\ngit show BAD_COMMIT_ID\ngit revert BAD_COMMIT_ID\ngit push", why: "Revert does not rewrite shared history; it records the correction transparently.", keywords: "undo pushed commit shared revert remote" },
  { id: "push-rejected", icon: "↑!", color: "var(--orange)", title: "Push rejected: non-fast-forward", subtitle: "Remote has newer commits", severity: "careful", error: "! [rejected] main -> main (non-fast-forward)", summary: "Fetch first, inspect how the histories differ, then integrate with the policy your repository uses.", code: "git status\ngit fetch origin\ngit log --oneline --graph --decorate --left-right HEAD...origin/main\ngit diff HEAD...origin/main\n\n# Choose one route according to your team policy\ngit rebase origin/main\n# Or merge instead of rebase\ngit merge origin/main\n\n# After resolving, testing, and reviewing\ngit push origin main", why: "The rejection protects remote commits that are not in your local branch. Fetching separates inspection from integration; merge preserves both histories, while rebase rewrites only your local commits onto the updated remote tip.", warning: "The merge and rebase lines are alternatives, not a script to run top-to-bottom. Confirm the branch name and repository policy; do not force-push over teammates' work.", keywords: "push rejected non fast forward fetch inspect divergence rebase merge remote newer" },
  { id: "merge-conflict", icon: "<>", color: "var(--red)", title: "I have a merge conflict", subtitle: "Resolve both versions", severity: "careful", error: "CONFLICT (content): Merge conflict in src/app.js\nAutomatic merge failed; fix conflicts and then commit.", summary: "Open each conflicted file, choose the correct content, delete conflict markers, then stage the resolution.", code: "git status\n# Edit the files and remove every conflict marker\ngit add -- src/app.js\n\n# If status says a merge is active\ngit merge --continue\n\n# Or, if status says a rebase is active\ngit rebase --continue", why: "Staging a resolved file tells Git that you reviewed and settled that conflict. Continue the operation that status names.", warning: "Run tests before completing the merge. Use git merge --abort to return to the pre-merge state.", keywords: "conflict merge markers both modified rebase continue" },
  { id: "unstage", icon: "−", color: "var(--cyan)", title: "I staged the wrong file", subtitle: "Keep the edits, undo git add", severity: "safe", error: "Changes to be committed:\n  modified: secrets.env", summary: "Remove the file from the staging area without touching its contents.", code: "# After at least one commit\ngit restore --staged secrets.env\n\n# Before the very first commit, use this instead\ngit rm --cached -- secrets.env\ngit status", why: "Both routes keep the working copy and change only the next-commit selection. The first-commit case has no HEAD for restore to use.", keywords: "unstage wrong file git add keep changes staged first commit unborn" },
  { id: "discard", icon: "↶", color: "var(--orange)", title: "Discard unstaged changes in one file", subtitle: "Match the staging area", severity: "careful", error: "modified: index.html\n# These unstaged edits are not needed.", summary: "Restore one tracked working file from the index. If the file is not staged, the index normally matches HEAD.", code: "git diff -- index.html\n# After reviewing the unstaged diff:\ngit restore -- index.html", why: "By default, restore copies from the index into the working tree and leaves other files alone.", warning: "The discarded unstaged edits cannot normally be recovered afterward. Staged content, if any, becomes the working version.", keywords: "discard undo unstaged file changes restore modified index" },
  { id: "amend-message", icon: "Aa", color: "var(--purple)", title: "Fix my last commit message", subtitle: "Amend unpublished history", severity: "careful", error: "commit 8fa2...\n    udpate navabr", summary: "Replace only the latest commit message without accidentally including other staged changes.", code: "git status\n# --only ignores staged content when no paths are named\ngit commit --amend --only -m \"Update navbar\"", why: "With --only and no path arguments, amend reuses the previous snapshot and changes just its metadata.", warning: "Amend changes the commit ID. Do not amend a commit teammates already pulled.", keywords: "fix typo last commit message amend staged index only" },
  { id: "forgot-file", icon: "+1", color: "var(--primary)", title: "I forgot a file in my last commit", subtitle: "Add it without another commit", severity: "careful", error: "The latest local commit is correct, but one file is missing.", summary: "Review that path's working content, stage it, review the staged version, then isolate the same path when amending.", code: "git status\ngit diff -- forgotten-file.js\ngit add -- forgotten-file.js\ngit diff --staged -- forgotten-file.js\ngit commit --amend --no-edit --only -- forgotten-file.js", why: "The two reviews confirm the working and staged content. The path-limited amend records that file while leaving unrelated staged changes out of the replacement commit.", warning: "Other staged changes remain staged, and amend changes the commit ID. Do this only before the commit is shared.", keywords: "forgot file last commit amend add no edit staged review only" },
  { id: "detached-head", icon: "HD", color: "var(--purple)", title: "I am in detached HEAD state", subtitle: "Keep work on a real branch", severity: "safe", error: "You are in 'detached HEAD' state.", summary: "If you made useful commits here, immediately create a branch pointing to them.", code: "git switch -c rescue/my-work\n# Your commits now have a branch name", why: "Detached HEAD is safe for looking around, but a branch keeps new commits easy to find.", keywords: "detached head checkout commit rescue branch" },
  { id: "lost-commit", icon: "?", color: "var(--green)", title: "A commit looks lost after reset", subtitle: "Find it with reflog", severity: "safe", error: "The branch moved and my recent commit disappeared from git log.", summary: "Use the local reference log to find the old commit ID, then create a rescue branch.", code: "git reflog\n# Replace COMMIT_ID after inspecting the reflog entry\ngit show COMMIT_ID\ngit branch rescue-work COMMIT_ID\ngit switch rescue-work", why: "Git usually retains unreachable objects for a while; reflog records where HEAD recently pointed.", keywords: "lost commit reset recover reflog rescue disappeared" },
  { id: "untracked-overwrite", icon: "UF", color: "var(--orange)", title: "Untracked files would be overwritten", subtitle: "Protect local files before switching", severity: "careful", error: "The following untracked working tree files would be overwritten by checkout", summary: "Stash the files reversibly, or deliberately commit only the paths that belong in history.", code: "git status --short\n# Option A: temporarily stash tracked and untracked files\ngit stash push -u -m \"WIP before switch\"\n\n# Option B: intentionally commit selected paths instead\ngit add -- path/to/file\ngit diff --staged\ngit commit -m \"Save local work\"", why: "The -u flag includes untracked files, which a normal stash omits. Path-specific staging avoids sweeping secrets or unrelated files into a commit.", warning: "The two routes are alternatives. Do not use git clean until you have reviewed exactly what it would delete with git clean -n.", keywords: "untracked files overwritten checkout switch stash include" },
  { id: "unrelated-histories", icon: "∞", color: "var(--red)", title: "Refusing to merge unrelated histories", subtitle: "Two repositories started separately", severity: "careful", error: "fatal: refusing to merge unrelated histories", summary: "Inspect both histories first. Combine them only after confirming that the repositories truly belong together.", code: "git remote -v\ngit fetch\ngit log --oneline --decorate --graph --all\n\n# Only after confirming the URL, histories, and remote branch\ngit merge --allow-unrelated-histories origin/main", why: "Git sees no common ancestor; the flag acknowledges that you intentionally want one combined history.", warning: "The merge can produce extensive conflicts. A wrong remote connection is often the real cause, so inspect before opting in.", keywords: "fatal refusing merge unrelated histories fetch remote inspect" }
];

// Recovery recipes often contain alternatives or human checkpoints. The copy
// control intentionally copies only non-destructive diagnostics, never every
// displayed line as one blindly runnable script.
const fixDiagnosticCommands = {
  "not-repository": "git status",
  "identity-unknown": "git config --list --show-origin",
  "refspec-main": "git status\ngit branch --show-current\ngit log -1 --oneline",
  "origin-exists": "git remote -v",
  "ssh-denied": "git remote -v\nssh -T git@github.com",
  "repo-not-found": "git remote -v\ngh auth status",
  "unfinished-operation": "git status",
  "wrong-branch": "git status\ngit log -1 --oneline --decorate",
  "undo-pushed": "git log --oneline --decorate -15",
  "push-rejected": "git status\ngit fetch\ngit log --oneline --decorate --graph --all -15",
  "merge-conflict": "git status",
  unstage: "git status",
  discard: "git diff -- index.html",
  "amend-message": "git status\ngit diff --staged",
  "forgot-file": "git status\ngit diff --staged",
  "detached-head": "git status\ngit log -1 --oneline --decorate",
  "lost-commit": "git reflog",
  "untracked-overwrite": "git status",
  "unrelated-histories": "git remote -v\ngit log --oneline --decorate --graph --all -20"
};

const curriculumData = {
  basics: {
    number: "01", label: "Basics", meta: "Beginner · 45 min", title: "Build the mental model before the muscle memory",
    lead: "Understand what Git stores, why the staging area exists, how HEAD and branches point into history, and how a folder becomes a repository.",
    prerequisites: "No Git experience required",
    outcomes: ["Explain working tree, index, repository, and HEAD", "Create a repository with an intentional default branch", "Stage selected content and verify the proposed snapshot", "Read status without guessing"],
    commands: ["git init -b main", "git status --short", "git add -- path", "git diff --staged", "git commit -m \"message\""],
    practice: "Initialize the simulator, edit a file, stage it, inspect the staged diff, and make the first commit.",
    mistake: "A commit does not save every current file. It records the exact snapshot in the index.",
    target: "#playground", targetLabel: "Start the first simulator mission", lesson: "mental-model", next: "branching"
  },
  branching: {
    number: "02", label: "Branching", meta: "Core skill · 60 min", title: "Treat branches as movable pointers, not copied folders",
    lead: "Create isolated work, understand where HEAD points, predict fast-forward and three-way merges, and know when rebase rewrites commit identities.",
    prerequisites: "Basics and one clean commit",
    outcomes: ["Draw HEAD, branch, and commit relationships", "Create and switch branches safely", "Predict fast-forward versus merge commits", "Choose merge or rebase based on collaboration state"],
    commands: ["git switch -c feature/name", "git branch -vv", "git merge feature/name", "git rebase main", "git log --graph --oneline --all"],
    practice: "Create a feature branch in the simulator, commit an edit, return to main, and merge while explaining every pointer move.",
    mistake: "Switching branches does not create file edits. It checks out the snapshot at another commit.",
    target: "#playground", targetLabel: "Practise the branch mission", lesson: "branches", next: "remote"
  },
  remote: {
    number: "03", label: "Remote", meta: "GitHub · 45 min", title: "Separate local history from hosted collaboration",
    lead: "Learn what origin and upstream really are, how remote-tracking names work, and why commit identity is separate from GitHub authentication.",
    prerequisites: "Basics and branches",
    outcomes: ["Explain local, remote-tracking, and server branches", "Connect and inspect remotes", "Choose HTTPS, SSH, or GitHub CLI authentication", "Work with forks using origin and upstream"],
    commands: ["git remote -v", "git remote show origin", "git fetch", "git branch -vv", "gh auth status"],
    practice: "Connect a simulated origin, publish the current branch, and inspect its upstream relationship.",
    mistake: "origin is a conventional remote name, not GitHub itself and not a magical branch.",
    target: "#academy", targetLabel: "Open remotes and authentication lessons", lesson: "remotes", next: "diff"
  },
  diff: {
    number: "04", label: "Diff", meta: "Inspection · 55 min", title: "Read the evidence before changing repository state",
    lead: "Compare the working tree, index, commits, branches, and upstream history. Learn patch anatomy so code review starts before git add.",
    prerequisites: "The three Git areas",
    outcomes: ["Choose the correct pair of states to compare", "Read hunk headers, additions, deletions, and context", "Review staged content before committing", "Inspect incoming and unpushed work after divergence"],
    commands: ["git diff", "git diff --staged", "git diff HEAD", "git diff main...feature", "git show COMMIT_ID"],
    practice: "Edit both sides of the Diff Studio, switch views, ignore whitespace, and explain the generated patch.",
    mistake: "Plain git diff does not show staged changes; it compares the working tree with the index.",
    target: "#diff", targetLabel: "Open the interactive Diff Studio", next: "sync"
  },
  sync: {
    number: "05", label: "Sync", meta: "Collaboration · 60 min", title: "Fetch first, inspect divergence, then choose integration",
    lead: "Understand ahead and behind states, rejected pushes, tracking branches, and the tradeoffs among fast-forward-only pull, merge, and rebase.",
    prerequisites: "Remote, branching, and diff",
    outcomes: ["Explain fetch versus pull", "Inspect incoming and unpushed commits", "Recover from a non-fast-forward rejection", "Choose a team-approved integration policy"],
    commands: ["git fetch --prune", "git log HEAD..\"@{u}\"", "git diff \"HEAD...@{u}\"", "git pull --ff-only", "git pull --rebase"],
    practice: "Diagnose a diverged branch from status, graph, and diff before selecting merge, rebase, or a fast-forward-only update.",
    mistake: "git pull --rebase is a policy choice, not a universally safest command for every repository.",
    target: "#fixes", targetLabel: "Practise a rejected-push diagnosis", lesson: "remotes", next: "conflicts"
  },
  conflicts: {
    number: "06", label: "Conflicts", meta: "Recovery · 90 min", title: "Use one repeatable method across every conflict class",
    lead: "Identify the active operation, inspect base/ours/theirs, resolve product intent, test the result, stage paths, continue correctly, and verify history.",
    prerequisites: "Branching, diff, and sync",
    outcomes: ["Recognize content and structural conflicts", "Explain ours and theirs in merge and rebase contexts", "Resolve without blindly choosing a side", "Continue or abort the correct Git operation"],
    commands: ["git status", "git diff --cc", "git ls-files -u", "git add -- resolved-file", "git merge --continue"],
    practice: "Complete same-line, add/add, modify/delete, rebase, stash-pop, and rename/delete scenarios in the Conflict Arena.",
    mistake: "Removing marker lines is not enough. A resolution is complete only when the intended behavior is tested and verified.",
    target: "#conflicts", targetLabel: "Enter the Conflict Arena", lesson: "branches", next: "pull-request"
  },
  "pull-request": {
    number: "07", label: "Pull Request", meta: "GitHub · 55 min", title: "Turn a branch into a reviewable engineering decision",
    lead: "Create focused branches and commits, explain why the change exists, connect issues, respond to review, pass checks, and choose an intentional merge strategy.",
    prerequisites: "Remote, sync, and workflow basics",
    outcomes: ["Prepare a focused pull request", "Distinguish git pull from a pull request", "Respond to requested changes without losing context", "Understand merge, squash, and rebase merge policies"],
    commands: ["gh issue create", "gh pr create --fill", "gh pr checks", "gh pr view --web", "gh pr merge"],
    practice: "Walk through issue, branch, commit, push, review, checks, and merge as one traceable workflow.",
    mistake: "A pull request is a collaboration object on the hosting platform; it is not the git pull command.",
    target: "#workflow", targetLabel: "Study the pull-request workflow", lesson: "collaboration", next: "undo"
  },
  undo: {
    number: "08", label: "Undo", meta: "Recovery · 75 min", title: "Choose recovery by state and by whether history is shared",
    lead: "Compare restore, reset, revert, amend, stash, and reflog. Protect uncommitted work and avoid rewriting commits teammates already use.",
    prerequisites: "Basics, diff, and branching",
    outcomes: ["Select restore, reset, or revert correctly", "Recover commits with reflog", "Move a local commit to the correct branch", "Undo shared history without rewriting it"],
    commands: ["git restore --staged path", "git restore -- path", "git revert COMMIT_ID", "git reset --soft HEAD~1", "git reflog"],
    practice: "Use the Rescue Center to diagnose a lost commit, wrong branch, unwanted staged file, and already-pushed mistake.",
    mistake: "A backup branch protects commits. It does not protect unstaged or untracked files.",
    target: "#fixes", targetLabel: "Open recovery drills", next: "workflow"
  },
  workflow: {
    number: "09", label: "Workflow", meta: "Senior habits · 90 min", title: "Build history other developers can trust",
    lead: "Combine small commits, intentional branches, pre-commit review, sync policies, pull requests, CI checks, release tags, and safe recovery into one repeatable team workflow.",
    prerequisites: "All core topics",
    outcomes: ["Create focused, reviewable commits", "Keep branches current without surprising history", "Use issues, pull requests, reviews, and checks", "Recover calmly and communicate rewritten history"],
    commands: ["git add -p", "git commit", "git fetch --prune", "git push -u origin HEAD", "gh pr create --fill"],
    practice: "Complete the simulator branch mission, a conflict scenario, and the final mastery check as one capstone path.",
    mistake: "Command fluency is not seniority. Predictable history, careful review, recovery skill, and clear communication are.",
    target: "#capstone", targetLabel: "Open the senior capstones", lesson: "collaboration", next: "basics"
  }
};

const quizData = [
  { topic: "FOUNDATIONS", question: "You edited three files but want only index.html in the next commit. What should you run?", options: ["git add .", "git add index.html", "git commit index.html", "git push index.html"], answer: 1, explanation: "git add index.html stages only that file. A commit records what is staged." },
  { topic: "BRANCHES", question: "Which command creates a new branch and switches to it in one step?", options: ["git branch feature", "git checkout main", "git switch -c feature", "git merge feature"], answer: 2, explanation: "git switch -c feature creates the branch at HEAD and immediately checks it out." },
  { topic: "COLLABORATION", question: "Your push is rejected because the remote has new commits. What is the safest next move?", options: ["Force push immediately", "Delete the remote", "Fetch, inspect, integrate by team policy, then push", "Reset --hard origin/main"], answer: 2, explanation: "Fetch and inspect the divergence first, then merge or rebase according to the repository policy. Force pushing could erase somebody else's work." },
  { topic: "RECOVERY", question: "A bad commit is already shared with your team. Which undo method preserves public history?", options: ["git reset --hard HEAD~1", "git revert <commit>", "Delete the .git folder", "git commit --amend"], answer: 1, explanation: "git revert adds an inverse commit, so teammates' existing history stays valid." },
  { topic: "GITHUB", question: "What does a pull request do?", options: ["Downloads Git", "Deletes a branch locally", "Proposes changes for discussion and review", "Automatically fixes every conflict"], answer: 2, explanation: "A pull request is a GitHub collaboration object for reviewing and discussing a proposed branch change." },
  { topic: "GIT DIFF", question: "You already ran git add. Which command previews exactly what the next commit will contain?", options: ["git diff", "git diff --staged", "git status --remote", "git show origin"], answer: 1, explanation: "git diff --staged compares the staging area with HEAD, so it previews the proposed commit snapshot." },
  { topic: "REMOTES", question: "What does git fetch do to your current working files?", options: ["Overwrites them", "Commits them", "Leaves them unchanged while downloading remote history", "Deletes untracked files"], answer: 2, explanation: "Fetch updates remote-tracking information such as origin/main without integrating it into your checked-out branch." },
  { topic: "GITIGNORE", question: "You add an already-tracked .env file to .gitignore. What else is required to stop tracking it?", options: ["Nothing", "git rm --cached .env, then commit", "git clean -fd", "Delete the repository"], answer: 1, explanation: ".gitignore affects untracked paths. git rm --cached removes the tracked index entry while keeping the local file." },
  { topic: "AUTH", question: "Does git config user.email sign you in to GitHub?", options: ["Yes, always", "Only on main", "No; commit identity and GitHub authentication are separate", "Only with SSH"], answer: 2, explanation: "user.email is commit metadata. GitHub authentication uses a credential flow such as Git Credential Manager, GitHub CLI, a token, or SSH." }
];

const labSteps = [
  { command: "git init -b main", output: ["Initialized empty Git repository in ~/gitquest/.git/"], explainer: "Git created a hidden .git database and explicitly named the first branch main. Your files have not been committed yet.", repo: "Repository ready", head: "HEAD → main", working: "1 untracked file", staging: "Empty", history: "No commits", states: ["changed", "", ""] },
  { command: "git add .", output: ["Staged: index.html"], explainer: "git add copied the current version of index.html into the staging area—the exact proposal for your next commit.", repo: "Changes staged", head: "HEAD → main", working: "Clean", staging: "1 file staged", history: "No commits", states: ["", "active", ""] },
  { command: "git commit -m \"first commit\"", output: ["[main (root-commit) a1b2c3d] first commit", " 1 file changed, 42 insertions(+)"], explainer: "Your first commit saved the staged snapshot in history. HEAD and main now point to commit a1b2c3d.", repo: "Working tree clean", head: "HEAD → main", working: "Clean", staging: "Empty", history: "1 commit", states: ["", "", "active"], graph: "first" },
  { command: "git switch -c feature/navbar", output: ["Switched to a new branch 'feature/navbar'"], explainer: "The new branch starts at the same commit as main. Switching branches did not create edits; the working tree remains clean.", repo: "On feature/navbar", head: "HEAD → feature/navbar", working: "Clean", staging: "Empty", history: "1 commit", states: ["", "", "active"], graph: "branch" },
  { command: "Edit index.html (simulate)", kind: "edit", output: ["Modified: index.html (navbar markup)"], explainer: "You changed index.html in your editor. Git sees a modified working-tree file, but nothing is staged yet.", repo: "On feature/navbar", head: "HEAD → feature/navbar", working: "1 modified file", staging: "Empty", history: "1 commit", states: ["changed", "", "active"] },
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

function storageGet(key, fallback = null) {
  try {
    return localStorage.getItem(key) ?? fallback;
  } catch {
    return fallback;
  }
}

function storageSet(key, value) {
  try {
    localStorage.setItem(key, value);
  } catch {
    // The learning tools still work when storage is blocked or full.
  }
}

function storedArray(key) {
  try {
    const value = JSON.parse(storageGet(key, "[]"));
    return Array.isArray(value) ? value : [];
  } catch {
    return [];
  }
}

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
const storedTheme = storageGet("gitquest-theme");
const preferredLight = window.matchMedia("(prefers-color-scheme: light)").matches;
document.documentElement.dataset.theme = ["light", "dark"].includes(storedTheme) ? storedTheme : (preferredLight ? "light" : "dark");

function syncThemeButton() {
  const isLight = document.documentElement.dataset.theme === "light";
  $("#themeToggle").setAttribute("aria-label", `Switch to ${isLight ? "dark" : "light"} theme`);
  document.querySelector('meta[name="theme-color"]').content = isLight ? "#f6f7fc" : "#080b16";
}
syncThemeButton();

$("#themeToggle").addEventListener("click", () => {
  const next = document.documentElement.dataset.theme === "light" ? "dark" : "light";
  document.documentElement.dataset.theme = next;
  storageSet("gitquest-theme", next);
  syncThemeButton();
});

function closeMenu({ returnFocus = false } = {}) {
  $("#navLinks").classList.remove("is-open");
  $("#menuButton").setAttribute("aria-expanded", "false");
  $("#menuButton").setAttribute("aria-label", "Open navigation");
  if (returnFocus) $("#menuButton").focus();
}

$("#menuButton").addEventListener("click", () => {
  const open = $("#menuButton").getAttribute("aria-expanded") === "true";
  $("#menuButton").setAttribute("aria-expanded", String(!open));
  $("#menuButton").setAttribute("aria-label", open ? "Open navigation" : "Close navigation");
  $("#navLinks").classList.toggle("is-open", !open);
  if (!open) window.requestAnimationFrame(() => $(".nav__links a")?.focus());
});

$$('.nav__links a').forEach(link => link.addEventListener("click", () => {
  const isMobileMenu = window.matchMedia("(max-width: 820px)").matches;
  const section = document.querySelector(link.getAttribute("href"));
  closeMenu();
  if (isMobileMenu && section) {
    const destination = $("h1, h2", section) || section;
    destination.tabIndex = -1;
    window.requestAnimationFrame(() => destination.focus({ preventScroll: true }));
  }
}));

document.addEventListener("keydown", event => {
  if (event.key === "Escape" && $("#menuButton").getAttribute("aria-expanded") === "true") closeMenu({ returnFocus: true });
});

document.addEventListener("click", event => {
  if ($("#menuButton").getAttribute("aria-expanded") === "true" && !event.target.closest(".nav")) closeMenu();
});

window.addEventListener("scroll", () => $(".site-header").classList.toggle("is-scrolled", window.scrollY > 16), { passive: true });

// Re-align deep links after JavaScript-rendered course panels establish their height.
window.addEventListener("load", () => {
  if (!window.location.hash) return;
  setTimeout(() => {
    const target = document.getElementById(window.location.hash.slice(1));
    if (target) target.scrollIntoView({ behavior: "auto", block: "start" });
  }, 180);
});

const primaryNavDestinations = $$('.nav__links a').map(link => ({
  link,
  section: document.querySelector(link.getAttribute("href"))
})).filter(item => item.section);

function syncActiveNavigation() {
  const railBottom = $(".topic-rail")?.getBoundingClientRect().bottom || 90;
  const marker = window.scrollY + railBottom + 8;
  let current = null;
  primaryNavDestinations.forEach(item => {
    const sectionTop = window.scrollY + item.section.getBoundingClientRect().top;
    if (sectionTop <= marker) current = item;
  });
  primaryNavDestinations.forEach(item => {
    const active = item === current;
    item.link.classList.toggle("is-active", active);
    if (active) item.link.setAttribute("aria-current", "location");
    else item.link.removeAttribute("aria-current");
  });
}

window.addEventListener("scroll", syncActiveNavigation, { passive: true });
document.addEventListener("scroll", syncActiveNavigation, { passive: true });
window.addEventListener("resize", syncActiveNavigation);
window.addEventListener("hashchange", syncActiveNavigation);
syncActiveNavigation();

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
const validStageIds = $$('.path-card').map(card => card.dataset.stage);
let completedStages = [...new Set(storedArray("gitquest-stages"))].filter(id => validStageIds.includes(id));
function updateProgress() {
  $$('.path-card').forEach(card => {
    const complete = completedStages.includes(card.dataset.stage);
    const stageName = $("h3", card)?.textContent.trim() || "stage";
    const checkButton = $(".stage-check", card);
    card.classList.toggle("is-complete", complete);
    checkButton.setAttribute("aria-pressed", String(complete));
    checkButton.setAttribute("aria-label", `Mark ${stageName} ${complete ? "incomplete" : "complete"}`);
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
  storageSet("gitquest-stages", JSON.stringify(completedStages));
  updateProgress();
  showToast(completedStages.includes(stage) ? "Stage marked complete" : "Stage marked incomplete");
}));
updateProgress();

// Guided academy chapters
let activeLessonId = "mental-model";
let completedLessons = [...new Set(storedArray("gitquest-lessons"))].filter(id => Object.hasOwn(lessonData, id));

function formatLessonTerminal(source) {
  return source.split("\n").map(line => {
    const safe = escapeHTML(line.slice(2));
    if (line.startsWith("$ ")) return `<span class="lesson-command">$ ${safe}</span>`;
    if (line.startsWith("# ")) return `<span class="lesson-comment"># ${safe}</span>`;
    if (line.startsWith("> ")) return `<span class="lesson-output">${safe}</span>`;
    return escapeHTML(line);
  }).join("\n");
}

function lessonCommands(source) {
  return source.split("\n").filter(line => line.startsWith("$ ")).map(line => line.slice(2)).join("\n");
}

function syncLessonTabs() {
  $$('.lesson-tab').forEach(tab => {
    const complete = completedLessons.includes(tab.dataset.lesson);
    tab.classList.toggle("is-complete", complete);
    tab.title = complete ? "Chapter completed" : "Open chapter";
  });
}

function renderLesson(id) {
  const lesson = lessonData[id];
  if (!lesson) return;
  activeLessonId = id;
  const complete = completedLessons.includes(id);
  $$('.lesson-tab').forEach(tab => {
    const active = tab.dataset.lesson === id;
    tab.classList.toggle("is-active", active);
    tab.setAttribute("aria-selected", String(active));
    tab.tabIndex = active ? 0 : -1;
  });
  $("#lessonPanel").setAttribute("aria-labelledby", `lessonTab-${id}`);
  const model = lesson.model ? `<div class="model-flow" aria-label="Git data flow">
    <div class="model-zone"><span>01</span><strong>Working tree</strong><small>edit files</small></div>
    <div class="model-zone"><span>02</span><strong>Staging area</strong><small>git add</small></div>
    <div class="model-zone"><span>03</span><strong>Local history</strong><small>git commit</small></div>
    <div class="model-zone"><span>04</span><strong>Remote repo</strong><small>git push</small></div>
  </div>` : "";
  $("#lessonPanel").innerHTML = `<div class="lesson-panel__top"><div><span class="lesson-label"><i></i>${lesson.number}</span><h3>${lesson.title}</h3></div><span class="lesson-duration">${lesson.duration}</span></div>
    <p class="lesson-lead">${lesson.lead}</p>
    ${model}
    <div class="lesson-objectives">${lesson.objectives.map(item => `<span>${item}</span>`).join("")}</div>
    <div class="lesson-content-grid">
      <div><h4 class="lesson-block-title">Guided concepts</h4><div class="lesson-steps">${lesson.steps.map((step, index) => `<div class="lesson-step"><span class="lesson-step__number">${String(index + 1).padStart(2, "0")}</span><div><strong>${step.title}</strong><p>${step.text}</p><code>${escapeHTML(step.command)}</code></div></div>`).join("")}</div></div>
      <div><h4 class="lesson-block-title">Example session</h4><div class="lesson-terminal"><div class="lesson-terminal__bar"><span>~/gitquest</span><button class="copy-button" type="button" id="copyLessonCommands" aria-label="Copy lesson commands">${icons.copy}</button></div><pre>${formatLessonTerminal(lesson.terminal)}</pre></div><div class="lesson-note">${icons.warning}<span><strong>Remember:</strong> ${lesson.note}</span></div></div>
    </div>
    <div class="lesson-mission"><div><span>Practice mission</span><p>${lesson.mission}</p></div><button type="button" id="completeLesson">${complete ? "Completed ✓" : "Mark understood"}</button></div>`;
  $("#copyLessonCommands").addEventListener("click", () => copyText(lessonCommands(lesson.terminal), "Lesson commands copied"));
  $("#completeLesson").addEventListener("click", () => {
    completedLessons = complete ? completedLessons.filter(item => item !== id) : [...completedLessons, id];
    storageSet("gitquest-lessons", JSON.stringify(completedLessons));
    syncLessonTabs();
    renderLesson(id);
    $("#completeLesson").focus();
    updateMasteryDashboard();
    showToast(complete ? "Chapter marked incomplete" : "Chapter completed");
  });
}

const lessonTabs = $$('.lesson-tab');
lessonTabs.forEach((tab, index) => {
  tab.addEventListener("click", () => renderLesson(tab.dataset.lesson));
  tab.addEventListener("keydown", event => {
    const keys = ["ArrowRight", "ArrowDown", "ArrowLeft", "ArrowUp", "Home", "End"];
    if (!keys.includes(event.key)) return;
    event.preventDefault();
    let nextIndex = index;
    if (["ArrowRight", "ArrowDown"].includes(event.key)) nextIndex = (index + 1) % lessonTabs.length;
    if (["ArrowLeft", "ArrowUp"].includes(event.key)) nextIndex = (index - 1 + lessonTabs.length) % lessonTabs.length;
    if (event.key === "Home") nextIndex = 0;
    if (event.key === "End") nextIndex = lessonTabs.length - 1;
    lessonTabs[nextIndex].focus();
    lessonTabs[nextIndex].click();
  });
});
syncLessonTabs();
renderLesson(activeLessonId);

// Zero-to-mastery curriculum and evidence-based progress
const masteryStorageKey = "gitquest-mastery-v1";
const curriculumTopicIds = Object.keys(curriculumData);
const recognizedSimulatorMissions = ["initialize", "edit-first-file", "stage-first-file", "first-commit", "create-branch", "edit-feature", "stage-feature", "commit-feature", "return-main", "merge-feature", "connect-remote", "publish-main"];
const recognizedConflictScenarios = ["same-line-merge", "add-add", "modify-delete", "rebase-conflict", "stash-pop", "rename-delete"];
let activeCurriculumTopic = "basics";

function isRecognizedEvidence(item) {
  if (item === "assessment:quiz-80") return true;
  if (recognizedSimulatorMissions.some(id => item.startsWith(`typed-git-simulator:simulator:${id}:`))) return true;
  if (recognizedConflictScenarios.some(id => item === `conflict-resolution:completed:${id}`)) return true;
  return fixData.some(fix => item.startsWith(`error-doctor:diagnosis:${fix.id}:`));
}

function readMasteryState() {
  try {
    const parsed = JSON.parse(storageGet(masteryStorageKey, "{}"));
    const completedTopics = Array.isArray(parsed.completedTopics)
      ? [...new Set(parsed.completedTopics)].filter(id => curriculumTopicIds.includes(id))
      : [];
    const evidence = Array.isArray(parsed.evidence)
      ? [...new Set(parsed.evidence.filter(item => typeof item === "string")
        .filter(isRecognizedEvidence))].slice(0, 200)
      : [];
    return { version: 1, completedTopics, evidence };
  } catch {
    return { version: 1, completedTopics: [], evidence: [] };
  }
}

let masteryState = readMasteryState();

function saveMasteryState() {
  storageSet(masteryStorageKey, JSON.stringify(masteryState));
}
saveMasteryState();

function safeStoredList(key) {
  return storedArray(key).filter(item => typeof item === "string");
}

function conflictCompletions() {
  return [...new Set(safeStoredList("gitquest-conflict-arena-completed-v1"))]
    .filter(id => recognizedConflictScenarios.includes(id));
}

function topicProgress(topicId) {
  const topic = curriculumData[topicId];
  let score = masteryState.completedTopics.includes(topicId) ? 35 : 0;
  if (topic.lesson && completedLessons.includes(topic.lesson)) score += 20;
  const evidenceText = masteryState.evidence.join(" ").toLowerCase();
  const evidenceTerms = {
    basics: ["init", "stage", "commit"], branching: ["branch", "switch", "merge"], remote: ["remote", "push"],
    diff: ["diff"], sync: ["fetch", "push", "sync"], conflicts: ["conflict-resolution"],
    "pull-request": ["pull-request", "collaboration"], undo: ["reflog", "restore", "recovery"], workflow: ["merge", "workflow", "mission"]
  }[topicId] || [];
  score += Math.min(30, evidenceTerms.filter(term => evidenceText.includes(term)).length * 10);
  if (topicId === "conflicts") score += Math.min(30, conflictCompletions().length * 5);
  if (savedQuizScore() >= Math.ceil(quizData.length * .8)) score += 15;
  return Math.min(100, score);
}

function masteryAverage(topicIds) {
  return Math.round(topicIds.reduce((sum, id) => sum + topicProgress(id), 0) / topicIds.length);
}

function updateCapstones() {
  const hasEvidence = prefix => masteryState.evidence.some(item => item.startsWith(prefix));
  const completedConflicts = conflictCompletions();
  const storedBest = savedQuizScore();
  const requirements = {
    "sim-init": hasEvidence("typed-git-simulator:simulator:initialize:"),
    "sim-commit": hasEvidence("typed-git-simulator:simulator:first-commit:"),
    "sim-branch": hasEvidence("typed-git-simulator:simulator:create-branch:") && hasEvidence("typed-git-simulator:simulator:merge-feature:"),
    "conflict-content": completedConflicts.some(id => ["same-line-merge", "add-add"].includes(id)),
    "conflict-structural": completedConflicts.some(id => ["modify-delete", "rename-delete"].includes(id)),
    "conflict-operation": completedConflicts.some(id => ["rebase-conflict", "stash-pop"].includes(id)),
    "topic-workflow": masteryState.completedTopics.includes("workflow"),
    "topic-sync": masteryState.completedTopics.includes("sync"),
    "lesson-collaboration": completedLessons.includes("collaboration"),
    "diagnosis-push-rejected": hasEvidence("error-doctor:diagnosis:push-rejected:"),
    quiz: storedBest >= Math.ceil(quizData.length * .8)
  };
  Object.entries(requirements).forEach(([id, complete]) => {
    const item = $(`[data-requirement="${id}"]`);
    if (!item) return;
    item.classList.toggle("is-complete", complete);
    item.setAttribute("aria-label", `${item.textContent.trim()}: ${complete ? "complete" : "not complete"}`);
  });
  let ready = 0;
  $$('.capstone-card').forEach(card => {
    const complete = $$('[data-requirement]', card).every(item => item.classList.contains("is-complete"));
    card.classList.toggle("is-ready", complete);
    if (complete) ready += 1;
    const badge = $(".capstone-card__top b", card);
    if (badge) badge.textContent = complete ? "Ready ✓" : badge.dataset.label || badge.textContent;
  });
  if ($("#capstoneCount")) $("#capstoneCount").textContent = `${ready}/3`;
}

function updateMasteryDashboard() {
  const completedTopics = masteryState.completedTopics.length;
  const conflictScore = Math.min(18, conflictCompletions().length * 3);
  const evidenceScore = Math.min(25, masteryState.evidence.length * 3);
  const bestQuiz = savedQuizScore();
  const quizScore = Math.round((bestQuiz / quizData.length) * 12);
  const percent = Math.min(100, completedTopics * 5 + conflictScore + evidenceScore + quizScore);
  const meter = $(".mastery-meter");
  if (meter) {
    meter.setAttribute("role", "progressbar");
    meter.setAttribute("aria-valuemin", "0");
    meter.setAttribute("aria-valuemax", "100");
    meter.setAttribute("aria-valuenow", String(percent));
  }
  $("#masteryRing")?.style.setProperty("--mastery", `${percent}%`);
  if ($("#masteryPercent")) $("#masteryPercent").textContent = `${percent}%`;
  if ($("#masteryTopicCount")) $("#masteryTopicCount").textContent = `${completedTopics} of ${curriculumTopicIds.length} checkpoints`;
  const scores = {
    model: masteryAverage(["basics", "diff"]),
    daily: masteryAverage(["basics", "branching", "diff", "workflow"]),
    collaboration: masteryAverage(["remote", "sync", "pull-request", "workflow"]),
    conflict: masteryAverage(["conflicts"]),
    recovery: masteryAverage(["undo", "conflicts"])
  };
  Object.entries(scores).forEach(([skill, score]) => {
    const item = $(`[data-mastery-skill="${skill}"]`);
    if (!item) return;
    $("strong", item).textContent = `${score}%`;
    $("i", item).style.width = `${score}%`;
  });
  updateCapstones();
}

function curriculumPanelTemplate(topicId) {
  const topic = curriculumData[topicId];
  const reviewed = masteryState.completedTopics.includes(topicId);
  const nextTopic = curriculumData[topic.next];
  return `<div class="curriculum-panel__top"><div><span>${escapeHTML(topic.meta)}</span><h3>${escapeHTML(topic.title)}</h3><p>${escapeHTML(topic.lead)}</p></div><div class="topic-score"><strong>${topicProgress(topicId)}%</strong><span>skill evidence</span></div></div>
    <div class="curriculum-panel__meta"><span><b>Prerequisite</b>${escapeHTML(topic.prerequisites)}</span><span><b>Practice loop</b>Understand → predict → run → inspect → recover</span></div>
    <div class="curriculum-panel__grid">
      <section><span class="curriculum-block-label">You will be able to</span><ul class="outcome-list">${topic.outcomes.map(item => `<li>${escapeHTML(item)}</li>`).join("")}</ul></section>
      <section><span class="curriculum-block-label">Commands to understand</span><div class="topic-command-list">${topic.commands.map(command => `<code>${escapeHTML(command)}</code>`).join("")}</div></section>
      <section class="topic-practice-card"><span class="curriculum-block-label">Deliberate practice</span><p>${escapeHTML(topic.practice)}</p><a class="button button--primary" href="${topic.target}">${escapeHTML(topic.targetLabel)} <span>→</span></a></section>
      <aside class="topic-mistake"><strong>Common wrong assumption</strong><p>${escapeHTML(topic.mistake)}</p></aside>
    </div>
    <footer class="curriculum-panel__footer">
      <div>${topic.lesson ? `<a class="text-button" href="#academy" data-open-lesson="${escapeHTML(topic.lesson)}">Open the related guided lesson <span>→</span></a>` : ""}<small>Recording a checkpoint tracks study progress. Practice evidence raises mastery.</small></div>
      <button class="button button--ghost" id="completeCurriculumTopic" type="button" aria-pressed="${reviewed}">${reviewed ? "Checkpoint recorded ✓" : "Record topic checkpoint"}</button>
      <button class="text-button" type="button" data-next-curriculum="${escapeHTML(topic.next)}">Next: ${escapeHTML(nextTopic.label)} <span>→</span></button>
    </footer>`;
}

function renderCurriculumTopic(topicId, { focusPanel = false } = {}) {
  if (!curriculumData[topicId]) return;
  activeCurriculumTopic = topicId;
  $$('.curriculum-tab').forEach(tab => {
    const active = tab.dataset.curriculumTopic === topicId;
    tab.classList.toggle("is-active", active);
    tab.setAttribute("aria-selected", String(active));
    tab.tabIndex = active ? 0 : -1;
  });
  $$('[data-topic-link]').forEach(link => {
    const active = link.dataset.topicLink === topicId;
    link.classList.toggle("is-active", active);
    if (active) link.setAttribute("aria-current", "location");
    else link.removeAttribute("aria-current");
  });
  const panel = $("#curriculumPanel");
  panel.setAttribute("aria-labelledby", `curriculumTab-${topicId}`);
  panel.innerHTML = curriculumPanelTemplate(topicId);
  $("#completeCurriculumTopic").addEventListener("click", () => {
    const complete = masteryState.completedTopics.includes(topicId);
    masteryState.completedTopics = complete
      ? masteryState.completedTopics.filter(id => id !== topicId)
      : [...masteryState.completedTopics, topicId];
    saveMasteryState();
    renderCurriculumTopic(topicId, { focusPanel: true });
    updateMasteryDashboard();
    showToast(complete ? "Topic checkpoint removed" : `${curriculumData[topicId].label} checkpoint recorded`);
  });
  $("[data-next-curriculum]", panel)?.addEventListener("click", () => renderCurriculumTopic(curriculumData[topicId].next, { focusPanel: true }));
  $("[data-open-lesson]", panel)?.addEventListener("click", event => renderLesson(event.currentTarget.dataset.openLesson));
  if (focusPanel) window.requestAnimationFrame(() => panel.focus());
}

const curriculumTabs = $$('.curriculum-tab');
curriculumTabs.forEach((tab, index) => {
  tab.addEventListener("click", () => renderCurriculumTopic(tab.dataset.curriculumTopic));
  tab.addEventListener("keydown", event => {
    if (!["ArrowRight", "ArrowDown", "ArrowLeft", "ArrowUp", "Home", "End"].includes(event.key)) return;
    event.preventDefault();
    let nextIndex = index;
    if (["ArrowRight", "ArrowDown"].includes(event.key)) nextIndex = (index + 1) % curriculumTabs.length;
    if (["ArrowLeft", "ArrowUp"].includes(event.key)) nextIndex = (index - 1 + curriculumTabs.length) % curriculumTabs.length;
    if (event.key === "Home") nextIndex = 0;
    if (event.key === "End") nextIndex = curriculumTabs.length - 1;
    curriculumTabs[nextIndex].focus();
    curriculumTabs[nextIndex].click();
  });
});

$$('[data-topic-link]').forEach(link => link.addEventListener("click", () => renderCurriculumTopic(link.dataset.topicLink, { focusPanel: true })));
document.addEventListener("gitquest:skill", event => {
  const detail = event.detail && typeof event.detail === "object" ? event.detail : {};
  const evidenceId = [detail.source, detail.id, detail.skill, detail.action, detail.scenarioId, detail.missionId, detail.command].filter(Boolean).join(":");
  const countsAsEvidence = detail.skill !== "conflict-resolution" || detail.action === "completed";
  if (countsAsEvidence && evidenceId && isRecognizedEvidence(evidenceId) && !masteryState.evidence.includes(evidenceId)) {
    masteryState.evidence = [...masteryState.evidence, evidenceId].slice(-200);
    saveMasteryState();
  }
  updateMasteryDashboard();
  if (activeCurriculumTopic === "conflicts" && detail.skill === "conflict-resolution" && detail.action === "completed") renderCurriculumTopic("conflicts");
});

renderCurriculumTopic(activeCurriculumTopic);
updateMasteryDashboard();

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
  const terms = $("#commandSearch").value.trim().toLowerCase().split(/\s+/).filter(Boolean);
  return commandData.filter(item => {
    const categoryMatch = activeCommandFilter === "all" || item.category === activeCommandFilter;
    const haystack = `${item.command} ${item.description} ${item.example} ${item.keywords}`.toLowerCase();
    return categoryMatch && terms.every(term => haystack.includes(term));
  });
}

function renderCommands() {
  const filtered = filteredCommands();
  const visible = filtered.slice(0, commandLimit);
  $("#commandGrid").innerHTML = visible.map(commandCardTemplate).join("");
  $("#commandEmpty").hidden = filtered.length !== 0;
  $("#commandResultCount").textContent = visible.length < filtered.length
    ? `Showing ${visible.length} of ${filtered.length} commands`
    : `${filtered.length} command${filtered.length === 1 ? "" : "s"} found`;
  $("#loadMoreCommands").hidden = visible.length >= filtered.length;
  $$('.copy-button[data-copy]', $("#commandGrid")).forEach(button => button.addEventListener("click", () => copyText(decodeURIComponent(button.dataset.copy), "Command copied")));
}

$$('#commandFilters .filter-chip').forEach(button => button.addEventListener("click", () => {
  activeCommandFilter = button.dataset.filter;
  commandLimit = 12;
  $$('#commandFilters .filter-chip').forEach(chip => {
    const active = chip === button;
    chip.classList.toggle("is-active", active);
    chip.setAttribute("aria-pressed", String(active));
  });
  renderCommands();
}));

$("#commandSearch").addEventListener("input", () => { commandLimit = 50; renderCommands(); });
$("#loadMoreCommands").addEventListener("click", () => {
  const previousCount = $$('.command-card').length;
  commandLimit += 12;
  renderCommands();
  const firstNewCard = $$('.command-card')[previousCount];
  if (firstNewCard) {
    firstNewCard.tabIndex = -1;
    firstNewCard.focus();
  }
});
document.addEventListener("keydown", event => {
  const editable = document.activeElement.isContentEditable || ["INPUT", "TEXTAREA", "SELECT"].includes(document.activeElement.tagName);
  if (event.key === "/" && !event.ctrlKey && !event.altKey && !event.metaKey && !editable) {
    event.preventDefault();
    $("#commandSearch").focus();
  }
});

$$('[data-command-filter]').forEach(link => link.addEventListener("click", () => {
  $("#commandSearch").value = "";
  const target = $(`.filter-chip[data-filter="${link.dataset.commandFilter}"]`);
  if (target) target.click();
}));

$("#copyCheatSheet").addEventListener("click", () => {
  const starter = commandData.filter(item => ["git status", "git add <file>", "git commit -m \"message\"", "git switch -c <branch>", "git pull --rebase", "git push -u origin <branch>", "git log --oneline --graph --all", "git restore --staged <file>", "git revert <commit>"].includes(item.command));
  copyText(starter.map(item => `${item.command}\n# ${item.description}`).join("\n\n"), "Starter cheat sheet copied");
});

$("#heroCommandCount").textContent = `${commandData.length}`;
renderCommands();

// Interactive Git diff studio and recipe guide
const diffScenarioCommands = {
  working: "git diff",
  staged: "git diff --staged",
  head: "git diff HEAD",
  branches: "git diff main...feature/name",
  remote: "git fetch\ngit diff \"HEAD...@{u}\"",
  unpushed: "git diff \"@{u}...HEAD\""
};
const diffRecipeColors = { worktree: "var(--primary)", history: "var(--purple)", branches: "var(--cyan)", remote: "var(--green)", review: "var(--orange)" };
let diffView = "unified";
let currentDiffOperations = [];
let currentPatch = "";
let currentDiffFilename = "app.js";
let diffRecipeFilter = "all";
let diffRecipeLimit = 9;

function textDocument(text) {
  const normalized = text.replace(/\r\n/g, "\n");
  const endsWithNewline = normalized.endsWith("\n");
  const lines = normalized === "" ? [] : normalized.split("\n");
  if (endsWithNewline) lines.pop();
  return { lines, endsWithNewline };
}

function lineKey(line, ignoreWhitespace) {
  return ignoreWhitespace ? line.replace(/\s+/g, "") : line;
}

function calculateLineDiff(beforeText, afterText, ignoreWhitespace = false) {
  const beforeDocument = textDocument(beforeText);
  const afterDocument = textDocument(afterText);
  const before = beforeDocument.lines;
  const after = afterDocument.lines;
  if (before.length > 400 || after.length > 400) return { error: "For a smooth browser preview, compare at most 400 lines on each side." };
  const rows = Array.from({ length: before.length + 1 }, () => new Uint16Array(after.length + 1));
  for (let oldIndex = before.length - 1; oldIndex >= 0; oldIndex -= 1) {
    for (let newIndex = after.length - 1; newIndex >= 0; newIndex -= 1) {
      rows[oldIndex][newIndex] = lineKey(before[oldIndex], ignoreWhitespace) === lineKey(after[newIndex], ignoreWhitespace)
        ? rows[oldIndex + 1][newIndex + 1] + 1
        : Math.max(rows[oldIndex + 1][newIndex], rows[oldIndex][newIndex + 1]);
    }
  }
  const operations = [];
  let oldIndex = 0;
  let newIndex = 0;
  let oldNumber = 1;
  let newNumber = 1;
  while (oldIndex < before.length && newIndex < after.length) {
    if (lineKey(before[oldIndex], ignoreWhitespace) === lineKey(after[newIndex], ignoreWhitespace)) {
      operations.push({ type: "equal", text: before[oldIndex], oldNo: oldNumber++, newNo: newNumber++ });
      oldIndex += 1;
      newIndex += 1;
    } else if (rows[oldIndex + 1][newIndex] >= rows[oldIndex][newIndex + 1]) {
      operations.push({ type: "delete", text: before[oldIndex], oldNo: oldNumber++, newNo: null });
      oldIndex += 1;
    } else {
      operations.push({ type: "add", text: after[newIndex], oldNo: null, newNo: newNumber++ });
      newIndex += 1;
    }
  }
  while (oldIndex < before.length) operations.push({ type: "delete", text: before[oldIndex++], oldNo: oldNumber++, newNo: null });
  while (newIndex < after.length) operations.push({ type: "add", text: after[newIndex++], oldNo: null, newNo: newNumber++ });

  // A final newline is part of a file even though it is not a visible character.
  // Turn a newline-only change into a real delete/add pair, like Git does.
  if (before.length && after.length && beforeDocument.endsWithNewline !== afterDocument.endsWithNewline) {
    const terminalEqualIndex = operations.findIndex(item => item.type === "equal" && item.oldNo === before.length && item.newNo === after.length);
    if (terminalEqualIndex >= 0) {
      operations.splice(terminalEqualIndex, 1,
        { type: "delete", text: before.at(-1), oldNo: before.length, newNo: null },
        { type: "add", text: after.at(-1), oldNo: null, newNo: after.length });
    }
  }

  operations.forEach(item => {
    item.oldNoNewline = Boolean(before.length && !beforeDocument.endsWithNewline && item.oldNo === before.length);
    item.newNoNewline = Boolean(after.length && !afterDocument.endsWithNewline && item.newNo === after.length);
  });
  return { operations, oldCount: before.length, newCount: after.length };
}

function buildLearningPatch(operations, oldCount, newCount) {
  const changed = operations.some(item => item.type !== "equal");
  if (!changed) return "";
  const oldStart = oldCount ? 1 : 0;
  const newStart = newCount ? 1 : 0;
  const safeFilename = currentDiffFilename || "comparison.txt";
  const lines = [`diff --git a/${safeFilename} b/${safeFilename}`, `--- a/${safeFilename}`, `+++ b/${safeFilename}`, `@@ -${oldStart},${oldCount} +${newStart},${newCount} @@`];
  operations.forEach(item => {
    lines.push(`${item.type === "add" ? "+" : item.type === "delete" ? "-" : " "}${item.text}`);
    if (item.oldNoNewline || item.newNoNewline) lines.push("\\ No newline at end of file");
  });
  return lines.join("\n");
}

function diffLineHTML(item) {
  const sign = item.type === "add" ? "+" : item.type === "delete" ? "−" : " ";
  const marker = item.oldNoNewline || item.newNoNewline
    ? '<div class="diff-eof-note"><span></span><span></span><span>\\</span><code>No newline at end of file</code></div>'
    : "";
  return `<div class="diff-line diff-line--${item.type}"><span class="diff-line__no">${item.oldNo ?? ""}</span><span class="diff-line__no">${item.newNo ?? ""}</span><span class="diff-line__sign">${sign}</span><code>${escapeHTML(item.text) || "&nbsp;"}</code></div>${marker}`;
}

function splitDiffRows(operations) {
  const result = [];
  let index = 0;
  while (index < operations.length) {
    if (operations[index].type === "equal") {
      result.push({ left: operations[index], right: operations[index] });
      index += 1;
      continue;
    }
    const removed = [];
    const added = [];
    while (index < operations.length && operations[index].type !== "equal") {
      (operations[index].type === "delete" ? removed : added).push(operations[index]);
      index += 1;
    }
    const length = Math.max(removed.length, added.length);
    for (let row = 0; row < length; row += 1) result.push({ left: removed[row] || null, right: added[row] || null });
  }
  return result;
}

function splitSideHTML(item, side) {
  if (!item) return '<div class="diff-split-side is-empty"><span></span><code>&nbsp;</code></div>';
  const changedClass = item.type === "delete" ? "is-delete" : item.type === "add" ? "is-add" : "";
  const number = side === "left" ? item.oldNo : item.newNo;
  const noNewline = side === "left" ? item.oldNoNewline : item.newNoNewline;
  return `<div class="diff-split-side ${changedClass}"><span>${number ?? ""}</span><code>${escapeHTML(item.text) || "&nbsp;"}${noNewline ? '<small class="diff-eof-tag">no newline at EOF</small>' : ""}</code></div>`;
}

function renderDiff() {
  const result = calculateLineDiff($("#diffBefore").value, $("#diffAfter").value, $("#diffWhitespace").checked);
  const output = $("#diffOutput");
  if (result.error) {
    currentDiffOperations = [];
    currentPatch = "";
    $("#diffAdded").textContent = "0";
    $("#diffDeleted").textContent = "0";
    $("#diffUnchanged").textContent = "0";
    $("#diffSummary").textContent = "Preview limit reached";
    output.className = "diff-output";
    output.innerHTML = `<div class="diff-empty"><div>${icons.warning}<strong>Comparison is too large</strong><span>${result.error}</span></div></div>`;
    return;
  }
  currentDiffOperations = result.operations;
  currentPatch = buildLearningPatch(result.operations, result.oldCount, result.newCount);
  const added = result.operations.filter(item => item.type === "add").length;
  const deleted = result.operations.filter(item => item.type === "delete").length;
  const unchanged = result.operations.filter(item => item.type === "equal").length;
  $("#diffAdded").textContent = added;
  $("#diffDeleted").textContent = deleted;
  $("#diffUnchanged").textContent = unchanged;
  $("#diffSummary").textContent = added || deleted ? `${added} insertion${added === 1 ? "" : "s"}, ${deleted} deletion${deleted === 1 ? "" : "s"}` : "No changes";
  if (!added && !deleted) {
    output.className = "diff-output";
    output.innerHTML = `<div class="diff-empty"><div><svg viewBox="0 0 24 24" aria-hidden="true"><path d="m5 12 4 4L19 6"></path><circle cx="12" cy="12" r="10"></circle></svg><strong>The two versions match</strong><span>Edit either side to generate a diff.</span></div></div>`;
    return;
  }
  if (diffView === "split") {
    output.className = "diff-output is-split";
    output.innerHTML = splitDiffRows(result.operations).map(row => `<div class="diff-split-row">${splitSideHTML(row.left, "left")}${splitSideHTML(row.right, "right")}</div>`).join("");
  } else {
    output.className = "diff-output";
    const oldStart = result.oldCount ? 1 : 0;
    const newStart = result.newCount ? 1 : 0;
    output.innerHTML = `<div class="diff-hunk">@@ -${oldStart},${result.oldCount} +${newStart},${result.newCount} @@</div>${result.operations.map(diffLineHTML).join("")}`;
  }
}

function loadDiffSample(name) {
  const sample = diffSamples[name];
  if (!sample) return;
  $("#diffBefore").value = sample.before;
  $("#diffAfter").value = sample.after;
  currentDiffFilename = sample.filename;
  $("#diffFileName").textContent = currentDiffFilename;
  $$('.diff-sample').forEach(button => {
    const active = button.dataset.sample === name;
    button.classList.toggle("is-active", active);
    button.setAttribute("aria-pressed", String(active));
  });
  renderDiff();
}

let diffDebounce;
[$("#diffBefore"), $("#diffAfter")].forEach(editor => editor.addEventListener("input", () => {
  clearTimeout(diffDebounce);
  diffDebounce = setTimeout(renderDiff, 120);
  $$('.diff-sample').forEach(button => {
    button.classList.remove("is-active");
    button.setAttribute("aria-pressed", "false");
  });
}));
$$('.diff-sample').forEach(button => button.addEventListener("click", () => loadDiffSample(button.dataset.sample)));
$("#swapDiff").addEventListener("click", () => {
  const before = $("#diffBefore").value;
  $("#diffBefore").value = $("#diffAfter").value;
  $("#diffAfter").value = before;
  $$('.diff-sample').forEach(button => {
    button.classList.remove("is-active");
    button.setAttribute("aria-pressed", "false");
  });
  renderDiff();
});
$("#clearDiff").addEventListener("click", () => {
  $("#diffBefore").value = "";
  $("#diffAfter").value = "";
  currentDiffFilename = "comparison.txt";
  $("#diffFileName").textContent = currentDiffFilename;
  $$('.diff-sample').forEach(button => {
    button.classList.remove("is-active");
    button.setAttribute("aria-pressed", "false");
  });
  renderDiff();
});
$("#diffWhitespace").addEventListener("change", renderDiff);
$$('[data-diff-view]').forEach(button => button.addEventListener("click", () => {
  diffView = button.dataset.diffView;
  $$('[data-diff-view]').forEach(control => {
    const active = control === button;
    control.classList.toggle("is-active", active);
    control.setAttribute("aria-pressed", String(active));
  });
  renderDiff();
}));
$("#diffScenario").addEventListener("change", () => $("#diffScenarioCommand").textContent = diffScenarioCommands[$("#diffScenario").value]);
$("#copyDiffCommand").addEventListener("click", () => copyText(diffScenarioCommands[$("#diffScenario").value], "Diff command copied"));
$("#copyPatch").addEventListener("click", () => {
  clearTimeout(diffDebounce);
  renderDiff();
  if (currentPatch) copyText(currentPatch, "Learning patch copied");
  else showToast("Nothing changed yet");
});

function diffRecipeTemplate(item, index) {
  return `<article class="diff-recipe" style="--recipe-color:${diffRecipeColors[item.category]};animation-delay:${Math.min(index * 25, 180)}ms"><div class="diff-recipe__top"><span class="diff-recipe__number">${String(diffRecipeData.indexOf(item) + 1).padStart(2, "0")}</span><span class="diff-recipe__tag">${item.tag}</span></div><h4>${item.title}</h4><p>${item.description}</p><div class="diff-recipe__code">${escapeHTML(item.command).replace(/\n/g, "<br>")}<button class="copy-button" type="button" data-diff-copy="${encodeURIComponent(item.command)}" aria-label="Copy ${escapeHTML(item.title)}">${icons.copy}</button></div></article>`;
}

function renderDiffRecipes() {
  const filtered = diffRecipeData.filter(item => diffRecipeFilter === "all" || item.category === diffRecipeFilter);
  const visible = filtered.slice(0, diffRecipeLimit);
  $("#diffRecipeGrid").innerHTML = visible.map(diffRecipeTemplate).join("");
  $("#loadMoreDiffRecipes").hidden = visible.length >= filtered.length;
  $$('[data-diff-copy]', $("#diffRecipeGrid")).forEach(button => button.addEventListener("click", () => copyText(decodeURIComponent(button.dataset.diffCopy), "Diff recipe copied")));
}

$$('#diffRecipeFilters .filter-chip').forEach(button => button.addEventListener("click", () => {
  diffRecipeFilter = button.dataset.diffFilter;
  diffRecipeLimit = diffRecipeFilter === "all" ? 9 : 20;
  $$('#diffRecipeFilters .filter-chip').forEach(chip => {
    const active = chip === button;
    chip.classList.toggle("is-active", active);
    chip.setAttribute("aria-pressed", String(active));
  });
  renderDiffRecipes();
}));
$("#loadMoreDiffRecipes").addEventListener("click", () => {
  const previousCount = $$('.diff-recipe').length;
  diffRecipeLimit = 20;
  renderDiffRecipes();
  const firstNewRecipe = $$('.diff-recipe')[previousCount];
  if (firstNewRecipe) {
    firstNewRecipe.tabIndex = -1;
    firstNewRecipe.focus();
  }
});
loadDiffSample("javascript");
renderDiffRecipes();

// Git playground
let labIndex = 0;
function renderLabButtons() {
  $("#labActions").innerHTML = labSteps.map((step, index) => `<button class="lab-command-button ${step.kind === "edit" ? "is-edit" : ""} ${index === labIndex ? "is-next" : ""} ${index < labIndex ? "is-done" : ""}" type="button" data-step="${index}" ${index !== labIndex ? "disabled" : ""}>${escapeHTML(step.command)}</button>`).join("");
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
    nodes.push({ x: 22, y: 56, label: "first commit", id: "a1b2c3d", type: "main", branch: mode === "first" ? "main • HEAD" : (mode === "branch" ? "main • feature/navbar • HEAD" : (mode === "back-main" ? "main • HEAD" : "main")) });
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
  output.insertAdjacentHTML("beforeend", `<p class="lab-command ${step.kind === "edit" ? "lab-edit" : ""}"><span>${step.kind === "edit" ? "✎" : "$"}</span> ${escapeHTML(step.command)}</p>${step.output.map((line, lineIndex) => `<p class="${lineIndex ? "lab-info" : "lab-success"}">${escapeHTML(line)}</p>`).join("")}`);
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
  window.requestAnimationFrame(() => {
    if (labIndex >= labSteps.length) {
      $("#labStep").tabIndex = -1;
      $("#labStep").focus();
    } else {
      $(`.lab-command-button[data-step="${labIndex}"]`)?.focus();
    }
  });
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
  $("#labExplainer").innerHTML = '<span>What just happened?</span><p>Git has not started tracking this folder yet. <code>git init -b main</code> creates a hidden <code>.git</code> database and names the initial branch.</p>';
  renderLabGraph();
  renderLabButtons();
}
$("#resetLab").addEventListener("click", resetLab);
resetLab();

// Rescue center
let activeFixId = fixData[0].id;
function renderFixDetail(item) {
  const codeHtml = escapeHTML(item.code).replace(/^#(.*)$/gm, '<span class="comment">#$1</span>').replace(/^(git .*)$/gm, '<span class="cmd">$1</span>');
  const diagnosticCommands = fixDiagnosticCommands[item.id];
  const copyButton = diagnosticCommands ? `<button class="copy-button" type="button" title="Copy diagnostics only" aria-label="Copy non-destructive diagnostic commands">${icons.copy}</button>` : "";
  $("#fixDetail").innerHTML = `<div class="fix-detail__meta"><span class="severity severity--${item.severity}">${item.severity === "safe" ? "Safe approach" : "Use with care"}</span><span>• ${item.subtitle}</span></div>
    <h3 id="fixDetailTitle">${item.title}</h3><p class="fix-detail__summary">${item.summary}</p>
    <h4>What you might see</h4><div class="error-box">${escapeHTML(item.error).replace(/\n/g, "<br>")}</div>
    <h4>Safe recovery steps</h4><div class="solution-code">${codeHtml}${copyButton}</div>
    ${diagnosticCommands ? '<p class="copy-safety-note">The copy button includes diagnostics only. Choose corrective steps after reviewing their comments and your repository state.</p>' : ""}
    <div class="fix-detail__why"><strong>Why this works:</strong> ${item.why}</div>
    ${item.warning ? `<div class="danger-note">${icons.warning}<span>${item.warning}</span></div>` : ""}`;
  $(".solution-code .copy-button", $("#fixDetail"))?.addEventListener("click", () => copyText(diagnosticCommands, "Diagnostic commands copied"));
}

function renderFixes() {
  const query = $("#fixSearch").value.trim().toLowerCase();
  const filtered = fixData.filter(item => `${item.title} ${item.subtitle} ${item.error} ${item.keywords}`.toLowerCase().includes(query));
  if (!filtered.some(item => item.id === activeFixId)) activeFixId = filtered[0]?.id;
  $("#fixList").innerHTML = filtered.map(item => `<button class="fix-tab ${item.id === activeFixId ? "is-active" : ""}" style="--fix-color:${item.color}" type="button" aria-pressed="${item.id === activeFixId}" aria-controls="fixDetail" data-fix="${item.id}"><span class="fix-tab__icon">${item.icon}</span><span class="fix-tab__text"><strong>${item.title}</strong><small>${item.subtitle}</small></span>${icons.chevron}</button>`).join("");
  $("#fixEmpty").hidden = filtered.length > 0;
  $(".fix-layout").hidden = filtered.length === 0;
  $$('.fix-tab').forEach(button => button.addEventListener("click", () => {
    activeFixId = button.dataset.fix;
    renderFixes();
    $(`.fix-tab[data-fix="${activeFixId}"]`)?.focus();
  }));
  const active = fixData.find(item => item.id === activeFixId);
  if (active) renderFixDetail(active);
}
$("#fixSearch").addEventListener("input", renderFixes);
$("#heroFixCount").textContent = fixData.length;
renderFixes();

const errorExamples = {
  rejected: "! [rejected] main -> main (non-fast-forward) failed to push some refs",
  conflict: "CONFLICT (content): Merge conflict Automatic merge failed",
  lost: "My recent commit disappeared after reset and is missing from git log"
};

function normalizeDoctorText(value) {
  return value.toLowerCase().replace(/[^a-z0-9@._/-]+/g, " ").trim();
}

function closestFixForError(value) {
  const normalized = normalizeDoctorText(value);
  const stopWords = new Set(["git", "error", "failed", "fatal", "branch", "commit", "remote", "working", "tree", "file", "files", "command"]);
  const tokens = normalized.split(/\s+/).filter(token => token.length > 2 && !stopWords.has(token));
  const aliases = {
    "push-rejected": ["rejected", "non-fast-forward", "failed to push"],
    "merge-conflict": ["conflict", "automatic merge failed", "both modified"],
    "lost-commit": ["lost commit", "disappeared", "reflog", "after reset"],
    "ssh-denied": ["publickey", "permission denied", "ssh"],
    "repo-not-found": ["repository not found", "404"],
    "not-repository": ["not a git repository", ".git"],
    "unfinished-operation": ["already a rebase", "in progress", "rebase-merge"],
    "refspec-main": ["src refspec", "does not match any"]
  };
  return fixData.map(item => {
    const haystack = normalizeDoctorText(`${item.title} ${item.subtitle} ${item.error} ${item.summary} ${item.keywords}`);
    let score = tokens.reduce((total, token) => total + (haystack.includes(token) ? (token.length > 7 ? 3 : 1) : 0), 0);
    let aliasMatches = 0;
    (aliases[item.id] || []).forEach(alias => {
      if (normalized.includes(alias)) {
        score += 8;
        aliasMatches += 1;
      }
    });
    const normalizedError = normalizeDoctorText(item.error);
    const exactError = Boolean(normalizedError && normalized.includes(normalizedError));
    if (exactError) score += 20;
    return { item, score, confident: exactError || aliasMatches > 0 || (tokens.length >= 2 && score >= 6) };
  }).sort((a, b) => b.score - a.score)[0];
}

function diagnoseError() {
  const value = $("#errorDoctorInput").value.trim();
  const result = $("#errorDoctorResult");
  if (!value) {
    result.hidden = false;
    result.innerHTML = "<strong>Add the terminal message first.</strong><span>Even one distinctive line is enough to begin a local match.</span>";
    $("#errorDoctorInput").focus();
    return;
  }
  const match = closestFixForError(value);
  if (!match || !match.confident) {
    result.hidden = false;
    result.innerHTML = '<strong>No confident match yet.</strong><span>Try the exact line beginning with “fatal:” or “error:”, or search the recovery library below.</span>';
    return;
  }
  activeFixId = match.item.id;
  $("#fixSearch").value = "";
  renderFixes();
  result.hidden = false;
  result.innerHTML = `<strong>Likely match: ${escapeHTML(match.item.title)}</strong><span>${escapeHTML(match.item.summary)} The matching guide is selected below; begin with its diagnostic checks.</span><a href="#fixDetail">Open selected guide →</a>`;
  document.dispatchEvent(new CustomEvent("gitquest:skill", {
    detail: { source: "error-doctor", id: `diagnosis:${match.item.id}`, skill: "recovery-diagnosis" }
  }));
}

$$('[data-error-example]').forEach(button => button.addEventListener("click", () => {
  $("#errorDoctorInput").value = errorExamples[button.dataset.errorExample] || "";
  diagnoseError();
}));
$("#diagnoseError").addEventListener("click", diagnoseError);
$("#errorDoctorInput").addEventListener("keydown", event => {
  if (event.key === "Enter" && (event.ctrlKey || event.metaKey)) diagnoseError();
});

// Quiz
let quizIndex = 0;
let quizScore = 0;
let answered = false;
function savedQuizScore() {
  const value = Number(storageGet("gitquest-best-score", "0"));
  return Number.isInteger(value) && value >= 0 && value <= quizData.length ? value : 0;
}

const bestScore = savedQuizScore();
$("#bestScore").textContent = bestScore ? `${bestScore}/${quizData.length}` : "—";

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
    const optionText = item.options[index];
    if (index === item.answer) button.setAttribute("aria-label", `${optionText}. Correct answer.`);
    else if (index === selected) button.setAttribute("aria-label", `${optionText}. Your answer; incorrect.`);
  });
  const feedback = $("#quizFeedback");
  feedback.style.setProperty("--feedback-color", correct ? "var(--green)" : "var(--orange)");
  feedback.innerHTML = `<strong>${correct ? "Correct." : "Not quite."}</strong> ${item.explanation}`;
  feedback.hidden = false;
  $("#quizLiveScore").textContent = `Score: ${quizScore}`;
  $("#quizNext").disabled = false;
  $("#quizNext").focus();
}

function showQuizResult() {
  const percentage = (quizScore / quizData.length) * 100;
  const messages = quizScore === quizData.length ? ["Perfect merge!", "You made every call with confidence."] : quizScore >= Math.ceil(quizData.length * .6) ? ["Solid foundation", "You are ready to practise these workflows in a real repository."] : ["Good first commit", "Review the academy, diff guide, and rescue recipes, then try again."];
  const previousBest = savedQuizScore();
  if (quizScore > previousBest) storageSet("gitquest-best-score", String(quizScore));
  if (quizScore >= Math.ceil(quizData.length * .8) && !masteryState.evidence.includes("assessment:quiz-80")) {
    masteryState.evidence = [...masteryState.evidence, "assessment:quiz-80"];
    saveMasteryState();
  }
  updateMasteryDashboard();
  $("#bestScore").textContent = `${Math.max(quizScore, previousBest)}/${quizData.length}`;
  $("#quizCard").innerHTML = `<div class="quiz-result" role="status" aria-live="polite" tabindex="-1"><div class="quiz-result__ring" style="--score:${percentage}%"><strong>${quizScore}/${quizData.length}</strong></div><h3>${messages[0]}</h3><p>${messages[1]}</p><button class="button button--primary" id="quizRestart" type="button">Try the quiz again ↻</button></div>`;
  $("#quizRestart").addEventListener("click", restartQuiz);
  $(".quiz-result").focus();
}

$("#quizNext").addEventListener("click", () => {
  if (!answered) return;
  if (quizIndex === quizData.length - 1) showQuizResult();
  else {
    quizIndex += 1;
    renderQuiz();
    $("#quizQuestion").tabIndex = -1;
    $("#quizQuestion").focus();
  }
});

function restartQuiz() {
  quizIndex = 0;
  quizScore = 0;
  $("#quizCard").innerHTML = `<div class="quiz-card__top"><span id="quizCounter"></span><span id="quizTopic"></span></div><div class="quiz-progress"><span id="quizProgress"></span></div><h3 id="quizQuestion"></h3><div class="quiz-options" id="quizOptions"></div><div class="quiz-feedback" id="quizFeedback" role="status" aria-live="polite" hidden></div><div class="quiz-card__footer"><span id="quizLiveScore">Score: 0</span><button class="button button--primary" id="quizNext" type="button" disabled>Next question <span>→</span></button></div>`;
  $("#quizNext").addEventListener("click", () => {
    if (!answered) return;
    if (quizIndex === quizData.length - 1) showQuizResult();
    else {
      quizIndex += 1;
      renderQuiz();
      $("#quizQuestion").tabIndex = -1;
      $("#quizQuestion").focus();
    }
  });
  renderQuiz();
  $("#quizQuestion").tabIndex = -1;
  $("#quizQuestion").focus();
}
renderQuiz();
