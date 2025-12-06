import { motion } from "framer-motion";

export default function AboutApp() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-16 space-y-10">
      
      {/* ===================== */}
      {/* HEADER */}
      {/* ===================== */}
      <header>
        <motion.h1
          className="text-4xl font-extrabold text-gray-900"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          About This Application
        </motion.h1>

        <motion.p
          className="mt-4 text-gray-600 text-lg"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
        >
          Bira is a full-stack task manager built using React on the frontend and
          Django REST Framework on the backend. Authentication is powered by a
          modern and secure <strong>JWT-based system</strong>, replacing the older,
          error-prone CSRF/session approach. The backend also includes a
          production-ready scheduler to deliver automated email notifications such
          as reminders and task updates.
        </motion.p>
      </header>

      {/* ===================== */}
      {/* CORE FEATURES */}
      {/* ===================== */}
      <section>
        <h2 className="text-2xl font-bold text-gray-800">Core Features</h2>
        <ul className="list-disc ml-6 mt-3 text-gray-600 leading-relaxed space-y-1">
          <li>Create, update and delete tasks with ease.</li>
          <li>Assign severity levels (P0, P1, P2) based on urgency.</li>
          <li>Pin important tasks to always keep them visible.</li>
          <li>Track completion status and manage tasks effectively.</li>
          <li>Add detailed notes to any task for extra clarity.</li>
          <li>Clean and responsive UI built with React + Tailwind CSS.</li>
        </ul>
      </section>

      {/* ===================== */}
      {/* EMAIL SYSTEM */}
      {/* ===================== */}
      <section>
        <h2 className="text-2xl font-bold text-gray-800">
          Email Notifications & Automated Scheduling
        </h2>

        <div className="mt-4 space-y-6 text-gray-600 leading-relaxed">

          {/* Welcome Email */}
          <div>
            <h3 className="font-semibold text-gray-800">📨 Welcome Email</h3>
            <p>
              When a user registers, they instantly receive a personalized
              <strong> welcome email</strong>. Emails are powered through
              SendGrid for high delivery reliability and scalability.
            </p>
          </div>

          {/* Task Created Email */}
          <div>
            <h3 className="font-semibold text-gray-800">🆕 Task Created Email</h3>
            <p>
              When you create a new task, the system sends a structured
              <strong> task creation email</strong> that includes the title,
              description, and deadline (if available).
            </p>
          </div>

          {/* Deadline Reminder */}
          <div>
            <h3 className="font-semibold text-gray-800">⏰ Deadline Reminder</h3>
            <p>
              For tasks with deadlines, an automated reminder email is scheduled
              exactly <strong>1 hour before the deadline</strong>. This ensures
              that no important task slips through.
            </p>
          </div>

          {/* Severity Reminders */}
          <div>
            <h3 className="font-semibold text-gray-800">
              🚨 Severity-Based Repeating Reminders
            </h3>
            <p>
              Depending on severity, Bira sends repeated reminder emails:
            </p>

            <ul className="list-disc ml-6 mt-2 space-y-2">
              <li>
                <strong>P0 (Critical):</strong> every <strong>3 hours</strong>.
              </li>
              <li>
                <strong>P1 (Medium):</strong> every <strong>7 hours</strong>.
              </li>
              <li>
                <strong>P2 (Low):</strong> once daily.
              </li>
            </ul>

            <p className="mt-2">
              When severity changes, all older reminder schedules are cleared and
              new ones are created instantly — keeping everything accurate.
            </p>
          </div>
        </div>
      </section>

      {/* ===================== */}
      {/* SECURITY */}
      {/* ===================== */}
      <section>
        <h2 className="text-2xl font-bold text-gray-800">
          Security & Authentication
        </h2>

        <div className="mt-4 space-y-6 text-gray-600 leading-relaxed">

          {/* JWT Auth */}
          <div>
            <h3 className="font-semibold text-gray-800">🔐 JWT Authentication</h3>
            <p>
              Instead of slow, cookie-based sessions and CSRF tokens, Bira uses a
              modern <strong>JWT authentication system</strong>:
            </p>
            <ul className="list-disc ml-6 mt-2 space-y-1">
              <li>Access Token: Valid for a short period for security.</li>
              <li>Refresh Token: Stored safely on client and rotated when needed.</li>
              <li>No CSRF issues, no cookie conflicts, no SameSite problems.</li>
            </ul>
            <p className="mt-2">
              This makes the app more secure, more scalable, and easier to deploy
              across different platforms (Railway, Vercel, etc.).
            </p>
          </div>

          {/* API Security */}
          <div>
            <h3 className="font-semibold text-gray-800">🛡️ API Protection</h3>
            <p>
              Every task, note, and update request requires a valid JWT access
              token. Unauthorized users cannot access any protected endpoint.
            </p>
          </div>

          {/* CORS */}
          <div>
            <h3 className="font-semibold text-gray-800">🌐 Strict CORS Rules</h3>
            <p>
              Only approved frontend domains (e.g.
              <code> bira-frontend-xxxx.vercel.app </code>) can communicate with
              the backend. All other origins are blocked by default.
            </p>
          </div>

          {/* Scheduler */}
          <div>
            <h3 className="font-semibold text-gray-800">🕒 Background Scheduler</h3>
            <p>
              A persistent APScheduler worker handles all email reminders and
              recurring jobs, ensuring reliability even during long-running
              deployments.
            </p>
          </div>
        </div>
      </section>

      {/* ===================== */}
      {/* WHY IT MATTERS */}
      {/* ===================== */}
      <section>
        <h2 className="text-2xl font-bold text-gray-800">Why This Matters</h2>
        <p className="mt-3 text-gray-600 leading-relaxed">
          Tasks often contain private and time-sensitive information. Using JWT
          authentication, secure APIs, and automated reminders ensures that your
          workflow stays protected, organized, and efficient — without any manual
          follow-ups or missed deadlines.
        </p>
      </section>

      {/* ===================== */}
      {/* CTA */}
      {/* ===================== */}
      <div className="pt-4">
        <a
          href="/tasks"
          className="inline-block px-5 py-3 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700"
        >
          Go to Tasks →
        </a>
      </div>

    </div>
  );
}
