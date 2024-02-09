import React from "react";
import { format } from "date-fns";

interface UserAndTimestampCardHeaderProps {
  author: { fullName?: string; imgUrl?: string };
  timeStamp: Date;
}

const UserAndTimestampCardHeader: React.FC<UserAndTimestampCardHeaderProps> = ({
  author: { fullName, imgUrl },
  timeStamp,
}) => {
  return (
    <div className="container px-0">
      <div className="d-flex justify-content-between align-items-center ms-0">
        <div className="d-flex align-items-center ms-0">
          <img
            alt="User Avatar"
            className="rounded-circle ms-0 me-2"
            height="50"
            width="50"
            src={imgUrl}
          />

          <p className="h5 my-0">{fullName}</p>
        </div>
        <small className="my-0 text-muted">
          {`${format(new Date(timeStamp || 0), "dd/MM/yyyy HH:mm:ss")}`}
        </small>
      </div>
    </div>
  );
};

export default UserAndTimestampCardHeader;
