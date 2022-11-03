import React from "react";
import s from "../UploadImage/UploadImage.module.css";

export default function UploadImage({ setImage, image }) {
  const handleOnClick = (e) => {
    e.preventDefault();
    const widger_cloudinary = window.cloudinary.createUploadWidget(
      {
        cloudName: "dmcrq99gc",
        uploadPreset: "prueba",
      },
      (err, result) => {
        if (result.event === "success") {
          setImage(result.info.url);
        } else if (err) {
          console.log(err);
        }
      }
    );

    widger_cloudinary.open();
  };
  return (
    <div className={s.containerUploadImage}>
      <img src={image} alt="" className={s.image} />
      <button type="submit" className="modify__button" onClick={handleOnClick}>
        Subir
      </button>
    </div>
  );
}
