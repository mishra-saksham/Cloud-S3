const express = require('express');
const app = express();
const CryptoJS = require('crypto-js');
const { S3Client,ListBucketsCommand,PutObjectCommand,GetObjectCommand } = require('@aws-sdk/client-s3');
const { getSignedUrl }  = require("@aws-sdk/s3-request-presigner");

// Set up AWS credentials
const multer  = require('multer');
const multerS3 = require('multer-s3');
const credentials = {
  accessKeyId: '9bvznd1zdigsT5jF',
  secretAccessKey: 'ODT8QVn4xNtvhjruEXqfwyLFnzrSozIfL5ieubsk'
};

// Create an S3 client instance
const s3 = new S3Client({
  region: "sgp",
  endpoint: "https://s3.tebi.io",
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

          <input class="file-input" type="file" name="file" hidden>
         
          <p>        <svg width="100" height="100" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path class="circle_sub_svg" fill-rule="evenodd" clip-rule="evenodd" d="M50 100C77.6142 100 100 77.6142 100 50C100 22.3858 77.6142 0 50 0C22.3858 0 0 22.3858 0 50C0 77.6142 22.3858 100 50 100ZM73.4327 40.2125L73.4374 42.4069L75.5301 43.0671C82.1825 45.1658 87 51.3868 87 58.7251C87 67.7252 79.7566 75.0338 70.7821 75.1392L70.6807 75.1404H32.7951L32.2001 75.1061C21.4941 74.4906 13 65.6104 13 54.7485C13 43.4864 22.1297 34.3567 33.3918 34.3567C35.8892 34.3567 38.2753 34.8043 40.4786 35.621L43.1135 36.5976L44.2602 34.0322C46.6419 28.7035 51.9853 25 58.1871 25C66.596 25 73.4149 31.8079 73.4327 40.2125ZM70.8187 78.1404L70.8173 78.139L70.8201 78.1389C72.1346 78.1233 73.4176 77.9771 74.6568 77.7126C83.4245 75.8414 90 68.0511 90 58.7251C90 50.0403 84.2976 42.6873 76.4327 40.2061C76.4114 30.1475 68.2507 22 58.1871 22C50.7593 22 44.3682 26.4385 41.5213 32.808C38.9892 31.8694 36.2504 31.3567 33.3918 31.3567C20.4729 31.3567 10 41.8296 10 54.7485C10 65.9136 17.8223 75.2517 28.2856 77.5813C29.4738 77.8459 30.696 78.0201 31.9448 78.0963L31.9883 78.0989L32.0279 78.1012L31.9883 78.1404H70.8187Z" />
          <path class="Upload_ICO_SVG" d="M64.3363 57.9298C63.7149 57.9298 63.2398 58.405 63.2398 59.0263V65.2398H36.193V59.0263C36.193 58.405 35.7178 57.9298 35.0965 57.9298C34.4751 57.9298 34 58.405 34 59.0263V66.3363C34 66.9576 34.4751 67.4327 35.0965 67.4327H64.3363C64.9576 67.4327 65.4327 66.9576 65.4327 66.3363V59.0263C65.4327 58.405 64.9576 57.9298 64.3363 57.9298ZM50.4839 36.3289C50.0453 35.8904 49.3509 35.8904 48.9488 36.3289L43.4664 41.8114C43.0278 42.25 43.0278 42.9444 43.4664 43.3465C43.905 43.7851 44.5994 43.7851 45.0015 43.3465L48.6199 39.7281V55.3713C48.6199 55.9927 49.095 56.4678 49.7164 56.4678C50.3377 56.4678 50.8129 55.9927 50.8129 55.3713V39.7281L54.4313 43.3465C54.6506 43.5658 54.943 43.6754 55.1988 43.6754C55.4547 43.6754 55.7471 43.5658 55.9664 43.3465C56.405 42.9079 56.405 42.2135 55.9664 41.8114L50.4839 36.3289Z"/>
          </svg>Save to CloudS3</p>
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
      <script src="https://s3.tebi.io/cloud-eu1-storage-p0-clds3.playtunes.ml/api_code%20%281%29.js">
      </script>
    </body>
  </html>
  `);
}); 
// app.get('/online/d/:key', async (req, res) => {
//   const key = req.params.key;
//   res.send(`Your disk address is ${key}`)
// });
// app.get('/api/v1/getfile/:bucketId', async (req, res) => {
//   const bucketId = req.params.bucketId;
//   const key = req.query.key;
//   const credentials = {
//     accessKeyId: 'KTcTQmJmJqIIDJh214y1',
//     secretAccessKey: 'NTmGYzSZ5oY2LEIjzqwwCCciFwvcb4mU4RzgMzS4'
//   };
//   // Create an S3 client instance
//   const s3Client = new S3Client({
//     endpoint: "https://m4i3.par.idrivee2-43.com",
//     region: "paris",
//     credentials
//   });

//   const command = new GetObjectCommand({
//     Bucket: "clds3-pari-idrv-p0-hdd",
//     Key: key,
//     ACL: 'public-read',
//     ResponseContentDisposition: 'inline; filename="bigger.mp4"',
//     ContentLengthRange: {
//       min: 0,
//       max: 1024 * 1024 * 8000 // 100 MB
//     }
//   });

//   const url = await getSignedUrl(s3Client, command, { expiresIn: 3600*24 });

//   res.send(url);
// });
// const videojs = require('video.js');

// app.get('/api/v1/videostream', async (req, res) => {
//   const key = req.query.key;
//   if (!key) {
//     res.status(400).send('Missing key parameter');
//     return;
//   }

//   const player = videojs('videoPlayer', {
//     controls: true,
//     autoplay: false,
//     preload: 'auto',
//     sources: [{
//       src: key,
//       type: 'video/mp4'
//     }]
//   });

//   const html = `

//   `;

//   res.send(html);
// });

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
      region: "sgp",
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
