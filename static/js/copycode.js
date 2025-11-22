document.addEventListener('DOMContentLoaded', () => {
  const blocks = document.querySelectorAll('article.content pre, article.content .highlight pre, .post-content pre, .post-content .highlight pre');
  blocks.forEach((pre) => {
    if (pre.dataset.copyInjected) return;
    const code = pre.querySelector('code');
    const text = code ? code.innerText : pre.innerText;
    const btn = document.createElement('button');
    btn.className = 'code-copy-btn';
    btn.type = 'button';
    btn.textContent = 'Copy';
    btn.addEventListener('click', () => {
      navigator.clipboard.writeText(text).then(() => {
        const prev = btn.textContent;
        btn.textContent = 'Copied!';
        setTimeout(() => (btn.textContent = prev), 1200);
      });
    });
    pre.appendChild(btn);
    pre.dataset.copyInjected = 'true';
  });
});
