var { makeStyles } = require('../../index');
var requirer = (name) => require('./styles/' + name);

module.exports = makeStyles(requirer, [
  'Badge',
  'Block',
  'Button',
  'ButtonRow',
  'Card',
  'CardList',
  'Checkbox',
  'Container',
  'DottedViewList',
  'Dots',
  'Drawer',
  'Form',
  'Input',
  'Label',
  'LayoutLeftNav',
  'List',
  'ListItem',
  'Menu',
  'Modal',
  'Pad',
  'Popover',
  'TabItem',
  'Tabs',
  'Title',
  'TitleBar',
  'View',
  'ViewList',
]);