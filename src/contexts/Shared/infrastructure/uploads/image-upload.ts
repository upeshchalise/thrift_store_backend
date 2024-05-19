import { randomUUID } from 'crypto';
import multer from 'multer';
import path from 'path';

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, 'public/uploads')
    },
    filename: function(req,file,cb) {
        const uniqueSuffix = randomUUID();
        const fileExtension = path.extname(file.originalname);
        cb(null, `${file.fieldname}-${uniqueSuffix}${fileExtension}`)
    }
})

const fileFilter = (req:any,file:any,cb:any)=> {
    const allowedMimes = ['image/jpeg', 'image/png', 'image/jpg'];
    if(allowedMimes.includes(file.mimetype)) {
        cb(null,file);
    }else {
        cb(new Error('Only png,jpeg and jpg files are allowed'))
    }
}


export const upload = multer({
    storage: storage,
    fileFilter: fileFilter,
    limits: {fileSize: 4 * 1024 * 1024}
})