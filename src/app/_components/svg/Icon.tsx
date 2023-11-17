/* ////////////////////////////////////////////////////////////////////////// */
/*                          Supported features icons                          */
/* ////////////////////////////////////////////////////////////////////////// */
function SupportedIcon() {
    return (
        <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
                d="M16.049 6.138L8.8 13.387L4.851 9.449L3.3 11L8.8 16.5L17.6 7.7L16.049 6.138ZM11 0C4.928 0 0 4.928 0 11C0 17.072 4.928 22 11 22C17.072 22 22 17.072 22 11C22 4.928 17.072 0 11 0ZM11 19.8C6.138 19.8 2.2 15.862 2.2 11C2.2 6.138 6.138 2.2 11 2.2C15.862 2.2 19.8 6.138 19.8 11C19.8 15.862 15.862 19.8 11 19.8Z"
                fill="#48AC8A"
            />
        </svg>
    );
}
function UnsupportedIcon() {
    return (
        <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g opacity="0.5">
                <path
                    d="M11 0C4.928 0 0 4.928 0 11C0 17.072 4.928 22 11 22C17.072 22 22 17.072 22 11C22 4.928 17.072 0 11 0ZM11 19.8C6.138 19.8 2.2 15.862 2.2 11C2.2 6.138 6.138 2.2 11 2.2C15.862 2.2 19.8 6.138 19.8 11C19.8 15.862 15.862 19.8 11 19.8Z"
                    fill="#08090C"
                />
                <rect x="4" y="10" width="14" height="2" fill="#08090C" />
            </g>
        </svg>
    );
}

/* ////////////////////////////////////////////////////////////////////////// */
/*                 Cross icon for opening dropdown components                 */
/* ////////////////////////////////////////////////////////////////////////// */
function ExpandDropdown() {
    return (
        <svg width="56" height="56" viewBox="0 0 56 56" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M56 5.64L50.36 0L28 22.36L5.64 0L0 5.64L22.36 28L0 50.36L5.64 56L28 33.64L50.36 56L56 50.36L33.64 28L56 5.64Z" />
        </svg>
    );
}

const IconComponent = {
    SupportedIcon,
    UnsupportedIcon,
    ExpandDropdown,
};

export default IconComponent;
