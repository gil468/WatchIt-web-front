import React, { useState } from "react";
import "./imageProfile.css";
<link
  rel="stylesheet"
  href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0"
/>;
interface EditableImageProps {
  imageUrl: string;
}

const EditableImage: React.FC<EditableImageProps> = ({ imageUrl }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [newImageUrl, setNewImageUrl] = useState(imageUrl);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewImageUrl(URL.createObjectURL(event.target.files?.[0] ?? new Blob()));
  };

  const handleSaveClick = () => {
    setIsEditing(false);
  };

  return (
    <div>
      {isEditing ? (
        <div className="grid py-3 gap-3">
          <div className="p-2">
            <input type="file" onChange={handleImageChange} />
          </div>
          <div className="p-2">
            <button
              className="btn btn-dark w-50 mx-auto"
              onClick={handleSaveClick}
            >
              Save
            </button>
          </div>
        </div>
      ) : (
        <div>
          <div className="text-center py-3">
            <div className="justify-content-center">
              <div className="image-container">
                <img
                  src={newImageUrl}
                  alt="Profile"
                  style={{ maxWidth: "100px", maxHeight: "100px" }}
                />
              </div>
              <button className="btn btn-link" onClick={handleEditClick}>
                {/* <img src="src/assets/pencil.svg" /> */}
                <i className="bi bi-pencil me-2 align-middle" style={{ color: "#000000" }}></i>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EditableImage;
