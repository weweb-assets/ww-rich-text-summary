<template>
  <div class="ww-rich-text-summary">
    <div
      class="title"
      v-for="(title, index) in titleElements"
      :key="index"
      @click="scrollTo(index)"
    >
      <wwObject
        v-bind="content.title"
        :wwProps="{ text: formatedtitle(title, index) }"
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
    prefix: "layout",
  },
  data() {
    return {
      titleElements: [],
    };
  },
  methods: {
    getTitles() {
      this.titleElements = wwLib
        .getFrontDocument()
        .querySelector(".ww-rich-text-temp")
        .querySelectorAll("h1");
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
    formatedtitle(title, index) {
      switch (this.content.prefix) {
        case "dots":
          return `&bull; ${title.innerHTML}`;
        case "numbers":
          return `${index + 1} - ${title.innerHTML}`;
        default:
          return title.innerHTML;
      }
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
  }
}
</style>
