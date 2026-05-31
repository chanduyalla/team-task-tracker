interface TableHeader<T> {
  label: string;
  key: keyof T;
  render?: (row: T) => React.ReactNode;
}

interface TableProps<T> {
  headers: TableHeader<T>[];
  data: T[];
}

const Table = <T extends Record<string, any>>({
  headers,
  data,
}: TableProps<T>) => {
  return (
    <div className="table-responsive">
      <table className="table table-striped table-hover table-bordered align-middle">
        <thead className="table">
          <tr>
            {headers.map((header, index) => (
              <th
                key={index}
                style={{ backgroundColor: "#2b6777", color: "white" }}
              >
                {header.label}
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {data.length === 0 ? (
            <tr>
              <td colSpan={headers.length} className="text-center">
                No data available
              </td>
            </tr>
          ) : (
            data.map((row, rowIndex) => (
              <tr key={rowIndex}>
                {headers.map((header, colIndex) => (
                  <td key={colIndex}>
                    {header.render
                      ? header.render(row)
                      : (row[header.key] ?? "-")}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
