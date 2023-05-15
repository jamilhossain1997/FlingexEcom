import React, { useEffect } from 'react';
import MessengerCustomerChat from 'react-messenger-customer-chat';
function CustomerChat() {
    // useEffect(() => {
    //     window.fbAsyncInit = function () {
    //         FB.init({
    //             xfbml: true,
    //             version: 'v16.0'
    //         });
    //     };

    //     // Reload the SDK asynchronously
    //     (function (d, s, id) {
    //         var js, fjs = d.getElementsByTagName(s)[0];
    //         if (d.getElementById(id)) return;
    //         js = d.createElement(s); js.id = id;
    //         js.src = 'https://connect.facebook.net/en_US/sdk/xfbml.customerchat.js';
    //         fjs.parentNode.insertBefore(js, fjs);
    //     }(document, 'script', 'facebook-jssdk'));
    // }, []);

    return (
        <>
            {/* <div class="fb-customerchat"
                attribution="install_email"
                attribution_version="biz_inbox"
                page_id="112237051243850">
            </div> */}
            <MessengerCustomerChat
                pageId="112237051243850"
                appId="177584881766443"
            />
        </>

    );
}

export default CustomerChat;
