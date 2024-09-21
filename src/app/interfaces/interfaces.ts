interface ProductInterface {
    id: string;
    name: string;
    description: string;
    logo: string;
    date_release: Date;
    date_revision: Date;
}
interface NotificationInterface {
    message: string;
    type: 'success' | 'error';
}

export { ProductInterface, NotificationInterface };