<template>
  <div id="detail">
    <section class="user-info">
      <img :src="user.avatar" :alt="user.username" :title="user.username" class="avatar" />
      <h3>{{ title }}</h3>
      <p>
        <router-link :to="`/user/${user.id}`">{{ user.username }}</router-link>
        发布于 {{ friendlyDate(createdAt) }}
      </p>
    </section>
    <section class="article" v-html="markdown"></section>
  </div>
</template>

<script>
import { marked } from 'marked';
import blog from '@/api/blog';

export default {
  data() {
    return {
      title: '',
      rawContent: '',
      user: {},
      createdAt: '',
    };
  },

  created() {
    this.blogId = this.$route.params.blogId;
    blog.getDetail({ blogId: this.blogId }).then(res => {
      this.title = res.data.title;
      this.rawContent = res.data.content;
      this.user = res.data.user;
      this.createdAt = res.data.createdAt;
    });
  },

  computed: {
    markdown() {
      return marked(this.rawContent);
    },
  },
};
</script>

<style lang="scss" scoped>
@import '~@/assets/base.scss';
@import '~@/assets/article.scss';

#detail {
  .user-info {
    display: grid;
    grid: auto auto / 80px 1fr;

    margin-top: 30px;
    padding-bottom: 20px;
    border-bottom: 1px solid #ebebeb;

    .avatar {
      grid-column: 1;
      grid-row: 1 / span 2;

      width: 60px;
      height: 60px;
      border-radius: 50%;
    }

    h3 {
      grid-column: 2;
      grid-row: 1;

      margin: 5px 0;
    }

    p {
      grid-column: 2;
      grid-row: 2;

      margin-top: 0;
      font-size: 12px;
      color: $textLighterColor;

      a {
        color: $themeColor;
        text-decoration: none;
      }
    }
  }

  .article {
    padding: 30px 0;
  }
}
</style>
