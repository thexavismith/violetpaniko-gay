// Signup forms post to Substack in a new tab; swap this page's form for the confirmation.
document.querySelectorAll('[data-signup]').forEach((signup) => {
  const form = signup.querySelector('form');
  form.addEventListener('submit', () => {
    // Let the submit go through first, then show the confirmation.
    setTimeout(() => {
      signup.querySelector('[data-signup-form]').hidden = true;
      signup.querySelector('[data-signup-done]').hidden = false;
    }, 0);
  });
});
