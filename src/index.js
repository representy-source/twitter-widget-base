import _ from 'lodash';
import HTML from 'representy-source-html';
import pkg from '../package.json';

class TwitterWidgetBase {
  constructor(type, options, params) {
    if (_.isEmpty(type)) {
      throw new Error(`type is required for ${pkg.name}`);
    }
    const username = _.get(options, 'username');
    if (_.isEmpty(username)) {
      throw new Error(`username is required for ${pkg.name}`);
    }
    this.type = type;
    this.username = username;
    this.options = _.pick(options, params);
  }

  static getMarkup(option) {
    const key = _.kebabCase(option);
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
    const params = _.keys(options).map(key => `${getMarkup(key)}`).join('\n');
    return `
      <a class="twitter-${this.type}" 
      ${params} 
      href="${getHref(options)}">${getContent(options)}</a> 
      <script async src="//platform.twitter.com/widgets.js" charset="utf-8"></script>
    `;
  }

  load() {
    const html = new HTML({
      engine: 'ejs',
      template: this.getTemplate(this.options),
      data: {
        username: this.username,
        ...this.options,
      },
    });
    return TwitterWidgetBase.cleanMarkup(html.load());
  }
}

export default TwitterWidgetBase;
export { TwitterWidgetBase as Source };
