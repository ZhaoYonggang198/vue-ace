/**
 * @file
 * @author cjw
 * Created by cjw on 17/3/20.
 */

const ace = require('brace');

import 'brace/ext/modelist'
import 'brace/ext/themelist'
const modelist = ace.acequire('ace/ext/modelist')
const themelist = ace.acequire('ace/ext/themelist')

module.exports = {
    template: '<div :style="{height: height, width: width}"></div>',

    props: {
        content: {
            type: String
            // required: true
        },
        lang: {
            type: String,
            default: 'javascript'
        },
        theme: {
            type: String,
            default: 'chrome'
        },
        height: {
            type: String,
            default: '300px'
        },
        width: {
            type: String,
            default: '100%'
        },
        sync: {
            type: Boolean,
            default: false
        }
    },

    data: function () {
        return {
            editor: null,
        };
    },

    mounted: function () {
        const self = this;
        var lang = self.lang;
        var theme = self.theme;
        var editor = self.editor = ace.edit(self.$el);
        editor.$blockScrolling = Infinity;
        require('brace/mode/' + lang);
        editor.getSession().setMode('ace/mode/' + lang);
        require('brace/theme/' + theme);
        editor.setTheme('ace/theme/' + theme);
        editor.setValue(self.content, 1);
        editor.on('change', function () {
            self.$emit('content-update',editor.getValue());
        });
    },

    watch: {
        content: function (newContent) {
            if (this.sync) {
                this.editor.setValue(newContent, 1);
            }
        },

        theme: function (newTheme) {
            require('brace/theme/' + newTheme);
            this.editor.setTheme('ace/theme/' + newTheme);
        }
    }
};