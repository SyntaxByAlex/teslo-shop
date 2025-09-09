export const fileFilter = (req: Express.Request, file: Express.Multer.File, callback: Function) => {

    if (!file) return callback(new Error('File is required'), false);

    const fielExtension = file.mimetype.split('/')[1];
    const validExtensions = ['png', 'jpg', 'jpeg', 'gif'];

    if (validExtensions.includes(fielExtension)) {
        callback(null, true);
    }
    callback(null, false);

}