"use client";
import { UserButton, useUser } from "@clerk/nextjs";

export default function AdminPage() {
  const { user } = useUser();

  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-8">
      <div className="bg-white rounded-xl shadow-lg p-8 w-full max-w-md flex flex-col items-center">
        <h1 className="text-3xl font-bold mb-4">Admin Dashboard</h1>
        {user ? (
          <>
            <div className="mb-6 text-center">
              <p className="text-lg font-medium">Welcome, {user.fullName || user.primaryEmailAddress?.emailAddress}!</p>
              <p className="text-gray-500 text-sm mt-1">User ID: {user.id}</p>
            </div>
            <UserButton afterSignOutUrl="/" />
          </>
        ) : (
          <p>Loading user info...</p>
        )}
      </div>
    </main>
  );
}
