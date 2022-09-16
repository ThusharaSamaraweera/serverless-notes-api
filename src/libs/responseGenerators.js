export function createErrorResponse(message, description) {
  return {
    status: "error",
    message: message || "Internal server error",
    description: description || "No additional description",
  };
}

export function createSuccessResponse(data) {
  return {
    status: "success",
    data: data,
  };
}
