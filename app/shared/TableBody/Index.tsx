import React from 'react';
import { formatDate, sizeFormatter } from '@/app/utils';

export const TableBody: React.FC<TableHeadProps> = (props) => {
  const { rows, columns, action } = props;

  if (!rows) return <tbody></tbody>;

  const tableRows = rows.map((item, index) => {
    return (
      <tr key={`row-${index}`}>
        {columns.map((column, idx) => {
          if (column.key === 'createdAt') {
            item[column.key] = formatDate(`${item.createdAt}`);
          }

          if (column.key === 'size') {
            item[column.key] = sizeFormatter(+item.size);
          }

          if (column.key === 'action') {
            return (
              <td key={`col-${index}-${idx}`}>
                <button onClick={() => action(item)}>{column.label}</button>
              </td>
            );
          }

          return (
            <td align="left" key={`col-${index}-${idx}`}>
              {item[column.key]}
            </td>
          );
        })}
      </tr>
    );
  });

  return <tbody>{tableRows}</tbody>;
};

export interface TableHeadProps {
  rows: Array<{
    [key: string]: string | number | boolean;
  }>;
  columns: Array<{
    [key: string]: string;
  }>;
  action: (item: { [key: string]: string | number | boolean }) => void;
}
