/** file upload */

const multer = require("multer");
const multerS3 = require("multer-s3");
const { S3Client } = require("@aws-sdk/client-s3");

// create S3 instance using clinet-s3
const s3Client = new S3Client({
	credentials: {
		accessKeyId: process.env.AWS_ACCESS_KEY_ID,
		secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
	},
	region: process.env.AWS_S3_REGION,
});

/**s3 bucket uploader */
export const s3Uploader = multer({
	storage: multerS3({
		s3: s3Client,
		bucket:
			process.env.AWS_S3_BUCKET_NAME ?? `media_bucket_${dayjs().year()}`,
		contentType(req, file, callback) {
			if (!s3AllowedMimeTypes.includes(file.mimetype)) {
				return callback(
					new HttpError(
						"One or more file(s) in your request contains file type which are not allowed. Please send valid image(s) or video(s).",
						400
					)
				);
			}
			multerS3.AUTO_CONTENT_TYPE(req, file, callback);
		},
		metadata(_, file, callback) {
			callback(null, {
				fieldName: file.fieldname,
				originalName: file.originalname,
			});
		},
		key: function (_, file, callback) {
			let extension = "";
			try {
				extension =
					file.originalname?.split(".")?.splice(-1)?.shift() ?? "";
			} catch (error) {
				logger.log("error", error);
			}
			const filename = `${Date.now().toString()}-${uuid()}${
				extension !== "" ? `.${extension}` : ""
			}`;
			callback(null, `usercontent/${filename}`);
		},
	}),
});

/** funcion to upload file to s3 bucket */
export function UploadFile(req, res, next) {
	console.log("into file uload" , req.body);
	try {
		console.log("into the file upload!!!!");
		s3Uploader
			.array("files", 5)
			.upload()
			.then(() => {
				console.log("file uploaded successfully!!!");
				res.send("File Uploaded Successfully!!!");
			})
			.error(() => {
				console.log("error in file upload!!");
				res.send({ message: "error", error: error });
			});
            
	} catch (error) {
		return error;
	}
}

/** get signed URL of file uploaded */
export function awsPresignedUrlToUpload(filename, filetype) {
	console.log("into file upload", filename, filetype);
	try {
		let awsObj = {
			Bucket: process.env.AWS_S3_BUCKET_NAME,
			Key: filename,
			ContentType: filetype,
		};
		let command = new PutObjectCommand(awsObj);
		return getSignedUrl(s3Client, command, {
			expiresIn: process.env.AWS_S3_PRESIGNED_URL_EXPIRE_IN,
		});
	} catch (error) {
		return error;
	}
}

/** get signed url to download the file */

export function awsPresignedUrlToDownload(props) {
	console.log("pre signed url to download " , props);
	try {
		let command = new GetObjectCommand({
			Bucket: process.env.AWS_S3_BUCKET_NAME,
			key: props.key,
		});
		return getSignedUrl(s3Client, command, {
			expiresIn: process.env.AWS_S3_PRESIGNED_URL_EXPIRE_IN,
		});
	} catch (error) {
		console.log("inot the error ", error);
		return error;
	}
}
