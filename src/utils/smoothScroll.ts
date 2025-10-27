export function smoothScrollToElement(elementId: string, offset: number = 80) {
  const element = document.getElementById(elementId);
  if (element) {
    const elementPosition = element.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.pageYOffset - offset;

    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth'
    });
  }
}

export function handleAnchorClick(href: string) {
  // Check if the link contains an anchor
  if (href.includes('#')) {
    const [path, anchor] = href.split('#');
    
    // If we're on the same page, just scroll to the element
    if (path === window.location.pathname || path === '') {
      smoothScrollToElement(anchor);
      return true; // Prevent default link behavior
    }
  }
  
  return false; // Allow default link behavior
}