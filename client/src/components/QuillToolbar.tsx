const QuillToolbar = () => (
  <div id="toolbar">
    <span className="ql-formats">
      <select className="ql-header" defaultValue="3">
        <option value="1">Heading 1</option>
        <option value="2">Heading 2</option>
        <option value="3">Heading 3</option>
        <option value="4">Heading 4</option>
        <option value="5">Heading 5</option>
        <option value="6">Heading 6</option>
      </select>
      <select className="ql-size" defaultValue="medium">
        <option value="small">Small</option>
        <option value="medium">Medium</option>
        <option value="large">Large</option>
      </select>
    </span>
    <span className="ql-formats">
      <button className="ql-bold"></button>
      <button className="ql-underline"></button>
    </span>
    <span className="ql-formats">
      <button className="ql-list" value="ordered"></button>
      <button className="ql-list" value="bullet"></button>
      <select className="ql-align" defaultValue="false">
        <option label="left"></option>
        <option label="center" value="center"></option>
        <option label="right" value="right"></option>
        <option label="justify" value="justify"></option>
      </select>
    </span>
    <span className="ql-formats">
      <button className="ql-link"></button>
      <button className="ql-image"></button>
      <button className="ql-video"></button>
    </span>
    <span className="ql-formats">
      <button className="ql-formula"></button>
      <button className="ql-code-block"></button>
    </span>
    <span className="ql-formats">
      <button className="ql-clean"></button>
    </span>
  </div>
);

export default QuillToolbar;
