const apiBaseUrl = import.meta.env.VITE_API_BASE_URL || ''

export function getChatApiUrl() {
  if (!apiBaseUrl) return '/chat'
  return `${apiBaseUrl.replace(/\/$/, '')}/chat`
}

export async function sendChatMessage(message, history = []) {
  const response = await fetch(getChatApiUrl(), {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ message, history }),
  })

  const data = await response.json().catch(() => ({}))

  if (!response.ok) {
    throw new Error(data.message || 'Failed to get AI response. Please try again.')
  }

  if (!data.reply) {
    throw new Error('Invalid response from chat server.')
  }

  return data.reply
}
