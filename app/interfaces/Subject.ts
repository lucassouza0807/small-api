interface Subject {
    attach(observer: any): void
    detach(observer: any): void
    notify(observer: any): void
}