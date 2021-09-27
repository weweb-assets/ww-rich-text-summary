<template>
    <div class="ww-rich-text-summary" :style="cssStyle">
        <div v-for="(title, index) in titleElements" :key="index" class="title" @click="scrollTo(index)">
            <wwElement
                v-if="content.prefix !== 'none'"
                v-bind="content.prefixTitle"
                :ww-props="{
                    text: content.prefix === 'dots' ? '&bull;' : `${index + 1}. `,
                }"
            />
            <wwElement class="title__content" v-bind="content.title" :ww-props="{ text: title.innerHTML }" />
        </div>
    </div>
</template>

<script>
export default {
    props: {
        content: { type: Object, required: true },
    },
    data() {
        return {
            titleElements: [],
        };
    },
    computed: {
        /* wwEditor:start */
        pageInstanceId() {
            return wwLib.wwEditorHelper.getPageDataIndex();
        },
        /* wwEditor:end */
        cssStyle() {
            return {
                '--backgroundColor': this.content.backgroundColor,
                '--hoverColor': this.content.hoverColor,
                '--cornerRadius': this.content.cornerRadius,
                '--spacing': this.content.spacing,
                '--underline': this.content.underline ? 'underline' : 'none',
            };
        },
    },
    /* wwEditor:start */
    watch: {
        pageInstanceId() {
            this.$nextTick(() => {
                this.getTitles();
            });
        },
    },
    /* wwEditor:end */
    mounted() {
        this.getTitles();
    },
    methods: {
        getTitles() {
            const wwRichTextTemp = wwLib.getFrontDocument().querySelector('.ww-rich-text-temp');
            if (wwRichTextTemp) {
                this.titleElements = wwLib
                    .getFrontDocument()
                    .querySelector('.ww-rich-text-temp')
                    .querySelectorAll(this.content.titlesLevel || 'h2');
                if (!this.titleElements.length) {
                    setTimeout(() => {
                        this.getTitles();
                    }, 1000);
                }
            }
        },
        scrollTo(index) {
            const body = wwLib.getFrontDocument().body.getBoundingClientRect();
            const title = this.titleElements[index].getBoundingClientRect();
            const offsetTop = title.top - body.top - title.height - 100;

            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth',
            });
        },
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
