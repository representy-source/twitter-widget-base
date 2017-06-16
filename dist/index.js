'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Source = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _representySourceHtml = require('representy-source-html');

var _representySourceHtml2 = _interopRequireDefault(_representySourceHtml);

var _package = require('../package.json');

var _package2 = _interopRequireDefault(_package);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class TwitterWidgetBase {
  constructor(type, options, params) {
    if (_lodash2.default.isEmpty(type)) {
      throw new Error(`type is required for ${_package2.default.name}`);
    }
    const username = _lodash2.default.get(options, 'username');
    if (_lodash2.default.isEmpty(username)) {
      throw new Error(`username is required for ${_package2.default.name}`);
    }
    this.type = type;
    this.username = username;
    this.options = _lodash2.default.pick(options, params);
  }

  static getMarkup(option) {
    const key = _lodash2.default.kebabCase(option);
    return `
    <% if (typeof ${option} !== 'undefined') { %>
      data-${key}="<%= ${option} %>" 
    <% } %>`;
  }

  static cleanMarkup(markup) {
    return markup.replace(/\n/g, '').split('  ').join('');
  }

  // eslint-disable-next-line class-methods-use-this
  getHref() {
    return '';
  }

  // eslint-disable-next-line class-methods-use-this
  getContent() {
    return '';
  }

  getTemplate(options) {
    const { getMarkup } = TwitterWidgetBase;
    const { getHref, getContent } = this;
    const params = _lodash2.default.keys(options).map(key => `${getMarkup(key)}`).join('\n');
    return `
      <a class="twitter-${this.type}" 
      ${params} 
      href="${getHref(options)}">${getContent(options)}</a> 
      <script async src="//platform.twitter.com/widgets.js" charset="utf-8"></script>
    `;
  }

  load() {
    const html = new _representySourceHtml2.default({
      engine: 'ejs',
      template: this.getTemplate(this.options),
      data: _extends({
        username: this.username
      }, this.options)
    });
    return TwitterWidgetBase.cleanMarkup(html.load());
  }
}

exports.default = TwitterWidgetBase;
exports.Source = TwitterWidgetBase;