import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Linkify from 'react-linkify';
import shortid from 'shortid';
import '../styles/Editable.css';

class Editable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isEditing: false,
      editingContent: props.originalContent,
    };
  }

  renderContent = () => {
    const { originalContent, wrapperClassName, lineClassName } = this.props;

    if (Array.isArray(originalContent)) {
      return <Linkify>
        <div className={wrapperClassName} onClick={this.showEditor}>
          { originalContent.map(line => {
            return (
              <p className={lineClassName} key={shortid.generate()}>{line}</p>
            );
          }) }
        </div>
      </Linkify>;
    }
    return <span className={lineClassName} onClick={this.showEditor}>{originalContent}</span>;
  }

  renderEditor = () => {
    const { editingContent } = this.state;
    return (
      <span className="editor">
        { Array.isArray(editingContent) &&
          <textarea
            onChange={(event) => this.setState({ editingContent: event.target.value.split('\n') })}
            value={editingContent.join('\n')} />
        }
        { !Array.isArray(editingContent) &&
          <input type="text" value={editingContent} onChange={(event) => this.setState({ editingContent: event.target.value })} />
        }
        <button onClick={this.saveContent}>Save</button>&nbsp;
        <button onClick={this.cancel}>Cancel</button>
      </span>);
  }

  showEditor = () => {
    this.setState({ isEditing: true });
  }
  saveContent = () => {
    this.props.onSave(this.state.editingContent);
    this.setState({ isEditing: false });
  }
  cancel = () => this.setState({ isEditing: false, editingContent: this.props.originalContent });

  render() {
    const { isEditing } = this.state;
    if (isEditing) {
      return this.renderEditor();
    }
    return this.renderContent();
  }
};

Editable.propTypes = {
  wrapperClassName: PropTypes.string,
  lineClassName: PropTypes.string,
  originalContent: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.arrayOf(PropTypes.string)
  ]),
  onSave: PropTypes.func,
};

export default Editable;
