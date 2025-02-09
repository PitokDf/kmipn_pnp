import Pusher from "pusher";


export const pusher = new Pusher({
    appId: process.env.PUSHER_APPID || "appId-isi-surang",
    key: process.env.PUSHER_KEY || "key-isi-surang",
    secret: process.env.PUSHER_SECREET || "secret-isi-surang",
    cluster: process.env.PUSHER_CLUSTER || "cluster-isi-surang",
    useTLS: true
});