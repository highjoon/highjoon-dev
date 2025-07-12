export async function handleFetchError(response: Response) {
  if (response.ok) {
    return response;
  }

  let errorMessage = `HTTP error! status: ${response.status}`;

  try {
    const errorData = await response.json();
    errorMessage = errorData.message || errorMessage;
  } catch {
    // JSON 파싱 실패 시 기본 메시지 사용
  }

  throw new Error(errorMessage);
}
