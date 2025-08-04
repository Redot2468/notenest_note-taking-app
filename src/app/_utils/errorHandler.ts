// utils/errorHandler.ts
export interface AppError {
  message: string;
  userMessage: string;
  code?: string;
  statusCode?: number;
  cause?: string | unknown;
}

interface SupabaseError {
  code?: string;
  message: string;
  details?: string;
  hint?: string;
}

function isSupabaseError(error: unknown): error is SupabaseError {
  return (
    typeof error === "object" &&
    error !== null &&
    "code" in error &&
    "message" in error
  );
}

export function handleDrizzleError(error: unknown): AppError {
  console.error("Database error:", error);

  // Network/Connection errors
  if (error instanceof Error && error.message.includes("network")) {
    return {
      message: error.message,
      userMessage:
        "Unable to connect to the database. Please check your connection.",
      code: "NETWORK_ERROR",
      statusCode: 503,
    };
  }

  // Supabase specific errors
  if (isSupabaseError(error)) {
    const supabaseError = error;

    switch (supabaseError.code) {
      case "PGRST116":
        return {
          message: supabaseError.message,
          userMessage: "No notes found.",
          code: "NOT_FOUND",
          statusCode: 404,
        };
      case "PGRST301":
        return {
          message: supabaseError.message,
          userMessage: "You do not have permission to access these notes.",
          code: "UNAUTHORIZED",
          statusCode: 401,
        };
      default:
        return {
          message: supabaseError.message,
          userMessage: "Something went wrong while loading your notes.",
          code: supabaseError.code,
          statusCode: 500,
        };
    }
  }

  // Generic fallback
  return {
    message: error instanceof Error ? error.message : "Unknown error",
    userMessage:
      "Something went wrong while loading your notes. Please try again.",
    code: "UNKNOWN_ERROR",
    statusCode: 500,
    cause: error instanceof Error && error?.cause,
  };
}
