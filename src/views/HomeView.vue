<template>
  <div id="index">
    <section class="blog-posts">
      <router-link class="item" v-for="blog in blogs" :key="blog.id" :to="`/detail/${blog.id}`">
        <figure class="avatar">
          <img :src="blog.user.avatar" :alt="blog.user.username" />
          <figcaption>{{ blog.user.username }}</figcaption>
        </figure>
        <h3>
          {{ blog.title }}
          <span>{{ friendlyDate(blog.createdAt) }}</span>
        </h3>
        <p>{{ blog.description }}</p>
      </router-link>
    </section>
    <section class="pagination">
      <el-pagination layout="prev, pager, next" :total="total" @current-change="onPageChange" :current-page="page"></el-pagination>
    </section>
  </div>
</template>

<script>
import blog from '@/api/blog';

export default {
  data() {
    return {
      blogs: [],
      total: 0,
      page: 1,
    };
  },
  created() {
    this.page = parseInt(this.$route.query.page) || 1;
    blog.getIndexBlogs({ page: this.page }).then(res => {
      this.blogs = res.data;
      this.total = res.total;
      this.page = res.page;
    });
  },

  methods: {
    onPageChange(newPage) {
      blog.getIndexBlogs({ page: newPage }).then(res => {
        this.blogs = res.data;
        this.total = res.total;
        this.page = res.page;
        const from = this.$route.fullPath;
        const to = this.$router.resolve({ path: '/', query: { page: newPage } }).route.fullPath;
        if (from !== to) {
          this.$router.push({ path: '/', query: { page: newPage } });
        }
      });
    },
  },
};
</script>

<style lang="scss">
@import '~@/assets/base.scss';

#index {
  .item {
    display: grid;
    grid: auto auto / 80px 1fr;
    margin: 20px 0;

    .avatar {
      grid-column: 1;
      grid-row: 1 / span 2;
      justify-self: center;
      margin-left: 0;
      text-align: center;

      img {
        width: 60px;
        height: 60px;
        border-radius: 50%;
      }

      figcaption {
        font-size: 12px;
        color: $textLighterColor;
      }
    }

    h3 {
      grid-column: 2;
      grid-row: 1;

      & > span {
        color: $textLighterColor;
        font-size: 12px;
        font-weight: normal;
      }
    }

    p {
      grid-column: 2;
      grid-row: 2;
      margin-top: 0;
    }
  }

  .pagination {
    display: grid;
    justify-items: center;
    margin-bottom: 30px;
  }
}
</style>
