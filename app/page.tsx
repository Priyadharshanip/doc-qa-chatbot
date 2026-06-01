import Link from 'next/link'

export default function HomePage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 text-white flex flex-col">
      {/* Navbar */}
      <nav className="flex items-center justify-between px-8 py-5 border-b border-white/10">
        <div className="flex items-center gap-2">
          <span className="text-2xl">📚</span>
          <span className="font-bold text-lg tracking-tight">DocuChat AI</span>
        </div>
        <Link
          href="/dashboard"
          className="bg-blue-600 hover:bg-blue-500 transition-colors px-5 py-2 rounded-xl text-sm font-medium"
        >
          Get Started
        </Link>
      </nav>

      {/* Hero */}
      <section className="flex-1 flex flex-col items-center justify-center text-center px-4 py-20">
        <div className="inline-block bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-medium px-4 py-1.5 rounded-full mb-6">
          Powered by RAG + Groq LLaMA
        </div>

        <h1 className="text-5xl md:text-6xl font-bold tracking-tight mb-6 max-w-3xl leading-tight">
          Chat with your
          <span className="text-blue-400"> Documents </span>
          using AI
        </h1>

        <p className="text-slate-400 text-lg max-w-xl mb-10 leading-relaxed">
          Upload any PDF and instantly ask questions. Get accurate answers with
          cited sources — powered by Retrieval-Augmented Generation.
        </p>

        <div className="flex gap-4 flex-wrap justify-center">
          <Link
            href="/dashboard"
            className="bg-blue-600 hover:bg-blue-500 transition-all px-8 py-3.5 rounded-xl font-semibold text-base shadow-lg shadow-blue-600/20"
          >
            Try it free
          </Link>
          <a
            href="https://github.com/YOUR_USERNAME/doc-qa-chatbot"
            target="_blank"
            rel="noreferrer"
            className="bg-white/5 hover:bg-white/10 border border-white/10 transition-all px-8 py-3.5 rounded-xl font-semibold text-base"
          >
            View on GitHub
          </a>
        </div>
      </section>

      {/* How it works */}
      <section className="px-8 py-16 border-t border-white/10">
        <h2 className="text-center text-2xl font-bold mb-12 text-white">How it works</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {[
            {
              icon: '📤',
              step: '01',
              title: 'Upload your PDF',
              desc: 'Drop any PDF document — resume, research paper, contract, notes, anything.',
            },
            {
              icon: '🧠',
              step: '02',
              title: 'AI processes it',
              desc: 'Document is chunked, embedded, and stored in a vector database using RAG.',
            },
            {
              icon: '💬',
              step: '03',
              title: 'Ask anything',
              desc: 'Ask questions in plain English and get cited answers instantly.',
            },
          ].map((item) => (
            <div
              key={item.step}
              className="bg-white/5 border border-white/10 rounded-2xl p-6 flex flex-col gap-3"
            >
              <div className="flex items-center justify-between">
                <span className="text-3xl">{item.icon}</span>
                <span className="text-blue-500/50 font-bold text-xl">{item.step}</span>
              </div>
              <h3 className="font-semibold text-white text-lg">{item.title}</h3>
              <p className="text-slate-400 text-sm leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Tech stack */}
      <section className="px-8 py-12 border-t border-white/10">
        <p className="text-center text-slate-500 text-sm mb-6">Built with</p>
        <div className="flex flex-wrap justify-center gap-3">
          {['Next.js 14', 'LangChain', 'Pinecone', 'Groq LLaMA', 'HuggingFace', 'Tailwind CSS'].map((tech) => (
            <span
              key={tech}
              className="bg-white/5 border border-white/10 text-slate-300 text-xs px-4 py-2 rounded-full"
            >
              {tech}
            </span>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="text-center text-slate-600 text-xs py-6 border-t border-white/5">
        Built by Priyadharshani P · {new Date().getFullYear()}
      </footer>
    </main>
  )
}
