import { v4 as uuidv4 } from 'uuid';

export const meetingId = async (req, res) => {
    try {
        const meetingID = uuidv4();
        let formattedMeetingID = meetingID.replace(/\D/g, '');//TAKES ONLY NUMERIC VALUE FOR MEETING ID

        const idLength = 15;//ID DESIRED LENGTH
        if (formattedMeetingID.length < idLength) {//MEANS IF GENERATED ID ID LESS THAN 15
            formattedMeetingID = '0'.repeat(idLength - formattedMeetingID) + formattedMeetingID;//THEN WHAT IS THE DIFFERENCE SO THAT NEEDED TO REPLACE WITH 0'S UPTO THE DIFFERENCE
        } else if (formattedMeetingID.length > idLength) {//IF GENERATED ID IS GREATER THAN DESIRED LENGTH
            formattedMeetingID = formattedMeetingID.slice(0, idLength)//THEN THIS WILL TAKE THE FIRST DESIRED LENGTH OF VALUE ("15" VALUES WILL TAJKE FROM FIRST)
        }

        res.json({ meetingID: formattedMeetingID })

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
}


export const meetingPassword = async (req, res) => {
    try {
        const meetingPswd = uuidv4();
        let formattedMeetingPswd = meetingPswd.replace(/-/g, '!')//REPLACE HYPHENS WITH EXCLAMATION MARK

        const pswdLength = 15;
        if (formattedMeetingPswd.length < pswdLength) {
            formattedMeetingPswd = '0'.repeat(pswdLength - formattedMeetingPswd) + formattedMeetingPswd;
        } else if (formattedMeetingPswd.length > pswdLength) {
            formattedMeetingPswd = formattedMeetingPswd.slice(0, pswdLength)
        }

        res.json({ meetingPswd: formattedMeetingPswd })
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
}