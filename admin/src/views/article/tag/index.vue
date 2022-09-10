<template>
  <PageWrapper>
    <BasicTable @register="registerTable">
      <template #toolbar>
        <a-input v-model:value="searchValue" placeholder="Basic usage" />
        <a-button type="primary"> 搜索 </a-button>
      </template>
      <template #action="{ record }">
        <TableAction
          :actions="[
            {
              label: '编辑',
              icon: 'ant-design:edit-filled',
              onClick: handlerEdit.bind(null, record),
            },
            {
              label: '删除',
              icon: 'ant-design:delete-filled',
              color: 'error',
              popConfirm: {
                title: '提示',
                okText: '确定',
                cancelText: '取消',
                confirm: handlerDelete.bind(null, record),
              },
            },
          ]"
        />
      </template>
    </BasicTable>
  </PageWrapper>
</template>
<script lang="ts" setup>
  import { ref, reactive } from 'vue';
  import { PageWrapper } from '/@/components/Page';
  import { BasicTable, useTable, TableAction } from '/@/components/Table';
  import { columns } from './config/tableConfig';
  const data = [
    {
      title: '哈哈哈',
      createTime: '2022-09-10',
    },
  ];
  const handlerEdit = (record) => {
    console.log('编辑', record);
  };
  const handlerDelete = (record) => {
    console.log('删除', record);
  };
  const [registerTable] = useTable({
    dataSource: data,
    columns: columns,
    actionColumn: {
      width: 250,
      title: '操作',
      dataIndex: 'action',
      slots: { customRender: 'action' },
    },
  });

  const searchValue = ref('');
</script>
