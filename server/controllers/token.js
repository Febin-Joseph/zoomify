import pkg from 'agora-access-token';
const { RtcTokenBuilder, RtcRole } = pkg;
import * as dotenv from 'dotenv';

export const genToken = async (req, res) => {
    try {
        const appId = process.env.AGORA_APP_ID
        const appCertificate = process.env.AGORA_CERTIFICATE

        const noCache = (req, res, next) => {
            res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
            res.header('Expires', '-1');
            res.header('Pragma', 'no-cache');
            next();
        }

        const generateAccessToken = (req, res) => {
            res.header('Acess-Control-Allow-Origin', '*');

            const channelName = req.query.channelName;
            if (!channelName) {
                return res.status(500).json({ message: 'channel name is required' })
            }

            let uid = req.query.uid;
            if (!uid || uid == '') {
                uid = 0;
            }

            let role = RtcRole.SUBSCRIBER;
            if (req.query.role == 'publisher') {
                role = RtcRole.PUBLISHER;
            }

            let expireTime = req.query.expireTime;
            if (!expireTime || expireTime == '') {
                expireTime = 3600;
            } else {
                expireTime = parseInt(expireTime, 10);
            }

            const currentTime = Math.floor(Date.now() / 1000);
            const privilegeExpireTime = currentTime + expireTime;

            const token = RtcTokenBuilder.buildTokenWithUid(appId, appCertificate, channelName, uid, role, privilegeExpireTime);

            return res.json({ 'token': token });
        }

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
}