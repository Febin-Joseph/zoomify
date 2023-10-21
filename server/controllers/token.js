import pkg from 'agora-access-token';
const { RtcTokenBuilder, RtcRole } = pkg;

export const genToken = async (req, res) => {
    try {
        const appId = process.env.AGORA_APP_ID;
        const appCertificate = process.env.AGORA_CERTIFICATE;
        const channelName = req.params.channelName;
        const uid = req.params.uid
        const role = req.params.role;
        const expireTime = 36;

        if (!appId || !appCertificate) {
            return res.status(500).json({ message: 'Agora credentials not found' });
        }

        if (!channelName) {
            return res.status(400).json({ message: 'Channel name is required' });
        }

        let rtcRole;
        if (role === 'publisher') {
            rtcRole = RtcRole.PUBLISHER;
        } else if (role === 'subscriber') {
            rtcRole = RtcRole.SUBSCRIBER;
        } else {
            return res.status(400).json({ message: 'Invalid role' });
        }

        const currentTimestamp = Math.floor(Date.now() / 1000);
        const privilegeExpireTime = currentTimestamp + expireTime;

        const token = RtcTokenBuilder.buildTokenWithUid(appId, appCertificate, channelName, uid, rtcRole, privilegeExpireTime);
        console.log('appId:', appId);
        console.log('appCertificate:', appCertificate);
        console.log('channelName:', channelName);
        console.log('uid:', uid);
        console.log('rtcRole:', rtcRole);
        console.log('privilegeExpireTime:', privilegeExpireTime)
        return res.json({ uid, token });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
};