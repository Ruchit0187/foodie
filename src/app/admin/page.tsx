import Link from "next/link";

function page() {
  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-gray-50">
      <div className="grid max-[825px]:grid-cols-1  grid-cols-3 gap-6">
        <Link
          href="/admin/addrecipe"
          className="group flex items-center justify-center h-40 w-64 rounded-2xl bg-white shadow-md transition-all duration-300 hover:shadow-xl hover:-translate-y-1 border border-gray-100"
        >
          <span className="text-lg font-semibold text-gray-700 group-hover:text-indigo-600">
            Add Recipe
          </span>
        </Link>

        <Link
          href="/admin/addblog"
          className="group flex items-center justify-center h-40 w-64 rounded-2xl bg-white shadow-md transition-all duration-300 hover:shadow-xl hover:-translate-y-1 border border-gray-100"
        >
          <span className="text-lg font-semibold text-gray-700 group-hover:text-indigo-600">
            Add Blog
          </span>
        </Link>

        <Link
          href="/admin/users"
          className="group flex items-center justify-center h-40 w-64 rounded-2xl bg-white shadow-md transition-all duration-300 hover:shadow-xl hover:-translate-y-1 border border-gray-100"
        >
          <span className="text-lg font-semibold text-gray-700 group-hover:text-indigo-600">
            Users
          </span>
        </Link>
      </div>
    </div>
  );
}

export default page;
