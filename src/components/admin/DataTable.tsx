// Data Table Component with enhanced features
import React from 'react';
import { Table, Card, Empty } from 'antd';
import type { TableProps, ColumnsType } from 'antd/es/table';
import type { TableParams } from '../../types/admin';

interface DataTableProps<T> extends Omit<TableProps<T>, 'columns'> {
  columns: ColumnsType<T>;
  data: T[];
  loading?: boolean;
  total?: number;
  tableParams?: TableParams;
  onTableChange?: (params: TableParams) => void;
  cardTitle?: string;
  extra?: React.ReactNode;
  emptyText?: string;
  selectable?: boolean;
  selectedRowKeys?: React.Key[];
  onSelectChange?: (keys: React.Key[], rows: T[]) => void;
  scrollX?: number;
}

function DataTable<T extends { id?: string; key?: string }>({
  columns,
  data,
  loading = false,
  total,
  tableParams,
  onTableChange,
  cardTitle,
  extra,
  emptyText = 'Không có dữ liệu',
  selectable = false,
  selectedRowKeys,
  onSelectChange,
  scrollX = 1200,
  ...restProps
}: DataTableProps<T>) {
  const handleTableChange: TableProps<T>['onChange'] = (pagination, filters, sorter) => {
    if (onTableChange && tableParams) {
      const sortField = Array.isArray(sorter) ? undefined : sorter.field as string;
      const sortOrder = Array.isArray(sorter) ? undefined : sorter.order as 'ascend' | 'descend' | undefined;
      
      onTableChange({
        ...tableParams,
        page: pagination.current || 1,
        pageSize: pagination.pageSize || 10,
        sortField,
        sortOrder,
        filters,
      });
    }
  };

  const rowSelection = selectable && onSelectChange ? {
    selectedRowKeys,
    onChange: (keys: React.Key[], rows: T[]) => {
      onSelectChange(keys, rows);
    },
  } : undefined;

  const tableContent = (
    <Table<T>
      columns={columns}
      dataSource={data}
      loading={loading}
      rowKey={(record) => record.id || record.key || JSON.stringify(record)}
      rowSelection={rowSelection}
      pagination={tableParams ? {
        current: tableParams.page,
        pageSize: tableParams.pageSize,
        total: total || data.length,
        showSizeChanger: true,
        showQuickJumper: true,
        showTotal: (total, range) => `${range[0]}-${range[1]} của ${total} mục`,
        pageSizeOptions: ['10', '20', '50', '100'],
      } : false}
      onChange={handleTableChange}
      scroll={{ x: scrollX }}
      locale={{
        emptyText: <Empty description={emptyText} />,
      }}
      className="admin-data-table"
      {...restProps}
    />
  );

  if (cardTitle || extra) {
    return (
      <Card
        title={cardTitle}
        extra={extra}
        bodyStyle={{ padding: 0 }}
        className="data-table-card"
      >
        {tableContent}
      </Card>
    );
  }

  return tableContent;
}

export default DataTable;
