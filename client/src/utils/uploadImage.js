export const cloudinary = () => {
    const widger_cloudinary = window.cloudinary.createUploadWidget({
            cloudName: 'dmcrq99gc',
            uploadPreset: 'prueba'
        }, (err, result) => {
            if (result.event === 'success') {
                return result.info.url;
            } else if (err) {
                console.log(err);
            }
        })
        
        widger_cloudinary.open();
    } 
    
    console.log(cloudinary);
