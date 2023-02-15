export interface sidebar {
    link: string,
    icon: any,
    name: string
}

export  interface sidebarList {
    sidebars: Array<sidebar>,
    children: any,
    sidebarStatus: boolean,
    handleSidebarStatus(status: boolean): void,
    userRole: string
}
