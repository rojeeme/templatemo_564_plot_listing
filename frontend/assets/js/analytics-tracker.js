// Reusable function to send analytics events
function sendAnalyticsEvent(eventType, details = {}) {
  fetch('http://16.171.140.122:3001/events', { // Ensure this IP is correct
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      event_type: eventType,
      path: window.location.pathname,
      ...details,
    }),
  })
  .then(response => {
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.json();
  })
  .then(data => console.log('Analytics event sent:', data))
  .catch((error) => console.error('Error sending analytics event:', error));
}

document.addEventListener('DOMContentLoaded', () => {
  // Send a page view event when the page loads
  sendAnalyticsEvent('page_view');

  // Track clicks on all interactive elements using event delegation
  document.body.addEventListener('click', (event) => {
    // Find the closest ancestor that is a known interactive element
    const interactiveElement = event.target.closest(
      'a, button, [role="button"], input[type="button"], input[type="submit"], input[type="reset"], .naccs .menu div'
    );

    if (interactiveElement) {
      const elementId = interactiveElement.id || interactiveElement.closest('[id]')?.id || null;
      const textContent = interactiveElement.textContent.trim().substring(0, 100);

      sendAnalyticsEvent('element_click', {
        element_id: elementId,
        element_tag: interactiveElement.tagName,
        element_class: interactiveElement.className,
        text_content: textContent,
        href: interactiveElement.href || null,
      });
    }
  });

  // Track scroll events (debounced to prevent excessive calls)
  let scrollTimeout;
  window.addEventListener('scroll', () => {
    clearTimeout(scrollTimeout);
    scrollTimeout = setTimeout(() => {
      sendAnalyticsEvent('scroll', {
        scroll_y: window.scrollY,
        scroll_x: window.scrollX,
        document_height: document.documentElement.scrollHeight,
        document_width: document.documentElement.scrollWidth,
      });
    }, 200); // Send scroll event every 200ms of inactivity
  });
});