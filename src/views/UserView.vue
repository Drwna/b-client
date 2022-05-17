<template>
  <div id="user">
    <section class="user-info">
      <img :src="user.avatar" :alt="user.username" class="avatar" />
      <h3>{{ user.username }}</h3>
    </section>
    <section>
      <router-link class="item" v-for="blog in blogs" :key="blog.id" :to="`/detail/${blog.id}`">
        <div class="date">
          <span class="day">{{ splitDate(blog.createdAt).date }}</span>
          <span class="month">{{ splitDate(blog.createdAt).month }}月</span>
          <span class="year">{{ splitDate(blog.createdAt).year }}</span>
        </div>
        <h3>{{ blog.title }}</h3>
        <p>{{ blog.description }}</p>
      </router-link>
    </section>
    <section class="pagination">
      <el-pagination layout="prev, pager, next" :total="total" @current-change="onPageChange" :current-page="currentPage"></el-pagination>
    </section>
  </div>
</template>

<script>
import blog from '@/api/blog';

export default {
  data() {
    return {
      blogs: [],
      user: {},
      avatar: '',
      page: 1,
      total: 1,
      currentPage: 1,
    };
  },

  created() {
    this.userId = this.$route.params.userId;
    this.page = parseInt(this.$route.query.page) || 1;
    blog.getBlogsByUserId(this.userId, { page: this.page }).then(res => {
      this.blogs = res.data;
      this.total = res.total;
      this.page = res.page;
      if (res.data.length > 0) {
        this.user = res.data[0].user;
      }
    });
  },

  methods: {
    splitDate(dateStr) {
      const dateObj = typeof dateStr === 'string' ? new Date(dateStr) : dateStr;
      return {
        date: dateObj.getDate(),
        month: dateObj.getMonth() + 1,
        year: dateObj.getFullYear(),
      };
    },

    onPageChange(newPage) {
      blog.getBlogsByUserId(this.userId, { page: newPage }).then(res => {
        console.log(res);
        this.blogs = res.data;
        this.total = res.total;
        this.page = res.page;
        const from = this.$route.fullPath;
        const to = this.$router.resolve({ path: `/user/${this.userId}`, query: { page: newPage } }).route.fullPath;
        if (from !== to) {
          this.$router.push({ path: `/user/${this.userId}`, query: { page: newPage } });
        }
      });
    },
  },
};
</script>

<style lang="scss" scoped>
@import '~@/assets/base.scss';

#my,
#user {
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
      margin-top: 10px;
    }
  }

  .item {
    display: grid;
    grid: auto auto auto / 80px 1fr;
    margin: 20px 0;

    .date {
      grid-column: 1;
      grid-row: 1 / span 3;
      justify-self: center;
      text-align: center;

      span {
        display: block;
        color: $textLighterColor;
      }

      .day {
        font-size: 40px;
      }
    }

    h3 {
      grid-column: 2;
      grid-row: 1;
    }

    p {
      grid-column: 2;
      grid-row: 2;
      margin-top: 0;
    }

    .actions {
      grid-column: 2;
      grid-row: 3;
      font-size: 12px;

      a {
        color: $themeLighterColor;
      }
    }
  }
}
</style>
