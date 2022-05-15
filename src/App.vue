<template>
  <div id="app">
    <Header id="header" />
    <div id="main">
      <router-view />
    </div>
    <Footer id="footer" />
  </div>
</template>

<script>
import Header from '@/components/Header.vue';
import Footer from '@/components/Footer.vue';

export default {
  components: {
    Header,
    Footer,
  },
};
</script>

<style lang="scss">
@import '~@/assets/common.scss';

#app {
  display: grid;
  grid-template-columns: 12% auto 12%;
  grid-template-rows: auto 1fr auto;
  grid-template-areas:
    'header header header'
    '.      main   .'
    'footer footer footer';

  #header {
    grid-area: header;
    padding-left: 12%;
    padding-right: 12%;
  }

  #main {
    grid-area: main;
    border: 1px solid black;
  }

  #footer {
    grid-area: footer;
    padding-left: 12%;
    padding-right: 12%;
  }
}

@media (max-width: 768px) {
  #app {
    grid-template-columns: 10px auto 10px;

    #header,
    #footer {
      padding-left: 10px;
      padding-right: 10px;
    }
  }
}
</style>
