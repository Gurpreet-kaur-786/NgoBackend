// import multer from 'multer'
// import path from 'path'
// import * as url from 'url'

// const _dirname = url.fileURLToPath(new URL('.',import.meta.url))
// const  storage = multer.diskStorage({
//     destination:(req,file,cb)=>{
//         cb(null,path.join(_dirname,'../upload'))
//     },
//     filename:(req,file,cb)=>{
//         cb(null,Date.now()+'-'+ file.originalname)

//     }
// })
// const upload = multer({
//     storage,
//     limits:{
//         fileSize:1024*1024*5,
//     },
//     fileFilter:(req,file,cb)=>{
//         if (file.mimetype.startsWith('image/')) {
//             cb(null, true);
      
//           } else {
//             cb(new Error('Only image files are allowed!'), false);
      
//           }
//     }

// })

// export default upload

import multer from 'multer'

const storage = multer.diskStorage({
    filename:function(req,file,cb){
        cb(null,file.originalname)
    }
})
const upload = multer({storage:storage})

export default upload 