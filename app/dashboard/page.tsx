import FileUploader from '@/components/FileUploader'

export default function DashboardPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-white flex flex-col items-center justify-center px-4">
      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold text-gray-900 mb-3">
          📚 Document Q&A
        </h1>
        <p className="text-gray-500 text-lg">
          Upload a PDF and chat with it using AI
        </p>
      </div>
      <FileUploader />
    </main>
  )
}