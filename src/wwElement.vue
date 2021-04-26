<template>
  <div class="ww-rich-text-summary" :style="cssStyle">
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
    backgroundColor: wwLib.responsive(""),
    hoverColor: wwLib.responsive("#DCEAED"),
    cornerRadius: wwLib.responsive("4px"),
    spacing: wwLib.responsive("4px"),
    underline: false,
  },
  data() {
    return {
      titleElements: [],
    };
  },
  watch: {
    pageInstanceId() {
      this.$nextTick(() => {
        this.getTitles();
      });
    },
  },
  computed: {
    pageInstanceId() {
      return wwLib.$store.getters["cms/getPageDataIndex"];
    },
    cssStyle() {
      return {
        "--backgroundColor": this.content.backgroundColor,
        "--hoverColor": this.content.hoverColor,
        "--cornerRadius": this.content.cornerRadius,
        "--spacing": this.content.spacing,
        "--underline": this.content.underline ? "underline" : "none",
      };
    },
  },
  methods: {
    getTitles() {
      this.titleElements = wwLib
        .getFrontDocument()
        .querySelector(".ww-rich-text-temp")
        .querySelectorAll("h2");

      if (!this.titleElements.length) {
        this.setTimeout(() => {
          this.getTitles();
        }, 1000);
      }
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

    background-color: var(--backgroundColor);
    border-radius: var(--cornerRadius);
    margin-bottom: var(--spacing);
    transition: 0.3s;
    padding: 4px 6px;

    &:hover {
      cursor: pointer;
      background-color: var(--hoverColor);
      transition: 0.3s;
    }

    &__content {
      text-decoration: var(--underline);
    }
  }
}
</style>
