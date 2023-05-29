import React from "react";
import './form.styles.scss'

const FormInput = ({ label, ...ortherProps }) => {
  return (
    <div className="group">
      {label && (
        <label
          className={`${
            ortherProps.value.length ? "shrink" : ""
          } form-input-label`}
        >
          {label}
        </label>
      )}
      <input {...ortherProps} className="form-input" />
    </div>
  );
};

export default FormInput;
