export function useHapticFeedback() {
  const vibrate = (pattern = 50) => {
    if (window.navigator.vibrate) {
      window.navigator.vibrate(pattern)
    }
  }

  const success = () => vibrate([50])
  const error = () => vibrate([100, 30, 100])
  const light = () => vibrate(25)
  const heavy = () => vibrate(75)

  return { success, error, light, heavy }
}
