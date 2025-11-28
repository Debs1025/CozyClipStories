export const FONT_SIZES = {
  small: '14px',
  medium: '16px',
  large: '18px',
};

export function getFontSizePreference() {
  try {
    return localStorage.getItem('cozyclip-font-size') || 'medium';
  } catch {
    return 'medium';
  }
}

export function applyFontSize(sizeKey) {
  const value = FONT_SIZES[sizeKey] || FONT_SIZES.medium;
  document.documentElement.style.fontSize = value;
  try {
    localStorage.setItem('cozyclip-font-size', sizeKey);
  } catch {}
}

export function applyInitialFontSize() {
  const key = getFontSizePreference();
  const value = FONT_SIZES[key] || FONT_SIZES.medium;
  document.documentElement.style.fontSize = value;
}