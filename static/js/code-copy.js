// Add copy buttons to code blocks
document.addEventListener('DOMContentLoaded', function() {
  // Find all code blocks
  const codeBlocks = document.querySelectorAll('pre');
  
  codeBlocks.forEach(function(codeBlock) {
    // Create wrapper div if not already wrapped
    if (!codeBlock.parentElement.classList.contains('highlight')) {
      const wrapper = document.createElement('div');
      wrapper.className = 'highlight';
      codeBlock.parentNode.insertBefore(wrapper, codeBlock);
      wrapper.appendChild(codeBlock);
    }
    
    // Create copy button
    const copyButton = document.createElement('button');
    copyButton.className = 'code-copy-btn';
    copyButton.textContent = 'Copy';
    copyButton.setAttribute('aria-label', 'Copy code to clipboard');
    
    // Add click event
    copyButton.addEventListener('click', function() {
      // Get the code content
      const code = codeBlock.querySelector('code') || codeBlock;
      const textToCopy = code.textContent;
      
      // Copy to clipboard
      navigator.clipboard.writeText(textToCopy).then(function() {
        // Success feedback
        copyButton.textContent = 'Copied!';
        copyButton.style.background = 'rgba(34, 197, 94, 0.7)';
        
        setTimeout(function() {
          copyButton.textContent = 'Copy';
          copyButton.style.background = '';
        }, 2000);
      }).catch(function(err) {
        console.error('Failed to copy:', err);
        copyButton.textContent = 'Failed';
        setTimeout(function() {
          copyButton.textContent = 'Copy';
        }, 2000);
      });
    });
    
    // Insert copy button
    const parent = codeBlock.parentElement.classList.contains('highlight') 
      ? codeBlock.parentElement 
      : codeBlock;
    
    parent.style.position = 'relative';
    parent.appendChild(copyButton);
  });
});
