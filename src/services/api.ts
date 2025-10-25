// API Service for Research AI Agent Backend

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

export interface SessionResponse {
  session_id: string;
  thread_id: string;
  created_at: string;
  message: string;
}

export interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

export interface ChatResponse {
  response: string;
  tools_used: string[];
  papers_found: string[];
  pdf_path: string | null;
}

export interface SessionStatus {
  session_id: string;
  chat_history: ChatMessage[];
  tools_used: string[];
  papers_found: string[];
  pdf_path: string | null;
  created_at: string;
}

export interface StreamEvent {
  type: 'message' | 'tool' | 'pdf' | 'done' | 'error';
  content?: string;
  tool_name?: string;
  pdf_path?: string;
  message?: string;
}

class ResearchAPIService {
  private baseUrl: string;

  constructor(baseUrl: string = API_BASE_URL) {
    this.baseUrl = baseUrl;
  }

  /**
   * Create a new research session
   */
  async createSession(): Promise<SessionResponse> {
    const response = await fetch(`${this.baseUrl}/sessions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to create session: ${response.statusText}`);
    }

    return response.json();
  }

  /**
   * Get session status
   */
  async getSessionStatus(sessionId: string): Promise<SessionStatus> {
    const response = await fetch(`${this.baseUrl}/sessions/${sessionId}`);

    if (!response.ok) {
      throw new Error(`Failed to get session status: ${response.statusText}`);
    }

    return response.json();
  }

  /**
   * Delete a session
   */
  async deleteSession(sessionId: string): Promise<{ message: string; session_id: string }> {
    const response = await fetch(`${this.baseUrl}/sessions/${sessionId}`, {
      method: 'DELETE',
    });

    if (!response.ok) {
      throw new Error(`Failed to delete session: ${response.statusText}`);
    }

    return response.json();
  }

  /**
   * Send a chat message
   */
  async sendMessage(sessionId: string, message: string): Promise<ChatResponse> {
    const response = await fetch(`${this.baseUrl}/chat`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        session_id: sessionId,
        message,
      }),
    });

    if (!response.ok) {
      throw new Error(`Failed to send message: ${response.statusText}`);
    }

    return response.json();
  }

  /**
   * Stream chat response (Server-Sent Events)
   */
  async streamMessage(
    sessionId: string,
    message: string,
    onEvent: (event: StreamEvent) => void
  ): Promise<void> {
    const response = await fetch(`${this.baseUrl}/chat/stream`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        session_id: sessionId,
        message,
      }),
    });

    if (!response.ok) {
      throw new Error(`Failed to stream message: ${response.statusText}`);
    }

    const reader = response.body?.getReader();
    const decoder = new TextDecoder();

    if (!reader) {
      throw new Error('No response body');
    }

    try {
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value);
        const lines = chunk.split('\n');

        for (const line of lines) {
          if (line.startsWith('data: ')) {
            const data = line.slice(6);
            try {
              const event: StreamEvent = JSON.parse(data);
              onEvent(event);
            } catch (e) {
              console.error('Failed to parse SSE data:', e);
            }
          }
        }
      }
    } finally {
      reader.releaseLock();
    }
  }

  /**
   * Execute a quick action
   */
  async executeQuickAction(
    sessionId: string,
    action: 'write_paper' | 'search_all'
  ): Promise<ChatResponse> {
    const response = await fetch(`${this.baseUrl}/quick-action`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        session_id: sessionId,
        action,
      }),
    });

    if (!response.ok) {
      throw new Error(`Failed to execute quick action: ${response.statusText}`);
    }

    return response.json();
  }

  /**
   * Download PDF
   */
  getPdfUrl(sessionId: string): string {
    return `${this.baseUrl}/pdf/${sessionId}`;
  }

  /**
   * Check health status
   */
  async checkHealth(): Promise<{ status: string; active_sessions: number; timestamp: string }> {
    const response = await fetch(`${this.baseUrl}/health`);

    if (!response.ok) {
      throw new Error(`Health check failed: ${response.statusText}`);
    }

    return response.json();
  }
}

// Export singleton instance
export const apiService = new ResearchAPIService();
