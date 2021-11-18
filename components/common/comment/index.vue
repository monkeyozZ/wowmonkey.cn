<template>
  <div class="comment-main">
    <div class="comment-container">
      <field :aid="aid" />
    </div>
    <comment-list ref="commentList" :aid="aid" @getnamefocus="getnamefocus" />
  </div>
</template>

<script>
import CommentList from './list'
import Field from './field'
export default {
  components: {
    CommentList,
    Field
  },
  props: {
    // eslint-disable-next-line vue/require-default-prop
    aid: {
      type: String
    }
  },
  data() {
    return {}
  },
  methods: {
    // 登录获取焦点
    getnamefocus() {
      this.$refs.name.focus()
    }
  }
}
</script>

<style lang="scss" scoped>
.comment-container{
  border-radius: 6px;
  overflow: hidden;
}
</style>
