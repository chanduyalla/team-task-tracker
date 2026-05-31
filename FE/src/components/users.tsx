import { useEffect, useState } from "react";
import Table from "./common/table";
import { getUsers } from "../api/user";

const Users = () => {
  const [data, setData] = useState([]);

  const fetchUsers = async (values?: any) => {
    try {
      const res = await getUsers();
      console.log("login res", res);
      setData(res?.data?.data);
    } catch (err) {
      console.log(err);
    }
  };

  const headers = [
    {
      label: "Name",
      key: "name",
      render: (row: any) =>
        [row.first_name, row.last_name].filter(Boolean).join(" ").trim(),
    },
    {
      label: "Email",
      key: "email",
      render: (row: any) => row.email,
    },
    {
      label: "Role",
      key: "role",
      render: (row: any) => row.role?.name,
    },
    {
      label: "Is Active",
      key: "is_active",
      render: (row: any) => (row.is_active ? "Active" : "Inactive"),
    },
  ];
  useEffect(() => {
    fetchUsers();
  }, []);

  return <Table headers={headers} data={data} />;
};

export default Users;
