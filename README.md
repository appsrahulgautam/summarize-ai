<div align="center">
✨ AI-Powered PDF Summarizer SaaS
Transform Long PDFs into Clear, Actionable Summaries using AI
<br/>





![Next.js](https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![OpenAI](https://img.shields.io/badge/OpenAI-111111?style=for-the-badge&logo=openai&logoColor=white)
![Stripe](https://img.shields.io/badge/Stripe-635BFF?style=for-the-badge&logo=stripe&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white)
[![Live Demo](https://img.shields.io/badge/🚀_Live_Demo-Online-success?style=for-the-badge)](https://your-live-url.com)
[![Vercel](https://img.shields.io/badge/Vercel-Deployed-black?style=for-the-badge&logo=vercel)](https://your-live-url.com)







<br/>

🚀 Production-Ready · Subscription-Based · AI-Driven SaaS

</div>
🌈 Project Overview
<div align="center">

A full-stack AI SaaS platform that allows users to upload PDF documents and instantly receive
clean, easy-to-read summaries powered by OpenAI ChatGPT and Google Gemini AI.

Designed with real-world scalability, reliability, and monetization in mind.

</div>
📸 Product Preview
<div align="center">

🔥 These screenshots instantly increase client trust on Upwork

<img src="./screenshots/dashboard.png" width="85%" alt="Dashboard Preview" /> <br/><br/> <img src="./screenshots/upload-flow.png" width="85%" alt="PDF Upload Flow" /> <br/><br/> <img src="./screenshots/summary-result.png" width="85%" alt="AI Summary Output" /> </div>
🎥 Demo Video
<div align="center">

🎬 Short demo video showing the full flow (upload → summary)

▶ Watch Demo Video

</div>
🧩 High-Level Architecture
<div align="center">
Step	Description
1️⃣	User uploads a PDF file
2️⃣	UploadThing securely stores the file and returns a URL
3️⃣	LangChain extracts and parses full PDF text
4️⃣	OpenAI generates the summary
5️⃣	Gemini AI automatically takes over if OpenAI fails
6️⃣	Final formatted summary is delivered to the user
</div>
🔄 AI Processing Flow
<div align="center">
User
 ↓
PDF Upload
 ↓
UploadThing (File URL)
 ↓
LangChain (Text Extraction)
 ↓
OpenAI ChatGPT
   ↳ Automatic Fallback → Gemini AI
 ↓
Final AI Summary

</div>
🛠 Tech Stack
<div align="center">
🎨 Frontend

Next.js · React.js · TypeScript · Tailwind CSS

🧠 AI & Document Processing

OpenAI (ChatGPT) · Google Gemini API · LangChain SDK

📦 File Upload & Storage

UploadThing SDK

🗄 Database & Validation

PostgreSQL · Drizzle ORM · Zod

💳 Payments & SaaS

Stripe Payments · Stripe Subscriptions · Webhooks

</div>
🔐 Reliability & AI Fallback System
<div align="center">

✔ Dual AI provider support
✔ Automatic failover logic
✔ Graceful error handling
✔ Provider-agnostic AI architecture

</div>

This guarantees high availability even during rate limits or API outages.

💰 SaaS & Subscription Features
<div align="center">
Feature	Status
Free & Paid Plans	✅
Stripe Subscriptions	✅
Usage-Based Access Control	✅
Secure Webhooks	✅
Scalable User Accounts	✅
</div>
🎯 Why This Project Stands Out
<div align="center">

✔ Real production-grade SaaS architecture
✔ AI redundancy (OpenAI + Gemini)
✔ Clean, modern UI / UX
✔ End-to-end type safety
✔ Easy to extend & scale

</div>
🧪 Ideal Use Cases
<div align="center">

AI PDF Summarizers · Legal & Research Documents
Education Platforms · Internal Knowledge Tools
Subscription-Based AI Products




🏗️ System Architecture
<div align="center">
High-Level Architecture Diagram
</div>
┌─────────────────────┐
│        User         │
│  (Web Browser)      │
└─────────┬───────────┘
          │
          ▼
┌──────────────────────────────┐
│      Next.js Frontend        │
│  React • Tailwind • TS       │
└─────────┬────────────────────┘
          │
          ▼
┌──────────────────────────────┐
│     API / Server Actions     │
│  (Next.js App Router)        │
└─────────┬────────────────────┘
          │
          ├───────────────┐
          │               │
          ▼               ▼
┌───────────────────┐   ┌────────────────────┐
│   UploadThing     │   │    Stripe API       │
│  File Upload SDK  │   │ Payments & Subs     │
└─────────┬─────────┘   └─────────┬──────────┘
          │                       │
          ▼                       ▼
┌──────────────────────────────┐
│      Secure File URL         │
└─────────┬────────────────────┘
          │
          ▼
┌──────────────────────────────┐
│        LangChain SDK          │
│  PDF Parsing & Text Extract  │
└─────────┬────────────────────┘
          │
          ▼
┌──────────────────────────────┐
│      AI Orchestration        │
│                              │
│  ┌──────────────┐            │
│  │ OpenAI GPT   │            │
│  └──────┬───────┘            │
│         │  ❌ Failure        │
│         ▼                    │
│   ┌──────────────┐           │
│   │ Gemini AI    │           │
│   └──────────────┘           │
└─────────┬────────────────────┘
          │
          ▼
┌──────────────────────────────┐
│     PostgreSQL Database      │
│  Drizzle ORM • Zod Schema    │
└─────────┬────────────────────┘
          │
          ▼
┌──────────────────────────────┐
│     Final AI Summary         │
│  Stored & Returned to User  │
└──────────────────────────────┘

🧠 Architecture Highlights
<div align="center">
Layer	Responsibility
Frontend	UI, file selection, user interaction
Backend (Next.js)	Orchestration, auth, validation
UploadThing	Secure PDF upload & URL generation
LangChain	PDF text extraction & preprocessing
AI Layer	OpenAI primary + Gemini fallback
Database	Store summaries, users, subscriptions
Stripe	Payments, subscriptions, webhooks
</div>
🔐 Reliability by Design
<div align="center">

✔ AI provider failover
✔ Stateless processing pipeline
✔ Secure file handling
✔ Scalable SaaS architecture
✔ Production-grade error handling

</div>
📌 Why Clients Love This Architecture
<div align="center">

✅ No single AI point of failure
✅ Easily extendable (new AI models, file types)
✅ Clean separation of concerns
✅ Ready for scale & monetization

</div>




</div>
👨‍💻 Author
<div align="center">

Rahul Gautam
Full-Stack & AI SaaS Developer

Specialized in Next.js, AI integrations, and subscription-based platforms

</div>
🤝 Let’s Build Something Powerful
<div align="center">

Looking to build an AI SaaS, integrate OpenAI / Gemini,
or launch a subscription platform?

📩 Let’s talk.

</div>
