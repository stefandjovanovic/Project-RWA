"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CloudinaryProvider = void 0;
const cloudinary_1 = require("cloudinary");
const constants_1 = require("./constants");
exports.CloudinaryProvider = {
    provide: constants_1.CLOUDINARY,
    useFactory: () => {
        return cloudinary_1.v2.config({
            cloud_name: 'dxmirlxul',
            api_key: '989411625921984',
            api_secret: '_aYYEmap_Y8htwRFqIutQ8EgUCM',
        });
    },
};
//# sourceMappingURL=cloudinary.js.map