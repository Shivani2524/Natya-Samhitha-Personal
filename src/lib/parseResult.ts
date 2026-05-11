export function parseAIResponse(raw: string): string {
  if (!raw) return "";
  return raw
    .replace(/\*\*(📜|🪷|✦|🤲|🌀|📚)\s(.+?)\*\*/g, '<strong aria-label="$2">$1 $2</strong>')
    .replace(/^- (.+)$/gm, '<li>$1</li>')
    // Group adjacent <li> elements into a single <ul>
    .replace(/(<li>[\s\S]+?<\/li>)(?=\s*(?!<li>))/g, '<ul>$1</ul>')
    .replace(/\*([^*]+)\*/g, '<em class="sanskrit-term">$1</em>')
    // We use a data attribute instead of onclick for React compatibility
    .replace(/💫\s*\*You might also explore: "(.+?)"\*/g,
      '<div class="next-suggestion" role="button" tabindex="0" data-topic="$1">💫 You might also explore: <em>"$1"</em></div>')
    .replace(/([\u0900-\u097F][^\n]+)/g, '<div class="sloka-block" lang="sa">$1</div>');
}
