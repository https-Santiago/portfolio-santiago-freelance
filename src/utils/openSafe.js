export const openSafe = (url) => {
  if (/wa\.me|api\.whatsapp\.com/.test(url) && typeof window !== 'undefined' && window.fbq) {
    window.fbq('track', 'Lead', {content_category: 'Edición de Video'})
  }
  const a = document.createElement('a')
  a.href = url
  a.target = '_blank'
  a.rel = 'noopener noreferrer'
  a.click()
}
