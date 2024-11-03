const Table = ({ headers, data, RowComponent, rowProps }) => (
  <div className="overflow-x-auto bg-white shadow-md sm:rounded-lg p-4">
    <table className="min-w-full bg-white">
      <thead className="bg-indigo-700 text-white">
        <tr>
          {headers.map((header) => (
            <th
              key={header}
              className="px-6 py-3 text-left text-sm font-bold uppercase tracking-wider"
            >
              {header}
            </th>
          ))}
          <th className="px-6 py-3 text-left text-sm font-bold uppercase tracking-wider">
            Actions
          </th>
        </tr>
      </thead>
      <tbody className="divide-y divide-gray-200">
        {data.map((item) => (
          <RowComponent key={item.id} {...rowProps} item={item} />
        ))}
      </tbody>
    </table>
  </div>
);

export default Table;
