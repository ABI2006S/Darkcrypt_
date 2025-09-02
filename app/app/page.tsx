// If the original app/page.tsx contained the functional app UI, it was moved here via MoveFile.
// If this file already exists in your project, keep your existing content and remove this comment.
// This stub ensures the /app route loads even if the move didn't occur.
export default function AppHome() {
  return (
    <main className="px-6 py-12">
      <h1 className="text-2xl font-semibold">DarkCrypt App</h1>
      <p className="mt-2 text-sm text-muted-foreground">
        If you see this, the original app UI hasn't been moved here yet. Let me know and I will migrate it.
      </p>
    </main>
  )
}
