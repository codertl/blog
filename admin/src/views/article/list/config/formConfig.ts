import type { FormSchema } from '/@/components/Form';
export const schemas: FormSchema[] = [
  {
    field: 'title',
    component: 'Input',
    label: '标题',
    colProps: {
      span: '6',
    },
  },
  {
    field: 'tag',
    component: 'Input',
    label: '标签',
    colProps: {
      span: '6',
    },
  },
  {
    field: 'updateTime',
    component: 'DatePicker',
    label: '创建时间',
    colProps: {
      span: '6',
    },
  },
];
