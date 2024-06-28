import React from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css"; // Import the styles

const QuillEditor = ({ aboutInternship, setAboutInternship, pointsOnly }) => {
  const handleChange = (content, delta, source, editor) => {
    if (pointsOnly) {
      const text = editor.getText();
      setAboutInternship(text);
    } else {
      setAboutInternship(editor.getHTML()); // Get the HTML content
    }
  };

  return (
    <div>
      <ReactQuill
        className="w-full rounded"
        value={aboutInternship}
        onChange={handleChange}
        modules={{
          toolbar: !pointsOnly && true, // Enable toolbar unless in pointsOnly mode
        }}
      />
    </div>
  );
};

export default QuillEditor;
