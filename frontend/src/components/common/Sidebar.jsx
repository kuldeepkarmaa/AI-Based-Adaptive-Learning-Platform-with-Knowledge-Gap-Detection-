import {
  FaHome,
  FaBook,
  FaUsers,
  FaChartBar,
  FaUser,
  FaSignOutAlt,
  FaTimes,
} from "react-icons/fa";
import banner from "../../assests/images/banner.png";

const Sidebar = ({ open, setOpen }) => {
  return (
    <>
      {/* Mobile Overlay */}
      {open && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setOpen(false)}
        />
      )}

      <div
        className={`
        fixed top-0 left-0 z-50 h-screen w-64 bg-white shadow-lg p-5
        transform transition-transform duration-300
        ${open ? "translate-x-0" : "-translate-x-full"}
        lg:translate-x-0
        `}
      >
        <div className="flex justify-between items-center mb-8">
          <div>
            <div className="flex items-center gap-2">
                      <span className="text-headline-md font-bold text-primary w-50 "><img src={banner} alt="Knowledge guru logo" /></span>
                    </div>
            
          </div>

          <button
            className="lg:hidden"
            onClick={() => setOpen(false)}
          >
            <FaTimes />
          </button>
        </div>

        <ul className="space-y-3">
          <li className="flex gap-3 p-3 bg-violet-100 rounded-xl">
            <FaHome /> Dashboard
          </li>

          <li className="flex gap-3 p-3 hover:bg-gray-100 rounded-xl">
            <FaBook /> Courses
          </li>

          <li className="flex gap-3 p-3 hover:bg-gray-100 rounded-xl">
            <FaUsers /> Students
          </li>

          <li className="flex gap-3 p-3 hover:bg-gray-100 rounded-xl">
            <FaChartBar /> Analytics
          </li>

          <li className="flex gap-3 p-3 hover:bg-gray-100 rounded-xl">
            <FaUser /> Profile
          </li>
        </ul>

        <button className="absolute bottom-8 flex gap-3 text-red-500">
          <FaSignOutAlt />
          Logout
        </button>
      </div>
    </>
  );
};

export default Sidebar;