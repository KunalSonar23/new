#!/usr/bin/env bash
# simple-interest.sh
# Simple Interest Calculator
# Usage:
#   ./simple-interest.sh            # interactive mode
#   ./simple-interest.sh P R T      # non-interactive mode (principal rate time)
set -euo pipefail

usage() {
  cat <<EOF
Simple Interest Calculator
Usage:
  $0                # interactive mode (you will be prompted)
  $0 P R T          # non-interactive: principal, annual rate (%), time (years)
Example:
  $0 10000 5 3
EOF
  exit 1
}

is_number() {
  # allow integers and decimals, optional leading +/-
  [[ $1 =~ ^[+-]?[0-9]+([.][0-9]+)?$ ]]
}

if [[ "${1:-}" == "-h" || "${1:-}" == "--help" ]]; then
  usage
fi

if [[ $# -eq 3 ]]; then
  P="$1"
  R="$2"
  T="$3"
else
  read -rp "Enter Principal amount (P): " P
  read -rp "Enter Annual Rate (R %) : " R
  read -rp "Enter Time in years (T)  : " T
fi

# validate inputs
for val in "$P" "$R" "$T"; do
  if ! is_number "$val"; then
    echo "Error: '$val' is not a valid number. Use digits (optionally decimal)." >&2
    exit 2
  fi
done

# use awk for floating-point calculation (portable)
SI=$(awk -v p="$P" -v r="$R" -v t="$T" 'BEGIN { printf "%.2f", (p * r * t) / 100 }')
TOTAL=$(awk -v p="$P" -v si="$SI" 'BEGIN { printf "%.2f", p + si }')

echo "----------------------------------------"
echo "Principal (P) : $P"
echo "Rate (R %)    : $R"
echo "Time (years)  : $T"
echo "Simple Interest: $SI"
echo "Total Amount   : $TOTAL"
echo "----------------------------------------"
exit 0
