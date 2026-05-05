import React, { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import Button from "../components/Button";

export default function AdminUsers() {
  const [users, setUsers] = useState([]);

  const fetchUsers = async () => {
    const res = await axios.get("http://localhost:5000/admin/users", {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("adminToken"),
      },
    });
    setUsers(res.data);
  };

  const deleteUser = async (id) => {
    await axios.delete(`http://localhost:5000/admin/users/${id}`, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("adminToken"),
      },
    });
    toast.success("Користувача видалено");
    fetchUsers();
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold mb-4">Керування користувачами</h2>

      <div className="grid gap-4">
        {users.map((u) => (
          <div key={u._id} className="border p-4 rounded-xl shadow">
            <p className="text-lg">{u.email}</p>
            <Button
              className="mt-2 bg-red-500 text-white"
              onClick={() => deleteUser(u._id)}
            >
              Видалити
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
}