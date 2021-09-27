export default {
    editor: {
        label: {
            en: 'Rich text summary',
        },
    },
    properties: {
        titlesLevel: {
            label: {
                en: 'Prefix',
                fr: 'Prefix',
            },
            type: 'TextSelect',
            options: {
                options: [
                    { value: 'h1', label: { en: 'H1' } },
                    { value: 'h2', label: { en: 'H2' } },
                    { value: 'h3', label: { en: 'H3' } },
                    { value: 'h4', label: { en: 'H4' } },
                ],
            },
            section: 'settings',
            defaultValue: 'h2',
        },
        getTitles: {
            type: 'Button',
            label: null,
            options: {
                text: {
                    en: 'Get titles',
                },
                action: 'getTitles',
            },
            section: 'settings',
            editorOnly: true,
        },
        prefix: {
            label: {
                en: 'Prefix',
                fr: 'Prefix',
            },
            type: 'TextSelect',
            options: {
                options: [
                    { value: 'none', label: { en: 'None' } },
                    { value: 'dots', label: { en: 'Dots' } },
                    { value: 'numbers', label: { en: 'Numbers' } },
                ],
            },
            section: 'settings',
            defaultValue: 'layout',
        },
        backgroundColor: {
            type: 'Color',
            label: {
                en: 'Background color',
                fr: 'Couleur du fond',
            },
            bindable: true,
            options: {
                nullable: true,
            },
            responsive: true,
            defaultValue: '',
        },
        hoverColor: {
            type: 'Color',
            label: {
                en: 'Hover color',
                fr: 'Couleur au survol',
            },
            bindable: true,
            options: {
                nullable: true,
            },
            responsive: true,
            defaultValue: '#DCEAED',
        },
        spacing: {
            type: 'Length',
            label: {
                en: 'Spacing',
                fr: 'Spacing',
            },
            options: {
                unitChoices: [{ value: 'px', label: 'px', min: 1, max: 24 }],
            },
            responsive: true,
            defaultValue: '4px',
        },
        cornerRadius: {
            type: 'Length',
            label: {
                en: 'Corner Radius',
                fr: 'Corner Radius',
            },
            options: {
                unitChoices: [{ value: 'px', label: 'px', min: 1, max: 24 }],
            },
            responsive: true,
            defaultValue: '4px',
        },
        underline: {
            type: 'OnOff',
            label: {
                en: 'Underline?',
                fr: 'Underline?',
            },
            defaultValue: false,
        },
        title: {
            hidden: true,
            defaultValue: wwLib.element('ww-text'),
        },
        prefixTitle: {
            hidden: true,
            defaultValue: wwLib.element('ww-text'),
        },
    },
};
