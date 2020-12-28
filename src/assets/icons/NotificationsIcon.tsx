import React from "react"
import Svg, {SvgProps, G, Path} from "react-native-svg"
import {useSelector} from "react-redux";

function NotificationsIcon(props: SvgProps) {
    const active = useSelector(state => state.user.notifications.unread);

    return (
        <Svg
            width={22.91}
            height={22.91}
            viewBox="0 0 22.91 22.91"
            {...props}
        >
            <G data-name="Group 10853">
                <Path
                    data-name="Path 12596"
                    d="M17.496 0a5.376 5.376 0 00-5.37 5.37 5.568 5.568 0 001.342 3.526v1.844l1.852-.463a5.5 5.5 0 002.176.463 5.37 5.37 0 100-10.739zm-2.014 6.041H14.14V4.7h1.342zm2.685 0h-1.342V4.7h1.342zm2.685 0H19.51V4.7h1.342zm0 0"
                    fill={"#2a2939"}
                />
                <Path
                    data-name="Path 12597"
                    d="M17.5 19.161a2.943 2.943 0 00-.868-2.095 1.611 1.611 0 01-.474-1.146v-3.978a6.72 6.72 0 01-.921-.261l-3.106.777V9.345a6.539 6.539 0 01-.386-7.374 7.35 7.35 0 00-2.3-.593V0H8.1v1.376a7.43 7.43 0 00-6.757 7.349v7.195a1.611 1.611 0 01-.474 1.146 2.943 2.943 0 00-.868 2.095v1.064h17.5zm0 0"
                    fill={active ? "red" : "#2a2939"}
                />
                <Path
                    data-name="Path 12598"
                    d="M11.438 21.568H6.103a3.322 3.322 0 005.335 0zm0 0"
                    fill="#2a2939"
                />
            </G>
        </Svg>
    )
}

export default NotificationsIcon;
