import { useState } from "react";

// TODO: replace with GET /api/teacher/profile and a real PUT on save
export default function Profile() {
  const [form, setForm] = useState({
    name: "Dr. Rajesh Sharma",
    email: "rajesh.sharma@edu.in",
    subject: "Computer Science",
    bio: "10+ years in Computer Science education. Passionate about making programming accessible.",
  });
  const [saved, setSaved] = useState(false);

  const handleChange = (e) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
    setSaved(false);
  };

  const handleSave = (e) => {
    e.preventDefault();
    // TODO: PUT /api/teacher/profile
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const initials = form.name
    .split(" ")
    .map((p) => p[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <div className="max-w-2xl mx-auto">
      <form onSubmit={handleSave} className="bg-surface-container-lowest rounded-xl p-6 sm:p-8 space-y-5">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-full bg-primary text-on-primary flex items-center justify-center text-headline-md font-bold flex-shrink-0">
            {initials}
          </div>
          <div>
            <p className="text-headline-md font-bold text-on-surface">{form.name}</p>
            <p className="text-label-md text-on-surface-variant">Senior Educator · 4.9 ⭐</p>
          </div>
        </div>

        <div>
          <label className="block text-label-md font-label-md text-on-surface-variant mb-1.5">
            Full Name
          </label>
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            className="w-full px-4 py-2.5 rounded-xl border border-outline-variant bg-surface text-body-md focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>

        <div>
          <label className="block text-label-md font-label-md text-on-surface-variant mb-1.5">
            Email
          </label>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            className="w-full px-4 py-2.5 rounded-xl border border-outline-variant bg-surface text-body-md focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>

        <div>
          <label className="block text-label-md font-label-md text-on-surface-variant mb-1.5">
            Subject
          </label>
          <input
            name="subject"
            value={form.subject}
            onChange={handleChange}
            className="w-full px-4 py-2.5 rounded-xl border border-outline-variant bg-surface text-body-md focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>

        <div>
          <label className="block text-label-md font-label-md text-on-surface-variant mb-1.5">
            Bio
          </label>
          <textarea
            name="bio"
            value={form.bio}
            onChange={handleChange}
            rows={3}
            className="w-full px-4 py-2.5 rounded-xl border border-outline-variant bg-surface text-body-md focus:outline-none focus:ring-2 focus:ring-primary resize-none"
          />
        </div>

        <button
          type="submit"
          className={`w-full py-3 rounded-xl text-label-md font-label-md text-white transition-colors ${
            saved ? "bg-green-600" : "bg-primary hover:bg-primary-container"
          }`}
        >
          {saved ? "✓ Saved!" : "Save Changes"}
        </button>
      </form>
    </div>
  );
}