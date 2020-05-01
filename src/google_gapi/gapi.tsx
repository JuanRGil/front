
export interface MyWindow extends Window {
    gapi: any;
}
export const params : gapi.auth2.ClientConfig = {
    client_id: '87323419200-0r386di22s709lrk72mr2ddcrjbd16n7.apps.googleusercontent.com',
    ux_mode: 'popup'
}

export const { gapi } = (window as MyWindow & typeof globalThis); 