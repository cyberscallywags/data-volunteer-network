#!/usr/bin/env bash
# Branch names: feature/, bug/, task/, docs/ or refactor/ + a lower-case name, e.g. feature/add-login.
# Used by CI (the branch-name job) and the pre-push hook (.pre-commit-config.yaml).
#
#     scripts/check_branch_name.sh feature/add-login        # or refs/heads/feature/add-login
set -euo pipefail

ref="${1:?usage: check_branch_name.sh <branch>}"
[[ "$ref" == refs/tags/* ]] && exit 0  # tags are not branches
branch="${ref#refs/heads/}"

if [[ "$branch" == main || "$branch" =~ ^(feature|bug|task|docs|refactor)/[a-z0-9._-]+$ ]]; then
  echo "Branch name OK: $branch"
else
  [[ -n "${GITHUB_ACTIONS:-}" ]] && printf "::error::" >&2  # annotate the run on GitHub
  echo "Branch '$branch' must be feature/, bug/, task/, docs/ or refactor/ followed by a lower-case name, e.g. feature/add-login" >&2
  echo "Rename it: git branch -m <new-name>" >&2
  exit 1
fi
