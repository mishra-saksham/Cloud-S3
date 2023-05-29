const express = require('express');
const app = express();
const CryptoJS = require('crypto-js');
const { S3Client,ListBucketsCommand,PutObjectCommand,GetObjectCommand } = require('@aws-sdk/client-s3');
const { getSignedUrl }  = require("@aws-sdk/s3-request-presigner");

// Set up AWS credentials
const multer = require('multer');
const multerS3 = require('multer-s3');
const credentials = {
  accessKeyId: '9bvznd1zdigsT5jF',
  secretAccessKey: 'ODT8QVn4xNtvhjruEXqfwyLFnzrSozIfL5ieubsk'
};

// Create an S3 client instance
const s3 = new S3Client({
  endpoint: "https://s3.tebi.io",
  region: "sgp",
  credentials
});
// const upload = multer({
//   storage: multerS3({
//     s3,
//     bucket: "cloud-eu1-storage-p0-clds3.playtunes.ml",
//     acl: 'public-read',
//     contentType: multerS3.AUTO_CONTENT_TYPE,
//     key: function (req, file, cb) {
//       const ext = file.originalname.split('.').pop();
//       cb(null, `${CryptoJS.SHA256(Date.now()+'-'+ file.originalname).toString()}-${file.originalname}.${ext}}`);
//     },
//     metadata: function (req, file, cb) {
//       cb(null, { fieldName: file.fieldname });
//     }
//   }),
//   limits: {
//     fieldSize: 1000 * 1024 * 1024, // 1GB limit
//     fileSize: 5000 * 1024 * 1024 // 5GB limit
//   }
// });

app.get('/', (req, res) => {
  res.set('Content-Type', 'text/html');
  res.send(`
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>CloudS3 Online Homies Drive</title>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css"/>
      </head>
      <body>
        <div class="wrapper">
          <form  action="/upload" method="post" enctype="multipart/form-data" id="upload-form">
          <div id="ripple">
          <form action="/upload" method="post" enctype="multipart/form-data"> 
          <img src="https://ucarecdn.com/2c822f84-a706-4f73-815f-3accd9d8173b/" alt="Uploadgif">
           </form>
          </div>
           
            <input class="file-input" type="file" name="file" hidden multiple>
            
            <p>Save to CloudS3</p>
          </form>
          <section class="progress-area"></section>
          <section class="uploaded-area"></section>
        </div>
        <style>
          /* Import Google font - Poppins */
          @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600&display=swap');
          *{
            margin: 0;
            padding: 0;
            box-sizing: border-box;
            font-family: "Poppins", sans-serif;
          }
          body{
            display: flex;
            align-items: center;
            justify-content: center;
            min-height: 100vh;
            background: #6990F2;
          }
          ::selection{
            color: #fff;
            background: #6990F2;
          }
          .wrapper{
            width: 430px;
            background: #fff;
            border-radius: 5px;
            padding: 30px;
            box-shadow: 7px 7px 12px rgba(0,0,0,0.05);
          }
          .wrapper header{
            color: #6990F2;
            font-size: 27px;
            font-weight: 600;
            text-align: center;
          }
          .wrapper form{
            height: 167px;
            display: flex;
            cursor: pointer;
            margin: 30px 0;
            align-items: center;
            justify-content: center;
            flex-direction: column;
            border-radius: 5px;
            border: 2px dashed #6990F2;
          }
          form :where(i, p){
            color: #6990F2;
          }
          form i{
            font-size: 50px;
          }
          form p{
            margin-top: 15px;
            font-size: 16px;
          }
          #ripple{
            position: absolute;
            margin: auto;
            margin-left: 50%;
            margin-right: 50%;
            height:100px;
          }
          section .row{
            margin-bottom: 10px;
            background: #E9F0FF;
            list-style: none;
            padding: 15px 20px;
            border-radius: 5px;
            display: flex;
            align-items: center;
            justify-content: space-between;
          }
          section .row i{
            color: #6990F2;
            font-size: 30px;
          }
          section .details span{
            font-size: 14px;
          }
          .progress-area .row .content{
            width: 100%;
            margin-left: 15px;
          }
          .progress-area .details{
            display: flex;
            align-items: center;
            margin-bottom: 7px;
            justify-content: space-between;
          }
          .progress-area .content .progress-bar{
            height: 6px;
            width: 100%;
            margin-bottom: 4px;
            background: #fff;
            border-radius: 30px;
          }
          .content .progress-bar .progress{
            height: 100%;
            width: 0%;
            background: #6990F2;
            border-radius: inherit;
          }
          .uploaded-area{
            max-height: 232px;
            overflow-y: scroll;
          }
          .uploaded-area.onprogress{
            max-height: 150px;
          }
          .uploaded-area::-webkit-scrollbar{
            width: 0px;
          }
          .uploaded-area .row .content{
            display: flex;
            align-items: center;
          }
          .uploaded-area .row .details{
            display: flex;
            margin-left: 15px;
            flex-direction: column;
          }
          .uploaded-area .row .details .size{
            color: #404040;
            font-size: 11px;
          }
          .uploaded-area i.fa-check{
            font-size: 16px;
          }
        </style>
        <script src="https://s3.tebi.io/cloud-eu1-storage-p0-clds3.playtunes.ml/api-upload-main-app.js">
        </script>
      </body>
    </html>
  `);
}); 
app.get('/online/d/:key', async (req, res) => {
  const key = req.params.key;
  res.send(`Your disk address is ${key}`)
});
app.get('/api/v1/getfile/:bucketId', async (req, res) => {
  const bucketId = req.params.bucketId;
  const key = req.query.key;
  const credentials = {
    accessKeyId: 'KTcTQmJmJqIIDJh214y1',
    secretAccessKey: 'NTmGYzSZ5oY2LEIjzqwwCCciFwvcb4mU4RzgMzS4'
  };
  // Create an S3 client instance
  const s3Client = new S3Client({
    endpoint: "https://m4i3.par.idrivee2-43.com",
    region: "paris",
    credentials
  });

  const command = new GetObjectCommand({
    Bucket: "clds3-pari-idrv-p0-hdd",
    Key: key,
    ACL: 'public-read',
    ResponseContentDisposition: 'inline; filename="bigger.mp4"',
    ContentLengthRange: {
      min: 0,
      max: 1024 * 1024 * 8000 // 100 MB
    }
  });

  const url = await getSignedUrl(s3Client, command, { expiresIn: 3600*24 });

  res.send(url);
});
// app.get('api/v1/getfile/:bcktid', async (req, res) => {
//   bucket_id = req.params.bcktid;
//   const credentials = {
//     accessKeyId: 'V8td0QqC4ul9XQGPNTZh',
//     secretAccessKey: 'tIATgra7BmH0EqwQfLzUagTqYyAAzVS7Esekr0fM'
//   };
//   // Create an S3 client instance
//   const s3Client = new S3Client({
//     endpoint: "https://w6s4.sg.idrivee2-50.com",
//     region: "singapore",
//     credentials
//   });
//   const key = req.query.key;
//   const command = new GetObjectCommand({
//     Bucket: "cloudstoragesgp1idrvep0clds3",
//     Key: key,
//     ResponseContentDisposition: 'inline; filename="ForBiggerJoyrides.mp4"'
//   });

//   const url = await getSignedUrl(s3Client, command, { expiresIn: 3600*24 });

//   res.send(url);
// });

// Handle file uploads
// Handle file uploads

// async function upload_file(file) {
//     const s3Client = new S3Client({
//         endpoint: "https://s3.tebi.io",
//         region: "global",
//         credentials
//       });
//     const { originalname, buffer, mimetype } = file; // Extract necessary information from the file object
//     const upload_data = await s3Client.send(
//       new PutObjectCommand({
//         Bucket: "cloud-eu1-storage-p0-clds3.playtunes.ml",
//         Key: originalname, // Use the original file name as the key
//         Body: buffer, // Use the file buffer as the body
//         ContentType: mimetype, // Set the content type to the file mimetype,
//         ACL: 'public-read'
//       })
//     );
//     return upload_data;
// }
// app.post("/upload", upload.single("file"), async (req, res) => {
//     try {
//       if (!req.file) {
//         throw new Error("No file uploaded");
//       }
  
//       const file = req.file;
//       const file_extension = file.originalname.split(".").pop();
//       const uploadUrl = `https://s3.tebi.io/cloud-eu1-storage-p0-clds3.playtunes.ml/${file.key}.${file_extension}`;
//       res.send({ uploadUrl });
//     } catch (error) {
//       console.log('"Sorry Man Problem Occured"');
//       console.error(error);
//       res.status(500).send("Error uploading file");
//     }
// });
const upload = multer({
  storage: multerS3({
    s3,
    bucket: "cloud-eu1-storage-p0-clds3.playtunes.ml",
    acl: 'public-read',
    contentType: multerS3.AUTO_CONTENT_TYPE,
    key: function (req, file, cb) {
      const ext = file.originalname.split('.').pop();
      cb(null, `${CryptoJS.SHA256(Date.now()+'-'+ file.originalname).toString()}-${file.originalname}`);
    },
    metadata: function (req, file, cb) {
      cb(null, { fieldName: file.fieldname });
    },
    shouldTransform: function (req, file, cb) {
      cb(null, /^image/i.test(file.mimetype));
    },
    transforms: [{
      id: 'original',
      key: function (req, file, cb) {
        const ext = file.originalname.split('.').pop();
        cb(null, `${CryptoJS.SHA256(Date.now()+'-'+ file.originalname).toString()}`);
      },
      transform: function (req, file, cb) {
        cb(null, sharp().resize(800, 800));
      }
    }]
  }),
  limits: {
    fieldSize: 1000 * 1024 * 1024, // 1GB limit
    fileSize: 5000 * 1024 * 1024 // 5GB limit
  }
});
app.post('/upload', upload.single('file'), async (req, res) => {
  const command = 'putObject';
  const s3Params = {
    Bucket: process.env.AWS_BUCKET_NAME,
    Key: req.file.filename,
    ContentType: req.file.mimetype,
  };
  try {
    const signedUrl = await getSignedUrl(s3, command, { expiresIn: 3600 });
    const uploadId = await createMultipartUpload(s3, s3Params);
    const parts = await uploadMultipart(s3, req.file, uploadId);
    const result = await completeMultipartUpload(s3, s3Params, uploadId, parts);
    res.send({ signedUrl });
  } catch (error) {
    console.error(error);
    res.status(500).send('Error generating pre-signed URL');
  }
});

async function createMultipartUpload(s3, s3Params) {
  const result = await s3.createMultipartUpload(s3Params).promise();
  return result.UploadId;
}

async function uploadMultipart(s3, file, uploadId) {
  const partSize = 1024 * 1024 * 1; // 5MB
  const numParts = Math.ceil(file.size / partSize);
  const parts = [];
  for (let i = 0; i < numParts; i++) {
    const start = i * partSize;
    const end = Math.min(start + partSize, file.size);
    const partParams = {
      Body: file.buffer.slice(start, end),
      Bucket: process.env.AWS_BUCKET_NAME,
      Key: file.originalname,
      PartNumber: i + 1,
      UploadId: uploadId,
    };
    const result = await s3.uploadPart(partParams).promise();
    parts.push({ ETag: result.ETag, PartNumber: i + 1 });
  }
  return parts;
}

async function completeMultipartUpload(s3, s3Params, uploadId, parts) {
  const params = {
    Bucket: s3Params.Bucket,
    Key: s3Params.Key,
    MultipartUpload: {
      Parts: parts,
    },
    UploadId: uploadId,
  };
  const result = await s3.completeMultipartUpload(params).promise();
  return result;
}
app.listen(3000, () => {
  console.log('Server listening on port 3000');
});