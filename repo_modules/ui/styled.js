var UI = require('./index');
var ReactStyle = require('react-style');

module.exports = function(name) {
  return {
    componentWillMount() {
      var theme = UI.getTheme();
      var styles = {};
      var propStyles = this.props.styles;

      Object.keys(theme[name]).forEach(key => {
        styles[key] = [theme[name][key]];
      });

      propStyles &&
        Object.keys(propStyles).forEach(key => {
          styles[key] = (styles[key] || []).concat(propStyles[key]);
        });

      // remove the styles from props to prevent accidental passing down to children
      // if you want to access styles in component use this.styles
      delete this.props.styles;

      this.styles = styles;
    },

    componentWillUnmount() {
      this.styles = null;
    },

    makeReactStyle(obj) {
      return this.isReactStyle(obj) ? obj : ReactStyle(obj);
    },

    isReactStyle(obj) {
      // todo: checking for array is dirty,
      // just used for now because we turn everything into array
      return Array.isArray(obj) || !!obj.style;
    },

    getStyles(elName, extras) {
      elName = elName === name ? 'self' : elName || 'self';
      return (!extras) ? this.styles[elName] : [].concat(this.styles[elName], extras);
    },

    addStyles(elName, styles) {
      // if no elName given, use "self"
      if (!styles) {
        styles = elName;
        elName = 'self';
      }

      styles = this.makeReactStyle(styles);

      if (elName === name)
        elName = 'self';

      this.styles[elName] = [].concat(this.getStyles(elName), styles);
    },

    getStyleVal(elName, prop) {
      // if no elName given, we just use "self"
      if (typeof prop === 'undefined') {
        prop = elName;
        elName = 'self';
      }

      var styles = this.getStyles(elName);
      if (!styles) return null;

      var stylesForProp = styles
        .map(style => style.style[prop])
        .filter(x => typeof x !== 'undefined');

      return stylesForProp[stylesForProp.length - 1];
    }
  };
};