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
          Bira is a full-stack task manager built with React (frontend) and
          Django (backend). It uses secure session-based authentication, CSRF
          protection, strict CORS rules, and a background scheduler to send
          automated email notifications based on task deadlines and severity.
        </motion.p>
      </header>

      {/* ===================== */}
      {/* CORE FEATURES */}
      {/* ===================== */}
      <section>
        <h2 className="text-2xl font-bold text-gray-800">Core Features</h2>
        <ul className="list-disc ml-6 mt-3 text-gray-600 leading-relaxed space-y-1">
          <li>Create, update and delete tasks easily.</li>
          <li>Assign severity levels (P0, P1, P2) based on urgency.</li>
          <li>Pin tasks to keep them at the top.</li>
          <li>Mark tasks as complete and manage them separately.</li>
          <li>Add detailed notes to any task for context.</li>
          <li>Clean and responsive UI built with React + Tailwind CSS.</li>
        </ul>
      </section>

      {/* ===================== */}
      {/* EMAIL & REMINDERS */}
      {/* ===================== */}
      <section>
        <h2 className="text-2xl font-bold text-gray-800">
          Email Notifications & Background Reminders
        </h2>

        <div className="mt-4 space-y-6 text-gray-600 leading-relaxed">

          {/* Welcome Email */}
          <div>
            <h3 className="font-semibold text-gray-800">📨 Welcome Email</h3>
            <p>
              When a user signs up, Django immediately sends a clean HTML
              <strong> welcome email</strong>. All email sending is handled via
              Gmail SMTP using a secure app password.
            </p>
          </div>

          {/* Task Created Email */}
          <div>
            <h3 className="font-semibold text-gray-800">🆕 Task Created Email</h3>
            <p>
              Whenever you create a new task, the system sends a detailed
              <strong> “Task Created”</strong> email with:
            </p>
            <ul className="list-disc ml-6 mt-2 space-y-1">
              <li>Task title</li>
              <li>Description</li>
              <li>Deadline (if any)</li>
            </ul>
          </div>

          {/* Deadline Reminder */}
          <div>
            <h3 className="font-semibold text-gray-800">⏰ Deadline Reminder</h3>
            <p>
              If a task has a deadline, a reminder email is scheduled exactly
              <strong> 1 hour before deadline</strong>. This uses a scheduled
              APScheduler job that runs in the background.
            </p>
          </div>

          {/* Severity Based Repeating Reminders */}
          <div>
            <h3 className="font-semibold text-gray-800">
              🚨 Severity-Based Repeating Reminders
            </h3>
            <p>The system sends recurring reminders depending on the severity:</p>

            <ul className="list-disc ml-6 mt-2 space-y-2">
              <li>
                <strong>P0 (Critical):</strong> reminder every <strong>3 hours</strong> until the deadline.
              </li>
              <li>
                <strong>P1 (Medium):</strong> reminder every <strong>7 hours</strong> until the deadline.
              </li>
              <li>
                <strong>P2 (Low):</strong> reminder <strong>once every day</strong> until the deadline.
              </li>
            </ul>

            <p className="mt-2">
              When severity is updated, all previous reminder jobs are cleared
              and new ones are scheduled instantly.
            </p>
          </div>

        </div>
      </section>

      {/* ===================== */}
      {/* SECURITY */}
      {/* ===================== */}
      <section>
        <h2 className="text-2xl font-bold text-gray-800">
          Security & Session Management
        </h2>

        <div className="mt-4 space-y-6 text-gray-600 leading-relaxed">

          {/* Session Auth */}
          <div>
            <h3 className="font-semibold text-gray-800">🔐 Session Authentication</h3>
            <p>
              Authentication is handled entirely through Django’s
              server-managed <strong>session cookies</strong>:
            </p>
            <ul className="list-disc ml-6 mt-2 space-y-1">
              <li>Browser automatically sends the session cookie.</li>
              <li>No tokens stored in localStorage (safer against XSS).</li>
              <li><code>/users/check-auth/</code> restores the session on reload.</li>
            </ul>
          </div>

          {/* CSRF */}
          <div>
            <h3 className="font-semibold text-gray-800">🛡️ CSRF Protection</h3>
            <p>
              A <code>csrftoken</code> cookie is set and automatically attached
              via an Axios interceptor. Every POST, PATCH, PUT and DELETE request
              includes <code>X-CSRFToken</code>, ensuring strong CSRF defense.
            </p>
          </div>

          {/* CORS */}
          <div>
            <h3 className="font-semibold text-gray-800">🌐 Strict CORS Rules</h3>
            <p>
              Only trusted frontend origins (e.g.{" "}
              <code>http://localhost:5173</code>) can access the backend. All
              unknown domains are blocked automatically.
            </p>
          </div>

          {/* Cookies */}
          <div>
            <h3 className="font-semibold text-gray-800">🍪 Cookie Security</h3>
            <p>
              Cookies use <strong>SameSite=Lax</strong> and Django session
              cookies are <strong>HttpOnly</strong> for protection against
              client-side attacks. In production, HTTPS and Secure cookies can be
              enabled.
            </p>
          </div>

        </div>
      </section>

      {/* ===================== */}
      {/* WHY IT MATTERS */}
      {/* ===================== */}
      <section>
        <h2 className="text-2xl font-bold text-gray-800">Why It All Matters</h2>
        <p className="mt-3 text-gray-600 leading-relaxed">
          Your tasks contain sensitive personal and professional information.
          Strong security, automatic background reminders, and reliable
          scheduling ensure that your data stays safe — while helping you stay
          productive without missing important deadlines.
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
