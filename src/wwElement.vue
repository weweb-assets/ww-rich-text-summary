<template>
  <div class="ww-rich-text-summary">
    <div
      class="title"
      v-for="(title, index) in titleElements"
      :key="index"
      @click="scrollTo(index)"
    >
      <wwObject
        v-if="content.prefix !== 'none'"
        v-bind="content.prefixTitle"
        :wwProps="{
          text: content.prefix === 'dots' ? '&bull;' : `${index + 1}. `,
        }"
      ></wwObject>
      <wwObject
        class="title__content"
        v-bind="content.title"
        :wwProps="{ text: title.innerHTML }"
      ></wwObject>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    content: { type: "Object", required: true },
  },
  wwDefaultContent: {
    title: wwLib.element("ww-text"),
    prefixTitle: wwLib.element("ww-text"),
    prefix: "layout",
  },
  data() {
    return {
      titleElements: [],
    };
  },
  methods: {
    getTitles() {
      setTimeout(() => {
        this.titleElements = wwLib
          .getFrontDocument()
          .querySelector(".ww-rich-text-temp")
          .querySelectorAll("h1");
      }, 2000);

      if (!this.titleElements) {
        this.getTitles();
      }

      console.log(this.titleElements);
    },
    scrollTo(index) {
      const body = wwLib.getFrontDocument().body.getBoundingClientRect();
      const title = this.titleElements[index].getBoundingClientRect();
      const offsetTop = title.top - body.top - title.height - 100;

      window.scrollTo({
        top: offsetTop,
        behavior: "smooth",
      });
    },
  },
  mounted() {
    this.getTitles();
  },
};
</script>

<style lang="scss" scoped>
.ww-rich-text-summary {
  .title {
    width: fit-content;
    display: flex;
    flex-direction: row;

    &__content {
      text-decoration: underline;
    }
  }
}
</style>
