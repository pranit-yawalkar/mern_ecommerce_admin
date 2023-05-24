import React, { useEffect, useMemo, useState } from "react";
import { useDropzone } from "react-dropzone";
import { tokens } from "../theme";
import { Box, IconButton, useTheme } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { deleteImage, uploadImage } from "../features/upload/uploadSlice";
import { GridCloseIcon } from "@mui/x-data-grid";

const DropZone = ({ isSubmit }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const dispatch = useDispatch();
  const [files, setFiles] = useState([]);

  const baseStyle = {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "20px",
    borderWidth: 2,
    borderRadius: 2,
    borderColor: colors.grey[500],
    borderStyle: "dashed",
    color: "#bdbdbd",
    outline: "none",
    transition: "border .24s ease-in-out",
  };

  const focusedStyle = {
    borderColor: "#2196f3",
  };

  const acceptStyle = {
    borderColor: "#00e676",
  };

  const rejectStyle = {
    borderColor: "#ff1744",
  };

  const onDrop = (acceptedFiles) => {
    if (acceptedFiles.length > 0) {
      setFiles(acceptedFiles);
    }
  };

  const { getRootProps, getInputProps, isFocused, isDragAccept, isDragReject } =
    useDropzone({ accept: { "image/*": [] }, onDrop });

  const style = useMemo(
    () => ({
      ...baseStyle,
      ...(isFocused ? focusedStyle : {}),
      ...(isDragAccept ? acceptStyle : {}),
      ...(isDragReject ? rejectStyle : {}),
    }),
    [isFocused, isDragAccept, isDragReject]
  );

  useEffect(() => {
    if (isSubmit === true) {
      dispatch(uploadImage(files));
      setFiles([]);
    }
  }, [isSubmit]);

  const deleteImg = (deleteFile) => {
    setFiles(files.filter((file) => file !== deleteFile));
  };

  return (
    <div style={{ width: "100%" }}>
      <div {...getRootProps({ style })}>
        <input {...getInputProps()} />
        <p>Drag 'n' drop some files here, or click to select files</p>
        {files?.length > 0 &&
          files?.map((file) => (
            <p key={file?.name}>Selected File: {file?.name}</p>
          ))}
      </div>
      {
        <Box display="flex" gap="1em" flexWrap="wrap" marginTop="2em">
          {files?.length > 0 &&
            files?.map((file) => (
              <Box
                key={file?.name}
                sx={{ position: "relative", background: colors.primary[400] }}
              >
                <IconButton
                  sx={{
                    position: "absolute",
                    top: "0",
                    right: "0",
                    color: colors.grey[100],
                  }}
                  onClick={() => deleteImg(file)}
                >
                  <GridCloseIcon />
                </IconButton>
                <img
                  src={URL.createObjectURL(file)}
                  alt="prod-image"
                  width="200"
                  height="200"
                />
              </Box>
            ))}
        </Box>
      }
    </div>
  );
};

export default DropZone;
