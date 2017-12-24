import {Injectable} from "@angular/core";
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {ImagePicker} from '@ionic-native/image-picker';
import {Camera, CameraOptions} from '@ionic-native/camera';
import {FileTransfer, FileUploadOptions, FileTransferObject} from '@ionic-native/file-transfer';
import {User} from "../models/user";

@Injectable()
export class ImgService {
    constructor(public http: HttpClient,
                public transfer: FileTransfer,
                public camera: Camera,
                public imagePicker: ImagePicker) {
    }

    /**
     * 选取图片
     * 成功返回: Promise: 图片的路径数组
     * 失败返回： Promise: ['error']
     */
    openImgPicker() {
        let reURL = ['error'];
        if (!this.imagePicker.hasReadPermission()) {
            this.imagePicker.requestReadPermission();
        }

        if (this.imagePicker.hasReadPermission()) {
            let options = {
                maximumImagesCount: 9,
                width: 800,
                height: 800,
                quality: 80,
            };

            return this.imagePicker.getPictures(options).then(
                (results) => {
                    reURL = [];
                    for (let i = 0; i < results.length; i++) {
                        let tem = results[i];
                        reURL.push(tem);
                        console.log(tem);
                    }
                }, (err) => {
                    reURL = ['error'];
                    console.log(err);
                }).then(() => {
                return reURL;
            });
        } else {
            return Promise.resolve(reURL);
        }

    }

    /**
     * 选取图片，只能选一张
     * 成功返回: Promise: 图片的路径数组
     * 失败返回： Promise: 'error'
     */
    openImgPickerSingle() {
        let reURL = 'error';
        if (!this.imagePicker.hasReadPermission()) {
            this.imagePicker.requestReadPermission();
        }

        if (this.imagePicker.hasReadPermission()) {
            let options = {
                //maximumImagesCount: 1,
                width: 800,
                height: 800,
                quality: 80
            };

            return this.imagePicker.getPictures(options).then(
                (results) => {
                    reURL = results[0];
                }, (err) => {
                    reURL = 'error';
                    console.log("ImgService-siglepicker:" + err);
                }).then(() => {
                return reURL;
            });
        } else {
            return Promise.resolve(reURL);
        }

    }

    /**
     * 拍照
     * 成功返回: Promise: 图片的路径
     * 失败返回： Promise: 'error'
     */
    openCamera(type?: string) {
        let re;
        const options: CameraOptions = {
            quality: 100,
            destinationType: type === 'base64' ? this.camera.DestinationType.DATA_URL : this.camera.DestinationType.FILE_URI,
            sourceType: this.camera.PictureSourceType.CAMERA,
            encodingType: this.camera.EncodingType.JPEG,
            mediaType: this.camera.MediaType.PICTURE,
            allowEdit: true,
            correctOrientation: true,
        };

        return this.camera.getPicture(options).then((imageData) => {
            if (type === 'base64') {
                re = "data:image/jpeg;base64," + imageData;
            } else {
                re = imageData;
            }
            //console.log(imageData);
        }, (err) => {
            re = 'error';
        }).then(() => {
            return re;
        });

    }

    /**
     *
     * @param user:传文件的user
     * @param url:文件的url
     * @param type:"userimage"表示用作头像,"moment"表示用作动态
     */
    sendFile(user: User, url: string, type: string) {
        const fileTransfer: FileTransferObject = this.transfer.create();
        const dest = "http://120.25.238.161:3000/upload/uploadImg.json";
        const options = {
            username: user.username,
            type: type,
        };
        const op: FileUploadOptions = {
            params: options,
        };
        return fileTransfer.upload(url, dest, op).then((data) => {
            //var resp = JSON.parse(data.response);
            if (data.responseCode == 200) {
                const resp = JSON.parse(data.response);
                const newURL: string = resp.url;
                return Promise.resolve(newURL);
            }
            return Promise.reject('error');
        }).catch((error) => {
            console.log('ImgService-sendFile', error);
            return Promise.reject('error');
        });

    }

    modifyImageAtSignUp(username: string, imageUrl: string) {
        let url = 'http://120.25.238.161:3000/user/modifyUserImage';
        let info = {
            username: username,
            userImage: imageUrl,
        };

        return this.http.put(url, JSON.stringify(info), {
            headers: new HttpHeaders().set('Content-Type', 'application/json'),
        }).toPromise().then(res => {
            if (res === 'success') {
                return Promise.resolve('success');
            }
            return Promise.reject('error');
        }).catch(err => {
            console.log('ImgService-modifyImageAtSignup', err);
            return Promise.reject('error');
        });

        // return this.http.put(url, JSON.stringify(info), {
        //     headers: new HttpHeaders().set('Content-Type', 'application/json'),
        // }).subscribe(
        //     res => {
        //         if (res === 'success') {
        //             return Promise.resolve('success');
        //         }
        //         return Promise.resolve('error');
        //     },
        //     err => {
        //         console.log('ImgService-modifyImageAtSignup', err);
        //         return Promise.resolve('error');
        //     }
        // );
    }


}
