export function createErrorResponse(message) {
  return {
    status: "error",
    message: message || "Internal server error",
  };
}

export function createSuccessResponse(data) {
  return {
    status: "success",
    data: data,
  };
}
