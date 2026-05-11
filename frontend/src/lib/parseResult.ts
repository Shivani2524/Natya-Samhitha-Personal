export function parseAIResponse(raw: string): string {
  if (!raw) return "";

  // Split off the ---RELATED--- section if present
  const relatedSplit = raw.split(/---RELATED---/i);
  let mainContent = relatedSplit[0].trim();
  const relatedContent = relatedSplit[1]?.trim() || "";

  // Parse the main explanation content
  let html = mainContent
    .replace(/\*\*(📜|🪷|✦|🤲|🌀|📚)\s(.+?)\*\*/g, '<strong aria-label="$2">$1 $2</strong>')
    .replace(/^- (.+)$/gm, '<li>$1</li>')
    // Group adjacent <li> elements into a single <ul>
    .replace(/(<li>[\s\S]+?<\/li>)(?=\s*(?!<li>))/g, '<ul>$1</ul>')
    .replace(/\*([^*]+)\*/g, '<em class="sanskrit-term">$1</em>')
    // "You might also explore" inline suggestions
    .replace(/💫\s*\*You might also explore: "(.+?)"\*/g,
      '<div class="next-suggestion" role="button" tabindex="0" data-topic="$1">💫 You might also explore: <em>"$1"</em></div>')
    .replace(/([\u0900-\u097F][^\n]+)/g, '<div class="sloka-block" lang="sa">$1</div>');

  // Parse the related topics into clickable question links
  if (relatedContent) {
    const questions = relatedContent
      .split("\n")
      .map((line) => line.replace(/^[-•*]\s*/, "").trim())
      .filter((line) => line.length > 0);

    if (questions.length > 0) {
      html += '<div class="related-topics">';
      html += '<strong aria-label="Related Topics">💫 Related Topics</strong>';
      html += '<div class="related-questions">';
      questions.forEach((q) => {
        html += `<div class="next-suggestion" role="button" tabindex="0" data-topic="${q.replace(/"/g, '&quot;')}">💫 ${q}</div>`;
      });
      html += '</div></div>';
    }
  }

  return html;
}
