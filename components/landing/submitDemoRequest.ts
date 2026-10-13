/**
 * API client for demo request submission
 * Connects the landing page form to the SyncBe backend
 */

export type ApiResponse = 
  | { success: true; message: string }
  | { success: false; message: string; errors?: Record<string, string> };

export type DemoRequestPayload = {
  fullName: string;
  email: string;
  mobile: string;
  businessType: string;
  businessTypeOther?: string | null;
  currentTool: string | null;
};

/**
 * Submits a demo request to the backend API
 * 
 * @param data - Validated and normalized lead data
 * @returns Promise resolving to API response
 */
export async function submitDemoRequest(
  data: DemoRequestPayload
): Promise<ApiResponse> {
  const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
  
  if (!apiUrl) {
    console.error("NEXT_PUBLIC_API_BASE_URL is not configured");
    return {
      success: false,
      message: "API endpoint not configured. Please contact support.",
    };
  }

  try {
    const response = await fetch(`${apiUrl}/leads/demo-request`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        fullName: data.fullName,
        email: data.email,
        mobile: data.mobile,
        businessType: data.businessType,
        businessTypeOther: data.businessTypeOther || null,
        currentTool: data.currentTool,
      }),
    });

    // Parse JSON response
    const result = await response.json();

    // Success (201 Created)
    if (response.status === 201 && result.success) {
      return {
        success: true,
        message: result.message || "Your demo request has been received.",
      };
    }

    // Validation errors (400 Bad Request)
    if (response.status === 400 && result.errors) {
      return {
        success: false,
        message: result.message || "Please check the highlighted fields.",
        errors: result.errors,
      };
    }

    // Rate limit (429 Too Many Requests)
    if (response.status === 429) {
      return {
        success: false,
        message: result.message || "Too many requests. Please try again in a few minutes.",
      };
    }

    // Server error or other failures (500, 503, etc.)
    return {
      success: false,
      message: result.message || "Something went wrong. Please try again.",
    };
  } catch (error) {
    // Network error (fetch failed, timeout, etc.)
    console.error("Demo request submission failed:", error);
    return {
      success: false,
      message: "Unable to connect. Please check your internet connection and try again.",
    };
  }
}
