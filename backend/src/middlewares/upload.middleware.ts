import multer from "multer";

const storage = multer.diskStorage({
  destination: "uploads/",
  filename: (req: any, file: any, cb: any) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({
  storage,
  limits: {
    fileSize: 2 * 1024 * 1024, // 2 MB
  },
});

export default upload;
