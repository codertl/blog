<template>
  <PageWrapper>
    <a-row>
      <a-col :span="20"><a-input v-model:value="title" placeholder="文章标题" /></a-col>
      <a-col :span="4" class="handle"
        ><a-button style="margin: 0 33px" @click="handlerSave" class="mb-2">保存草稿</a-button>
        <a-button @click="handlerRelease" class="mb-2" type="primary">发布文章</a-button>
      </a-col>
    </a-row>

    <MarkDown v-model:value="value" :height="500" />
  </PageWrapper>
</template>
<script setup lang="ts">
  import { ref } from 'vue';
  import { MarkDown } from '/@/components/Markdown';
  import { PageWrapper } from '/@/components/Page';
  import { Row as ARow, Col as ACol } from 'ant-design-vue';

  const value = ref('');
  const title = ref('');
  const handlerSave = () => {};
  const handlerRelease = () => {};
</script>

<style scoped lang="less">
  .handle {
    display: flex;
  }
</style>
