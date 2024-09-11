
import { v2 } from 'cloudinary';
import { CLOUDINARY } from './constants';

export const CloudinaryProvider = {
  provide: CLOUDINARY,
  useFactory: () => {
    return v2.config({
      cloud_name: 'dxmirlxul',
      api_key: '989411625921984',
      api_secret: '_aYYEmap_Y8htwRFqIutQ8EgUCM',
    });
  },
};
