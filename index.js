ZoomMtg.preLoadWasm(); // pre download wasm file to save time.
ZoomMtg.prepareJssdk();

const API_KEY = "wjNPCMw_RB6Ewt5ZQXHZig"; //"YOUR_API_KEY"
const API_SECRET = "xDUMhqk5qVJoo018VL4pdL7fpujhZ7RDE3nw"; //"YOUR_API_SECRET"
const url = 'https://zoom-k.herokuapp.com/'; // YOUR_FETCH_URL_FOR_GET_SIGNATURE

/** request body to get signature */
const requestBody = {
    apiKey: API_KEY,
    apiSecret: API_SECRET,
    meetingNumber: 3073300639, // HOST_MEETING_NUMBER
    role: 0, // 1 for host; 0 for attendee,
};

/** meetconfig to join meeting */
const meetConfig = {
    meetingNumber: 3073300639, // should be integer.
    userName: 'karan panwar',
    passWord: '',
};

document
    .getElementById("join_meeting")
    .addEventListener("click", function (e) {
        e.preventDefault();
        /**join meeting called when join button clicked */
        console.log('on Click');
        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(requestBody)
        })
            .then(res => res.json())
            .then(data => {
                console.log('signature recieved', data);
                ZoomMtg.init({
                    isSupportAV: true,
                    leaveUrl: 'http://www.zoom.us',
                    success: function () {
                        console.log('zoom init success');
                        ZoomMtg.join({
                            meetingNumber: meetConfig.meetingNumber,
                            userName: meetConfig.userName,
                            passWord: meetConfig.passWord,
                            signature: data.signature,
                            apiKey: API_KEY,
                            success: function (success) {
                                console.log('meeting joined success.');
                            },
                            error: function (error) {
                                console.log('you have error in meeting join method',error);
                            }
                        })
                    },
                    error: function (error) {
                        console.log('Error in zoom  meeting init.',error)
                    }
                });
            });
    });


