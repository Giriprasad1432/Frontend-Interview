export function getBlogsUrl(): string {
  // During local development use the json-server URL, in production use the serverless /api route
  // Vite exposes `import.meta.env.DEV` and `import.meta.env.PROD`.
  // Use DEV to detect development mode.
  // If you prefer a different behavior, update this helper.
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  if (typeof import.meta !== 'undefined' && import.meta.env && import.meta.env.DEV) {
    return 'http://localhost:3001/blogs';
  }
  return '/api/blogs';
}
