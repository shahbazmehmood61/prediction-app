import React from 'react';

export const TableHead: React.FC<TableHeadProps> = (props) => {
  const { columns } = props;

  const tableColumns = columns.map((item) => {
    return (
      <th align="left" key={item.key}>
        {item.label}
      </th>
    );
  });

  return (
    <thead>
      <tr>{tableColumns}</tr>
    </thead>
  );
};

export interface TableHeadProps {
  columns: Array<{
    [key: string]: string;
  }>;
}
