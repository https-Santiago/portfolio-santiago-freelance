export const openSafe = (url) => {
  if (/wa\.me|api\.whatsapp\.com/.test(url) && typeof window !== 'undefined' && window.fbq) {
    window.fbq('track', 'Lead')
  }
  const a = document.createElement('a')
  a.href = url
  a.target = '_blank'
  a.rel = 'noopener noreferrer'
  a.click()
}
