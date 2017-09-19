
import { getLoggedUserData } from '../../Api/api.js';

export default async function getInitialiteState() {

    let loginUser = {
        username: '#',
        categories: [
            {
                "categoryUrls": [""],
                "categoryTitle": ""
            }
        ]
    };

    const data = await getLoggedUserData();
    if (data) {
        loginUser = data;
    }
    return {
        loginUser: loginUser,
        items: []
    };



}
/*
export default {
    loginUser: {
        username: 'test11',
        categories: [
            {
                "categoryUrls": [
                    "https://www.svethardware.cz/export.jsp?format=rss2",
                    "http://www.osel.cz/rss/rss.php",
                    "https://www.cnews.cz/feed",
                    "http://www.eurogamer.cz/?format=rss",
                    ""
                ],
                "categoryTitle": "Veda"
            },
            {
                "categoryUrls": [
                    ""
                ],
                "categoryTitle": ""
            }
        ]
    },
    items: []
};

*/