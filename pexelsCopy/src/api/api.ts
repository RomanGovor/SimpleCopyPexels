import { createClient } from 'pexels';
import * as axios from 'axios'


const client = createClient('563492ad6f917000010000014640aabb4e9d420cbe1c0df7daf4c2bf');

client.photos.curated({ per_page: 1 }).then(photos => console.log(photos));
