import { useEffect, useState } from "react";
import Table from "./common/table";
import { getProjects } from "../api/project";

const Projects = () => {
  const [data, setData] = useState([]);

  const fetchProjects = async (values?: any) => {
    try {
      const res = await getProjects();
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
      render: (row: any) => row.name,
    },
    {
      label: "Description",
      key: "description",
      render: (row: any) => row.description || "-",
    },
    {
      label: "Is Active",
      key: "is_active",
      render: (row: any) => (row.is_active ? "Active" : "Inactive"),
    },
  ];
  useEffect(() => {
    fetchProjects();
  }, []);

  return <Table headers={headers} data={data} />;
};

export default Projects;
