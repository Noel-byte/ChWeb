import React, { useRef } from 'react';
import JoditEditor from 'jodit-react';

const BlogEditor = ({ value, handleChange }) => {
  const editor = useRef(null);

  const config = {
    readonly: false, // all editing allowed
    toolbar: true,
    toolbarSticky: false,
    height:300,
    toolbarAdaptive: false,
    showCharsCounter: true,
    showWordsCounter: true,
    showXPathInStatusbar: false,
    buttons: [
      'source', '|',
      'undo', 'redo', '|',
      'bold', 'italic', 'underline', 'strikethrough', '|',
      'superscript', 'subscript', '|',
      'ul', 'ol', 'outdent', 'indent', '|',
      'font', 'fontsize', 'brush', 'paragraph', '|',
      'image', 'file', 'video', 'table', 'link', '|',
      'align', 'hr', 'symbol', 'emoji', '|',
      'copyformat', 'selectall', 'print', '|',
      'fullsize', 'preview', 'spellcheck', '|',
      'cut', 'copy', 'paste', '|',
      'about'
    ]
  };

  return (
    <JoditEditor
      ref={editor}
      tabIndex={1}
      value={value}
      config={config}
      onBlur={(newContent)=>handleChange(newContent)}
    
    />
  );
};

export default BlogEditor;

