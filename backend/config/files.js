const { success, failure } = require('../utils/successError');
const {
    S3Client,
    PutObjectCommand,
    DeleteObjectCommand,
    ListObjectsV2Command,
    DeleteObjectsCommand,
} = require("@aws-sdk/client-s3");
const { S3_REGION, S3_BUCKET, S3_BASE_URL } = process.env;

const uploadFile = async function (file, folderName) {
    const s3Client = new S3Client({ region: S3_REGION });
    const key = folderName
        ? `${folderName}/${Date.now()}-${file.originalname}`
        : `${Date.now()}-${file.originalname}`;
    const s3Params = {
        Bucket: S3_BUCKET,
        Key: key,
        Body: file.buffer,
    };
    // console.log(s3Params)
    await s3Client.send(new PutObjectCommand(s3Params));
    return `${S3_BASE_URL}/${s3Params.Key}`;
};

const deleteFile = async function (fileUrl) {
    try {
        const s3Client = new S3Client({ region: S3_REGION });
        const key = fileUrl.split("/").slice(-2).join("/");
        const s3Params = {
            Bucket: S3_BUCKET,
            Key: key,
        };

        console.log(`File URL to delete: ${key}`);
        await s3Client.send(new DeleteObjectCommand(s3Params));
        console.log(`File deleted successfully: ${fileUrl}`);
    } catch (error) {
        console.error(`Error deleting file: ${error.message}`);
        throw error;
    }
};

const deleteFolder = async function (folderName) {
    try {
        console.log(`Folder to delete: ${folderName}`);
        const s3Client = new S3Client({ region: S3_REGION });
        const s3Params = {
            Bucket: S3_BUCKET,
            Prefix: folderName,
        };

        const data = await s3Client.send(new ListObjectsV2Command(s3Params));

        if (data && data.Contents) {
            console.log(`Data: ${data}`);
            const keys = data.Contents.map((object) => object.Key);
            console.log(`Keys to delete: ${keys}`);
            const deleteParams = {
                Bucket: S3_BUCKET,
                Delete: {
                    Objects: keys.map((Key) => ({ Key })),
                },
            };
            await s3Client.send(new DeleteObjectsCommand(deleteParams));
            console.log(`Folder deleted successfully: ${folderName}`);
        } else {
            console.log(
                "No objects found in the folder. The folder may not exist."
            );
        }
    } catch (error) {
        console.error(`Error deleting folder: ${error.message}`);
        throw error;
    }
};


// const handleUpload = async (req, res) => {
//     try {
//         const file = req.file
//         const folderName = req.body.folderName

//         if (!file || !folderName) {
//             return res.status(400).send(failure("File URL and folder name are required."));
//         }

//         const uploadRes = await uploadFile(file, folderName)
//         console.log(uploadRes)

//         const newImage = new imageModel({
//             image: uploadRes
//         })
//         newImage.save()

//         return res.status(200).send(success("Success.", newImage));
//     } catch (error) {
//         console.error("Error while handling upload:", error);
//         return res.status(500).send(failure("Internal server error."));
//     }
// };

// const handleDeleteFile = async (req, res) => {
//     try {
//         const fileUrl = req.body.fileUrl

//         const existingURL = await imageModel.findOne({ image: fileUrl })

//         if (!existingURL) {
//             return res.status(404).send(failure("File not found."));
//         }

//         await imageModel.deleteOne({ image: fileUrl })

//         await deleteFile(fileUrl)

//         return res.status(200).send(success("File deleted."));
//     } catch (error) {
//         console.error("Error while handling delete file:", error);
//         return res.status(500).send(failure("Internal server error."));
//     }
// }

// const handleDeleteFolder = async (req, res) => {
//     try {
//         const folderName = req.body.folderName

//         await deleteFolder(folderName)

//         return res.status(200).send(success("Folder deleted."));
//     } catch (error) {
//         console.error("Error while handling delete folder:", error);
//         return res.status(500).send(failure("Internal server error."));
//     }
// }

module.exports = { uploadFile, deleteFile, deleteFolder };
