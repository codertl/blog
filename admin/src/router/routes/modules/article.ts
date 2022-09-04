import type { AppRouteModule } from '/@/router/types';
import { LAYOUT } from '/@/router/constant';
import { t } from '/@/hooks/web/useI18n';

const article: AppRouteModule = {
  path: '/article',
  name: 'Article',
  component: LAYOUT,
  redirect: 'add',
  meta: {
    orderNo: 20,
    icon: 'akar-icons:file',
    title: t('routes.article.article'),
  },
  children: [
    {
      path: 'create',
      name: 'CreateArticle',
      component: () => import('/@/views/article/create/index.vue'),
      meta: {
        icon: 'bi:file-earmark-font',
        title: t('routes.article.create'),
      },
    },
    {
      path: 'list',
      name: 'ArticleList',
      component: () => import('/@/views/article/list/index.vue'),
      meta: {
        icon: 'bi:ui-checks',
        title: t('routes.article.list'),
      },
    },
    {
      path: 'tag',
      name: 'tag',
      component: () => import('/@/views/article/list/index.vue'),
      meta: {
        icon: 'radix-icons:bookmark-filled',
        title: t('routes.article.tag'),
      },
    },
  ],
};
export default article;
