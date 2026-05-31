import { useEffect, useState } from "react";
import Table from "./common/table";
import { getTasks } from "../api/task";
import moment from "moment-timezone";

const Tasks = () => {
  const [data, setData] = useState([]);

  const fetchTasks = async (values?: any) => {
    try {
      const res = await getTasks();
      console.log("login res", res);
      setData(res?.data?.data);
    } catch (err) {
      console.log(err);
    }
  };

  const headers = [
    { label: "Title", key: "title", render: (row: any) => row.title },
    {
      label: "Description",
      key: "description",
      render: (row: any) => row.description,
    },
    {
      label: "Priority",
      key: "priority",
      render: (row: any) => row.priority,
    },
    {
      label: "Status",
      key: "status",
      render: (row: any) => row.status,
    },
    {
      label: "Assigned To",
      key: "assignee",
      render: (row: any) =>
        [row.assignedTo?.first_name, row.assignedTo?.last_name]
          .filter(Boolean)
          .join(" ")
          .trim() || "-",
    },
    {
      label: "Due Date",
      key: "due_date",
      render: (row: any) =>
        row.due_date ? moment(row.due_date).local().format("DD-MM-YYYY") : "-",
    },
  ];
  useEffect(() => {
    fetchTasks();
  }, []);

  return <Table headers={headers} data={data} />;
};

export default Tasks;
