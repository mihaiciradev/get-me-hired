const BACKEND_URL =
  process.env.NEXT_PUBLIC_BACKEND_URL ?? "http://127.0.0.1:3020";

export async function recommendJobs(cvFile: File) {
  const formData = new FormData();
  formData.append("cv", cvFile);

  const response = await fetch(`${BACKEND_URL}/recommend`, {
    method: "POST",
    body: formData,
  });

  if (!response.ok) {
    throw new Error(`API error: ${response.status}`);
  }

  return response.json();
}
