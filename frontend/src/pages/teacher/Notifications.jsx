import { useEffect, useState } from "react";
import {
  Search,
  Mail,
  ArrowLeft,
  Circle,
} from "lucide-react";
// import API from "../../services/api";

export default function Notifications() {
  const [messages, setMessages] = useState([]);
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    const dummy = [
      {
        _id: 1,
        student: "Rahul Sharma",
        subject: "Assignment Submitted",
        message:
          "Sir, I have submitted my React Assignment. Please review it.",
        time: "10:25 AM",
        unread: true,
      },
      {
        _id: 2,
        student: "Priya Verma",
        subject: "React Doubt",
        message:
          "Can you explain useEffect Hook one more time?",
        time: "09:40 AM",
        unread: true,
      },
      {
        _id: 3,
        student: "Kunal",
        subject: "Quiz",
        message:
          "Sir my quiz marks are not updating.",
        time: "Yesterday",
        unread: false,
      },
      {
        _id: 4,
        student: "Aman Singh",
        subject: "Course",
        message:
          "Thank you sir for uploading the MongoDB course.",
        time: "Yesterday",
        unread: false,
      },
    ];

    setMessages(dummy);
    setSelected(dummy[0]);

    /*
    const fetchNotifications = async () => {
      const res = await API.get("/teacher/notifications");
      setMessages(res.data);
      setSelected(res.data[0]);
    };

    fetchNotifications();
    */
  }, []);

  return (
    <div className="bg-white rounded-xl shadow h-[82vh] overflow-hidden">

      {/* MOBILE */}

      <div className="md:hidden h-full">

        {!selected ? (
          <>
            <div className="p-4 border-b">

              <h2 className="text-2xl font-bold">
                Notifications
              </h2>

              <div className="relative mt-4">

                <Search
                  size={18}
                  className="absolute left-3 top-3 text-gray-400"
                />

                <input
                  placeholder="Search..."
                  className="w-full border rounded-lg pl-10 py-2 outline-none"
                />

              </div>

            </div>

            <div className="overflow-y-auto">

              {messages.map((item) => (

                <div
                  key={item._id}
                  onClick={() => setSelected(item)}
                  className="p-4 border-b active:bg-violet-100"
                >

                  <div className="flex justify-between">

                    <div className="flex gap-3">

                      <div className="w-11 h-11 rounded-full bg-violet-600 text-white flex items-center justify-center font-bold">
                        {item.student.charAt(0)}
                      </div>

                      <div>

                        <h3 className="font-semibold">
                          {item.student}
                        </h3>

                        <p className="text-sm text-gray-500">
                          {item.subject}
                        </p>

                      </div>

                    </div>

                    {item.unread && (
                      <Circle
                        size={10}
                        fill="#7c3aed"
                        color="#7c3aed"
                      />
                    )}

                  </div>

                </div>

              ))}

            </div>
          </>
        ) : (
          <div className="h-full flex flex-col">

            <div className="flex items-center gap-3 border-b p-4">

              <button
                onClick={() => setSelected(null)}
                className="p-2 rounded-full hover:bg-gray-100"
              >
                <ArrowLeft size={20} />
              </button>

              <div className="w-11 h-11 rounded-full bg-violet-600 text-white flex items-center justify-center font-bold">
                {selected.student.charAt(0)}
              </div>

              <div>

                <h2 className="font-bold">
                  {selected.student}
                </h2>

                <p className="text-sm text-gray-500">
                  {selected.subject}
                </p>

              </div>

            </div>

            <div className="flex-1 overflow-y-auto p-6">

              <div className="flex items-center gap-2 mb-5">

                <Mail className="text-violet-600" />

                <h2 className="text-xl font-bold">
                  {selected.subject}
                </h2>

              </div>

              <p className="leading-8 text-gray-700">
                {selected.message}
              </p>

            </div>

          </div>
        )}

      </div>

      {/* DESKTOP */}

      <div className="hidden md:flex h-full">

        <div className="w-[360px] border-r">

          <div className="p-5 border-b">

            <h2 className="text-2xl font-bold">
              Notifications
            </h2>

            <div className="relative mt-4">

              <Search
                size={18}
                className="absolute left-3 top-3 text-gray-400"
              />

              <input
                placeholder="Search..."
                className="w-full border rounded-lg pl-10 py-2 outline-none"
              />

            </div>

          </div>

          <div className="overflow-y-auto h-full">

            {messages.map((item) => (

              <div
                key={item._id}
                onClick={() => setSelected(item)}
                className={`cursor-pointer p-4 border-b hover:bg-gray-100 ${
                  selected?._id === item._id
                    ? "bg-violet-100"
                    : ""
                }`}
              >

                <div className="flex justify-between">

                  <div className="flex gap-3">

                    <div className="w-11 h-11 rounded-full bg-violet-600 text-white flex items-center justify-center font-bold">
                      {item.student.charAt(0)}
                    </div>

                    <div>

                      <h3 className="font-semibold">
                        {item.student}
                      </h3>

                      <p className="text-sm text-gray-500">
                        {item.subject}
                      </p>

                    </div>

                  </div>

                  {item.unread && (
                    <Circle
                      size={10}
                      fill="#7c3aed"
                      color="#7c3aed"
                    />
                  )}

                </div>

              </div>

            ))}

          </div>

        </div>

        <div className="flex-1">

          {selected && (

            <>
              <div className="border-b p-5 flex items-center gap-4">

                <div className="w-14 h-14 rounded-full bg-violet-600 text-white flex items-center justify-center text-xl font-bold">
                  {selected.student.charAt(0)}
                </div>

                <div>

                  <h2 className="text-xl font-bold">
                    {selected.student}
                  </h2>

                  <p className="text-gray-500">
                    {selected.subject}
                  </p>

                </div>

              </div>

              <div className="p-8">

                <div className="flex items-center gap-2 mb-6">

                  <Mail className="text-violet-600" />

                  <h2 className="text-2xl font-bold">
                    {selected.subject}
                  </h2>

                </div>

                <p className="leading-8 text-gray-700 text-lg">
                  {selected.message}
                </p>

              </div>

            </>

          )}

        </div>

      </div>

    </div>
  );
}