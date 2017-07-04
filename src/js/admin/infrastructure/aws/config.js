import aws from 'aws-sdk';
import multer from 'multer';
import multerS3 from 'multer-s3';
import Properties from 'share/infrastructure/env/properties'

aws.config.update({
    secretAccessKey: Properties.AWS.secretAccessKey,
    accessKeyId: Properties.AWS.accessKeyId
});

const s3 = new aws.S3();

const upload = multer({
    storage: multerS3({
        s3,
        bucket: 'ecommercenodethiagohora',
        acl: 'public-read-write',
        metadata: (req, file, cb) => {
            cb(null, { fieldName: file.fieldname })
        },
        key: (req, file, cb) => {
            cb(null, file.originalname)
        }
    })
});

export default upload;