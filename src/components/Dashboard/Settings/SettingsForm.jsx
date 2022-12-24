import { CKEditor } from "@ckeditor/ckeditor5-react";
import { useState } from "react";
import styles from "./Settings.module.css";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { useEffect } from "react";

const SettingsForm = (props) => {
  const [typeInput, setTypeInput] = useState("text");
  const [variableInput, setVariableInput] = useState();
  const [editorData, setEditorData] = useState();
  const [valueData, setValueData] = useState();
  const [status, setStatus] = useState("0");

  useEffect(() => {
    if (props.configData) {
      setTypeInput(props.configData?.type);
      setVariableInput(props.configData?.variable);
      if (props.configData?.type == "editor") {
        setEditorData(props.configData?.value);
      } else {
        setValueData(props.configData?.value);
      }
      setStatus(props.configData?.status);
    }
  }, [props.configData]);

  const onTypeChange = (event) => {
    setTypeInput(event.target.value);
  };
  const onStatusChange = (event) => {
    setStatus(event.target.value);
  };
  const onVariableChange = (event) => {
    setVariableInput(event.target.value);
  };
  const onValueDataChange = (event) => {
    setValueData(event.target.value);
  };

  const onFormSubmit = (event) => {
    event.preventDefault();
    if (props.edit) {
      props.onEditSettings({
        variable: variableInput,
        status: status,
        type: typeInput,
        value: typeInput == "editor" ? editorData : valueData,
      });
    } else {
      props.onCreateSetting({
        variable: variableInput,
        status: status,
        type: typeInput,
        value: typeInput == "editor" ? editorData : valueData,
      });
    }
  };

  // console.log(props.configData)
  return (
    <form className={styles.modalForm} onSubmit={onFormSubmit}>
      <label>
        <p>متغیر</p>
        <input type="text" value={variableInput} onChange={onVariableChange} />
      </label>

      <div>
        <p style={{ marginBottom: "0px", marginTop: "10px" }}>نوع تنظیمات</p>
        <div style={{ display: "flex", flexDirection: "row" }}>
          <label
            htmlFor="text"
            style={{ display: "flex", flexDirection: "row", gap: "10px" }}
          >
            متن
            <input
              id="text"
              type="radio"
              name="type"
              value="text"
              checked={typeInput == "text"}
              onChange={onTypeChange}
            />
          </label>

          <label
            htmlFor="editor"
            style={{ display: "flex", flexDirection: "row", gap: "10px" }}
          >
            ادیتور
            <input
              id="editor"
              type="radio"
              name="type"
              value="editor"
              checked={typeInput == "editor"}
              onChange={onTypeChange}
            />
          </label>
        </div>
      </div>
      {typeInput == "text" ? (
        <label>
          مقدار
          <textarea value={valueData} onChange={onValueDataChange} />
        </label>
      ) : (
        <div dir="rtl" style={{ direction: "rtl", textAlign: "right" }}>
          <CKEditor
            editor={ClassicEditor}
            data={editorData}
            onReady={(editor) => {
              // console.log("CKEditor5 React Component is ready to use!", editor);
            }}
            onChange={(event, editor) => {
              setEditorData(editor.getData());
            }}
          />
        </div>
      )}
      <div>
        <p style={{ marginBottom: "0px", marginTop: "10px" }}>وضعیت</p>
        <div style={{ display: "flex", flexDirection: "row" }}>
          <label style={{ display: "flex", flexDirection: "row", gap: "10px" }}>
            غیر فعال
            <input
              type="radio"
              name="status"
              value="0"
              checked={status == "0"}
              onChange={onStatusChange}
            />
          </label>

          <label style={{ display: "flex", flexDirection: "row", gap: "10px" }}>
            فعال
            <input
              type="radio"
              name="status"
              value="1"
              checked={status == "1"}
              onChange={onStatusChange}
            />
          </label>
        </div>
      </div>
      <button className={styles.submitBtn} type="submit">
        ایجاد
      </button>
    </form>
  );
};

export default SettingsForm;
