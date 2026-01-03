<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>AI PDF Summarizer SaaS</title>
    <script src="https://cdn.tailwindcss.com"></script>
  </head>

  <body class="bg-neutral-950 text-neutral-100">

    <!-- HERO -->
    <section class="min-h-screen flex flex-col justify-center items-center text-center px-6">
      <h1 class="text-4xl sm:text-6xl font-extrabold tracking-tight">
        AI-Powered PDF Summarizer
      </h1>
      <p class="mt-6 max-w-2xl text-neutral-400 text-lg">
        Upload any PDF and get clean, human-readable summaries using
        <span class="text-white font-semibold">OpenAI & Gemini AI</span>
        with automatic fallback.
      </p>

      <div class="mt-10 flex gap-4">
        <a href="#workflow" class="px-6 py-3 rounded-xl bg-rose-600 hover:bg-rose-700 transition">
          See How It Works
        </a>
        <a href="#tech" class="px-6 py-3 rounded-xl border border-neutral-700 hover:bg-neutral-800 transition">
          Tech Stack
        </a>
      </div>
    </section>

    <!-- TECH STACK -->
    <section id="tech" class="py-24 px-6 max-w-6xl mx-auto">
      <h2 class="text-3xl font-bold text-center mb-16">
        Modern Production Tech Stack
      </h2>

      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div class="p-6 rounded-2xl bg-neutral-900 border border-neutral-800">
          <h3 class="font-semibold text-lg mb-2">Frontend</h3>
          <p class="text-neutral-400">
            Next.js • React • TypeScript • Tailwind CSS
          </p>
        </div>

        <div class="p-6 rounded-2xl bg-neutral-900 border border-neutral-800">
          <h3 class="font-semibold text-lg mb-2">AI & Processing</h3>
          <p class="text-neutral-400">
            OpenAI • Gemini API • LangChain
          </p>
        </div>

        <div class="p-6 rounded-2xl bg-neutral-900 border border-neutral-800">
          <h3 class="font-semibold text-lg mb-2">Backend</h3>
          <p class="text-neutral-400">
            PostgreSQL • Drizzle ORM • Zod
          </p>
        </div>

        <div class="p-6 rounded-2xl bg-neutral-900 border border-neutral-800">
          <h3 class="font-semibold text-lg mb-2">SaaS & Payments</h3>
          <p class="text-neutral-400">
            Stripe Payments • Subscriptions • Webhooks
          </p>
        </div>
      </div>
    </section>

    <!-- WORKFLOW -->
    <section id="workflow" class="py-24 px-6 bg-neutral-900">
      <h2 class="text-3xl font-bold text-center mb-20">
        AI Workflow Architecture
      </h2>

      <div class="max-w-4xl mx-auto space-y-6">
        <div class="p-6 rounded-xl border border-neutral-800">
          1️⃣ User uploads PDF → UploadThing generates secure file URL
        </div>
        <div class="p-6 rounded-xl border border-neutral-800">
          2️⃣ LangChain parses full text from PDF
        </div>
        <div class="p-6 rounded-xl border border-neutral-800">
          3️⃣ Text sent to OpenAI ChatGPT for summarization
        </div>
        <div class="p-6 rounded-xl border border-neutral-800">
          4️⃣ If OpenAI fails → automatic fallback to Gemini AI
        </div>
        <div class="p-6 rounded-xl border border-neutral-800">
          5️⃣ Final clean summary delivered to user
        </div>
      </div>
    </section>

    <!-- RELIABILITY -->
    <section class="py-24 px-6 max-w-5xl mx-auto text-center">
      <h2 class="text-3xl font-bold mb-8">
        Built for Reliability
      </h2>
      <p class="text-neutral-400 max-w-3xl mx-auto">
        The system intelligently switches between AI providers to ensure
        high success rates, even during outages, rate limits, or failures.
      </p>

      <div class="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div class="p-6 rounded-xl bg-neutral-900 border border-neutral-800">
          AI Fallback System
        </div>
        <div class="p-6 rounded-xl bg-neutral-900 border border-neutral-800">
          Graceful Error Handling
        </div>
        <div class="p-6 rounded-xl bg-neutral-900 border border-neutral-800">
          Production-Ready Architecture
        </div>
      </div>
    </section>

    <!-- CTA -->
    <section class="py-32 text-center bg-gradient-to-b from-neutral-900 to-neutral-950">
      <h2 class="text-4xl font-extrabold mb-6">
        Ready to Build an AI SaaS?
      </h2>
      <p class="text-neutral-400 mb-10">
        This project demonstrates real-world AI SaaS architecture,
        subscriptions, and scalable workflows.
      </p>

      <a class="px-10 py-4 rounded-xl bg-rose-600 hover:bg-rose-700 transition">
        View GitHub Repository
      </a>
    </section>

  </body>
</html>
